// Uses the dummy local Supabase configuration documented in README.md. No live accounts or AI calls.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.FORMATION_BASE_URL || 'http://127.0.0.1:3010';
const supabaseUrl = process.env.FORMATION_SUPABASE_URL || 'https://formation-test.invalid';
const lesson = '/epreuve/comprehension-orale/methodologie/ecoute-unique/';
const id = 'co/ecoute-unique';
const answers = ['Une fois', 'Noter mentalement chaque heure entendue et à quoi elle correspond', 'S’appuyer sur le sens général et éliminer les propositions impossibles', 'Se reconcentrer sur le nouvel enregistrement', 'Celle qui répond précisément à la question', 'Chercher le détail du document qui confirme l’une et contredit l’autre'];
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext();
    await context.route(`${supabaseUrl}/**`, (r) => r.fulfill({ json: r.request().url().includes('/rest/') ? [] : {} }));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base);
    await page.getByRole('button', { name: 'S’exprimer', exact: true }).click();
    assert.equal(await page.locator('article').count(), 2);
    await page.getByRole('button', { name: 'Toutes les compétences', exact: true }).click();
    assert.equal(await page.locator('article').count(), 4);
    await page.getByRole('button', { name: 'Rechercher un cours' }).click();
    await page.getByRole('searchbox').fill('écoute');
    await page.getByRole('dialog').getByRole('link', { name: /Réussir avec une seule écoute/ }).click();
    await page.waitForURL(base + lesson);
    // Visiting and moving to the next item cannot validate a lesson.
    let stored = await page.evaluate(() => JSON.parse(localStorage.getItem('pwt-parcours-done') || '[]'));
    assert.ok(stored.includes(`read:${id}`));
    assert.ok(!stored.includes(`quiz-v2:${id}`));
    await page.getByRole('link', { name: /^Suivant :/ }).click();
    await page.waitForURL(/messages-du-quotidien/);
    stored = await page.evaluate(() => JSON.parse(localStorage.getItem('pwt-parcours-done') || '[]'));
    assert.ok(!stored.includes(`quiz-v2:${id}`));
    // A failed quiz stays unvalidated and exposes corrections. A retry can pass.
    await page.goto(base + lesson);
    const quiz = page.locator('#quiz');
    assert.equal(await quiz.locator('fieldset').count(), 6);
    assert.equal(await quiz.getByRole('button', { name: 'Vérifier mes réponses' }).isDisabled(), true);
    for (let n = 0; n < 6; n++) {
      const field = quiz.locator('fieldset').nth(n);
      if (n === 0) await field.getByLabel('Deux fois', { exact: true }).check();
      else await field.getByLabel(answers[n], { exact: true }).check();
    }
    await quiz.getByRole('button', { name: 'Vérifier mes réponses' }).click();
    await quiz.getByText('5 / 6', { exact: true }).waitFor();
    stored = await page.evaluate(() => JSON.parse(localStorage.getItem('pwt-parcours-done') || '[]'));
    assert.ok(!stored.includes(`quiz-v2:${id}`));
    await quiz.getByRole('button', { name: 'Recommencer' }).click();
    for (let n = 0; n < 6; n++) await quiz.locator('fieldset').nth(n).getByLabel(answers[n], { exact: true }).check();
    await quiz.getByRole('button', { name: 'Vérifier mes réponses' }).click();
    await quiz.getByText('Quiz réussi : compétences validées.', { exact: true }).waitFor();
    stored = await page.evaluate(() => JSON.parse(localStorage.getItem('pwt-parcours-done') || '[]'));
    assert.ok(stored.includes(`quiz-v2:${id}`));
    await page.reload();
    await page.getByText('✓ Quiz réussi', { exact: true }).last().waitFor();
    await page.getByRole('link', { name: /^Suivant :/ }).click();
    await page.waitForURL(/messages-du-quotidien/);
    assert.equal(await page.locator('#quiz input:checked').count(), 0, 'next lesson starts with a fresh quiz');
    assert.equal(await page.locator('#quiz input:disabled').count(), 0);
    // Nonmodal assistant opens, offers the signed-out route and closes with Escape.
    await page.getByRole('button', { name: 'Ouvrir le tuteur IA' }).click();
    await page.getByRole('dialog', { name: 'Votre tuteur IA' }).getByRole('heading', { name: 'Un tuteur pour vous accompagner' }).waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog', { name: 'Votre tuteur IA' }).isVisible(), false);
    for (const width of [1365, 1024, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/parcours/', lesson, '/packs/', '/guide/', '/inscription/', '/epreuve/expression-ecrite/simulateur/']) {
        console.log(`Checking academy ${path} at ${width}px`);
        assert.equal((await page.goto(base + path)).status(), 200);
        await page.locator('main h1').waitFor();
        await page.evaluate(async () => { await document.fonts.ready; await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); });
        const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, outside: [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).map((e) => e.outerHTML.slice(0, 200)).slice(0, 5) }));
        assert.equal(layout.scroll <= layout.width, true, `overflow ${path} ${width}: ${JSON.stringify(layout)}`);
      }
    }
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
    await page.getByRole('dialog', { name: 'Votre formation' }).getByRole('link', { name: 'Mon parcours', exact: true }).click();
    await page.waitForURL(base + '/parcours/');
    assert.equal(await page.getByRole('dialog', { name: 'Votre formation' }).isVisible(), false);
    await page.getByRole('button', { name: 'Terminés', exact: true }).click();
    await page.getByText('Aucun module entièrement terminé.', { exact: false }).waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: catalog/search, reading vs quiz, failed quiz/retry/success/reload, floating tutor signed out/Escape, mobile menu, module filter, three viewport sizes.');
    await context.close();
    // Signed-in tutor uses the existing API, preserves failed questions, and renders a retry.
    const signed = await browser.newContext();
    const user = { id: '00000000-0000-4000-8000-000000000001', aud: 'authenticated', email: 'test@example.com', user_metadata: {}, app_metadata: {}, identities: [], created_at: new Date().toISOString() };
    const encode = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
    const token = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: user.id, exp: Math.floor(Date.now()/1000)+3600, aud: 'authenticated' })}.test-signature`;
    const session = { access_token: token, refresh_token: 'test-refresh', expires_in: 3600, expires_at: Math.floor(Date.now()/1000)+3600, token_type: 'bearer', user };
    await signed.addCookies([{ name: `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`, value: 'base64-' + encode(session), url: base, sameSite: 'Lax' }]);
    await signed.route(`${supabaseUrl}/**`, (r) => r.fulfill({ json: r.request().url().includes('/rest/') ? [] : user }));
    await signed.route('**/api/access/', (r) => r.fulfill({ json: { signedIn: true, plan: 'active', pack: 'essentiel', aiAllowed: true, remaining: { tutor: 5, writing: 1, speaking: 1 } } }));
    let attempts = 0;
    await signed.route('**/api/ai/tutor/', (r) => {
      attempts++;
      const body = r.request().postDataJSON();
      assert.equal(body.messages.length, 1, 'retry does not duplicate a failed question');
      return attempts === 1 ? r.fulfill({ status: 503, json: { error: 'Service temporairement indisponible.' } }) : r.fulfill({ json: { reply: 'Présentez votre idée, expliquez-la, puis donnez un exemple.', remaining: 4, plan: 'active' } });
    });
    const tutorPage = await signed.newPage();
    const tutorErrors = [];
    tutorPage.on('pageerror', (e) => tutorErrors.push(e.message));
    await tutorPage.goto(base + '/parcours/');
    await tutorPage.getByRole('button', { name: 'Ouvrir le tuteur IA' }).click();
    const panel = tutorPage.getByRole('dialog', { name: 'Votre tuteur IA' });
    await panel.getByRole('textbox', { name: 'Votre question' }).fill('Comment développer un argument ?');
    await panel.getByRole('button', { name: 'Envoyer', exact: true }).click();
    await panel.getByRole('alert').waitFor();
    assert.equal(await panel.getByRole('textbox', { name: 'Votre question' }).inputValue(), 'Comment développer un argument ?');
    await panel.getByRole('button', { name: 'Envoyer', exact: true }).click();
    await panel.getByText('Présentez votre idée, expliquez-la, puis donnez un exemple.', { exact: true }).waitFor();
    assert.equal(attempts, 2);
    assert.deepEqual(tutorErrors, []);
    console.log('PASS: authenticated tutor request, error display, question retained, retry without duplication, AI reply (mocked).');
    // Free accounts cannot see or submit the AI forms, including the floating assistant.
    await signed.route('**/api/access/', (r) => r.fulfill({ json: { signedIn: true, plan: 'trial', aiAllowed: false, remaining: { tutor: 0, writing: 0, speaking: 0 } } }));
    await tutorPage.goto(base + '/parcours/');
    await tutorPage.getByRole('button', { name: 'Ouvrir le tuteur IA' }).click();
    await tutorPage.getByRole('dialog', { name: 'Votre tuteur IA' }).getByRole('heading', { name: 'Un pack actif est nécessaire pour l’IA' }).waitFor();
    assert.equal(await tutorPage.getByRole('textbox', { name: 'Votre question' }).count(), 0);
    for (const path of ['/entrainement/tuteur/', '/epreuve/expression-ecrite/simulateur/', '/epreuve/expression-orale/simulateur/']) {
      await tutorPage.goto(base + path);
      await tutorPage.getByRole('heading', { name: 'Un pack actif est nécessaire pour l’IA' }).waitFor();
      assert.equal(await tutorPage.locator('main textarea').count(), 0);
      assert.equal(await tutorPage.getByRole('textbox', { name: 'Votre question' }).count(), 0);
    }
    assert.equal(attempts, 2, 'free account never sends an AI request');
    console.log('PASS: free account blocked in floating tutor, tutor page and both simulators; no AI request sent.');
    await signed.close();
  } finally { await browser.close(); }
})().catch((e) => { console.error(e); process.exitCode = 1; });
