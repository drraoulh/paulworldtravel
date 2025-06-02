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
