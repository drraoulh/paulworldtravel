# Paul World Travel Formation

Site de préparation au TCF Canada, prévu sur `formation.paulworldtravel.com`.

## Développement

```bash
cd formation
npm install
npm run dev
```

## Contenu à modifier

- `src/content/offers.ts` : formules, prix (`price`), calendrier (`schedule`), contacts, langues à venir
- `src/content/tcf.ts` : épreuves et barème NCLC
- `src/content/levelTest.ts` : questions du test de niveau

## Base de données (Supabase)

1. Supabase > SQL Editor > New query : coller `supabase/schema.sql`, puis Run.
2. Authentication > URL Configuration :
   - Site URL : `https://formation.paulworldtravel.com`
   - Redirect URLs : `https://formation.paulworldtravel.com/**` et `https://*.vercel.app/**`
3. Authentication > Emails > SMTP Settings (pour envoyer les emails de confirmation via Brevo) :
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
