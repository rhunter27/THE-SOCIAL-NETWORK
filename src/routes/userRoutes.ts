import { Router, Request, Response } from 'express';
import User from '../models/Users';
import Thought from '../models/Thoughts';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;