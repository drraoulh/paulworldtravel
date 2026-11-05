// Local fake auth, microphone and AI responses: no paid provider calls.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { sessionCookie, LEARNER } = require('./fixtures/admin-backend.cjs');
const base = process.env.FORMATION_BASE_URL || 'http://127.0.0.1:3011';
const supabase = process.env.FORMATION_SUPABASE_URL || 'http://127.0.0.1:4020';
const sessionId = '60000000-0000-4000-8000-000000000001';
const feedback = { score:12, level:'B2', nclc:'NCLC 7', summary:'Votre réponse est claire.', criteria:[],errors:[],advice:['Développez vos exemples.'],improved:'Une réponse modèle.' };
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
 try {
  const context=await browser.newContext({permissions:['microphone']});
  await context.addCookies([sessionCookie(LEARNER,base)]);
  await context.route(`${supabase}/**`,r=>r.fulfill({json:r.request().url().includes('/rest/')?[]:{id:LEARNER,email:'camille@example.invalid',aud:'authenticated',app_metadata:{},user_metadata:{}}}));
  let credits=1,starts=0,writings=0,monologues=0,interactions=0;
  await context.route('**/api/access/',r=>r.fulfill({json:{signedIn:true,plan:'active',pack:'express',aiAllowed:true,remaining:{writing:0,speaking:0,tutor:0},exams:{remaining:credits,limit:1,days:7}}}));
  await context.route('**/api/ai/exam/',r=>{starts++;assert.ok(r.request().postDataJSON().requestId);credits=0;return r.fulfill({json:{sessionId,expiresAt:new Date(Date.now()+86400000).toISOString()}});});
  await context.route('**/api/ai/writing/',r=>{writings++;assert.equal(r.request().postDataJSON().examSessionId,sessionId);return r.fulfill({json:{feedback,remaining:null,plan:'active'}});});
  await context.route('**/api/ai/speaking/session/',r=>{assert.equal(r.request().postDataJSON().examSessionId,sessionId);return r.fulfill({json:{ticket:'local-exam-ticket',remaining:null,plan:'active'}});});
  await context.route('**/api/ai/speaking/turn/',r=>{assert.match(r.request().postData(),/local-exam-ticket/);return r.fulfill({json:{transcript:'Bonjour quels sont vos horaires et les prix de cette activité ?',reply:'Nous sommes ouverts le samedi.'}});});
  await context.route('**/api/ai/speaking/',r=>{
   if(r.request().headers()['content-type'].includes('application/json')){interactions++;assert.equal(r.request().postDataJSON().ticket,'local-exam-ticket');}
   else{monologues++;assert.match(r.request().postData(),new RegExp(sessionId));}
   return r.fulfill({json:{feedback,transcript:'Bonjour je me présente et je développe mon point de vue.',remaining:null,plan:'active'}});
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  const button=(name)=>page.getByRole('button',{name,exact:true});
  await page.goto(base+'/examen-blanc/');
  await page.getByText('Examens blancs corrigés : 1 / 1 disponibles').waitFor();
  await button('Commencer l’examen (1 crédit)').click();
  for(let n=0;n<2;n++){await button('Terminer l’examen').click();await button('Commencer l’épreuve').click();}
  for(let n=1;n<=3;n++){
   await page.getByRole('tab',{name:new RegExp(`^Tâche ${n} `)}).click();
   await page.getByRole('textbox',{name:`Votre texte pour la tâche ${n}`}).fill('Bonjour je développe mon texte avec des exemples précis et une conclusion. '.repeat(5));
  }
  await button('Rendre ma copie').click();await button('Commencer l’épreuve').click();
  const record=async()=>{
   await button('Commencer l’enregistrement').click();await button('Arrêter').waitFor();await page.waitForTimeout(1100);
   await button('Arrêter').click();await button('Faire corriger mon oral').click();await page.getByText('Votre réponse est claire.',{exact:true}).waitFor();
  };
  await record();
  await page.getByRole('tab',{name:'Tâche 2',exact:true}).click();
  await page.getByRole('button',{name:/^Commencer la préparation/}).click();await button('Je suis prêt, commencer l’échange').click();
  await button('Parler').click();await page.waitForTimeout(1100);await button('Envoyer ma réplique').click();
  await page.getByText('Nous sommes ouverts le samedi.',{exact:false}).waitFor();
  await button('Terminer l’échange').click();await button('Faire corriger mon échange').click();await page.getByText('Votre réponse est claire.',{exact:true}).waitFor();
  await page.getByRole('tab',{name:'Tâche 1',exact:true}).click();
  await page.getByText('Votre réponse est claire.',{exact:true}).waitFor();assert.equal(await button('Commencer l’enregistrement').isDisabled(),true);
  await page.getByRole('tab',{name:'Tâche 3',exact:true}).click();await record();
  await button('Terminer l’examen').click();await page.getByText('3 / 3 tâches corrigées — détail dans votre espace',{exact:true}).waitFor();
  await button('Faire corriger mes trois textes').click();await page.getByText('12 / 20',{exact:true}).nth(2).waitFor();
  await button('Faire corriger mes trois textes').click();
  assert.equal(writings,3);assert.equal(monologues,2);assert.equal(interactions,1);assert.equal(starts,1);
  await page.reload();await page.getByText('Examens blancs corrigés : 0 / 1 disponibles').waitFor();assert.equal(await button('Commencer l’examen (1 crédit)').isDisabled(),true);
  for(const width of [1365,390]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
  await page.screenshot({path:'/workspace/work/exam-mobile.png',fullPage:true});assert.deepEqual(errors,[]);
  console.log('PASS: one credit, complete exam, six corrections, preserved oral feedback, no duplicate requests, exhausted credit, responsive layout.');
  await context.close();
 } finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
