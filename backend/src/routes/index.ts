import { Router } from 'express';
import authRoutes from './auth';
import roomRoutes from './rooms';
import gameRoutes from './games';

const router = Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/games', gameRoutes);

export default router;
