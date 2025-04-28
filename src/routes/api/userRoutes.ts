import { Router, Request, Response } from 'express';
import User from '../../models/Users';

const router = Router();

// POST - Create a new user
router.post('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

// GET - All users
router.get('/', async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

// GET - Single user by ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id);
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

// PUT - Update user by ID
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: (error instanceof Error) ? error.message : 'An unknown error occurred'
    });
  }
});

// DELETE - User by ID
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

// GET - All friends of a user
router.get('/:id/friends', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.friends);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});

// GET - Specific friend of a user
router.get('/:userId/friends/:friendId', async (req: Request<{ userId: string, friendId: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friend = user.friends.find(
      (friend: any) => friend._id.toString() === req.params.friendId
    );

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found in user\'s friends list' });
    }

    return res.json(friend);
  } catch (err) {
    return res.status(500).json({ 
      error: (err instanceof Error) ? err.message : 'An unknown error occurred' 
    });
  }
});
// POST - Add a new friend to a user's friend list
router.post('/:id/friends/:friendId', async (req: Request<{ id: string; friendId: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Add the friend's ID to the user's friend list if not already added
    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    return res.json({ message: 'Friend added successfully', friends: user.friends });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
});
// DELETE - Remove a friend from a user's friend list
router.delete('/:id/friends/:friendId', async (req: Request<{ id: string; friendId: string }>, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the friend's ID from the user's friend list if it exists
    user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);

    await user.save();

    return res.json({ message: 'Friend removed successfully', friends: user.friends });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
});

export default router;