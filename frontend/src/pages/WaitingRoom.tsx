import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { useGameStore } from '../store/gameStore';
import { useSocket } from '../hooks/useSocket';
import { useApi } from '../hooks/useApi';

export const WaitingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = useGameStore((state) => state.room);
  const user = useGameStore((state) => state.user);
  const { emit, on } = useSocket();
  const { request } = useApi();

  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (room?.pin) {
      setQrUrl(`data:image/png;base64,${room.pin}`);
    }
  }, [room?.pin]);

  useEffect(() => {
    if (roomId) {
      emit('room:join', { roomId, playerId: user?.id, playerName: user?.username });
    }

    on('room:updated', (gameState) => {
      console.log('Room updated:', gameState);
    });

    on('game:started', () => {
      navigate(`/game-host/${roomId}`);
    });
  }, [roomId]);

  const handleStartGame = async () => {
    try {
      await request('post', `/games/${roomId}/start`);
      emit('game:start', { roomId });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="card text-center">
          <p className="text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  const isHost = user?.id === room.hostId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* QR Code и PIN */}
          <div className="card text-center">
            <h2 className="text-2xl font-bold mb-4">Подключиться</h2>
            <div className="mb-4">
              <QRCode value={room.pin} size={200} />
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">{room.pin}</p>
            <p className="text-gray-600">или отсканируйте QR-код</p>
          </div>

          {/* Список игроков */}
          <div className="card md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Игроки ({room.players.length}/{room.maxPlayers})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {room.players.map((player) => (
                <div key={player.id} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 text-center">
                  {player.avatarUrl ? (
                    <img src={player.avatarUrl} alt={player.username} className="w-16 h-16 rounded-full mx-auto mb-2" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto mb-2 flex items-center justify-center text-2xl text-white">
                      {player.username[0].toUpperCase()}
                    </div>
                  )}
                  <p className="font-semibold truncate">{player.username}</p>
                  <p className="text-sm text-gray-600">{player.totalScore} очков</p>
                </div>
              ))}
            </div>

            {isHost && (
              <button onClick={handleStartGame} className="btn-primary w-full">
                Начать игру
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
