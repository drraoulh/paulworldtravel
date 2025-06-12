<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Paul World Travel (PW3T)

Application web pour Paul World Travel, une entreprise spécialisée dans les services de cargo, change de devises, conseils et assistance pour achats en Chine, visas, création d'entreprise, solutions informatiques et services douaniers.

## Structure du projet

- **frontend** : Application Next.js avec React
- **backend** : API Node.js/Express avec MongoDB

## Prérequis

- Node.js (v14+)
- MongoDB
- npm ou yarn

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Configuration

### Backend

Créez un fichier `.env` dans le dossier backend (un exemple est déjà fourni) :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/paulworldtravel
NODE_ENV=development
```

### Frontend

Pour configurer l'URL de l'API, créez un fichier `.env.local` dans le dossier frontend :

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Démarrage de l'application

### Démarrer le backend

```bash
cd backend
npm run dev
```

### Démarrer le frontend

```bash
cd frontend
npm run dev
```

## Fonctionnalités

- Services de cargo (Chine-Afrique, Chine-Canada/USA)
- Change de devises (Yuan, FCFA, Dollars)
- Conseils et assistance pour achats en Chine
- Visas et immigration
- Création d'entreprise et services comptables
- Solutions informatiques
- Douane et transit

## Implantations

- Foshan, Guangdong (Chine)
- Douala, Lendi (Cameroun)

## Contact

Email : paulworld2016@yahoo.com
>>>>>>> origin/main
