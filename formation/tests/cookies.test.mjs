import test from 'node:test';
import assert from 'node:assert/strict';
import { parseConsent, CONSENT_VERSION, CONSENT_MAX_AGE, publicAnalyticsUrl } from '../src/lib/cookie-consent.ts';

test('only an explicit, current and unexpired cookie choice is valid', () => {
  const now=Date.now();
  for(const analytics of [true,false]) {
    const value={version:CONSENT_VERSION,analytics,updatedAt:now};
    assert.deepEqual(parseConsent(encodeURIComponent(JSON.stringify(value)),now),value);
  }
  for(const value of [undefined,'garbage','%broken',JSON.stringify({version:0,analytics:true,updatedAt:now}),JSON.stringify({version:CONSENT_VERSION,analytics:'true',updatedAt:now}),JSON.stringify({version:CONSENT_VERSION,analytics:true,updatedAt:now+1}),JSON.stringify({version:CONSENT_VERSION,analytics:true,updatedAt:now-CONSENT_MAX_AGE*1000})]) assert.equal(parseConsent(value,now),null);
});
test('statistics drop query strings and fragments and exclude private screens', () => {
  assert.equal(publicAnalyticsUrl('https://formation.paulworldtravel.com/packs/?email=private@example.com#name'),'https://formation.paulworldtravel.com/packs/');
  for(const path of ['/admin/','/auth/confirm/','/inscription/','/connexion/','/espace/','/api/access/','/paiement/','/entrainement/tuteur/','/examen-blanc/','/epreuve/expression-orale/simulateur/','/epreuve/comprehension-orale/tableau-de-bord/']) assert.equal(publicAnalyticsUrl('https://formation.paulworldtravel.com'+path),null,path);
  assert.equal(publicAnalyticsUrl('invalid'),null);
});
