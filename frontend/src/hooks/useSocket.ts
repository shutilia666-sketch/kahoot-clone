import { useEffect, useCallback } from 'react';
import { getSocket, connectSocket } from '../config/socket';
import { useGameStore } from '../store/gameStore';

export const useSocket = () => {
  const updatePlayers = useGameStore((state) => state.updatePlayers);
  const setScores = useGameStore((state) => state.setScores);
  const setCurrentQuestion = useGameStore((state) => state.setCurrentQuestion);
  const setGameStarted = useGameStore((state) => state.setGameStarted);

  useEffect(() => {
    connectSocket();
  }, []);

  const emit = useCallback((event: string, data?: any) => {
    const socket = getSocket();
    if (socket) {
      socket.emit(event, data);
    }
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    const socket = getSocket();
    if (socket) {
      socket.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string) => {
    const socket = getSocket();
    if (socket) {
      socket.off(event);
    }
  }, []);

  return { emit, on, off };
};
