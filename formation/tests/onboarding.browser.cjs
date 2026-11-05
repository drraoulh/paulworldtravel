// Run against a local build configured with dummy NEXT_PUBLIC_SUPABASE_* values.
// Auth and emails are mocked: this test creates no accounts and sends no messages.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.FORMATION_BASE_URL || 'http://127.0.0.1:3010';
const supabaseUrl = process.env.FORMATION_SUPABASE_URL || 'https://formation-test.invalid';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    // Pin the pricing region: production derives it from Vercel geolocation.
    const context = await browser.newContext({ extraHTTPHeaders: { 'x-vercel-ip-country': 'CM' } });
    const errors = [];
    const page = await context.newPage();
    page.on('pageerror', (error) => (errors.push(error.message), console.log('BROWSER ERROR', error.message)));
    await context.route(`${supabaseUrl}/**`, async (route) => {
      const url = route.request().url();
      if (url.includes('/signup')) return route.fulfill({ json: { user: { id: 'test-user', email: 'candidate@example.com', identities: [{ id: 'test-identity' }] }, session: null } });
      return route.fulfill({ json: url.includes('/rest/v1/') ? [] : {} });
    });
    let payload;
    await context.route('**/api/inscription/', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    for (const pack of ['', 'gold']) {
      await page.goto(`${base}/inscription/${pack ? '?formule=' + pack : ''}`);
      await page.locator('input[name=firstName]').fill('Camille');
      await page.locator('input[name=email]').fill('candidate@example.com');
      await page.locator('input[name=password]').fill('Test-password-123');
      await page.locator('input[name=password2]').fill('Test-password-123');
      assert.equal(await page.locator('input[name=phone]').getAttribute('required'), null);
      assert.equal(await page.locator('details').getAttribute('open') !== null, Boolean(pack));
      await page.getByRole('button', { name: pack ? 'Créer mon compte et demander ce pack' : 'Créer mon compte gratuit', exact: true }).click();
      await page.getByRole('heading', { name: 'Vérifiez votre boîte mail' }).waitFor();
      assert.equal(payload.formule, pack);
      assert.equal('password' in payload, false);
      assert.equal('password2' in payload, false);
      const result = await page.locator('main').innerText();
      assert.match(result, /candidate@example.com/);
      if (pack) assert.match(result, /Pack Gold · 75 000 FCFA/);
      else {
        assert.match(result, /Votre compte gratuit vous donne accès/);
        assert.match(result, /sans accès à l’IA/);
        assert.doesNotMatch(result, /essai des corrections/);
      }
    }
    await page.goto(`${base}/test-de-niveau/`);
    for (let i = 0; i < 15; i++) {
      await page.locator('input[type=radio]').first().check();
      await page.getByRole('button', { name: 'Valider ma réponse' }).click();
      await page.getByRole('button', { name: i === 14 ? 'Voir mon résultat' : 'Question suivante' }).click();
    }
    const lesson = page.getByRole('link', { name: 'Commencer ma première leçon gratuite' });
    const lessonHref = await lesson.getAttribute('href');
    await lesson.click();
    await page.waitForURL(`${base}${lessonHref}`);
    assert.ok(await page.locator('main h1').innerText());
    for (const width of [1365, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/packs/', '/guide/', '/parcours/', '/inscription/', '/connexion/', '/partager-mes-sujets/', '/examen-blanc/', '/epreuve/comprehension-ecrite/series/']) {
        console.log(`Checking ${path} at ${width}px`);
        const response = await page.goto(base + path);
        assert.equal(response.status(), 200, path);
        await page.locator('main img').first().waitFor({ state: 'visible' });
        await page.locator('main img').first().evaluate((img) => img.decode());
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow: ${path}, ${width}`);
      }
    }
    await page.getByText('Débloquer avec un pack', { exact: true }).first().click();
    await page.getByRole('heading', { name: /fait partie des packs/ }).waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: free and paid signup, preserved pack confirmation, no passwords in notification, test → lesson, images/mobile layout, paid gate, no browser exceptions.');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
