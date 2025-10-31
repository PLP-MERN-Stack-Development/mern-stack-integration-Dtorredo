import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { createCategoryValidators } from '../validation/categoryValidation.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, createCategoryValidators, createCategory);

export default router;


