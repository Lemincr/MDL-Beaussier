import { Request, Response } from 'express';
import Event from '../models/Event';

export async function listEvents(req: Request, res: Response) {
  try {
    const filter: Record<string, any> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.association) {
      filter.association = req.query.association;
    }
    if (req.query.published !== undefined) {
      filter.published = req.query.published === 'true';
    }
    if (req.query.search) {
      filter.title = { $regex: String(req.query.search), $options: 'i' };
    }

    const events = await Event.find(filter)
      .populate('association', 'name logo status')
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const event = await Event.findById(req.params.id).populate(
      'association',
      'name description contact logo status'
    );
    if (!event) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('association', 'name logo status');

    if (!updated) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }
    res.status(200).json({ message: 'Événement supprimé' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
