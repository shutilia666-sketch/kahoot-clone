import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useSocket } from '../hooks/useSocket';
import { useApi } from '../hooks/useApi';

export const GamePlayer = () => {
  const { roomId } = useParams();
  const currentQuestion = useGameStore((state) => state.currentQuestion);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const { emit } = useSocket();
  const { request } = useApi();

  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimeLeft(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmitAnswer = async () => {
    if (!selectedAnswerId || !currentQuestion || !currentPlayer) return;

    setAnswered(true);
    const responseTime = Date.now() - startTime;

    try {
      await request('post', `/games/${roomId}/answer`, {
        playerId: currentPlayer.id,
        questionId: currentQuestion.id,
        answer: selectedAnswerId,
        responseTime,
      });

      emit('answer:submit', {
        roomId,
        playerId: currentPlayer.id,
        answer: selectedAnswerId,
        responseTime,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (!currentQuestion || !currentPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="card text-center">
          <p className="text-lg">Игра загружается...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex items-center justify-center">
      <div className="card w-full max-w-2xl">
        {/* Таймер */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold ${
            timeLeft > 10 ? 'text-green-500' : timeLeft > 5 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {timeLeft}
          </div>
        </div>

        {/* Вопрос */}
        <h2 className="text-3xl font-bold mb-8 text-center">{currentQuestion.text}</h2>

        {/* Варианты ответов */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => !answered && setSelectedAnswerId(answer.id)}
              disabled={answered || timeLeft === 0}
              className={`p-6 rounded-lg font-bold text-lg transition-all ${
                selectedAnswerId === answer.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105'
                  : 'bg-white text-gray-800 hover:shadow-lg'
              } disabled:opacity-50`}
            >
              {answer.text}
            </button>
          ))}
        </div>

        {!answered && timeLeft > 0 && (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswerId}
            className="btn-primary w-full mt-8 disabled:opacity-50"
          >
            Ответить
          </button>
        )}

        {(answered || timeLeft === 0) && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-center text-gray-600">
            Ожидание других игроков...
          </div>
        )}
      </div>
    </div>
  );
};
