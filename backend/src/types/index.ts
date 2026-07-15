export interface JwtPayload {
  id: string;
  username: string;
  isHost: boolean;
}

export interface GameState {
  roomId: string;
  currentQuestionIndex: number;
  status: 'waiting' | 'in_progress' | 'finished';
  players: PlayerInfo[];
  scores: Record<string, number>;
}

export interface PlayerInfo {
  id: string;
  username: string;
  avatarUrl?: string;
  color?: string;
  score: number;
}

export interface AnswerSubmission {
  playerId: string;
  questionId: string;
  answer: any;
  responseTime: number;
}

export interface QuestionData {
  id: string;
  text: string;
  type: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  answers: AnswerOption[];
  timeLimit: number;
}

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
