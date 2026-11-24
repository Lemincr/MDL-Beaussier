# Roadmap & Répartition des tâches

## Déjà fait (base reprise du TP `projet-mongo`)
- [x] Initialisation du dépôt Git et config TypeScript / Express
- [x] Connexion MongoDB (`src/config/database.ts`)
- [x] Configuration Express + gestion des erreurs 404/500 (`src/app.ts`, `src/server.ts`)
- [x] Modèle `User` + CRUD API de base avec `express-validator` (`src/models/User.ts`, `src/controllers/userController.ts`, `src/routes/userRoutes.ts`)

---

## Répartition pour la suite (groupe de 3)

### 1. `@Lemincr` — Modèles Mongoose, CRUD Back-end & Règles métier
- [ ] Créer le modèle `Association` (`src/models/Association.ts`) avec la relation vers `User` (responsable)
- [ ] Créer le modèle `Event` (`src/models/Event.ts`) avec la relation vers `Association`
- [ ] Créer le modèle `Registration` (`src/models/Registration.ts`) avec les relations vers `User` et `Event`
- [ ] Implémenter les contrôleurs et routes CRUD pour `Association` et `Event` (avec filtres / recherche)
- [ ] Implémenter le contrôleur et les routes pour `Registration` :
  - Vérifier qu'un étudiant n'est pas déjà inscrit à l'événement (empêcher la double inscription)
  - Vérifier le nombre de places restantes avant d'accepter l'inscription (`capacity`)
- [ ] Faire un petit script de seed pour avoir des fausses données en base pendant le dev

### 2. `@Antoninpampaloni` — Authentification, Droits & Back-office
- [ ] Mettre en place la session (`express-session`) et le hash du mot de passe (`bcryptjs`) à l'inscription / connexion
- [ ] Créer les routes et le contrôleur d'auth (`/register`, `/login`, `/logout`)
- [ ] Créer les middlewares de sécurité (`src/middlewares/auth.ts`) :
  - `requireAuth` : vérifie que l'utilisateur est connecté
  - `requireRole` : vérifie si l'utilisateur est `admin` ou `manager`
  - Vérification qu'un `manager` ne modifie que les données de sa propre association
- [ ] Développer les vues et routes du Back-office (`src/views/backoffice/`) :
  - Gestion des associations (création, modification, activation/désactivation)
  - Gestion des événements (création, modification, suppression, publication)
  - Page listant les étudiants inscrits à un événement

### 3. `@Justeunbrider83` — Front-end Public & Espace Étudiant (EJS + Bootstrap)
- [ ] Créer le layout principal, le header (navbar dynamique connecté / non connecté) et le footer (`src/views/partials/`)
- [ ] Créer les pages d'inscription et de connexion (`src/views/auth/`)
- [ ] Créer la page d'accueil et la liste des associations actives (`src/views/front/`)
- [ ] Créer la liste des événements avec formulaire de recherche / filtrage (par catégorie ou association)
- [ ] Créer la page détail d'un événement (infos complètes, places restantes, bouton s'inscrire)
- [ ] Créer la page « Mes inscriptions » pour l'étudiant (liste de ses événements + bouton annuler)
