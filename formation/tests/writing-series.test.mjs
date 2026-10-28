import test from 'node:test';
import assert from 'node:assert/strict';
import { writingSeriesBank,WRITING_SERIES_SECONDS,WRITING_SOURCES } from '../src/content/writing-series.ts';
import { buildWritingSeries,countWritingWords,writingLengthState,writingTimeLeft,parseWritingDraft,emptyWritingDraft } from '../src/lib/writing-series.ts';
test('writing bank supplies 12 original tasks per type and two opposing documents for task 3',()=>{
 assert.equal(writingSeriesBank.length,36);assert.equal(new Set(writingSeriesBank.map(t=>t.id)).size,36);assert.equal(new Set(writingSeriesBank.map(t=>t.prompt)).size,36);assert.equal(WRITING_SERIES_SECONDS,3600);
 for(const kind of [1,2,3])assert.equal(writingSeriesBank.filter(t=>t.task===kind).length,12);
 for(const task of writingSeriesBank){assert.equal(task.minWords,task.task===1?60:120);assert.equal(task.maxWords,task.task===1?120:task.task===2?150:180);assert.ok(task.plan.length>=3);for(const id of task.sourceIds)assert.ok(WRITING_SOURCES.some(s=>s.id===id));if(task.task===3){assert.equal(task.documents.length,2);assert.notEqual(task.documents[0],task.documents[1]);assert.ok(task.documents.every(d=>countWritingWords(d)>55));}else assert.equal(task.documents,undefined);}
});
test('monthly combinations reproduce and all three variants use different subjects of each type',()=>{
 const snapshot=JSON.stringify(writingSeriesBank);
 for(const year of [2025,2026,2027])for(let m=1;m<=12;m++){const month=`${year}-${String(m).padStart(2,'0')}`;const series=[1,2,3].map(v=>buildWritingSeries(month,v));for(const tasks of series)assert.deepEqual(tasks.map(t=>t.task),[1,2,3]);for(let task=0;task<3;task++)assert.equal(new Set(series.map(s=>s[task].id)).size,3);assert.deepEqual(buildWritingSeries(month,2),buildWritingSeries(month,2));}
 assert.equal(JSON.stringify(writingSeriesBank),snapshot);
 for(const [m,v] of [['bad',1],['2026-00',1],['2026-13',1],['2026-01',0],['2026-01',4],['2026-01',1.5]])assert.throws(()=>buildWritingSeries(m,v));
});
test('word count keeps apostrophes and hyphens together and excludes standalone punctuation',()=>{
 assert.equal(countWritingWords(''),0);assert.equal(countWritingWords(' Bonjour\nà\t tous ! '),3);assert.equal(countWritingWords("L’été c’est-à-dire aujourd’hui"),3);assert.equal(writingLengthState('un deux',2,3).state,'valid');assert.equal(writingLengthState('un',2,3).state,'short');assert.equal(writingLengthState('un deux trois quatre',2,3).state,'long');
});
test('timer uses absolute deadlines and restored drafts reject malformed state',()=>{
 assert.equal(writingTimeLeft(10000,1),10);assert.equal(writingTimeLeft(10000,10001),0);assert.equal(writingTimeLeft(null,1000),0);assert.deepEqual(parseWritingDraft(JSON.stringify(emptyWritingDraft())),emptyWritingDraft());
 for(const raw of ['bad','null',JSON.stringify({texts:['x'],started:false,timed:false,done:false,deadline:null}),JSON.stringify({...emptyWritingDraft(),timed:true,started:true})])assert.equal(parseWritingDraft(raw),null);
});
