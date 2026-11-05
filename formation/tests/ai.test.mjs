import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { createClient } = require('@supabase/supabase-js');
const { startBackend, LEARNER, ADMIN, TRAINER } = require('./fixtures/admin-backend.cjs');
const root = resolve(import.meta.dirname, '../src');

// Compile the real server modules with isolated auth dependencies; no provider calls or credentials.
function loader(mocks = {}) {
  const cache = new Map();
  function load(name, parent = root) {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (!name.startsWith('.') && !name.startsWith('@/') && !name.startsWith('/')) return require(name);
    const file = (name.startsWith('@/') ? resolve(root, name.slice(2)) : resolve(parent, name)).replace(/(?<!\.ts)$/, '.ts');
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    new Function('require', 'module', 'exports', code)((id) => load(id, dirname(file)), module, module.exports);
    return module.exports;
  }
  return load;
}
async function account(t) {
  const backend = await startBackend(0);
  t.after(() => backend.close());
  const client = createClient(`http://127.0.0.1:${backend.server.address().port}`, 'local-test-key', { auth: { persistSession: false } });
  const state = { user: { id: LEARNER }, admin: client };
  const load = loader({
    '@/lib/supabase/server': { createClient: async () => ({ auth: { getUser: async () => ({ data: { user: state.user } }) } }) },
    '@/lib/supabase/admin': { createAdminClient: () => state.admin },
    '@/lib/combinaisons-server': { getCombinaison: async () => null },
  });
  return { ...backend, auth: state, load, access: load('@/lib/ai/access') };
}
function env(t, values) {
  for (const [key, value] of Object.entries(values)) {
    const before = process.env[key];
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
    t.after(() => { if (before === undefined) delete process.env[key]; else process.env[key] = before; });
  }
}
const rejectsStatus = (promise, status) => assert.rejects(promise, (e) => e.status === status);
const jsonRequest = (body) => new Request('http://localhost/api/ai/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

test('free, pending, expired, future and unknown packs cannot use any AI feature', async (t) => {
  const { state, access } = await account(t);
  for (const enrollment of [null,
    { formule: 'essentiel', status: 'pending' },
    { formule: 'essentiel', status: 'active', ends_at: '2000-01-01' },
    { formule: 'essentiel', status: 'active', starts_at: '2999-01-01' },
    { formule: 'unknown', status: 'active' },
  ]) {
    state.enrollments.splice(0, state.enrollments.length, ...(enrollment ? [{ user_id: LEARNER, starts_at: null, ends_at: null, ...enrollment }] : []));
    for (const feature of ['writing', 'speaking', 'tutor', 'generate']) await rejectsStatus(access.checkAccess(feature), 403);
    const status = await access.accessStatus();
    assert.equal(status.aiAllowed, false);
    assert.deepEqual(status.remaining, { writing: 0, speaking: 0, tutor: 0 });
  }
});

test('each paid pack enforces its own quotas, successful use is counted, errors deny access', async (t) => {
  const a = await account(t);
  const { packs } = a.load('@/content/offers');
  for (const pack of packs) {
    Object.assign(a.state.enrollments[0], { formule: pack.id, status: 'active', starts_at: null, ends_at: null });
    a.state.ai_usage.length = 0;
    assert.deepEqual((await a.access.accessStatus()).remaining, pack.ai);
    for (const feature of ['writing', 'speaking', 'tutor']) {
      a.state.ai_usage.splice(0, a.state.ai_usage.length, ...Array.from({ length: pack.ai[feature] - 1 }, (_, n) => ({ id: `${feature}-${n}`, user_id: LEARNER, feature, created_at: new Date().toISOString() })));
      const last = await a.access.checkAccess(feature);
      assert.equal(last.remaining, 0);
      await last.record();
      await rejectsStatus(a.access.checkAccess(feature), 429);
    }
    await rejectsStatus(a.access.checkAccess('generate'), 403);
  }
  // A failed quota query or missing profile must never grant access.
  a.state.ai_usage = undefined;
  await rejectsStatus(a.access.checkAccess('writing'), 503);
  a.state.profiles = [];
  await rejectsStatus(a.access.requireAiEntitlement(), 503);
});

test('staff have bounded quotas; content generation is restricted to admin', async (t) => {
  const a = await account(t);
  a.auth.user = { id: TRAINER };
  assert.equal((await a.access.accessStatus()).aiAllowed, true);
  await rejectsStatus(a.access.checkAccess('generate'), 403);
  a.auth.user = { id: ADMIN };
  assert.equal((await a.access.checkAccess('generate')).remaining, 9);
  a.auth.user = null;
  await rejectsStatus(a.access.checkAccess('tutor'), 401);
});

test('an oral ticket is denied immediately after a paid entitlement ends', async (t) => {
  env(t, { SUPABASE_SECRET_KEY: 'local-ticket-test-key' });
  const a = await account(t);
  Object.assign(a.state.enrollments[0], { status: 'active' });
  const interaction = a.load('@/lib/ai/interaction');
  const ticket = interaction.issueTicket(LEARNER, 'speaking-task');
  await interaction.verifyTicket(ticket, 'speaking-task');
  a.state.enrollments[0].status = 'expired';
  await rejectsStatus(interaction.verifyTicket(ticket, 'speaking-task'), 403);
});

test('free accounts receive 403 on tutor, written correction and oral endpoints before any provider call', async (t) => {
  env(t, { OPENAI_API_KEY: 'local-provider-test-key', SUPABASE_SECRET_KEY: 'local-ticket-test-key' });
  const a = await account(t);
  const { writingTasks, speakingTasks } = a.load('@/content/expression');
  const monologue = speakingTasks.find((task) => task.mode === 'monologue');
  const interaction = speakingTasks.find((task) => task.mode === 'interaction');
  const ticket = a.load('@/lib/ai/interaction').issueTicket(LEARNER, interaction.id);
  const routes = [
    ['tutor', jsonRequest({ messages: [{ role: 'user', content: 'Bonjour' }] })],
    ['writing', jsonRequest({ taskId: writingTasks[0].id, text: 'bonjour '.repeat(25) })],
    ['speaking/session', jsonRequest({ taskId: interaction.id })],
    ['speaking', jsonRequest({ taskId: interaction.id, ticket, turns: [] })],
  ];
  const audio = new Blob([new Uint8Array(3000)], { type: 'audio/mpeg' });
  for (const [path, task] of [['speaking', monologue], ['speaking/turn', interaction]]) {
    const form = new FormData();
    form.set('taskId', task.id); form.set('audio', audio, 'test.mp3'); form.set('ticket', ticket);
    routes.push([path, new Request('http://localhost/api/ai/', { method: 'POST', body: form })]);
  }
  const originalFetch = globalThis.fetch;
  t.mock.method(globalThis, 'fetch', (url, options) => {
    assert.ok(String(url).startsWith('http://127.0.0.1:'), 'no external provider request for a free account');
    return originalFetch(url, options);
  });
  for (const [path, request] of routes) {
    const response = await a.load(`@/app/api/ai/${path}/route`).POST(request);
    assert.equal(response.status, 403, `${path}: ${await response.text()}`);
  }
});

test('direct OpenAI uses economical text models, no reasoning, bounded tokens, JSON output and French transcription', async (t) => {
  env(t, { OPENAI_API_KEY: 'local-provider-test-key', OPENROUTER_API_KEY: 'local-alternate-test-key', OPENAI_MODEL_FAST: undefined, OPENAI_MODEL_GRADING: undefined, OPENAI_MODEL_TRANSCRIPTION: undefined });
  const load = loader();
  const provider = load('@/lib/ai/openrouter');
  const audio = load('@/lib/ai/huggingface');
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    requests++;
    assert.equal(options.headers.authorization, 'Bearer local-provider-test-key');
    if (String(url).endsWith('/audio/transcriptions')) {
      assert.equal(options.body.get('model'), 'gpt-transcribe');
      assert.equal(options.body.get('language'), 'fr');
      assert.equal(options.body.get('file').name, 'oral.webm');
      return Response.json({ text: '  Bonjour tout le monde.  ' });
    }
    assert.equal(url, 'https://api.openai.com/v1/chat/completions');
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'gpt-6-luna');
    assert.equal(body.reasoning_effort, 'none');
    assert.equal(body.max_completion_tokens, 500);
    assert.equal(body.temperature, undefined);
    assert.deepEqual(body.response_format, { type: 'json_object' });
    return Response.json({ choices: [{ message: { content: '{"ok":true}' } }] });
  });
  assert.equal(provider.MODELS.grading(), 'gpt-6-luna');
  assert.equal(await provider.chat(provider.MODELS.fast(), [{ role: 'user', content: 'JSON SVP' }], { maxTokens: 500, json: true }), '{"ok":true}');
  assert.equal(await audio.transcribe(new ArrayBuffer(10), 'audio/webm'), 'Bonjour tout le monde.');
  assert.equal(requests, 2);
});

