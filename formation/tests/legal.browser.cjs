// Runs against the local dummy Supabase build. No account, email, payment or real analytics request.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.FORMATION_BASE_URL||'http://127.0.0.1:3011';
const supabase=process.env.FORMATION_SUPABASE_URL||'http://127.0.0.1:4020';
const fakeAnalytics=`(()=>{
 let beforeSend=e=>e;
 window.__analyticsSent=[];
 const run=(type,payload)=>{
  if(type==='beforeSend'){beforeSend=payload;return;}
  if(type==='pageview'){
   const event=beforeSend({type:'pageview',url:location.href});
   if(event){window.__analyticsSent.push(event);fetch('/_vercel/insights/view',{method:'POST',body:JSON.stringify(event)});}
  }
 };
 const pending=window.vaq||[];window.va=run;pending.forEach(args=>run(...args));
})();`;
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route(`${supabase}/**`,r=>r.fulfill({json:r.request().url().includes('/rest/')?[]:{}}));
  let scripts=0,views=[];
  await context.route('**/_vercel/insights/**',r=>{
   if(r.request().url().endsWith('script.js')){scripts++;return r.fulfill({contentType:'application/javascript',body:fakeAnalytics});}
   views.push(r.request().postDataJSON());return r.fulfill({json:{ok:true}});
  });
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/packs/?email=private@example.com#personal');
  const banner=page.getByRole('region',{name:'Choix des cookies'});
  await banner.waitFor();assert.equal(scripts,0);assert.equal(views.length,0);
  await page.screenshot({path:'/workspace/work/legal-cookie-banner.png',fullPage:false});
  await banner.getByRole('button',{name:'Personnaliser',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Préférences de cookies'});
  await dialog.waitFor();assert.equal(await dialog.getByRole('checkbox',{name:/Mesure d’audience/}).isChecked(),false);
  assert.equal(await dialog.getByRole('checkbox',{name:/Nécessaires/}).isDisabled(),true);
  await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('dialog')),true);
  await page.keyboard.press('Escape');await banner.waitFor();assert.equal(scripts,0);
  await banner.getByRole('button',{name:'Tout refuser',exact:true}).click();
  assert.equal(await banner.isVisible(),false);await page.reload();assert.equal(await banner.isVisible(),false);assert.equal(scripts,0);
  let cookie=(await context.cookies()).find(c=>c.name==='pwt-cookie-consent');
  assert.equal(JSON.parse(decodeURIComponent(cookie.value)).analytics,false);
  assert.ok(cookie.expires-Date.now()/1000>179*86400);
  await page.getByRole('button',{name:'Gérer mes cookies',exact:true}).click();
  await dialog.getByRole('checkbox',{name:/Mesure d’audience/}).check();
  await dialog.getByRole('button',{name:'Enregistrer mes choix',exact:true}).click();
  await page.waitForFunction(()=>window.__analyticsSent?.length>0);
  assert.equal(scripts,1);
  const sent=await page.evaluate(()=>window.__analyticsSent);
  assert.ok(sent.every(e=>!e.url.includes('?')&&!e.url.includes('#')&&!e.url.includes('private@')));
  await page.getByRole('button',{name:'Gérer mes cookies',exact:true}).click();
  await dialog.getByRole('button',{name:'Tout refuser',exact:true}).click();
  const count=await page.evaluate(()=>window.__analyticsSent.length);
  await page.evaluate(()=>window.va('pageview',{path:location.pathname}));
  assert.equal(await page.evaluate(()=>window.__analyticsSent.length),count,'withdrawal blocks the already-loaded analytics callback');
  for(const width of [390,1365]){
   await page.setViewportSize({width,height:900});
   for(const path of ['/mentions-legales/','/conditions-utilisation/','/conditions-vente/','/confidentialite/','/cookies/']){
    const response=await page.goto(base+path);assert.equal(response.status(),200,path);await page.locator('main h1').waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,path);
    assert.ok(await page.getByRole('button',{name:'Imprimer ou enregistrer en PDF',exact:true}).isVisible());
   }
  }
  await page.goto(base+'/mentions-legales/');
  const legalText=await page.locator('main').innerText();
  for(const expected of ['PAUL WORLD TRAVEL, TOURISM AND TRAINING','PW3T SARL','900 000 francs CFA','CM-DLA-01-2024-B12-00052','NGANTSI BILOUNGA Achille de Paul'])assert.ok(legalText.includes(expected),expected);
  for(const excluded of ['Camerone','Chloe','14/05/2022','06/02/2017'])assert.ok(!legalText.includes(excluded));
  const sitemap=await (await context.request.get(base+'/sitemap.xml')).text();assert.ok(sitemap.includes('/confidentialite/'));
  // Required contract checkbox: a click cannot create a signup before acceptance.
  let signups=0,notifications=0;
  await context.route(`${supabase}/auth/v1/signup**`,r=>{signups++;assert.equal(r.request().postDataJSON().data.legal_acceptance.version,'2026-11-05');return r.fulfill({json:{user:{id:'test-user',identities:[{id:'test'}]},session:null}});});
  await context.route('**/api/inscription/',r=>{notifications++;assert.equal(r.request().postDataJSON().legalAcceptance.accepted,true);return r.fulfill({json:{ok:true}});});
  await page.goto(base+'/inscription/');
  await page.locator('[name=firstName]').fill('Camille');await page.locator('[name=email]').fill('test@example.invalid');await page.locator('[name=password]').fill('local-password');await page.locator('[name=password2]').fill('local-password');
  await page.getByRole('checkbox',{name:/J’accepte les/}).check();
  await page.locator('details summary').click();await page.locator('select[name=formule]').selectOption('gold');
  assert.equal(await page.getByRole('checkbox',{name:/J’accepte les/}).isChecked(),false,'choosing a paid pack requires accepting its sales terms');
  await page.locator('select[name=formule]').selectOption('');
  await page.getByRole('button',{name:'Créer mon compte gratuit',exact:true}).click();assert.equal(signups,0);assert.equal(notifications,0);
  await page.getByRole('checkbox',{name:/J’accepte les/}).check();await page.getByRole('button',{name:'Créer mon compte gratuit',exact:true}).click();
  await page.getByRole('heading',{name:'Vérifiez votre boîte mail',exact:true}).waitFor();assert.equal(signups,1);assert.equal(notifications,1);
  // Existing account: contract acceptance also gates the card checkout without taking payment.
  const {sessionCookie,LEARNER}=require('./fixtures/admin-backend.cjs');
  await context.addCookies([sessionCookie(LEARNER,base)]);
  await context.route(`${supabase}/**`,r=>r.fulfill({json:r.request().url().includes('/rest/')?[]:{id:LEARNER,email:'camille@example.invalid',aud:'authenticated',user_metadata:{},app_metadata:{}}}));
  let checkouts=0;
  await context.route('**/api/paiement/stripe/',r=>{
    if(r.request().method()==='GET')return r.fulfill({json:{enabled:true}});
    checkouts++;assert.equal(r.request().postDataJSON().legalAcceptance.accepted,true);
    return r.fulfill({status:422,json:{error:'Paiement simulé, aucun débit.'}});
  });
  await page.goto(base+'/inscription/?formule=gold');
  await page.getByRole('heading',{name:'Vous êtes connecté : choisissez votre pack',exact:true}).waitFor();
  const pay=page.getByRole('button',{name:'Payer par carte maintenant',exact:true});
  await pay.waitFor();assert.equal(await pay.isDisabled(),true);assert.equal(checkouts,0);
  await page.getByRole('checkbox',{name:/J’accepte les/}).check();await pay.click();
  await page.getByRole('alert').getByText('Paiement simulé, aucun débit.',{exact:true}).waitFor();assert.equal(checkouts,1);
  assert.deepEqual(errors,[]);
  console.log('PASS: opt-in only analytics, explicit refusal, persistence, accessible dialog, withdrawal after script load, sanitized URLs, five legal documents, company identity, responsive layout, signup and checkout acceptance, sitemap.');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
