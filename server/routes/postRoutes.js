import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { protect } from '../middleware/authMiddleware.js';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { createPostValidators, updatePostValidators } from '../validation/postValidation.js';

const router = express.Router();

// Multer setup for simple local uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, upload.single('featuredImage'), createPostValidators, createPost);
router.put('/:id', protect, upload.single('featuredImage'), updatePostValidators, updatePost);
router.delete('/:id', protect, deletePost);

export default router;


