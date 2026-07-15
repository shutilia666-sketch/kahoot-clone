import { Socket, Server } from 'socket.io';
import { GameState, PlayerInfo } from '../types';

const gameStates: Map<string, GameState> = new Map();

export const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Join room
    socket.on('room:join', (data: { roomId: string; playerId: string; playerName: string }) => {
      const { roomId, playerId, playerName } = data;
      socket.join(roomId);

      let gameState = gameStates.get(roomId) || {
        roomId,
        currentQuestionIndex: 0,
        status: 'waiting',
        players: [],
        scores: {},
      };

      gameState.players.push({
        id: playerId,
        username: playerName,
        score: 0,
      });

      gameStates.set(roomId, gameState);

      io.to(roomId).emit('room:updated', gameState);
      socket.emit('room:joined', { success: true, gameState });
    });

    // Start game
    socket.on('game:start', (data: { roomId: string }) => {
      const { roomId } = data;
      const gameState = gameStates.get(roomId);

      if (!gameState) return;

      gameState.status = 'in_progress';
      gameState.currentQuestionIndex = 0;

      io.to(roomId).emit('game:started', gameState);
    });

    // Show question
    socket.on('question:show', (data: { roomId: string; question: any }) => {
      const { roomId, question } = data;
      io.to(roomId).emit('question:displayed', question);
    });

    // Submit answer
    socket.on('answer:submit', (data: { roomId: string; playerId: string; answer: any; responseTime: number }) => {
      const { roomId, playerId, answer, responseTime } = data;
      io.to(roomId).emit('answer:received', { playerId, answer, responseTime });
    });

    // Show correct answer
    socket.on('question:end', (data: { roomId: string; correctAnswer: any; scores: Record<string, number> }) => {
      const { roomId, correctAnswer, scores } = data;
      const gameState = gameStates.get(roomId);

      if (gameState) {
        gameState.scores = scores;
      }

      io.to(roomId).emit('question:ended', { correctAnswer, scores });
    });

    // Update leaderboard
    socket.on('leaderboard:update', (data: { roomId: string; leaderboard: any[] }) => {
      const { roomId, leaderboard } = data;
      io.to(roomId).emit('leaderboard:updated', leaderboard);
    });

    // Finish game
    socket.on('game:finish', (data: { roomId: string; finalResults: any[] }) => {
      const { roomId, finalResults } = data;
      io.to(roomId).emit('game:finished', finalResults);
      gameStates.delete(roomId);
    });

    // Leave room
    socket.on('room:leave', (data: { roomId: string; playerId: string }) => {
      const { roomId, playerId } = data;
      socket.leave(roomId);

      const gameState = gameStates.get(roomId);
      if (gameState) {
        gameState.players = gameState.players.filter((p) => p.id !== playerId);
        io.to(roomId).emit('room:updated', gameState);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
