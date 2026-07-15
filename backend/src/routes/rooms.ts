import { Router, Request, Response } from 'express';
import { createRoom, joinRoom, getRoom, getRoomByPin } from '../services/roomService';
import { CreateRoomSchema, JoinRoomSchema } from '../utils/validators';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/create', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { quizId, settings } = CreateRoomSchema.parse(req.body);
    const room = await createRoom(quizId, req.user!.id, settings);
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/join', async (req: Request, res: Response) => {
  try {
    const { pin, username, avatarUrl } = JoinRoomSchema.parse(req.body);
    const { room, player } = await joinRoom(pin, username, avatarUrl);
    res.json({ room, player });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/:roomId', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await getRoom(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/pin/:pin', async (req: Request, res: Response) => {
  try {
    const { pin } = req.params;
    const room = await getRoomByPin(pin);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
