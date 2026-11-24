# Journal de Suivi — MDL-Beaussier

Ce document trace l'avancement du projet, les décisions techniques et la répartition des tâches au fil des séances.

---

## Composition de l'équipe

| Membre | Rôle / Référent principal | GitHub |
| :--- | :--- | :--- |
| Membre 1 | Architecture, Back-end & Modèles Mongoose | `@Lemincr` |
| Membre 2 | Authentification, Sécurité & Back-office | `@antoninpampaloni` |
| Membre 3 | Front-end EJS / Bootstrap & Intégration | `@Justeunbrider83` |

---

## Historique des séances et entrées du journal

### Entrée 1 — Initialisation du projet et cadrage
- **Objectifs de la séance** :
  - Analyse du sujet du projet fil-rouge (`Projet-fil-rouge-2026-2027 (1).pdf`).
  - Mise en place de l'architecture MVC en TypeScript.
  - Rédaction du cahier des charges initial et de la feuille de route.
- **Réalisations** :
  - Création de l'arborescence MVC (`src/models`, `src/controllers`, `src/routes`, `src/middlewares`, `src/views/front`, `src/views/backoffice`, `public/`).
  - Configuration de TypeScript (`tsconfig.json`) et installation des dépendances (`express`, `mongoose`, `ejs`, `bootstrap`, `bcryptjs`, `express-session`, etc.).
  - Rédaction de `docs/CAHIER_DES_CHARGES.md` et `docs/ROADMAP.md`.
- **Décisions techniques** :
  - Choix d'**EJS** pour le rendu des vues côté serveur avec séparation explicite entre le front public et le back-office.
  - Choix de **Bootstrap 5** pour l'interface utilisateur et le back-office.
- **Prochaines étapes** :
  - Implémentation de la connexion MongoDB et des 4 schémas Mongoose (`User`, `Association`, `Event`, `Registration`).

---

### Modèle pour les prochaines entrées

```markdown
### Entrée X — [Date] — [Titre de la séance]
- **Participants** : ...
- **Travail effectué** :
  - ...
- **Difficultés rencontrées / Solutions** :
  - ...
- **Prochaines étapes** :
  - ...
```
