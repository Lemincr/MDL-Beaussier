# Feuille de Route (Roadmap) — MDL-Beaussier

Cette feuille de route découpe le développement du projet fil-rouge en jalons (milestones) et tâches actionnables, conformément aux critères d'évaluation.

---

## Jalon 1 : Initialisation & Cadrage
- [x] Initialisation du dépôt Git et structure MVC du projet
- [x] Configuration TypeScript (`tsconfig.json`), dépendances Express / Mongoose / EJS / Bootstrap
- [x] Rédaction du Cahier des charges initial ([`docs/CAHIER_DES_CHARGES.md`](file:///home/antigravity/Lemincr/MDL-Beaussier/docs/CAHIER_DES_CHARGES.md))
- [x] Mise en place de la feuille de route et du journal de suivi

## Jalon 2 : Base de Données & Modèles Mongoose
- [ ] Configuration de la connexion MongoDB (`src/config/database.ts`)
- [ ] Modèle `User` (identité, email, mot de passe hashé, rôle)
- [ ] Modèle `Association` (nom, description, contact, logo, statut, responsable)
- [ ] Modèle `Event` (titre, description, date, lieu, capacité, catégorie, association organisatrice)
- [ ] Modèle `Registration` (utilisateur, événement, date d'inscription, statut)
- [ ] Script de seed (données de démonstration pour tester les relations)

## Jalon 3 : Authentification, Sécurité & Gestion des Droits
- [ ] Service et contrôleur d'authentification (inscription, connexion, déconnexion)
- [ ] Gestion des sessions (`express-session` / `connect-mongo`)
- [ ] Middleware `isAuthenticated` (protection des routes connectées)
- [ ] Middleware `authorizeRoles` (`admin`, `manager`, `student`)
- [ ] Middleware de vérification de propriété pour un responsable associatif (accès limité à son association)

## Jalon 4 : Back-end CRUD & Règles Métier
- [ ] CRUD Utilisateurs (`src/controllers/user.controller.ts`, `src/routes/user.routes.ts`)
- [ ] CRUD Associations (`src/controllers/association.controller.ts`, `src/routes/association.routes.ts`)
- [ ] CRUD Événements (`src/controllers/event.controller.ts`, `src/routes/event.routes.ts`)
- [ ] CRUD Inscriptions (`src/controllers/registration.controller.ts`, `src/routes/registration.routes.ts`)
- [ ] Validation règle métier : empêcher la double inscription d'un même utilisateur à un événement
- [ ] Validation règle métier : bloquer les inscriptions lorsque la capacité maximale est atteinte

## Jalon 5 : Front-end Public & Espace Étudiant (EJS + Bootstrap)
- [ ] Layout principal Front-end et barre de navigation dynamique (selon l'état de connexion)
- [ ] Pages d'inscription et de connexion (`src/views/auth/`)
- [ ] Page d'accueil et catalogue des associations (`src/views/front/`)
- [ ] Catalogue des événements avec barre de recherche et filtres (catégorie, association, date)
- [ ] Fiche détaillée d'un événement avec compteur de places et bouton d'inscription
- [ ] Page « Mes inscriptions » avec possibilité d'annulation

## Jalon 6 : Back-office (Administration & Responsables Associatifs)
- [ ] Layout dédié Back-office (`src/views/layouts/`) séparé du front public
- [ ] Tableau de bord Back-office
- [ ] Interface de gestion des associations (création, édition, activation/désactivation)
- [ ] Interface de gestion des événements (création, édition, suppression, publication)
- [ ] Vue de consultation de la liste des inscrits par événement

## Jalon 7 : Finitions, Tests & Présentation Finale
- [ ] Vérification complète des parcours utilisateurs (Étudiant, Responsable associatif, Administrateur)
- [ ] Revue de la qualité du code TypeScript et gestion des erreurs HTTP (404, 403, 500)
- [ ] Finalisation de la documentation d'installation et d'utilisation (`README.md`)
- [ ] Préparation de la présentation finale