test('provider failures are not retried on another billable provider', async (t) => {
  env(t, { OPENAI_API_KEY: 'local-provider-test-key', OPENROUTER_API_KEY: 'local-alternate-test-key' });
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async () => { requests++; return new Response('error', { status: 429 }); });
  await assert.rejects(loader()('@/lib/ai/openrouter').chat('gpt-6-luna', []), /OpenAI request failed/);
  assert.equal(requests, 1);
});

test('existing OpenRouter text configuration remains supported without OpenAI', async (t) => {
  env(t, { OPENAI_API_KEY: undefined, OPENROUTER_API_KEY: 'local-alternate-test-key' });
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    const body = JSON.parse(options.body);
    assert.equal(body.max_tokens, 100);
    assert.equal(body.reasoning_effort, undefined);
    return Response.json({ choices: [{ message: { content: 'Bonjour' } }] });
  });
  assert.equal(await loader()('@/lib/ai/openrouter').chat('existing-model', [], { maxTokens: 100 }), 'Bonjour');
});

test('approved packs include independent 1/4/8/12/24 exam credits for 7/30/60/90/90 days', async (t) => {
  const a = await account(t);
  const { packs } = a.load('@/content/offers');
  for (const [index, pack] of packs.entries()) {
    Object.assign(a.state.enrollments[0], { formule: pack.id, status: 'active' });
    const status = await a.access.accessStatus();
    assert.deepEqual(status.exams, { remaining: [1,4,8,12,24][index], limit: [1,4,8,12,24][index], days: [7,30,60,90,90][index] });
  }
});

