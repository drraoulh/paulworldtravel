# Paul World Travel Formation

Site de préparation au TCF Canada, prévu sur `formation.paulworldtravel.com`.

## Développement

```bash
cd formation
npm ci
npm run dev
```

Node.js 20 ou supérieur est requis. Cette application est indépendante du site principal : exécuter ses commandes depuis `formation/`.

Pour vérifier la compilation et les types :

```bash
npm run build
npx tsc --noEmit
```

La compilation télécharge la police Archivo via Google Fonts et nécessite l’accès à `fonts.googleapis.com` et `fonts.gstatic.com`.

## État actuel

La vitrine, le mini test de niveau, les comptes candidats, l’espace `/espace/` et l’administration `/admin/` sont implémentés. Les pages `/cours/` (quatre fiches méthode) et `/entrainement/` (six exercices originaux de compréhension écrite, modes guidé et chronométré) sont accessibles gratuitement. Le dernier score est conservé uniquement sur l’appareil, effaçable par le visiteur ; il n’est pas synchronisé avec Supabase. Les cours complets, les modules audio, les tests blancs complets et les corrections par formateur restent à développer ; le plan est dans `../docs/formation-plan.md`.

Sans configuration Supabase, les pages publiques restent consultables, mais les parcours de compte et d’activation ne peuvent pas être validés. Copier `.env.example` vers `.env.local` puis renseigner les paramètres du projet dans ce fichier ignoré par Git. Ne jamais y placer une clé Supabase `service_role` à la place de la clé publique. Les emails nécessitent également la configuration Brevo décrite ci-dessous.

## Contenu à modifier

- `src/content/offers.ts` : formules, prix (`price`), calendrier (`schedule`), contacts, langues à venir
- `src/content/tcf.ts` : épreuves et barème NCLC
- `src/content/levelTest.ts` : questions du test de niveau

## Base de données (Supabase)

1. Supabase > SQL Editor > New query : coller `supabase/schema.sql`, puis Run.
2. Authentication > URL Configuration :
   - Site URL : `https://formation.paulworldtravel.com`
   - Redirect URLs : `https://formation.paulworldtravel.com/**` et `https://*.vercel.app/**`
3. Emails d'authentification : envoyés par le site via Brevo (route `/api/auth-email/`, hook Supabase « Send Email » configuré, secret `SEND_EMAIL_HOOK_SECRET` dans Vercel). Ancienne option SMTP, inutile maintenant : Authentication > Emails > SMTP Settings (pour envoyer les emails de confirmation via Brevo) :
   hôte `smtp-relay.brevo.com`, port `587`, identifiant SMTP et clé SMTP fournis par Brevo (SMTP & API > SMTP),
   expéditeur `infos@paulworldtravel.com`, nom `PAULWORLD TRAVEL`.
4. Créer votre compte sur le site, puis dans le SQL Editor :
   `update public.profiles set role = 'admin' where email = 'votre@email';`
   Rôle `trainer` : voit les inscriptions sans pouvoir les activer.

## Mise en ligne (Vercel)

1. Nouveau projet Vercel depuis ce dépôt, **Root Directory = `formation`**.
2. Variables d'environnement : voir `.env.example` (Brevo + Supabase).
3. Domaines : ajouter `formation.paulworldtravel.com`.
4. Chez LWS (zone DNS de paulworldtravel.com) : enregistrement **CNAME** `formation` → la valeur indiquée par Vercel (en général `cname.vercel-dns.com`).

## Vérifications du code

Avec Node.js 22.18+ (24 recommandé), depuis `formation/` :

```bash
node --experimental-strip-types --test tests/practice.test.mjs
npm run build
```

Les tests couvrent le calcul des résultats, le chronomètre, les dates d’activation et les redirections d’authentification. Les parcours avec Supabase et les emails Brevo nécessitent leurs paramètres réels ; une compilation réussie ne les valide pas.

## Aperçu depuis le site principal

Le site principal expose `/formation/` (présentation et formules) et `/formation/entrainement/` (série gratuite de lecture). Le menu et l’accueil y donnent accès dans le même projet Vercel, sans sous-domaine ni deuxième déploiement. Les exercices partagent le composant de cette application ; les comptes, l’administration et les emails restent dans l’application Formation indépendante.

## Parcours candidat simulé dans le site principal

Le site principal propose maintenant `/formation/connexion/`, `/formation/espace/`, les quatre épreuves, les résultats et une simulation raccourcie. Ce parcours fonctionne sans les services de comptes et d’emails et reste explicitement une démonstration locale. Voir [le guide de la démo](../docs/formation-demo.md) pour les capacités, limites et tests. Les comptes réels de cette application indépendante restent gérés par Supabase.

## Vérification du démarrage candidat

Le script `tests/onboarding.browser.cjs` vérifie l’inscription gratuite et avec pack,
la confirmation du pack choisi, la première leçon après le test, les accès payants
et les images sur ordinateur et mobile. Il nécessite Playwright et Chromium.
Les appels d’authentification et d’email sont simulés : aucun compte n’est créé.

Depuis `formation/`, préparer un build local avec des paramètres fictifs :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://formation-test.invalid NEXT_PUBLIC_SUPABASE_ANON_KEY=formation-local-test-key npm run build
NEXT_PUBLIC_SUPABASE_URL=https://formation-test.invalid NEXT_PUBLIC_SUPABASE_ANON_KEY=formation-local-test-key npm run start -- --port 3010
```

Dans un autre terminal :

```bash
node tests/onboarding.browser.cjs
```

Ces paramètres sont réservés au test local et ne doivent pas être déployés.
Ce test ne vérifie pas la réception réelle des emails, le paiement ni l’activation en production.

## Interface et validation des leçons

L’interface Formation utilise une navigation latérale, une recherche dans les 20
leçons, un catalogue filtrable et un tuteur IA flottant chargé à l’ouverture.
Le tuteur réutilise `/api/ai/tutor/` : connexion, configuration IA et quotas existants
restent nécessaires. Les estimations IA ne constituent pas un score officiel.

Chaque leçon comporte 6 questions (120 au total), dont 3 questions d’application
ajoutées dans `src/content/parcours/extra-questions.ts`. Les quiz de méthode en
compréhension orale utilisent des extraits écrits ; les séries audio servent à
pratiquer l’écoute elle-même.

Une ouverture de leçon enregistre une consultation ; seule une réussite de toutes
les questions valide le quiz. Les anciennes coches restent interprétées comme des
consultations, car elles ne prouvent pas la réussite d’un quiz. Les marqueurs
`read:` et `quiz-v2:` sont conservés dans le format de progression existant et
fusionnés par la synchronisation du compte. La progression et l’attestation restent
des indications de suivi, pas une preuve d’identité, de droit d’accès ou de niveau officiel.

Depuis `formation/` :

```bash
node --experimental-strip-types --test tests/*.test.mjs
node tests/academy.browser.cjs
```

Le test navigateur utilise le même build local avec paramètres fictifs décrit plus
haut. Il couvre recherche, filtres, consultation sans validation, quiz échoué puis
réussi, rechargement, navigation mobile et tuteur flottant (connexion, erreur,
conservation de la question et nouvelle tentative). Les appels IA et le compte sont
simulés ; aucun crédit IA n’est consommé.
