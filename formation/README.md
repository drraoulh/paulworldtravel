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


## IA : packs payants, examens blancs prioritaires

Un compte gratuit n’a aucun accès à l’IA. Un pack doit être reconnu et actif :
une inscription en attente, future, expirée ou annulée ne suffit pas. Les rôles
sont lus dans la base, jamais dans les métadonnées modifiables du compte.

| Pack | Examens blancs corrigés / durée du pack | Écrits / 24 h | Oraux / 24 h | Questions tuteur / 24 h |
| --- | --- | ---: | ---: | ---: |
| Express | 1 / 7 jours | 1 | 1 | 3 |
| Essentiel | 4 / 30 jours | 1 | 1 | 5 |
| Silver | 8 / 60 jours | 2 | 1 | 10 |
| Gold | 12 / 90 jours | 3 | 2 | 15 |
| Platinum | 24 / 90 jours | 4 | 2 | 20 |

Les quotas d’entraînement sont calculés sur les dernières 24 heures. Les crédits
d’examen sont liés à une inscription payante (`enrollments.id`) et ne se cumulent
pas entre packs actifs : le pack le plus élevé est utilisé. Un renouvellement
avec de nouveaux crédits nécessite une nouvelle inscription active ; modifier
simplement les dates de l’ancienne ne remet pas son compteur à zéro.
L’équipe dispose de quotas internes bornés, dont 24 examens sur 30 jours.

Un crédit est réservé au démarrage de l’examen blanc et couvre **3 écrits +
3 oraux**, indépendamment des quotas d’entraînement et de tuteur. La réservation
est atomique et idempotente : un double clic ou une nouvelle tentative réseau
avec le même identifiant ne décompte pas deux crédits. Les corrections sont
accessibles pendant 24 heures, tant que le pack associé reste actif. Garder la
page ouverte jusqu’au bilan ; la saisie et l’avancement de l’examen restent dans
la page et ne sont pas restaurés après son rechargement.

Chaque sujet est fixé par le numéro d’examen côté serveur. Chaque correction
réussie est enregistrée et réutilisée lors des appels répétés. Une tâche peut être
retentée au plus deux fois en cas d’échec ; une correction simultanée est refusée
pendant sa réservation. L’interaction orale de l’examen est limitée à 12 répliques,
également enregistrées pour empêcher leur refacturation lors d’un nouvel appel.
Les compréhensions utilisent les corrigés existants sans appel IA. Les notes
restent indicatives et l’oral transcrit ne permet pas d’évaluer la prononciation.

Configurer `OPENAI_API_KEY` côté serveur pour utiliser directement OpenAI :
`gpt-6-luna` pour le tuteur et les corrections, sans raisonnement supplémentaire,
et `gpt-transcribe` pour les enregistrements en français. Modèles configurables
avec les variables de `.env.example`. La clé ne doit jamais être exposée par
`NEXT_PUBLIC_`. Ajouter la clé à l’environnement serveur puis redéployer.
Sans OpenAI, le texte conserve OpenRouter et l’oral nécessite aussi `HF_TOKEN`.
Aucun second fournisseur n’est appelé automatiquement après un échec.

Budget estimé pour **20 apprenants**, sans limite d’inscription : 0,05 à 0,10 USD
par examen complet, soit 4 à 8 USD pour 80 examens (un par semaine et par personne
sur quatre semaines). Aux quotas maximaux avec entraînements et tuteur, prévoir
environ 20 à 25 USD/mois pour 20 Essentiel, 21 à 25 pour Silver, 36 à 41 pour Gold
et 42 à 50 pour Platinum ; Express : 4,50 à 5,50 USD pour 20 personnes sur 7 jours.
Hypothèses : 5 minutes par oral d’entraînement, environ 10 minutes d’audio par
examen, 3 000 tokens d’entrée et 1 000 de sortie par correction, 1 500 d’entrée et
300 de sortie par question au tuteur. Hors taxes, hébergement et usage de l’équipe.
Les échecs après un appel facturable et la longueur des échanges peuvent augmenter
le coût : ces estimations ne sont pas un plafond financier garanti.
Tarifs de référence : Luna 0,10 USD/million de tokens d’entrée, 0,50 USD/million
sortie ; transcription 0,0045 USD/minute (5 novembre 2026).
<https://developers.openai.com/api/docs/pricing>

Appliquer `supabase/ai-exams.sql` après `ai.sql` pour une nouvelle base. Les tables
ont RLS activé ; seul le serveur peut réserver les crédits et écrire les résultats.
Les candidats ne peuvent lire que leurs propres réservations. Les deux fonctions
SQL s’exécutent avec les droits de l’appelant et ne sont accordées qu’à
`service_role`. Aucun accès direct du navigateur aux opérations internes.

Vérifications sans compte créé, email envoyé ou appel IA facturable :

```bash
node --experimental-strip-types --test tests/*.test.mjs
# Avec le build, Next.js et la fixture locale documentés plus haut :
node tests/exams.browser.cjs
node tests/academy.browser.cjs
node tests/onboarding.browser.cjs
```

