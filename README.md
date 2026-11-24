# MDL-Beaussier

Projet fil-rouge de développement web : application de gestion de la vie associative et des événements de l'école.

## Stack technique

- TypeScript / Node.js / Express
- MongoDB / Mongoose
- EJS + Bootstrap
- `express-validator`, `express-session`, `bcryptjs`

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Par défaut, l'application se connecte sur `mongodb://localhost:27017/mdl_beaussier`.

3. Lancer le serveur en développement :
```bash
npm run dev
```

## Structure du projet

```text
src/
  config/       # Connexion MongoDB (database.ts)
  models/       # Schémas Mongoose (User, Association, Event, Registration)
  controllers/  # Logique métier et réponses HTTP
  routes/       # Routes Express et validations
  middlewares/  # Authentification et vérification des rôles
  views/        # Templates EJS (front/ et backoffice/)
  app.ts        # Configuration Express
  server.ts     # Point d'entrée du serveur
public/         # Fichiers statiques (CSS, JS, images)
docs/           # Cahier des charges, roadmap et suivi du projet
```

## Équipe

- `@Lemincr`
- `@Antoninpampaloni`
- `@Justeunbrider83`
