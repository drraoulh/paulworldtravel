/* Optional browser checks: run against a started production server. See docs/formation-demo.md. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const base = process.env.FORMATION_BASE_URL || "http://127.0.0.1:3002";
const key = "pwt-formation-demo-v1";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    args: [
      "--no-sandbox",
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
    ],
  });
  try {
    const context = await browser.newContext({ acceptDownloads: true });
    await context.grantPermissions(["microphone"], { origin: base });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("dialog", (d) => d.accept());
    await page.addInitScript(() => {
      if ("speechSynthesis" in window) {
        window.__speechCount = 0;
        speechSynthesis.speak = (utterance) => {
          window.__speechCount++;
          utterance.onstart?.(new Event("start"));
          utterance.onend?.(new Event("end"));
        };
      }
    });
    await page.goto(`${base}/formation/resultats/`);
    await page.waitForURL("**/formation/connexion/**");
    await page.getByLabel("Votre prénom ou pseudo").fill("Camille");
    await page.getByRole("button", { name: "Entrer dans mon espace" }).click();
    await page.waitForURL("**/formation/resultats/");
    await page
      .getByRole("heading", { name: "Votre première séance vous attend." })
      .waitFor();
    console.log("Simulated login and protected destination OK");

    async function open(slug) {
      await page.goto(`${base}/formation/epreuves/${slug}/`);
      await page.getByRole("button", { name: "Commencer la séance" }).click();
    }
    await open("comprehension-ecrite");
    assert.equal(
      await page
        .getByRole("button", { name: "Corriger ma réponse" })
        .isDisabled(),
      true,
    );
    for (const [i, answer] of [0, 2, 3, 1, 0, 2].entries()) {
      await page.getByRole("radio").nth(answer).check();
      await page.getByRole("button", { name: "Corriger ma réponse" }).click();
      await page.getByRole("status").waitFor();
      await page
        .getByRole("button", {
          name: i === 5 ? "Terminer et voir mon bilan" : "Question suivante",
        })
        .click();
    }
    await page.getByText("6/6 bonnes réponses", { exact: true }).waitFor();
    assert.equal(
      await page.evaluate(
        (k) => JSON.parse(localStorage.getItem(k)).results.length,
        key,
      ),
      1,
    );
    console.log(
      "CE: all questions, corrections, perfect score, single saved result OK",
    );

    await open("comprehension-orale");
    for (const [i, answer] of [2, 0, 1, 3].entries()) {
      await page
        .getByRole("button", { name: "Écouter le document", exact: true })
        .click();
      await page
        .getByText("Afficher la transcription (aide)", { exact: true })
        .click();
      await page.getByRole("radio").nth(answer).check();
      await page.getByRole("button", { name: "Corriger ma réponse" }).click();
      await page
        .getByRole("button", {
          name: i === 3 ? "Terminer et voir mon bilan" : "Question suivante",
        })
        .click();
    }
    await page.getByText("4/4 bonnes réponses", { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.__speechCount), 4);
    console.log(
      "CO: playback integration (mock speech), transcription, corrections and score OK",
    );

    await open("expression-ecrite");
    for (let i = 0; i < 3; i++) {
      await page
        .getByLabel("Votre production écrite")
        .fill("Bonjour ".repeat(i === 0 ? 65 : 125).trim());
      await page
        .getByRole("button", {
          name: i === 2 ? "Terminer et voir mon bilan" : "Tâche suivante",
        })
        .click();
    }
    await page.getByText("3/3 tâches pratiquées", { exact: true }).waitFor();
    const textDownload = page.waitForEvent("download");
    await page.getByRole("button", { name: "Télécharger mes textes" }).click();
    assert.match(
      await fs.readFile(await (await textDownload).path(), "utf8"),
      /Bonjour/,
    );
    await page.getByRole("checkbox").first().check();
    assert.equal(await page.getByRole("checkbox").first().isChecked(), true);
    console.log(
      "EE: three drafts, word counts, text download and self-review OK",
    );

    await open("expression-orale");
    await page.getByRole("button", { name: "Démarrer le micro" }).click();
    await page
      .getByRole("button", { name: "Arrêter l’enregistrement" })
      .waitFor();
    assert.equal(
      await page.getByRole("button", { name: "Tâche suivante" }).isDisabled(),
      true,
    );
    await page.waitForTimeout(1100);
    await page
      .getByRole("button", { name: "Arrêter l’enregistrement" })
      .click();
    await page.getByRole("link", { name: "Télécharger mon audio" }).waitFor();
    const audioDownload = page.waitForEvent("download");
    await page.getByRole("link", { name: "Télécharger mon audio" }).click();
    assert.ok((await fs.stat(await (await audioDownload).path())).size > 0);
    await page.getByRole("button", { name: "Tâche suivante" }).click();
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Tâche suivante" }).click();
    await page.getByRole("checkbox").check();
    await page
      .getByRole("button", { name: "Terminer et voir mon bilan" })
      .click();
    await page.getByText("3/3 tâches pratiquées", { exact: true }).waitFor();
    await page.getByRole("link", { name: "Télécharger mon audio" }).waitFor();
    console.log(
      "EO: actual MediaRecorder with fake microphone, download, no-mic alternatives OK",
    );

    await page.goto(`${base}/formation/espace/`);
    await page.getByText("4/4", { exact: true }).waitFor();
    await page.reload();
    await page.getByText("4/4", { exact: true }).waitFor();
    await page.goto(`${base}/formation/resultats/`);
    await page.getByRole("heading", { name: "Vos dernières séances" }).waitFor();
    assert.equal(await page.locator("ol > li").count(), 4);
    await page.goto(
      `${base}/formation/epreuves/comprehension-orale/?mode=simulation`,
    );
    await page.clock.install();
    await page.getByRole("button", { name: "Commencer la séance" }).click();
    await page.getByRole("radio").nth(2).check();
    await page.getByRole("button", { name: "Question suivante" }).click();
    await page.getByRole("button", { name: "Précédente" }).click();
    assert.equal(await page.getByRole("radio").nth(2).isChecked(), true);
    await page.clock.fastForward(301000);
    await page.getByText("1/4 bonnes réponses", { exact: true }).waitFor();
    assert.match(
      await page
        .getByRole("link", { name: /Étape suivante/ })
        .getAttribute("href"),
      /comprehension-ecrite.*mode=simulation/,
    );
    console.log(
      "Progress persistence, result history, timed expiry and next simulation stage OK",
    );

    await page.clock.resume();
    await page.goto(
      `${base}/formation/epreuves/expression-orale/?mode=simulation`,
    );
    await page.getByRole("button", { name: "Commencer la séance" }).click();
    await page.getByRole("button", { name: "Démarrer le micro" }).click();
    await page
      .getByRole("button", { name: "Arrêter l’enregistrement" })
      .waitFor();
    await page.waitForTimeout(500);
    await page.clock.fastForward(361000);
    await page.getByText("1/3 tâches pratiquées", { exact: true }).waitFor();
    await page.getByRole("link", { name: "Télécharger mon audio" }).waitFor();
    console.log(
      "Timeout safely stops active recording and retains the audio OK",
    );
    await page.clock.resume();

    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      for (const path of [
        "",
        "connexion/",
        "espace/",
        "epreuves/",
        "resultats/",
        "simulation/",
      ]) {
        await page.goto(`${base}/formation/${path}`, {
          waitUntil: "networkidle",
        });
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          `${width} ${path}`,
        );
      }
    }
    await page.goto(`${base}/formation/espace/`);
    await page
      .getByRole("button", { name: "Déconnexion", exact: true })
      .click();
    await page.waitForURL("**/formation/");
    await page.goto(`${base}/formation/espace/`);
    await page.waitForURL("**/formation/connexion/**");
    await page.getByLabel("Votre prénom ou pseudo").fill("Camille");
    await page.getByRole("button", { name: "Entrer dans mon espace" }).click();
    await page.waitForURL("**/formation/espace/");
    await page.getByRole("button", { name: "Effacer ma démo" }).click();
    await page.waitForURL("**/formation/connexion/");
    assert.equal(
      await page.evaluate(
        (k) => JSON.parse(localStorage.getItem(k)).results.length,
        key,
      ),
      0,
    );
    console.log("Responsive layouts, logout, demo reset OK");

    const denied = await browser.newContext();
    const deniedPage = await denied.newPage();
    deniedPage.on("dialog", (d) => d.accept());
    await deniedPage.addInitScript((k) => {
      localStorage.setItem(
        k,
        JSON.stringify({
          profile: { name: "Démo", goal: "NCLC 7" },
          results: [],
        }),
      );
      navigator.mediaDevices.getUserMedia = () =>
        Promise.reject(new DOMException("Denied", "NotAllowedError"));
    }, key);
    await deniedPage.goto(`${base}/formation/epreuves/expression-orale/`);
    await deniedPage
      .getByRole("button", { name: "Commencer la séance" })
      .click();
    await deniedPage.getByRole("button", { name: "Démarrer le micro" }).click();
    await deniedPage
      .getByText(/Le microphone n’a pas pu être ouvert/)
      .waitFor();
    assert.equal(
      await deniedPage
        .getByRole("button", { name: "Tâche suivante" })
        .isEnabled(),
      true,
    );
    const blocked = await browser.newContext();
    const blockedPage = await blocked.newPage();
    await blockedPage.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error("Unavailable");
      };
      Storage.prototype.setItem = () => {
        throw new Error("Unavailable");
      };
    });
    await blockedPage.goto(`${base}/formation/connexion/`);
    await blockedPage.getByLabel("Votre prénom ou pseudo").fill("Invité");
    await blockedPage
      .getByRole("button", { name: "Entrer dans mon espace" })
      .click();
    await blockedPage.waitForURL("**/formation/espace/");
    await blockedPage.getByText(/Le stockage est indisponible/).waitFor();
    console.log("Microphone denial and unavailable storage fallbacks OK");
    assert.deepEqual(errors, []);
    await context.close();
    await denied.close();
    await blocked.close();
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
