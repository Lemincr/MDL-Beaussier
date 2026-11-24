import { Request, Response } from 'express';
import User from '../models/User';

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      return;
    }
    res.status(400).json({ error: err.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!updated) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      return;
    }
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
