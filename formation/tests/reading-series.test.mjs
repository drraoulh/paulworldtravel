import test from 'node:test';
import assert from 'node:assert/strict';
import { readingBank, buildReadingSeries, READING_BLUEPRINT, FULL_READING_SECONDS } from '../src/lib/reading-series.ts';
test('72 original documents have unique ids, distinct choices and valid corrections', () => {
 assert.equal(readingBank.length,72);
 assert.equal(new Set(readingBank.map(q=>q.id)).size,72);
 assert.equal(new Set(readingBank.map(q=>q.text)).size,72);
 for(const q of readingBank) { assert.equal(new Set(q.choices).size,4,q.id); assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id); assert.ok(q.explanation.length>40,q.id); }
});
test('108 monthly combinations each have 39 distinct questions in progressive order with intact corrections', () => {
 assert.equal(FULL_READING_SECONDS,3600);const original=JSON.stringify(readingBank);
 for(const year of [2025,2026,2027]) for(let month=1;month<=12;month++) for(let v=1;v<=3;v++) {
  const series=buildReadingSeries(`${year}-${String(month).padStart(2,'0')}`,v);
  assert.equal(series.length,39);assert.equal(new Set(series.map(q=>q.id)).size,39);
  assert.deepEqual(series.map(q=>q.level),READING_BLUEPRINT.flatMap(([l,n])=>Array(n).fill(l)));
  for(const q of series) {const source=readingBank.find(s=>s.id===q.id);assert.equal(q.choices[q.answer],source.choices[source.answer],q.id);}
 }
 assert.equal(JSON.stringify(readingBank),original);
});
test('combinations reproduce, vary and reject invalid selection',()=>{
 assert.deepEqual(buildReadingSeries('2026-10',1),buildReadingSeries('2026-10',1));
 for(const [month,v] of [['2026-10',2],['2026-11',1]]) assert.notDeepEqual(buildReadingSeries('2026-10',1).map(q=>q.id),buildReadingSeries(month,v).map(q=>q.id));
 for(const [m,v] of [['2026-00',1],['2026-13',1],['bad',1],['2026-01',0],['2026-01',4],['2026-01',1.5]]) assert.throws(()=>buildReadingSeries(m,v));
});
test('every level has 12 documents and visual tables are accessible structured content',()=>{
 for(const [level] of READING_BLUEPRINT) assert.equal(readingBank.filter(q=>q.level===level).length,12,level);
 const tables=readingBank.filter(q=>q.document);
 assert.ok(tables.length>=5);
 for(const q of tables) {assert.equal(q.document.kind,'table');assert.ok(q.document.caption);assert.ok(q.document.headers.length>=2);for(const row of q.document.rows)assert.equal(row.length,q.document.headers.length);}
});
