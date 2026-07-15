import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export const Home = () => {
  const navigate = useNavigate();
  const user = useGameStore((state) => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">Kahoot Clone</h1>
        <p className="text-xl text-white mb-12 opacity-90">Веб-платформа для проведения онлайн-викторин</p>

        <div className="flex gap-6 justify-center flex-wrap">
          <button
            onClick={() => navigate('/host-setup')}
            className="btn-primary text-xl py-4 px-8"
          >
            🎮 Создать игру
          </button>
          <button
            onClick={() => navigate('/player-join')}
            className="btn-secondary text-xl py-4 px-8"
          >
            📱 Присоединиться
          </button>
        </div>

        {user && (
          <div className="mt-8 text-white opacity-75">
            <p>Добро пожаловать, {user.username}!</p>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-purple-600">🎯 12+ типов вопросов</h3>
            <p className="text-gray-600">От множественного выбора до интерактивных вопросов с изображениями</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-purple-600">⚡ Вещественная коммуникация</h3>
            <p className="text-gray-600">Синхронизация в реальном времени через WebSocket</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-purple-600">🏆 Таблица лидеров</h3>
            <p className="text-gray-600">Отслеживайте результаты игроков в режиме реального времени</p>
          </div>
        </div>
      </div>
    </div>
  );
};
