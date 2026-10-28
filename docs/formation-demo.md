# Parcours candidat de démonstration

Accessible depuis le site principal, sans deuxième projet Vercel : `/formation/`.

## Parcours

1. `/formation/connexion/` : prénom ou pseudonyme et objectif personnel. Connexion explicitement simulée, sans mot de passe, paiement ni appel à Supabase.
2. `/formation/espace/` : prochaines étapes, épreuves découvertes, nombre de séances et temps de pratique.
3. `/formation/epreuves/` : catalogue des quatre compétences.
4. `/formation/epreuves/[epreuve]/` : consignes, séance, bilan et suite du parcours.
5. `/formation/resultats/` : historique local et derniers bilans par compétence.
6. `/formation/simulation/` : enchaînement raccourci CO → CE → EE → EO, chronométré séparément (5 + 8 + 12 + 6 minutes). Le bilan de chaque étape reste consultable avant de démarrer la suivante. Ce n’est pas un examen blanc au format officiel.

Le parcours gratuit historique `/formation/entrainement/` reste accessible sans pseudo.

## Contenus et outils

- CO : quatre documents originaux, lus par la synthèse vocale du navigateur, QCM et correction. Une transcription sert de solution de repli et d’aide. La qualité et la disponibilité de la voix dépendent du navigateur et du système.
- CE : six textes originaux A2–B2, réponses et explications.
- EE : trois tâches, textes conservés pendant la séance, compteurs et consignes de longueur, exemples ou plans de réponse, export texte, grille d’auto-évaluation. Aucun texte n’est noté par IA.
- EO : trois tâches autonomes, micro facultatif, arrêt automatique à la durée de la tâche, réécoute et téléchargement. Pas d’interlocuteur automatique. Alternative déclarative de pratique sans micro. Le HTTPS et l’autorisation du micro sont nécessaires hors localhost.

Le bilan distingue les bonnes réponses aux QCM des tâches d’expression pratiquées. Aucune conversion en score officiel TCF, note sur 20 ou niveau NCLC n’est appliquée.

## Données

La clé locale `pwt-formation-demo-v1` conserve un pseudo, un objectif personnel et jusqu’à 50 bilans. Les données malformées sont ignorées. Aucun secret ni mot de passe n’est utilisé. Ce mécanisme ne constitue pas une authentification ou une protection de contenu payant.

Les textes et fichiers audio restent en mémoire dans l’onglet. Ils ne sont pas envoyés au serveur ni conservés après navigation ou rechargement. Les exports sont disponibles dans le bilan de la séance ; le carnet de résultats conserve uniquement les statistiques. La déconnexion conserve les bilans sur cet appareil. Le bouton « Effacer ma démo » supprime le pseudo et les bilans. Si le stockage est indisponible, un message indique que la démo reste temporaire.

Les comptes Supabase et l’administration de l’application indépendante `formation/` restent séparés de ce parcours. Aucune simulation ne doit être utilisée comme preuve d’identité, de paiement ou de niveau.

## Vérifications

Avec Node.js 22.18+ (24 recommandé), depuis la racine du dépôt :

```bash
node --experimental-strip-types --test tests/formation-demo.test.mjs formation/tests/practice.test.mjs
npm run build
npm run start -- --port 3002
```

Dans un autre terminal, avec Playwright et Chromium disponibles :

```bash
CHROMIUM_PATH=/usr/bin/chromium node tests/formation-demo.browser.cjs
```

`CHROMIUM_PATH` est facultatif si le navigateur Playwright est installé. `FORMATION_BASE_URL` permet de changer la cible du serveur (par défaut `http://127.0.0.1:3002`). Le script utilise un microphone synthétique et simule uniquement la synthèse vocale pour vérifier son intégration sans dépendre d’un moteur vocal du système. Il couvre l’entrée dans la démo, les quatre types d’exercice, les téléchargements, la progression, l’expiration du chronomètre, la navigation mobile, la déconnexion, l’effacement, le refus du micro et l’indisponibilité du stockage.

## Suite vers la production

Brancher l’identité, les droits d’accès et l’historique sur Supabase ; ajouter une vraie banque d’audios validés, des séries complètes et la correction par les formateurs. L’évaluation IA, si ajoutée, doit rester distincte d’une correction humaine et nécessite son propre service. Aucun de ces services n’est simulé comme opérationnel ici.
