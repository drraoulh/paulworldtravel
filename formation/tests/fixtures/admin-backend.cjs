// A local Supabase-shaped fixture. Never configure this URL or its dummy sessions in production.
const http = require('node:http');
const ADMIN = '10000000-0000-4000-8000-000000000001';
const TRAINER = '10000000-0000-4000-8000-000000000002';
const LEARNER = '20000000-0000-4000-8000-000000000001';
const date = '2026-11-01T10:00:00.000Z';
const profiles = [
  { id: ADMIN, email: 'admin@example.invalid', first_name: 'Équipe', last_name: 'Formation', role: 'admin', created_at: date },
  { id: TRAINER, email: 'trainer@example.invalid', first_name: 'Formateur', last_name: 'Test', role: 'trainer', created_at: date },
  { id: LEARNER, email: 'camille@example.invalid', first_name: 'Camille', last_name: 'Martin', phone: '+237 600000000', city: 'Douala', role: 'candidate', created_at: date },
];
function token(id) { const enc = (v) => Buffer.from(JSON.stringify(v)).toString('base64url'); return `${enc({ alg:'HS256',typ:'JWT' })}.${enc({ sub:id, exp:Math.floor(Date.now()/1000)+3600, aud:'authenticated' })}.local-fixture-signature`; }
function sessionCookie(id, url) { const p = profiles.find((p) => p.id === id); const user = { id, aud:'authenticated', email:p.email, user_metadata:{}, app_metadata:{}, identities:[], created_at:date }; return { name:'sb-127-auth-token', value:'base64-'+Buffer.from(JSON.stringify({ access_token:token(id), refresh_token:'local-refresh', expires_in:3600, expires_at:Math.floor(Date.now()/1000)+3600, token_type:'bearer', user })).toString('base64url'), url, sameSite:'Lax' }; }
function startBackend(port = 4020) {
  const state = {
    profiles: profiles.map((p) => ({ ...p })),
    learner_progress: [{ user_id:LEARNER, snapshot:{ done:['guide','read:co/ecoute-unique','quiz-v2:co/ecoute-unique'], meta:{ days:['2026-11-01'],goal:5 }, results:{series:{},mocks:[]} }, updated_at:date }],
    ai_exam_sessions: [], ai_exam_operations: [], learner_notes: [], lesson_drafts: [], lesson_publications: [],
    enrollments:[{ id:'30000000-0000-4000-8000-000000000001', user_id:LEARNER, formule:'essentiel',status:'pending', created_at:date, starts_at:null,ends_at:null,level:'B1',goal:'NCLC 7' }],
    submissions:[{ id:'40000000-0000-4000-8000-000000000001',user_id:LEARNER,kind:'ee',task_prompt:'Une invitation',content:'Texte de test',status:'ai_reviewed',ai_score:12,created_at:date }],
    level_test_results:[{ id:'50000000-0000-4000-8000-000000000001',user_id:LEARNER,level:'B1',score:9,total:15,created_at:date }], question_drafts:[], ai_usage:[],
  };
  const server = http.createServer(async (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Headers','*'); res.setHeader('Access-Control-Allow-Methods','GET,HEAD,POST,PATCH,OPTIONS'); res.setHeader('Access-Control-Expose-Headers','Content-Range');
    if(req.method==='OPTIONS'){res.writeHead(204);return res.end();}
    const url = new URL(req.url,'http://127.0.0.1');
    let body = {}; try { const chunks=[];for await(const c of req) chunks.push(c);if(chunks.length)body=JSON.parse(Buffer.concat(chunks).toString()); } catch {}
    const send = (status,value) => {res.writeHead(status,{'Content-Type':'application/json'});res.end(req.method==='HEAD'?'':JSON.stringify(value));};
    const fail = (code,message,status=400) => send(status,{code,message,details:null,hint:null});
    let sub;try{sub=JSON.parse(Buffer.from((req.headers.authorization||'').split('.')[1],'base64url').toString()).sub;}catch{}
    const profile=state.profiles.find(p=>p.id===sub);
    const user=profile?{ id:profile.id,aud:'authenticated',email:profile.email,user_metadata:body.data??{},app_metadata:{},identities:[],created_at:date }:null;
    if(url.pathname==='/auth/v1/token'){const account=state.profiles.find(p=>p.email===body.email);if(!account)return fail('invalid_credentials','Unknown fixture user',400);const authUser={id:account.id,aud:'authenticated',email:account.email,user_metadata:{},app_metadata:{},identities:[],created_at:date};return send(200,{access_token:token(account.id),refresh_token:'local-refresh',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,token_type:'bearer',user:authUser});}
    if(url.pathname.startsWith('/auth/v1/')) return user?send(200,user):fail('401','No session',401);
    if(url.pathname==='/rest/v1/rpc/start_ai_exam') {
      const existing=state.ai_exam_sessions.find(r=>r.user_id===body.p_user_id&&r.request_id===body.p_request_id);
      if(existing)return send(200,existing);
      const used=state.ai_exam_sessions.filter(r=>r.user_id===body.p_user_id&&r.enrollment_id===body.p_enrollment_id).length;
      if(used>=body.p_limit)return fail('P0001','exam_quota_exhausted');
      const row={id:require('node:crypto').randomUUID(),user_id:body.p_user_id,enrollment_id:body.p_enrollment_id,request_id:body.p_request_id,serie:body.p_serie,created_at:new Date().toISOString(),expires_at:new Date(Date.now()+86400000).toISOString()};
      state.ai_exam_sessions.push(row);return send(200,row);
    }
    if(url.pathname==='/rest/v1/rpc/claim_ai_exam_operation') {
      let row=state.ai_exam_operations.find(r=>r.session_id===body.p_session_id&&r.operation===body.p_operation);
      if(row?.state==='done')return send(200,{state:'done',result:row.result});
      if(row?.state==='working')return fail('P0001','operation_busy');
      if(row?.attempts>=2)return fail('P0001','operation_attempts_exhausted');
      if(!row){row={session_id:body.p_session_id,operation:body.p_operation,attempts:0};state.ai_exam_operations.push(row);}
      Object.assign(row,{state:'working',attempts:row.attempts+1,lease_id:require('node:crypto').randomUUID()});
      return send(200,{state:row.state,lease_id:row.lease_id});
    }
    if(url.pathname==='/rest/v1/rpc/publish_training_lesson'){
      const draft=state.lesson_drafts.find(d=>d.id===body.p_id);
      if(profile?.role!=='admin')return fail('42501','Admin required',403);
      if(!draft||draft.revision!==body.p_revision)return fail('P0001','Draft conflict');
      const pub={id:draft.id,content:structuredClone(draft.content),revision:draft.revision,archived:false,published_at:new Date().toISOString()};
      const i=state.lesson_publications.findIndex(p=>p.id===draft.id);if(i<0)state.lesson_publications.push(pub);else state.lesson_publications[i]=pub;
      return send(200,null);
    }
    const table=url.pathname.split('/').at(-1);
    if(!Array.isArray(state[table]))return send(200,[]);
    const eqs=[...url.searchParams].filter(([k,v])=>!['select','order','limit','offset','or'].includes(k)&&v.startsWith('eq.'));
    const matches = row=>eqs.every(([k,v])=>String(row[k])===v.slice(3)) && [...url.searchParams].filter(([,v])=>v.startsWith('is.')).every(([k,v])=>v==='is.null' ? row[k]==null : false) && [...url.searchParams].filter(([,v])=>v.startsWith('gte.')).every(([k,v])=>String(row[k])>=v.slice(4));
    let rows=state[table].filter(matches);
    if(req.method==='GET'||req.method==='HEAD'){
      const or=url.searchParams.get('or');if(or){const q=/ilike\.%([^%]+)%/.exec(or)?.[1]?.toLowerCase();if(q)rows=rows.filter(r=>[r.email,r.first_name,r.last_name].some(v=>v?.toLowerCase().includes(q)));}
      const total=rows.length;res.setHeader('Content-Range',`0-${Math.max(0,total-1)}/${total}`);
      const offset=Number(url.searchParams.get('offset')||0),limit=Number(url.searchParams.get('limit')||1000);rows=rows.slice(offset,offset+limit);
      const select=url.searchParams.get('select')||'';
      rows=rows.map(row=>({...row,...(table==='profiles'&&select.includes('learner_progress(')?{learner_progress:state.learner_progress.find(p=>p.user_id===row.id)??null}:{}),...(select.includes('profiles!')?{profiles:state.profiles.find(p=>p.id===row.user_id)??null}:{})}));
    } else if(req.method==='POST'){
      const values=Array.isArray(body)?body:[body];rows=[];
      for(const v of values){const key=table==='learner_notes'||table==='learner_progress'?'user_id':'id';const existing=state[table].find(r=>r[key]===v[key]);if(existing&&!String(req.headers.prefer).includes('resolution=merge-duplicates'))return fail('23505','Duplicate');const value={created_at:table==='ai_usage'?new Date().toISOString():date,updated_at:new Date().toISOString(),...v,id:v.id||(key==='id'?require('node:crypto').randomUUID():undefined)};if(existing){Object.assign(existing,value);rows.push(existing);}else{state[table].push(value);rows.push(value);}}
    } else if(req.method==='PATCH'){rows.forEach(row=>Object.assign(row,body,{updated_at:new Date().toISOString()}));}
    const object=String(req.headers.accept).includes('vnd.pgrst.object');
    if(object&&rows.length!==1)return fail('PGRST116','No row',406);
    if(req.method==='HEAD')return send(200,[]);
    return send(200,object?rows[0]:rows);
  });
  return new Promise(resolve=>server.listen(port,'127.0.0.1',()=>resolve({server,state,close:()=>new Promise(r=>server.close(r))})));
}
module.exports={startBackend,sessionCookie,ADMIN,TRAINER,LEARNER};
if(require.main===module)startBackend().then(()=>console.log('Local admin fixture on 4020'));
