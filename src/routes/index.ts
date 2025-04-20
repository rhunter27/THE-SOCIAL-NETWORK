import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';
// Import the user and thought routes

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;