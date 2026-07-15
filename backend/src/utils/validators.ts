import { z } from 'zod';

export const CreateRoomSchema = z.object({
  quizId: z.string().uuid(),
  settings: z.object({
    timePerQuestion: z.number().min(5).max(300),
    showCorrectAnswer: z.boolean(),
    showLeaderboardAfterQuestion: z.boolean(),
    shuffleAnswers: z.boolean(),
    shuffleQuestions: z.boolean(),
    pointsForSpeed: z.boolean(),
    enableEvents: z.boolean(),
    enableMiniGames: z.boolean(),
  }).optional(),
});

export const JoinRoomSchema = z.object({
  pin: z.string().length(6),
  username: z.string().min(1).max(50),
  avatarUrl: z.string().url().optional(),
});

export const SubmitAnswerSchema = z.object({
  playerId: z.string().uuid(),
  questionId: z.string().uuid(),
  answer: z.any(),
  responseTime: z.number().min(0),
});

export const CreateQuizSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  isPublic: z.boolean().optional(),
  coverImageUrl: z.string().url().optional(),
});

export const RegisterUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
