import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson, lessonKeyValid } from '../src/lib/admin/lesson-validation.ts';
const lesson=()=>({slug:'une-lecon',title:'Une leçon',goal:'Comprendre une consigne.',minutes:10,sections:[{heading:'La méthode',paragraphs:['Un paragraphe utile.']}],quiz:[{prompt:'Quelle stratégie ?',choices:['Lire','Ignorer','Quitter','Deviner'],answer:0,explanation:'Il faut lire la consigne.'}]});
test('complete lesson can be published; incomplete sections and ambiguous answers cannot',()=>{
  assert.ok(validateLesson(lesson()).lesson);
  const a=lesson();a.sections[0].paragraphs=[];assert.ok(validateLesson(a).error);
  const b=lesson();b.quiz[0].choices[1]='Lire';assert.ok(validateLesson(b).error);
  const c=lesson();c.quiz[0].answer=4;assert.ok(validateLesson(c).error);
  const d=lesson();d.quiz[0].explanation='';assert.ok(validateLesson(d).error);
});
test('lesson keys cannot collide with simulations or traverse routes',()=>{
  assert.equal(lessonKeyValid('co/une-lecon'),true);
  for(const id of ['co/simulation-1','admin/example','co/../admin','co/Uppercase','co/a?x=y'])assert.equal(lessonKeyValid(id),false,id);
});
test('lesson limits and local practice links are checked',()=>{
  const a=lesson();a.minutes=0;assert.ok(validateLesson(a).error);
  const b=lesson();b.practice={href:'javascript:alert(1)',label:'Exercice'};assert.ok(validateLesson(b).error);
  const c=lesson();c.quiz=[];assert.ok(validateLesson(c).error);
  const d=lesson();d.practice={href:'/epreuve/expression-ecrite/simulateur/',label:'Essayer'};assert.ok(validateLesson(d).lesson);
});
