import { body, param } from 'express-validator';

export const createPostValidators = [
  body('title').isString().trim().isLength({ min: 3 }).withMessage('Title is required (min 3 chars)'),
  body('content').isString().isLength({ min: 10 }).withMessage('Content is required (min 10 chars)'),
  body('category').isMongoId().withMessage('Valid category is required'),
];

export const updatePostValidators = [
  param('id').isMongoId().withMessage('Valid post id required'),
  body('title').optional().isString().trim().isLength({ min: 3 }),
  body('content').optional().isString().isLength({ min: 10 }),
  body('category').optional().isMongoId(),
];


