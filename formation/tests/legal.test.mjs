import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
const require=createRequire(import.meta.url),ts=require('typescript');
const root=resolve(import.meta.dirname,'../src');
function loadServer() {
  const cache=new Map();
  const blocked=()=>{throw new Error('No provider or account call is allowed in this test');};
  const mocks={
    '@/lib/supabase/server':{createClient:blocked},
    '@/lib/supabase/admin':{createAdminClient:()=>({})},
    '@/lib/supabase/config':{supabaseConfigured:true},
    '@/lib/stripe':{stripeConfigured:()=>true,cardPaymentFor:()=>true,createCheckout:blocked},
    '@/lib/zone':{visitorZone:blocked},
  };
  const load=(name,parent=root)=>{
    if(Object.hasOwn(mocks,name))return mocks[name];
    if(!name.startsWith('@/')&&!name.startsWith('.'))return require(name);
    let file=name.startsWith('@/')?resolve(root,name.slice(2)):resolve(parent,name);if(!file.endsWith('.ts'))file+='.ts';
    if(cache.has(file))return cache.get(file).exports;
    const module={exports:{}};cache.set(file,module);
    const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
    new Function('require','module','exports',code)(id=>load(id,dirname(file)),module,module.exports);return module.exports;
  };return load;
}
const request=(body)=>new Request('http://localhost/api/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
test('registration notifications and checkout refuse missing, false or stale terms before external calls',async()=>{
  const load=loadServer();
  const signup=load('@/app/api/inscription/route');
  const checkout=load('@/app/api/paiement/stripe/route');
  const action=load('@/app/inscription/actions');
  for(const legalAcceptance of [undefined,{accepted:false,version:'2026-11-05'},{accepted:true,version:'2025-01-01'},{accepted:'true',version:'2026-11-05'}]){
    assert.equal((await signup.POST(request({firstName:'Camille',email:'camille@example.invalid',legalAcceptance}))).status,422);
    assert.equal((await checkout.POST(request({pack:'gold',legalAcceptance}))).status,422);
    assert.equal((await action.requestPack('gold',legalAcceptance)).ok,false);
  }
  assert.equal(load('@/lib/legal-acceptance').hasAcceptedTerms({accepted:true,version:'2026-11-05'}),true);
});
