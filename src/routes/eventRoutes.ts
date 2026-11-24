import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController';

const router = Router();

const validateEvent = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('description').trim().notEmpty().withMessage('La description est requise'),
  body('date').isISO8601().withMessage('Date invalide'),
  body('location').trim().notEmpty().withMessage('Le lieu est requis'),
  body('capacity').isInt({ min: 1 }).withMessage('La capacité doit être au moins de 1'),
  body('category').trim().notEmpty().withMessage('La catégorie est requise'),
  body('association').notEmpty().withMessage("L'association organisatrice est requise"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];

router.get('/events', listEvents);
router.get('/events/:id', getEventById);
router.post('/events', validateEvent, createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
