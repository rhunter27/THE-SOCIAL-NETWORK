import Thought from '../../models/Thoughts';
import { Router, Request, Response } from 'express';


const router = Router();

// Get all thoughts
router.get('/', async (_: Request, res: Response): Promise<Response> => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json({
      error: (err instanceof Error) ? err.message : 'An unknown error occurred'
    });
  }
});

// GET TO A SINGLE THOUGHT BY ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({
      error: (err instanceof Error) ? err.message : 'An unknown error occurred'
    });
  }
});

// POST to create a new thoughtDon't forget to push the created thought's _id to the associated user's thoughts array field. (note that the examples below are just sample data):
router.post('/:id', async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.create(req.body);
    // Assuming you have a User model and a userId in the request body
    // await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    return res.status(201).json(thought);
  } catch (err) {
    return res.status(500).json({
      error: (err instanceof Error) ? err.message : 'An unknown error occurred'
    });
  }
});
// PUT to update a thought by id
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    // Validate request body
    if (!req.body.thoughtText) {
      return res.status(400).json({ error: 'thoughtText is required' });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id, // Just pass the ID directly
      { thoughtText: req.body.thoughtText }, // Specify fields to update
      { new: true, runValidators: true } // Return updated doc and run validators
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid thought ID format' });
    }
    return res.status(500).json({
      error: (error instanceof Error) ? error.message : 'An unknown error occurred'
    });
  }
});
// DELETE to remove a thought by id
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    return res.status(500).json({
      error: (err instanceof Error) ? err.message : 'An unknown error occurred'
    });
  }
});

export default router;