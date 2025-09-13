import express from 'express';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';

// Middleware to check auth
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err });
  }
}

// Create post
router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const post = new Post({ userId: req.userId, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Post creation failed', error: err });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Fetching posts failed', error: err });
  }
});

// Get posts by user
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Fetching user posts failed', error: err });
  }
});

export default router;
