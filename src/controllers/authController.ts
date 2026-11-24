import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

/**
 * Traitement de l'inscription
 * Route : POST /register
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    // 1. Validation de base des champs obligatoires
    if (!name || !email || !password) {
      if (req.headers.accept?.includes('application/json')) {
        res.status(400).json({ error: 'Tous les champs (nom, email, mot de passe) sont obligatoires.' });
        return;
      }
      res.status(400).render('auth/register', {
        error: 'Tous les champs sont obligatoires.',
        formData: { name, email }
      });
      return;
    }

    // 2. Vérification de l'unicité de l'email
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      if (req.headers.accept?.includes('application/json')) {
        res.status(400).json({ error: 'Cet email est déjà associé à un compte.' });
        return;
      }
      res.status(400).render('auth/register', {
        error: 'Cet email est déjà associé à un compte.',
        formData: { name, email }
      });
      return;
    }

    // 3. Hachage du mot de passe avec bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Création de l'utilisateur (rôle par défaut : student)
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'student'
    });

    // 5. Initialisation de la session utilisateur
    req.session.userId = newUser._id.toString();
    req.session.userName = newUser.name;
    req.session.userEmail = newUser.email;
    req.session.userRole = newUser.role;

    // 6. Réponse selon le format attendu (JSON ou redirection)
    if (req.headers.accept?.includes('application/json')) {
      res.status(201).json({
        message: 'Inscription réussie',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
      return;
    }

    res.redirect('/');
  } catch (err: any) {
    console.error('Erreur lors de l\'inscription :', err);
    if (req.headers.accept?.includes('application/json')) {
      res.status(500).json({ error: 'Erreur interne du serveur lors de l\'inscription.' });
      return;
    }
    res.status(500).render('auth/register', {
      error: 'Une erreur est survenue, veuillez réessayer.',
      formData: req.body
    });
  }
}

/**
 * Affichage du formulaire d'inscription
 * Route : GET /register
 */
export function showRegisterForm(req: Request, res: Response): void {
  // Squelette à compléter : renvoie vers la vue du formulaire d'inscription
  res.render('auth/register', { error: null, formData: {} });
}

/**
 * Affichage du formulaire de connexion
 * Route : GET /login
 */
export function showLoginForm(req: Request, res: Response): void {
  // Squelette à compléter : renvoie vers la vue du formulaire de connexion
  res.render('auth/login', { error: null });
}

/**
 * Traitement de la connexion
 * Route : POST /login
 */
export async function login(req: Request, res: Response): Promise<void> {
  // Squelette à compléter :
  // 1. Récupérer email et password depuis req.body
  // 2. Vérifier si l'utilisateur existe dans User
  // 3. Comparer avec bcrypt.compare(password, user.password)
  // 4. Stocker l'utilisateur dans req.session
  // 5. Rediriger selon le rôle (admin/manager -> /backoffice, student -> /)
  throw new Error('Fonction login non implémentée pour le moment.');
}

/**
 * Traitement de la déconnexion
 * Route : POST /logout ou GET /logout
 */
export async function logout(req: Request, res: Response): Promise<void> {
  // Squelette à compléter :
  // 1. Détruire la session avec req.session.destroy(...)
  // 2. Nettoyer le cookie de session avec res.clearCookie(...)
  // 3. Rediriger vers /login ou /
  throw new Error('Fonction logout non implémentée pour le moment.');
}
