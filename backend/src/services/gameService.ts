import prisma from '../config/database';
import { calculatePoints, calculateAccuracy } from '../utils/helpers';

export const startGame = async (roomId: string) => {
  const gameSession = await prisma.gameSession.create({
    data: {
      roomId,
      quizId: (await prisma.room.findUnique({ where: { id: roomId } }))?.quizId || '',
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    },
  });

  return gameSession;
};

export const getGameSession = async (gameSessionId: string) => {
  const session = await prisma.gameSession.findUnique({
    where: { id: gameSessionId },
    include: {
      playerAnswers: true,
      scores: true,
      room: { include: { players: true, quiz: { include: { questions: true } } } },
    },
  });

  return session;
};

export const submitAnswer = async (
  gameSessionId: string,
  questionId: string,
  playerId: string,
  answer: any,
  responseTime: number
) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { answers: true },
  });

  if (!question) throw new Error('Question not found');

  // Determine if answer is correct based on question type
  const isCorrect = checkAnswerCorrectness(answer, question.answers);

  const playerAnswer = await prisma.playerAnswer.create({
    data: {
      gameSessionId,
      questionId,
      playerId,
      answerText: typeof answer === 'string' ? answer : JSON.stringify(answer),
      isCorrect,
      responseTime,
      pointsEarned: 0,
    },
  });

  return playerAnswer;
};

const checkAnswerCorrectness = (answer: any, correctAnswers: any[]): boolean => {
  // TODO: Implement proper answer checking logic based on question type
  return true;
};

export const getLeaderboard = async (gameSessionId: string) => {
  const scores = await prisma.score.findMany({
    where: { gameSessionId },
    include: { player: true },
    orderBy: { points: 'desc' },
  });

  return scores.map((score, index) => ({
    rank: index + 1,
    player: score.player,
    points: score.points,
  }));
};

export const finishGame = async (gameSessionId: string) => {
  const gameSession = await prisma.gameSession.update({
    where: { id: gameSessionId },
    data: {
      status: 'FINISHED',
      finishedAt: new Date(),
    },
  });

  return gameSession;
};
