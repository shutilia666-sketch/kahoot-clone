import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useGameStore } from '../store/gameStore';

export const PlayerJoin = () => {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const setRoom = useGameStore((state) => state.setRoom);
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);

  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pin || !username) {
      setError('Заполните все поля');
      return;
    }

    try {
      const { room, player } = await request('post', '/rooms/join', {
        pin,
        username,
        avatarUrl: avatar,
      });
      setRoom(room);
      setCurrentPlayer(player);
      navigate(`/game/${room.id}`);
    } catch (err) {
      setError('Ошибка при подключении');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-4">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Присоединиться к игре</h1>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">PIN комнаты</label>
            <input
              type="text"
              maxLength="6"
              placeholder="Введите 6 цифр"
              className="input text-center text-2xl tracking-widest"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Ваше имя</label>
            <input
              type="text"
              placeholder="Введите имя"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Аватар (опционально)</label>
            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              className="input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Подключение...' : 'Присоединиться'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary w-full"
          >
            Вернуться
          </button>
        </form>
      </div>
    </div>
  );
};
