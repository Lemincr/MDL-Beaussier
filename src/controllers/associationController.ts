import { Request, Response } from 'express';
import Association from '../models/Association';

export async function listAssociations(req: Request, res: Response) {
  try {
    const filter: Record<string, any> = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const associations = await Association.find(filter).populate('manager', 'name email role');
    res.status(200).json(associations);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getAssociationById(req: Request, res: Response) {
  try {
    const association = await Association.findById(req.params.id).populate('manager', 'name email role');
    if (!association) {
      res.status(404).json({ error: 'Association introuvable' });
      return;
    }
    res.status(200).json(association);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createAssociation(req: Request, res: Response) {
  try {
    const association = await Association.create(req.body);
    res.status(201).json(association);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Une association avec ce nom existe déjà.' });
      return;
    }
    res.status(400).json({ error: err.message });
  }
}

export async function updateAssociation(req: Request, res: Response) {
  try {
    const updated = await Association.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('manager', 'name email role');

    if (!updated) {
      res.status(404).json({ error: 'Association introuvable' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Une association avec ce nom existe déjà.' });
      return;
    }
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAssociation(req: Request, res: Response) {
  try {
    const deleted = await Association.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Association introuvable' });
      return;
    }
    res.status(200).json({ message: 'Association supprimée' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
