import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import {
  listAssociations,
  getAssociationById,
  createAssociation,
  updateAssociation,
  deleteAssociation
} from '../controllers/associationController';

const router = Router();

const validateAssociation = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('description').trim().notEmpty().withMessage('La description est requise'),
  body('contact').trim().notEmpty().withMessage('Le contact est requis'),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];

router.get('/associations', listAssociations);
router.get('/associations/:id', getAssociationById);
router.post('/associations', validateAssociation, createAssociation);
router.put('/associations/:id', updateAssociation);
router.delete('/associations/:id', deleteAssociation);

export default router;
