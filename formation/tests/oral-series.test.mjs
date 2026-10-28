import test from 'node:test';
import assert from 'node:assert/strict';
import { oralInterviews,oralInteractions,oralOpinions } from '../src/content/oral-series.ts';
import { buildOralSeries,oralPhaseAt,ORAL_TOTAL_SECONDS,ORAL_PHASES } from '../src/lib/oral-series.ts';
test('oral bank has distinct complete original scenarios for all three tasks',()=>{
 assert.equal(oralInterviews.length,12);assert.equal(oralInteractions.length,16);assert.equal(oralOpinions.length,16);
 const ids=[...oralInterviews,...oralInteractions,...oralOpinions].map(item=>item.id);assert.equal(new Set(ids).size,ids.length);
 for(const item of oralInterviews){assert.ok(item.questions.length>=4);assert.ok(item.tip.length>30);}
 for(const item of oralInteractions){assert.ok(item.candidate.length>30);assert.ok(item.partner.length>20);assert.ok(item.questions.length>=5);assert.ok(item.partnerFacts.length>=3);}
 for(const item of oralOpinions){assert.equal(item.arguments.length,2);assert.ok(item.counterpoint.length>40);assert.ok(item.example.length>40);}
});
test('all monthly variants are reproducible and distinct, without mutating source data',()=>{
 const original=JSON.stringify([oralInterviews,oralInteractions,oralOpinions]);
 for(const year of [2025,2026,2027])for(let month=1;month<=12;month++){
  const key=`${year}-${String(month).padStart(2,'0')}`,signatures=[];
  for(let variant=1;variant<=3;variant++){
   const series=buildOralSeries(key,variant);assert.deepEqual(series,buildOralSeries(key,variant));
   signatures.push([series.interview.id,series.interaction.id,series.opinion.id].join(':'));
  }
  assert.equal(new Set(signatures).size,3);
 }
 assert.equal(JSON.stringify([oralInterviews,oralInteractions,oralOpinions]),original);
});
test('oral timing is exactly twelve minutes with preparation only for task two',()=>{
 assert.equal(ORAL_TOTAL_SECONDS,720);assert.deepEqual(ORAL_PHASES.map(p=>p.seconds),[120,120,210,270]);
 assert.equal(oralPhaseAt(0).phase.id,'interview');assert.equal(oralPhaseAt(119999).remaining,1);
 assert.equal(oralPhaseAt(120000).phase.id,'preparation');assert.equal(oralPhaseAt(240000).phase.id,'interaction');
 assert.equal(oralPhaseAt(450000).phase.id,'opinion');assert.equal(oralPhaseAt(719999).remaining,1);
 assert.equal(oralPhaseAt(720000).done,true);assert.equal(oralPhaseAt(9999999).remaining,0);
 assert.equal(oralPhaseAt(460000).remaining,260,'background delays must not extend the timer');
});
test('malformed selector values are rejected',()=>{
 for(const [month,v] of [['2026-00',1],['2026-13',1],['2026-1',1],['foo',1],['2026-01',0],['2026-01',4],['2026-01',1.5]])assert.throws(()=>buildOralSeries(month,v));
});
