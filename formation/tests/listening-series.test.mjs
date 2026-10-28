import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { listeningBank } from '../src/content/listening.ts';
import { buildListeningSeries, LISTENING_BLUEPRINT, LISTENING_SECONDS, gradeListening } from '../src/lib/listening-series.ts';
const publicRoot=fileURLToPath(new URL('../public/',import.meta.url));
test('CO bank has 51 distinct scripts, four choices and valid explained corrections',()=>{
 assert.equal(listeningBank.length,51);assert.equal(new Set(listeningBank.map(q=>q.id)).size,51);assert.equal(new Set(listeningBank.map(q=>q.transcript)).size,51);
 for(const q of listeningBank){assert.equal(new Set(q.choices).size,4,q.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);assert.ok(q.explanation.length>40,q.id);assert.ok(q.transcript.length>70,q.id);}
});
test('monthly CO combinations are progressive, distinct, deterministic and immutable',()=>{
 assert.equal(LISTENING_SECONDS,2100);const before=JSON.stringify(listeningBank);
 for(const year of [2025,2026,2027])for(let m=1;m<=12;m++)for(let variant=1;variant<=3;variant++){
  const series=buildListeningSeries(`${year}-${String(m).padStart(2,'0')}`,variant);assert.equal(series.length,39);assert.equal(new Set(series.map(q=>q.id)).size,39);assert.deepEqual(series.map(q=>q.level),LISTENING_BLUEPRINT.flatMap(([l,n])=>Array(n).fill(l)));
 }
 assert.equal(JSON.stringify(listeningBank),before);assert.deepEqual(buildListeningSeries('2026-10',1),buildListeningSeries('2026-10',1));assert.notDeepEqual(buildListeningSeries('2026-10',1).map(q=>q.id),buildListeningSeries('2026-10',2).map(q=>q.id));
 for(const [month,v] of [['2026-00',1],['2026-13',1],['2026-01',0],['2026-01',4],['bad',1]])assert.throws(()=>buildListeningSeries(month,v));
});
test('CO scoring handles missing responses without inventing official scores',()=>{
 const series=buildListeningSeries('2026-10',1);assert.deepEqual(gradeListening(series,series.map(q=>q.answer)),{correct:39,answered:39,total:39});assert.deepEqual(gradeListening(series,[]),{correct:0,answered:0,total:39});
});
test('every CO script has a nonempty MP3 matching its manifest and transcript, and every image exists',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(publicRoot,'audio/co/manifest.json'),'utf8'));assert.equal(manifest.clips.length,51);
 for(const q of listeningBank){const audio=fs.readFileSync(path.join(publicRoot,q.audio));const clip=manifest.clips.find(c=>c.id===q.id);assert.ok(audio.length>1000,q.id);assert.ok(clip.durationSeconds>1,q.id);assert.equal(clip.sha256,crypto.createHash('sha256').update(audio).digest('hex'),q.id);assert.equal(clip.transcriptSha256,crypto.createHash('sha256').update(q.transcript).digest('hex'),q.id);if(q.image)assert.ok(fs.statSync(path.join(publicRoot,q.image)).size>1000,q.id);}
});
