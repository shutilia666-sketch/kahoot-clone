import prisma from '../config/database';
import { generatePIN, generateQRCode } from '../utils/helpers';
import { CreateRoomSchema } from '../utils/validators';
import { z } from 'zod';

export const createRoom = async (
  quizId: string,
  hostId: string,
  settings: z.infer<typeof CreateRoomSchema>['settings']
) => {
  const pin = generatePIN();
  const qrCode = generateQRCode(pin);

  const room = await prisma.room.create({
    data: {
      pin,
      qrCode,
      quizId,
      hostId,
      status: 'WAITING',
      settings: {
        create: {
          timePerQuestion: settings?.timePerQuestion || 30,
          showCorrectAnswer: settings?.showCorrectAnswer ?? true,
          showLeaderboardAfterQuestion: settings?.showLeaderboardAfterQuestion ?? true,
          shuffleAnswers: settings?.shuffleAnswers ?? true,
          shuffleQuestions: settings?.shuffleQuestions ?? false,
          pointsForSpeed: settings?.pointsForSpeed ?? true,
          enableEvents: settings?.enableEvents ?? false,
          enableMiniGames: settings?.enableMiniGames ?? false,
        },
      },
    },
    include: { settings: true },
  });

  return room;
};

export const joinRoom = async (pin: string, username: string, avatarUrl?: string) => {
  const room = await prisma.room.findUnique({
    where: { pin },
    include: { players: true },
  });

  if (!room) throw new Error('Room not found');
  if (room.status !== 'WAITING') throw new Error('Room is not accepting new players');
  if (room.players.length >= room.maxPlayers) throw new Error('Room is full');

  const player = await prisma.player.create({
    data: {
      roomId: room.id,
      username,
      avatarUrl,
    },
  });

  return { room, player };
};

export const getRoom = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      players: true,
      settings: true,
      quiz: { include: { questions: true } },
    },
  });

  return room;
};

export const getRoomByPin = async (pin: string) => {
  const room = await prisma.room.findUnique({
    where: { pin },
    include: {
      players: true,
      settings: true,
      quiz: true,
    },
  });

  return room;
};
