import { Router, Request, Response } from 'express';
import { startGame, getGameSession, submitAnswer, getLeaderboard, finishGame } from '../services/gameService';
import { SubmitAnswerSchema } from '../utils/validators';

const router = Router();

router.post('/:roomId/start', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const gameSession = await startGame(roomId);
    res.json(gameSession);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/:gameSessionId', async (req: Request, res: Response) => {
  try {
    const { gameSessionId } = req.params;
    const gameSession = await getGameSession(gameSessionId);
    if (!gameSession) return res.status(404).json({ error: 'Game session not found' });
    res.json(gameSession);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/:gameSessionId/answer', async (req: Request, res: Response) => {
  try {
    const { gameSessionId } = req.params;
    const { playerId, questionId, answer, responseTime } = SubmitAnswerSchema.parse(req.body);
    const playerAnswer = await submitAnswer(gameSessionId, questionId, playerId, answer, responseTime);
    res.json(playerAnswer);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/:gameSessionId/leaderboard', async (req: Request, res: Response) => {
  try {
    const { gameSessionId } = req.params;
    const leaderboard = await getLeaderboard(gameSessionId);
    res.json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/:gameSessionId/finish', async (req: Request, res: Response) => {
  try {
    const { gameSessionId } = req.params;
    const gameSession = await finishGame(gameSessionId);
    res.json(gameSession);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
