import { validationResult } from 'express-validator';
import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search
      ? { title: { $regex: new RegExp(search, 'i') } }
      : {};
    const posts = await Post.find(query)
      .populate('category')
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await Post.countDocuments(query);
    res.json({ data: posts, total });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category')
      .populate('author', 'name email');
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array().map(e => e.msg).join(', ')));
  }
  try {
    const { title, content, category } = req.body;
    const featuredImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await Post.create({ title, content, category, featuredImageUrl, author: req.user?._id });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array().map(e => e.msg).join(', ')));
  }
  try {
    const updates = { ...req.body };
    if (req.file) updates.featuredImageUrl = `/uploads/${req.file.filename}`;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};


