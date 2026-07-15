import { create } from 'zustand';
import { Room, Player, Question, Score } from '../types';

interface GameState {
  // Auth
  user: any | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;

  // Room
  room: Room | null;
  setRoom: (room: Room) => void;
  updatePlayers: (players: Player[]) => void;
  clearRoom: () => void;

  // Game
  currentQuestion: Question | null;
  setCurrentQuestion: (question: Question) => void;
  scores: Score[];
  setScores: (scores: Score[]) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;

  // Player
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player) => void;

  // UI
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Auth
  user: null,
  token: localStorage.getItem('token'),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, room: null, currentPlayer: null });
  },

  // Room
  room: null,
  setRoom: (room) => set({ room }),
  updatePlayers: (players) => set((state) => ({
    room: state.room ? { ...state.room, players } : null,
  })),
  clearRoom: () => set({ room: null, currentPlayer: null }),

  // Game
  currentQuestion: null,
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  scores: [],
  setScores: (scores) => set({ scores }),
  gameStarted: false,
  setGameStarted: (started) => set({ gameStarted: started }),

  // Player
  currentPlayer: null,
  setCurrentPlayer: (player) => set({ currentPlayer: player }),

  // UI
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));
