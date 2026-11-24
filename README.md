# MDL-Beaussier

Application web dédiée à la **vie associative et aux événements de l'école** (Projet fil-rouge — Développement Web : TypeScript, Node.js, Express, MongoDB, Mongoose, EJS, Bootstrap).

---

## Présentation du Projet

**MDL-Beaussier** permet :
- aux **étudiants** de s'inscrire, se connecter, consulter les associations et les événements de l'établissement, et gérer leurs inscriptions aux événements ;
- aux **responsables associatifs** de gérer leur association, leurs événements et de consulter la liste des inscrits depuis un back-office dédié ;
- aux **administrateurs** de superviser l'ensemble des associations, événements, utilisateurs et droits d'accès.

---

## Documentation et Suivi du Projet

- [Cahier des charges initial](docs/CAHIER_DES_CHARGES.md) — Description fonctionnelle, rôles, schémas de données Mongoose et règles métier.
- [Feuille de route (Roadmap)](docs/ROADMAP.md) — Découpage du projet en jalons et liste des fonctionnalités à développer.
- [Journal de suivi](docs/JOURNAL_DE_SUIVI.md) — Suivi des séances, décisions techniques et répartition du travail.
- [Sujet officiel (PDF)](Projet-fil-rouge-2026-2027%20(1).pdf)

---

## Stack Technique

- **Langage** : TypeScript (`Node.js`)
- **Serveur & Architecture** : Express.js (Architecture **MVC** modulaire)
- **Base de données** : MongoDB & Mongoose
- **Vues & Front-end** : EJS (`express-ejs-layouts`), HTML5, CSS3, Bootstrap 5, JavaScript
- **Authentification & Sécurité** : Sessions Express (`express-session`, `connect-mongo`), hashage de mots de passe (`bcryptjs`), contrôle d'accès par rôles (RBAC)

---

## Architecture du Dépôt (MVC)

```text
MDL-Beaussier/
├── docs/                       # Documentation projet
│   ├── CAHIER_DES_CHARGES.md   # Cahier des charges initial & modèle de données
│   ├── ROADMAP.md              # Feuille de route (to-do list par jalon)
│   └── JOURNAL_DE_SUIVI.md     # Journal de suivi d'équipe
├── public/                     # Fichiers statiques servis par Express
│   ├── css/                    # Feuilles de style personnalisées
│   ├── js/                     # Scripts JavaScript côté client
│   └── img/                    # Logos des associations et ressources images
├── src/                        # Code source TypeScript
│   ├── config/                 # Configuration (connexion MongoDB, variables d'env)
│   ├── controllers/            # Contrôleurs MVC (logique des requêtes/réponses)
│   ├── middlewares/            # Middlewares (authentification, gestion des rôles, erreurs)
│   ├── models/                 # Schémas et modèles Mongoose (User, Association, Event, Registration)
│   ├── routes/                 # Définition des routes (Front public, API, Back-office)
│   ├── services/               # Logique métier réutilisable
│   ├── types/                  # Types et interfaces TypeScript personnalisés
│   ├── utils/                  # Fonctions utilitaires
│   └── views/                  # Templates EJS côté serveur
│       ├── layouts/            # Layouts globaux (Front public vs Back-office)
│       ├── partials/           # Composants réutilisables (header, footer, alertes)
│       ├── auth/               # Vues connexion / inscription
│       ├── front/              # Vues publiques et espace étudiant
│       └── backoffice/         # Vues d'administration et gestion associative
├── .env.example                # Exemple de configuration des variables d'environnement
├── .gitignore                  # Fichiers exclus du suivi Git
├── package.json                # Dépendances et scripts npm
└── tsconfig.json               # Configuration du compilateur TypeScript
```

---

## Installation et Démarrage

### 1. Prérequis
- **Node.js** (v18+ ou v22+)
- **MongoDB** (instance locale ou MongoDB Atlas)

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Copier le fichier `.env.example` vers `.env` et adapter les valeurs :
```bash
cp .env.example .env
```

### 4. Commandes disponibles
- `npm run dev` : Lance le serveur en mode développement avec rechargement automatique (`tsx watch`).
- `npm run typecheck` : Vérifie le typage TypeScript sans générer de fichiers.
- `npm run build` : Compile le code TypeScript vers le dossier `dist/`.
- `npm start` : Démarre l'application compilée depuis `dist/server.js`.
