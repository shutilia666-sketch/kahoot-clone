import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useGameStore } from '../store/gameStore';

export const HostSetup = () => {
  const navigate = useNavigate();
  const { request } = useApi();
  const user = useGameStore((state) => state.user);
  const setRoom = useGameStore((state) => state.setRoom);
  const setLoading = useGameStore((state) => state.setLoading);
  const setError = useGameStore((state) => state.setError);

  const [step, setStep] = useState<'quiz' | 'settings' | 'ready'>(user ? 'quiz' : 'quiz');
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [settings, setSettings] = useState({
    timePerQuestion: 30,
    showCorrectAnswer: true,
    showLeaderboardAfterQuestion: true,
    shuffleAnswers: true,
    shuffleQuestions: false,
    pointsForSpeed: true,
    enableEvents: false,
    enableMiniGames: false,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Требуется авторизация</h2>
          <p className="mb-6 text-gray-600">Пожалуйста, войдите или зарегистрируйтесь</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      const room = await request('post', '/rooms/create', {
        quizId: selectedQuizId,
        settings,
      });
      setRoom(room);
      setLoading(false);
      navigate(`/waiting-room/${room.id}`);
    } catch (error) {
      setError('Ошибка при создании комнаты');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8 text-center">Создание игры</h1>

          {step === 'quiz' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Выберите квиз</h2>
              <p className="text-gray-600 mb-6">Пока список квизов недоступен. Для демонстрации используйте ID.</p>
              <input
                type="text"
                placeholder="Введите ID квиза (или пропустите)"
                className="input mb-4"
                value={selectedQuizId}
                onChange={(e) => setSelectedQuizId(e.target.value)}
              />
              <button
                onClick={() => setStep('settings')}
                disabled={!selectedQuizId}
                className="btn-primary w-full disabled:opacity-50"
              >
                Далее
              </button>
            </div>
          )}

          {step === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Настройки игры</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">Время на вопрос (сек)</label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    className="input"
                    value={settings.timePerQuestion}
                    onChange={(e) => setSettings({ ...settings, timePerQuestion: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'showCorrectAnswer', label: 'Показывать правильный ответ' },
                    { key: 'showLeaderboardAfterQuestion', label: 'Показывать таблицу после вопроса' },
                    { key: 'shuffleAnswers', label: 'Перемешивать ответы' },
                    { key: 'shuffleQuestions', label: 'Перемешивать вопросы' },
                    { key: 'pointsForSpeed', label: 'Очки за скорость' },
                    { key: 'enableEvents', label: 'Включить события' },
                    { key: 'enableMiniGames', label: 'Включить мини-игры' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[key as keyof typeof settings] as boolean}
                        onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={() => setStep('quiz')} className="btn-secondary flex-1">
                  Назад
                </button>
                <button onClick={() => setStep('ready')} className="btn-primary flex-1">
                  Далее
                </button>
              </div>
            </div>
          )}

          {step === 'ready' && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Готово!</h2>
              <p className="text-gray-600 mb-6">Нажмите для создания комнаты и начала ожидания игроков</p>
              <button onClick={handleCreateRoom} className="btn-primary w-full">
                Создать комнату
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