`tests/ai.test.mjs` couvre notamment les six corrections malgré des quotas
quotidiens épuisés, le cache, le refus des sujets hors examen, l’expiration,
l’appartenance du compte, l’annulation du pack et le renouvellement.
`tests/ai-exams.sql` vérifie les réservations SQL, le quota, les appels simultanés,
le cache et les privilèges, dans une transaction annulée. Le test navigateur couvre
le parcours des quatre épreuves et les six corrections, avec micro et IA factices.


## Documents légaux et choix de confidentialité

Les pages `/mentions-legales/`, `/conditions-utilisation/`, `/conditions-vente/`,
`/confidentialite/` et `/cookies/` utilisent l’identité publique de PW3T SARL,
communiquée par son représentant : nom juridique, capital, siège, RCCM et gérant.
Les informations personnelles des associés ne sont pas publiées. Les documents
sont reliés au pied de page, au sitemap et aux formulaires et peuvent être imprimés
ou enregistrés en PDF depuis le navigateur. L’identité et la version commune sont
dans `src/content/legal.ts` ; modifier la version lors d’une nouvelle publication
contractuelle importante, puis actualiser les tests de version correspondants.

`CookieConsent` mémorise un choix explicite dans le cookie `pwt-cookie-consent`,
pour 180 jours, avec `Path=/`, `SameSite=Lax` et `Secure` en HTTPS. Les statistiques
sont désactivées par défaut. Les boutons Accepter et Refuser ont la même visibilité,
les préférences détaillées ne précochent pas les statistiques, et le choix peut
être changé dans le pied de page. Le dialogue est utilisable au clavier.

Vercel Analytics est chargé seulement après accord. `beforeSend` revérifie aussi
le choix courant : le retrait bloque les futurs événements même si le script a
déjà été chargé. Les paramètres et fragments sont retirés des URL ; les espaces
privés, paiements, pages d’authentification, conversations et simulateurs IA sont
exclus. L’en-tête `Referrer-Policy: strict-origin` réduit les informations contenues
dans le référent HTTP. Les cookies de session et le stockage pédagogique demandé
ne sont pas supprimés lorsqu’on refuse uniquement les statistiques.

L’inscription requiert une case non précochée d’acceptation des CGU (et des CGV si
un pack est demandé). La version et l’horodatage déclarés accompagnent la création
du compte dans ses métadonnées ; ces métadonnées ne servent pas à l’autorisation
et ne constituent pas un journal immuable. La notification Brevo ajoute sa propre
date serveur et la version. Les demandes de pack et le démarrage d’un paiement
refusent aussi les conditions absentes, refusées ou d’une ancienne version côté
serveur. Le paiement Stripe conserve la version et la date serveur dans ses
métadonnées. Aucune acceptation rétroactive n’est ajoutée aux comptes existants.
L’acceptation des conditions est distincte de l’accord aux statistiques et ne vaut
pas inscription publicitaire ou renonciation automatique à un droit légal.

Les politiques décrivent le service actuel et les droits impératifs applicables ;
elles ne définissent pas de nouveau délai commercial de remboursement ni de
suppression automatique des comptes. Les demandes de droits et réclamations sont
traitées via l’adresse de contact publiée. Les engagements particuliers restent à
confirmer avec le client avant son règlement.

Vérifications locales sans données réelles ni paiement :

```bash
node --experimental-strip-types --test tests/*.test.mjs
# Avec le build de test, le serveur Next et la fixture locale documentés plus haut :
node tests/legal.browser.cjs
```

Le test navigateur utilise un script de statistiques factice pour vérifier le
chargement après accord, le retrait, les URL nettoyées, le refus persistant, les
pages et liens légaux sur deux largeurs, l’identité publiée, la case d’inscription
et l’acceptation avant un paiement simulé. Les autres scénarios navigateur refusent
explicitement les statistiques pour se concentrer sur leurs parcours respectifs.

## Contenu sous licence (TCF Canada Ltd)

Depuis le contrat de licence du 23 octobre 2026, la plateforme reprend le contenu de
formation-tcfcanada.com : 44 séries de compréhension écrite (numéros 25 à 68), 43 séries
de compréhension orale (11 à 53), 540 combinaisons d’expression écrite (2024 à 2026) et
3 616 sujets d’expression orale (2023 à 2026), avec leurs corrigés.

- Données : `src/content/series/licence/*.json`, `src/content/licence/*.json`.
- `src/content/series/catalog.ts` réunit les séries de l’équipe et celles sous licence ;
  il ne doit être importé que côté serveur (plusieurs mégaoctets).
- Pour un mois couvert par la licence, les sujets sous licence remplacent les
  reformulations de l’équipe dans les listes.
- Les images et les enregistrements audio sont encore servis depuis le stockage du
  vendeur. Après copie dans notre propre stockage (mêmes chemins `audio/…` et `images/…`),
  renseigner `NEXT_PUBLIC_MEDIA_BASE` avec son adresse publique : voir `src/lib/media.ts`.
