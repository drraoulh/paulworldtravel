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

## Administration distincte de l’espace apprenant

`/admin/` dispose de son propre agencement, menu, tableau de bord et navigation
mobile. Les comptes `admin` et `trainer` y accèdent ; un candidat est redirigé vers
son espace. Après une connexion sans destination explicite, le rôle enregistré
dans `profiles` détermine l’espace d’arrivée. Chaque écriture vérifie à nouveau ce
rôle côté serveur ; la navigation seule n’accorde aucun droit.

- `/admin/apprenants/` : recherche et pagination (25 candidats par page).
- `/admin/apprenants/[id]/` : coordonnées, demandes de pack, notes internes,
  progression par module, activités, tests de niveau et dernières corrections.
- `/admin/progressions/` : consultations, quiz réussis, entraînements terminés et
  dernière activité synchronisée. Ce suivi reste indicatif, pas une note officielle.
- `/admin/lecons/` : catalogue, filtres, création, édition du contenu et des quiz,
  aperçu, brouillon, publication, archivage et restauration. Les modifications
  utilisent une révision attendue afin de rejeter un écrasement concurrent.
- `/admin/inscriptions/` : gestion des demandes et activation après paiement.
  Les corrections, exercices générés et combinaisons gardent leurs routes dédiées.

Les formateurs consultent les apprenants et les leçons et relisent les productions.
Seuls les administrateurs modifient les coordonnées, notes internes, demandes de
pack et leçons. L’email de connexion et les rôles ne se modifient pas depuis la fiche
apprenant. Aucune suppression de compte n’est effectuée par cette interface.

Pour une nouvelle base, appliquer **une fois** `supabase/admin.sql`, après les trois
scripts de base. Les migrations correspondantes ont déjà été appliquées au projet
Supabase de cette application. Le script utilise RLS et des droits explicites ;
la publication s’exécute avec les droits de la session, sans clé privilégiée.
Les brouillons et notes sont privés à l’équipe. Seul le contenu publié, y compris
les contenus archivés précédemment publics, est dans `lesson_publications`.
Archiver le retire des parcours, de la recherche et de sa page publique ; restaurer
le rend de nouveau disponible. Une nouvelle leçon publiée apparaît dans le parcours,
le catalogue et la recherche sans modifier le code.

`learner_progress` conserve une copie bornée de la progression du compte. La
synchronisation fusionne cette copie, les anciennes métadonnées de compte et les
activités de l’appareil. Les progressions existantes ont été reprises à la création
de la table ; les nouvelles activités apparaissent lors de leur synchronisation.
Les sessions locales sans compte ne sont pas exposées au personnel.

### Vérifications de l’administration

Le test navigateur utilise un service local factice sur le port 4020. Il ne crée
aucun compte réel, n’envoie aucun email et ne consomme aucun crédit IA. Configurer
le build de test puis démarrer Next.js :

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:4020 NEXT_PUBLIC_SUPABASE_ANON_KEY=admin-local-test-key npm run build
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:4020 NEXT_PUBLIC_SUPABASE_ANON_KEY=admin-local-test-key npm run start -- --port 3011
```

Dans un autre terminal, le test démarre et arrête lui-même le service factice :

```bash
node --experimental-strip-types --test tests/*.test.mjs
node tests/admin.browser.cjs
```

Il vérifie les coordonnées et notes, la progression, le brouillon privé, la
publication réelle dans le parcours, la création, les conflits de révision,
l’archivage/restauration, la connexion admin, le refus candidat et le refus d’une
requête d’écriture forgée depuis un compte formateur, ainsi que trois largeurs
d’écran. `tests/admin-rls.sql` vérifie séparément les politiques sur une base de test
avec des identités temporaires dans une transaction annulée. Il a également été
exécuté et annulé sur la base configurée ; aucune identité de test n’y a été conservée.

Pour réutiliser les tests navigateur apprenants avec ce build local, définir
`FORMATION_BASE_URL=http://127.0.0.1:3011` et
`FORMATION_SUPABASE_URL=http://127.0.0.1:4020`, et démarrer au préalable le service
avec `node tests/fixtures/admin-backend.cjs`. Ne jamais déployer les paramètres de test.
