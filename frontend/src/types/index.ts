export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  isHost: boolean;
}

export interface Room {
  id: string;
  pin: string;
  qrCode?: string;
  quizId: string;
  hostId: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'FINISHED';
  players: Player[];
  settings?: RoomSettings;
  maxPlayers: number;
}

export interface RoomSettings {
  timePerQuestion: number;
  showCorrectAnswer: boolean;
  showLeaderboardAfterQuestion: boolean;
  shuffleAnswers: boolean;
  shuffleQuestions: boolean;
  pointsForSpeed: boolean;
  enableEvents: boolean;
  enableMiniGames: boolean;
}

export interface Player {
  id: string;
  username: string;
  avatarUrl?: string;
  color?: string;
  totalScore: number;
  joinedAt: string;
  leftAt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  coverImageUrl?: string;
  questionCount: number;
  questions?: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  order: number;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  timeLimit: number;
  answers: QuestionAnswer[];
}

export type QuestionType = 
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_SELECT'
  | 'TRUE_FALSE'
  | 'TEXT'
  | 'NUMBER'
  | 'ORDERING'
  | 'MATCHING'
  | 'IMAGE_POINT'
  | 'AREA_HIGHLIGHT'
  | 'HOTSPOT'
  | 'AUDIO'
  | 'VIDEO';

export interface QuestionAnswer {
  id: string;
  questionId: string;
  order: number;
  text: string;
  isCorrect: boolean;
  pointsValue: number;
}

export interface GameSession {
  id: string;
  roomId: string;
  quizId: string;
  currentQuestionIndex: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';
  startedAt?: string;
  finishedAt?: string;
}

export interface Score {
  rank: number;
  player: Player;
  points: number;
}
