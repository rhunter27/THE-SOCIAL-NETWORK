import { Router, Request, Response } from 'express';

const router = Router();

router.get('/example', async (_: Request, res: Response) => {
  try {
    // Your async logic here
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;