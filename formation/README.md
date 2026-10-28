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
   - Redirect URLs : `https://formation.paulworldtravel.com/auth/confirm/`, `http://localhost:3001/auth/confirm/` et les URLs exactes de confirmation des aperçus autorisés.
3. Emails d'authentification : envoyés par le site via Brevo (route `/api/auth-email/`, hook Supabase « Send Email » configuré, secret `SEND_EMAIL_HOOK_SECRET` dans Vercel). Ancienne option SMTP, inutile maintenant : Authentication > Emails > SMTP Settings (pour envoyer les emails de confirmation via Brevo) :
   hôte `smtp-relay.brevo.com`, port `587`, identifiant SMTP et clé SMTP fournis par Brevo (SMTP & API > SMTP),
   expéditeur `infos@paulworldtravel.com`, nom `PAULWORLD TRAVEL`.
4. Créer votre compte sur le site, puis dans le SQL Editor :
   `update public.profiles set role = 'admin' where email = 'votre@email';`
   Rôle `trainer` : voit les inscriptions sans pouvoir les activer.

### Auth et routes protégées

La connexion locale utilise `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` dans `.env.local` (ignoré par Git). L’ancienne variable `NEXT_PUBLIC_SUPABASE_ANON_KEY` reste prise en charge. Renseigner également ces variables sur l’hébergement avant de reconstruire le site.

`/espace/`, `/admin/` et `/auth/nouveau-mot-de-passe/` nécessitent une session vérifiée côté serveur. Sans session ou sans configuration, le middleware redirige vers `/connexion/?suite=…` en conservant le chemin et ses paramètres. Il renouvelle les sessions sur les routes de l’application et conserve les cookies renouvelés lors d’une redirection. Les réponses traversant le middleware sont privées et non mises en cache. Les pages et actions d’administration vérifient en plus le rôle enregistré dans `profiles` ; les politiques RLS protègent les données indépendamment du middleware.

Les parcours existants couvrent l’inscription, la confirmation email, la connexion, la récupération du mot de passe et la déconnexion. Pour tester les emails de bout en bout, utiliser un compte de test et vérifier la configuration du hook Brevo et des URLs de redirection dans Supabase. Ne pas ajouter de domaine d’aperçu générique à la liste des redirections autorisées.

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

## Veille TCF Cameroun et compréhension écrite

- `/actualites/` : annonces officielles, prochaines sessions, filtres par ville/mois et sessions passées. Une source bloquée ou une collecte indisponible reste visible ; une liste vide ne signifie pas qu’il n’existe aucune session.
- `/admin/actualites/` : publication d’une annonce vérifiée et retrait/rétablissement, réservés aux administrateurs. Les formateurs n’ont pas les droits de publication.
- `/entrainement/comprehension-ecrite/` : banque de 72 exercices originaux, trois combinaisons reproductibles par mois/année, 39 questions distinctes par combinaison, mode guidé ou 60 minutes. Le mois est une organisation pédagogique, jamais la date d’une prétendue annale. Les niveaux sont indicatifs et la répartition est interne, sans étalonnage officiel. Les corrections sont expliquées ; le bilan ne donne pas de score TCF/NCLC.

La fonction Supabase `tcf-watch` et le job `tcf-watch-daily` ont été activés sur le projet connecté. Le job s’exécute à `06:00 UTC`, soit **07:00 à Douala**. Il est indépendant du déploiement du site. Les nouvelles pages du site doivent être déployées séparément pour être visibles en production.

Le schéma est conservé dans `supabase/tcf-news.sql`, et la programmation dans `supabase/tcf-watch-schedule.sql`. Le jeton d’appel reste dans Supabase Vault ; seul son SHA-256 figure dans le collecteur. Les appels anonymes au collecteur sont rejetés. Pour changer de projet ou renouveler le jeton, suivre les commentaires du fichier de programmation et redéployer la fonction avec le nouveau digest. L’Edge Function utilise sa clé serveur injectée par Supabase, jamais une clé secrète envoyée au navigateur.

Le collecteur reprend uniquement les titres/liens d’articles ou de flux sur les domaines officiels autorisés. Une date automatique exige un événement JSON-LD explicitement identifié TCF Canada, avec jour valide, ville suivie et pays Cameroun. Les dates d’ouverture des inscriptions ne deviennent pas des dates d’examen. Les PDF, images et créneaux derrière connexion nécessitent une vérification humaine et un ajout dans l’administration. Le collecteur respecte les blocages HTTP et n’essaie pas de contourner les protections des sources. Il ne remplace pas une annonce retirée manuellement.

Contrôles :

```bash
node --experimental-strip-types --test tests/*.test.mjs
npx tsc --noEmit
npm run build
```

Les tests couvrent la banque, 108 combinaisons sur trois années, la correspondance des réponses après mélange, les dates invalides, les annonces d’inscription, les événements annulés, les liens externes et les limites de collecte. Voir aussi `../docs/tcf-watch-and-reading.md`.

### Catalogue des quatre épreuves

`/entrainement/series/` propose un choix commun de mois/année et de combinaison (1 à 3). Les liens transmettent `?mois=YYYY-MM&serie=1..3` à chaque rubrique. Les paramètres invalides reviennent au mois courant au Cameroun et à la première combinaison.

- CO : `/entrainement/comprehension-orale/`, 39 QCM / 35 minutes, audio synthétique français et explications.
- CE : `/entrainement/comprehension-ecrite/`, 72 documents dans la banque, 39 QCM / 60 minutes, tableaux accessibles et corrigés.
- EO : `/entrainement/expression-orale/series/`, 44 scénarios, trois tâches / 12 minutes, préparation en tâche 2, partenaire pour l’interaction et enregistrement local facultatif.
- EE : `/entrainement/expression-ecrite/series/`, 36 sujets et 24 documents pour la tâche 3, trois tâches / 60 minutes, compteurs de mots et brouillons locaux exportables.

Les parcours de correction IA préexistants sont conservés. Les séries autonomes n’envoient pas les productions à une IA. Les sources et usages pédagogiques sont détaillés dans `../docs/tcf-co-sources.md`, `../docs/tcf-ce-sources.md`, `../docs/tcf-eo-sources.md` et `../docs/tcf-ee-sources.md`. Les mois n’attestent pas la provenance historique de sujets d’examen.
