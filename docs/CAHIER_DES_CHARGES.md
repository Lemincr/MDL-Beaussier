# Cahier des charges - MDL-Beaussier

## 1. Objectif du projet

Développer une application web pour gérer les associations et les événements de l'école :
- Les étudiants peuvent créer un compte, se connecter, voir les associations/événements et s'inscrire aux événements.
- Les responsables d'association gèrent leur association, leurs événements et voient la liste des inscrits depuis un back-office.
- Les administrateurs ont accès à tout le back-office (associations, événements, utilisateurs, droits).

## 2. Modèles de données (Mongoose)

### User (`src/models/User.ts`)
- `name` : String (requis)
- `email` : String (requis, unique)
- `password` : String (requis, hashé)
- `role` : `'student' | 'manager' | 'admin'` (défaut : `'student'`)
- `createdAt` : Date

### Association (`src/models/Association.ts`)
- `name` : String (requis, unique)
- `description` : String (requis)
- `contact` : String (email ou téléphone)
- `logo` : String (URL ou chemin image)
- `status` : `'active' | 'inactive'` (défaut : `'active'`)
- `manager` : ObjectId (référence vers `User`)

### Event (`src/models/Event.ts`)
- `title` : String (requis)
- `description` : String (requis)
- `date` : Date (requis)
- `location` : String (requis)
- `capacity` : Number (requis, min 1)
- `category` : String
- `published` : Boolean (défaut : `false`)
- `association` : ObjectId (référence vers `Association`, requis)

### Registration (`src/models/Registration.ts`)
- `user` : ObjectId (référence vers `User`, requis)
- `event` : ObjectId (référence vers `Event`, requis)
- `registeredAt` : Date (défaut : `Date.now`)
- `status` : `'confirmed' | 'cancelled'` (défaut : `'confirmed'`)

## 3. Règles métier à respecter

1. **Pas de double inscription** : un étudiant ne peut pas s'inscrire deux fois au même événement.
2. **Capacité maximale** : impossible de s'inscrire si le nombre d'inscrits confirmés atteint `capacity`.
3. **Droits de modification** :
   - `admin` : peut tout modifier/supprimer et activer/désactiver les associations.
   - `manager` : ne peut modifier que son association et les événements liés à son association.
   - `student` : peut uniquement s'inscrire et annuler ses propres inscriptions.
