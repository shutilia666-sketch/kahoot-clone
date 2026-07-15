import { v4 as uuidv4 } from 'uuid';

export const generatePIN = (): string => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const generateQRCode = (pin: string): string => {
  // TODO: Implement QR code generation
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pin}`;
};

export const calculatePoints = (responseTime: number, timeLimit: number, isCorrect: boolean, speedBonus: boolean = true): number => {
  if (!isCorrect) return 0;

  let points = 1000;
  if (speedBonus) {
    const speedFactor = Math.max(0, 1 - responseTime / (timeLimit * 1000));
    points += Math.floor(500 * speedFactor);
  }

  return points;
};

export const calculateAccuracy = (correctAnswers: number, totalQuestions: number): number => {
  if (totalQuestions === 0) return 0;
  return correctAnswers / totalQuestions;
};
