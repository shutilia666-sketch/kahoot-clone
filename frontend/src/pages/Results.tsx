import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export const Results = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const scores = useGameStore((state) => state.scores);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">🎉 Результаты игры</h1>

          <div className="space-y-4 mb-8">
            {scores.map((score) => (
              <div
                key={score.player.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  score.rank === 1
                    ? 'bg-gradient-to-r from-yellow-300 to-orange-300'
                    : score.rank === 2
                    ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                    : score.rank === 3
                    ? 'bg-gradient-to-r from-orange-200 to-orange-300'
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold w-12">{score.rank === 1 ? '🥇' : score.rank === 2 ? '🥈' : score.rank === 3 ? '🥉' : score.rank}</span>
                  <p className="font-semibold text-lg">{score.player.username}</p>
                </div>
                <span className="text-3xl font-bold text-purple-600">{score.points}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/')} className="btn-primary w-full">
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};
