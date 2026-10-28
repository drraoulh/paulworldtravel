import test from 'node:test';
import assert from 'node:assert/strict';
import { TCF_SOURCES, parseOfficialPage, officialUrl, validDay, discoverPages, fetchOfficial } from '../src/lib/tcf/feed.ts';
const source=TCF_SOURCES[0], checked='2026-10-28T06:00:00Z';
const event={ '@type':'Event',name:'Session TCF Canada à Douala',startDate:'2026-11-15T08:00:00+01:00',url:'https://www.ifcameroun.com/examens/tcf',location:{name:'IFC Douala',address:{addressCountry:'CM',addressLocality:'Douala'}} };
const page=value=>`<script type="application/ld+json">${JSON.stringify(value)}</script>`;
test('only explicit Cameroon TCF Canada events produce exam dates',()=>{
 const items=parseOfficialPage(page({'@graph':[event]}),source,checked);
 assert.equal(items.length,1);assert.equal(items[0].starts_on,'2026-11-15');assert.equal(items[0].city,'Douala');
 for(const bad of [{...event,name:'Inscription DELF'},{...event,startDate:'2026-02-30'},{...event,location:{address:{addressCountry:'FR',addressLocality:'Douala'}}},{...event,eventStatus:'https://schema.org/EventCancelled'}]) assert.equal(parseOfficialPage(page(bad),source,checked).length,0);
});
test('registration announcements never become exam sessions',()=>{
 const [item]=parseOfficialPage('<article><h2><a href="/tcf">Inscriptions au TCF Canada</a></h2><time datetime="2026-10-20">20 octobre</time><p>Inscriptions le 15 novembre 2026.</p></article>',source,checked);
 assert.equal(item.kind,'news');assert.equal(item.starts_on,null);assert.equal(item.published_on,'2026-10-20');
});
test('external links, challenge pages and malformed dates are rejected',()=>{
 for(const u of ['http://www.ifcameroun.com/x','https://evil.example/tcf','https://www.ifcameroun.com.evil.example/tcf','javascript:alert(1)','https://name@www.ifcameroun.com/x']) assert.equal(officialUrl(u,source.url),null);
 assert.equal(validDay('2026-02-29'),null);assert.equal(validDay('2028-02-29'),'2028-02-29');
 assert.throws(()=>parseOfficialPage('<title>Just a moment...</title>',source,checked));
 assert.deepEqual(parseOfficialPage('<script type="application/ld+json">broken</script>',source,checked),[]);
 assert.deepEqual(discoverPages('<a href="https://evil.example/tcf">TCF</a><a href="/actualites">Actualités</a>',source),['https://www.ifcameroun.com/actualites']);
});
test('fetch forbids redirects to another host and limits payload size',async()=>{
 let calls=0;await assert.rejects(()=>fetchOfficial(source.url,source.url,async()=>{calls++;return new Response(null,{status:302,headers:{location:'https://evil.example/tcf'}});}),/Redirection/);assert.equal(calls,1);
 await assert.rejects(()=>fetchOfficial(source.url,source.url,async()=>new Response('x'.repeat(1500001),{headers:{'content-type':'text/html'}})),/volumineuse/);
 await assert.rejects(()=>fetchOfficial(source.url,source.url,async()=>new Response('blocked',{status:403})),/403/);
});

test('RSS titles and links are read as XML rather than HTML void elements',()=>{
 const [item]=parseOfficialPage('<?xml version="1.0"?><rss><channel><item><title>Nouvelle session TCF Canada</title><link>https://www.ifcameroun.com/tcf-actualite</link><pubDate>2026-10-20</pubDate></item></channel></rss>',source,checked);
 assert.equal(item.source_url,'https://www.ifcameroun.com/tcf-actualite');
 assert.equal(item.kind,'news');assert.equal(item.published_on,'2026-10-20');
});
