import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useSocket } from '../hooks/useSocket';

export const GameHost = () => {
  const { roomId } = useParams();
  const room = useGameStore((state) => state.room);
  const currentQuestion = useGameStore((state) => state.currentQuestion);
  const scores = useGameStore((state) => state.scores);
  const { emit, on } = useSocket();

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          emit('question:end', { roomId, correctAnswer: currentQuestion.answers.find((a) => a.isCorrect), scores });
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="card text-center">
          <p className="text-lg">Игра загружается...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Вопрос */}
        <div className="card mb-8">
          <h2 className="text-3xl font-bold mb-4">{currentQuestion.text}</h2>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-600">Вопрос {currentQuestion.order}</span>
            <div className="text-4xl font-bold text-red-500">{timeLeft}s</div>
          </div>
        </div>

        {/* Таблица лидеров */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-4">Таблица лидеров</h3>
          <div className="space-y-2">
            {scores.map((score) => (
              <div key={score.player.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-purple-600 w-8">{score.rank}</span>
                  <p className="font-semibold">{score.player.username}</p>
                </div>
                <span className="text-2xl font-bold text-purple-600">{score.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
