import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { RegisterUserSchema, LoginUserSchema } from '../utils/validators';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = RegisterUserSchema.parse(req.body);
    const user = await registerUser(username, email, password);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = LoginUserSchema.parse(req.body);
    const { user, token } = await loginUser(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
