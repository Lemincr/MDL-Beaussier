import { Request, Response } from 'express';
import Registration from '../models/Registration';
import Event from '../models/Event';

export async function listRegistrations(req: Request, res: Response) {
  try {
    const filter: Record<string, any> = {};

    if (req.query.user) {
      filter.user = req.query.user;
    }
    if (req.query.event) {
      filter.event = req.query.event;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const registrations = await Registration.find(filter)
      .populate('user', 'name email role')
      .populate('event', 'title date location capacity');

    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getRegistrationById(req: Request, res: Response) {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('event', 'title date location capacity');

    if (!registration) {
      res.status(404).json({ error: 'Inscription introuvable' });
      return;
    }
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createRegistration(req: Request, res: Response) {
  try {
    const { user, event } = req.body;

    const targetEvent = await Event.findById(event);
    if (!targetEvent) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }

    const existing = await Registration.findOne({ user, event });
    if (existing && existing.status === 'confirmed') {
      res.status(400).json({ error: 'Vous êtes déjà inscrit à cet événement.' });
      return;
    }

    const confirmedCount = await Registration.countDocuments({
      event,
      status: 'confirmed'
    });

    if (confirmedCount >= targetEvent.capacity) {
      res.status(400).json({ error: 'La capacité maximale de cet événement est atteinte.' });
      return;
    }

    if (existing && existing.status === 'cancelled') {
      existing.status = 'confirmed';
      existing.registeredAt = new Date();
      await existing.save();
      res.status(200).json(existing);
      return;
    }

    const registration = await Registration.create({ user, event });
    res.status(201).json(registration);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Vous êtes déjà inscrit à cet événement.' });
      return;
    }
    res.status(400).json({ error: err.message });
  }
}

export async function updateRegistration(req: Request, res: Response) {
  try {
    const updated = await Registration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      res.status(404).json({ error: 'Inscription introuvable' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteRegistration(req: Request, res: Response) {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Inscription introuvable' });
      return;
    }
    res.status(200).json({ message: 'Inscription supprimée' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
