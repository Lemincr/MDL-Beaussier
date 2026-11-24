import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import {
  listRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
} from '../controllers/registrationController';

const router = Router();

const validateRegistration = [
  body('user').notEmpty().withMessage("L'utilisateur est requis"),
  body('event').notEmpty().withMessage("L'événement est requis"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];

router.get('/registrations', listRegistrations);
router.get('/registrations/:id', getRegistrationById);
router.post('/registrations', validateRegistration, createRegistration);
router.put('/registrations/:id', updateRegistration);
router.delete('/registrations/:id', deleteRegistration);

export default router;
