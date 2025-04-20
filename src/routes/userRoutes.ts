import { Router, Request, Response } from 'express';
import User from '../models/Users';

const router = Router();

// GET all users
router.get('/', async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().populate('thoughts friends');
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

// GET a single user by id
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

export default router;