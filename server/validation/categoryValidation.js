import { body } from 'express-validator';

export const createCategoryValidators = [
  body('name').isString().trim().isLength({ min: 2 }).withMessage('Name is required (min 2 chars)'),
  body('description').optional().isString(),
];