test('one reserved exam covers all six corrections even when training quotas are exhausted; replays are cached', async (t) => {
  env(t, { OPENAI_API_KEY: 'local-provider-test-key', SUPABASE_SECRET_KEY: 'local-ticket-test-key' });
  const a = await account(t);
  Object.assign(a.state.enrollments[0], { status: 'active' });
  a.state.ai_usage.push(...['writing','speaking','tutor'].flatMap(feature => Array.from({ length: 10 }, (_, n) => ({ id:`${feature}-${n}`,user_id:LEARNER,feature,created_at:new Date().toISOString() }))));
  const before = await a.access.accessStatus();
  assert.deepEqual(before.remaining, { writing:0, speaking:0, tutor:0 });
  const originalFetch = globalThis.fetch;
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (String(url).startsWith('http://127.0.0.1:')) return originalFetch(url, options);
    assert.ok(String(url).startsWith('https://api.openai.com/'));
    calls++;
    if (String(url).endsWith('/audio/transcriptions')) return Response.json({ text: 'Bonjour je souhaite connaître les horaires et les prix de votre activité.' });
    const raw = { criteria: Object.fromEntries(['consigne','coherence','vocabulaire','grammaire'].map(key => [key,{score:3,comment:'Bon travail.'}])), summary:'Réponse claire.',errors:[],advice:['Développez vos exemples.'],improved:'Une réponse modèle.' };
    const body = JSON.parse(options.body);
    return Response.json({ choices:[{message:{content:body.response_format ? JSON.stringify(raw) : 'Nous sommes ouverts le samedi.'}}] });
  });
  const exams = a.load('@/lib/ai/exams');
  const requestId = '50000000-0000-4000-8000-000000000005';
  const session = await exams.startExam(1, requestId);
  assert.equal((await exams.startExam(1, requestId)).id, session.id);
  assert.equal(a.state.ai_exam_sessions.length, 1);
  const { mockWritingTasks, mockSpeakingTasks } = a.load('@/content/mock-exam');
  const writings = mockWritingTasks(1), oral = mockSpeakingTasks(1);
  for (const task of writings) {
    const response = await a.load('@/app/api/ai/writing/route').POST(jsonRequest({ taskId:task.id,text:'bonjour '.repeat(25),examSessionId:session.id }));
    assert.equal(response.status,200,await response.clone().text());
    assert.equal((await response.json()).feedback.score,12);
  }
  for (const task of oral.filter(t => t.mode==='monologue')) {
    const form = new FormData();form.set('taskId',task.id);form.set('examSessionId',session.id);form.set('seconds','120');form.set('audio',new Blob([new Uint8Array(3000)],{type:'audio/mpeg'}),'oral.mp3');
    const response = await a.load('@/app/api/ai/speaking/route').POST(new Request('http://localhost/api/ai/',{method:'POST',body:form}));
    assert.equal(response.status,200,await response.text());
  }
  const interaction = oral.find(t => t.mode==='interaction');
  const started = await a.load('@/app/api/ai/speaking/session/route').POST(jsonRequest({taskId:interaction.id,examSessionId:session.id}));
  assert.equal(started.status,200);
  const {ticket} = await started.json();
  const form = new FormData();form.set('taskId',interaction.id);form.set('ticket',ticket);form.set('history','[]');form.set('audio',new Blob([new Uint8Array(3000)],{type:'audio/mpeg'}),'oral.mp3');
  const turnResponse = await a.load('@/app/api/ai/speaking/turn/route').POST(new Request('http://localhost/api/ai/',{method:'POST',body:form}));
  assert.equal(turnResponse.status,200,await turnResponse.text());
  const response = await a.load('@/app/api/ai/speaking/route').POST(jsonRequest({taskId:interaction.id,ticket,turns:[{who:'candidate',text:'Bonjour je souhaite connaître les horaires et les prix de votre activité.'}],seconds:60}));
  assert.equal(response.status,200,await response.text());
  assert.equal(a.state.submissions.length,7,'six new saved productions');
  assert.equal(a.state.ai_usage.length,30,'no training or tutor quota consumed');
  assert.equal((await a.access.accessStatus()).exams.remaining,3);
  const beforeReplay = calls;
  const replay = await a.load('@/app/api/ai/writing/route').POST(jsonRequest({taskId:writings[0].id,text:'un autre texte '.repeat(25),examSessionId:session.id}));
  assert.equal(replay.status,200);
  assert.equal(calls,beforeReplay,'replaying a correction never calls OpenAI again');
  await rejectsStatus(exams.runExamOperation(session.id,'speaking',interaction.id,async()=>({}),12),422);
  const foreignTask = a.load('@/content/expression').writingTasks.find(t=>!writings.some(w=>w.id===t.id));
  await rejectsStatus(exams.examAccess(session.id,'writing',foreignTask.id),403);
  a.auth.user={id:ADMIN};
  await rejectsStatus(exams.examAccess(session.id,'writing',writings[0].id),403);
  a.auth.user={id:LEARNER};
  a.state.ai_exam_sessions[0].expires_at='2000-01-01T00:00:00Z';
  await rejectsStatus(exams.examAccess(session.id,'writing',writings[0].id),410);
});

test('exam credits are bounded per enrollment, free accounts denied, failures retry at most twice', async (t) => {
  const a=await account(t), exams=a.load('@/lib/ai/exams');
  await rejectsStatus(exams.startExam(1,'50000000-0000-4000-8000-000000000001'),403);
  Object.assign(a.state.enrollments[0],{formule:'express',status:'active'});
  const session=await exams.startExam(1,'50000000-0000-4000-8000-000000000001');
  await rejectsStatus(exams.startExam(1,'50000000-0000-4000-8000-000000000002'),429);
  const task=a.load('@/content/mock-exam').mockWritingTasks(1)[0];
  let attempts=0;
  const fail=()=>{attempts++;throw new Error('Mock provider unavailable');};
  for(let n=0;n<2;n++)await assert.rejects(exams.runExamOperation(session.id,'writing',task.id,fail),/Mock provider/);
  await rejectsStatus(exams.runExamOperation(session.id,'writing',task.id,fail),429);
  assert.equal(attempts,2);
  // A new enrollment receives its own credits. Cancelling the old one revokes its sessions.
  const old=a.state.enrollments[0];old.status='cancelled';
  a.state.enrollments.push({...old,id:'30000000-0000-4000-8000-000000000002',status:'active'});
  assert.equal((await a.access.accessStatus()).exams.remaining,1);
  await rejectsStatus(exams.examAccess(session.id,'writing',task.id),403);
});
