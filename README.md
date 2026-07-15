# Kahoot Clone - Complete Project

🎮 **Веб-платформа для проведения онлайн-викторин**

Полностью функциональное приложение с поддержкой multiple question types, real-time leaderboards, и адаптивным дизайном.

## 🚀 Быстрый старт

### С Docker (Рекомендуется)

```bash
git clone https://github.com/shutilia666-sketch/kahoot-clone.git
cd kahoot-clone
cp .env.example .env
docker-compose up -d
```

Приложение доступно на **http://localhost:3000**

### Локально (без Docker)

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📖 Документация

- [Getting Started](./GETTING_STARTED.md) - подробное руководство
- [Требования](./docs/REQUIREMENTS.md) - функциональные требования
- [Архитектура](./docs/ARCHITECTURE.md) - структура приложения
- [Docker Setup](./docker/DOCKER.md) - развертывание

## 🎯 Основные возможности

✅ **12+ типов вопросов**
- Множественный выбор
- Несколько правильных ответов
- Правда/Ложь
- Текстовый ответ
- Числовой ответ
- Порядок
- Соединение пар
- Точка на изображении
- Выделение области
- Горячие точки
- Аудио вопросы
- Видео вопросы

✅ **Вещественная коммуникация**
- Socket.IO для real-time обновлений
- Синхронизация всех клиентов
- Таблица лидеров в реальном времени

✅ **Игровые возможности**
- Система подсчёта очков
- Бонус за скорость
- Мини-игры (сундуки)
- События и случайные бонусы
- Настраиваемые параметры

✅ **Пользовательский интерфейс**
- Адаптивный дизайн
- Поддержка мобильных устройств
- QR-код для присоединения
- PIN-коды для комнат
- Выбор аватаров

## 🏗️ Архитектура

### Backend Stack
- **Node.js** - runtime
- **Express.js** - веб-фреймворк
- **TypeScript** - типизация
- **Prisma** - ORM
- **PostgreSQL** - база данных
- **Socket.IO** - вещественная коммуникация

### Frontend Stack
- **React 18** - UI библиотека
- **Vite** - bundler
- **TypeScript** - типизация
- **TailwindCSS** - стили
- **Zustand** - управление состоянием
- **Socket.IO Client** - WebSocket клиент

### DevOps
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация
- **Nginx** - reverse proxy
- **PostgreSQL** - база данных

## 📊 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Rooms
- `POST /api/rooms/create`
- `POST /api/rooms/join`
- `GET /api/rooms/:roomId`
- `GET /api/rooms/pin/:pin`

### Games
- `POST /api/games/:roomId/start`
- `GET /api/games/:gameSessionId`
- `POST /api/games/:gameSessionId/answer`
- `GET /api/games/:gameSessionId/leaderboard`
- `POST /api/games/:gameSessionId/finish`

## 🔌 Socket.IO Events

### Client → Server
- `room:join` - присоединиться к комнате
- `game:start` - начать игру
- `question:show` - показать вопрос
- `answer:submit` - отправить ответ
- `question:end` - завершить вопрос
- `leaderboard:update` - обновить таблицу
- `game:finish` - завершить игру
- `room:leave` - покинуть комнату

### Server → Client
- `room:joined` - успешное присоединение
- `room:updated` - обновление списка игроков
- `game:started` - игра началась
- `question:displayed` - вопрос отображён
- `answer:received` - ответ получен
- `question:ended` - вопрос завершён
- `leaderboard:updated` - таблица обновлена
- `game:finished` - игра завершена

## 📁 Структура проекта

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── prisma/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── config/
│   │   ├── types/
│   │   └── App.tsx
│   └── Dockerfile
├── docs/
├── docker-compose.yml
├── nginx.conf
└── GETTING_STARTED.md
```

## 🚀 Развертывание

### Production с Docker

```bash
# Клонировать
git clone https://github.com/shutilia666-sketch/kahoot-clone.git
cd kahoot-clone

# Конфигурировать
cp .env.example .env
# Редактировать .env для production

# Запустить
docker-compose up -d

# Миграции
docker-compose exec backend npm run prisma:migrate
```

### На облачном сервере (DigitalOcean, Heroku, AWS)

См. [Docker Setup](./docker/DOCKER.md) для подробных инструкций.

## 🔐 Безопасность

- JWT токены
- Bcrypt хеширование
- CORS настройка
- HTTPS поддержка
- Rate limiting (рекомендуется)
- SQL injection защита (Prisma)

## 📱 Браузеры

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari
- Chrome Mobile

## 🎓 Обучение

См. [документацию](./docs/) для подробного изучения каждого компонента.

## 🐛 Известные проблемы

Нет известных критических проблем. Последняя версия полностью функциональна.

## 🤝 Контрибьютинг

Открыто для улучшений! Создавайте issues и pull requests.

## 📄 Лицензия

MIT License - свободное использование в личных и коммерческих проектах

## 👨‍💻 Создатель

**shutilia666-sketch**
- GitHub: [@shutilia666-sketch](https://github.com/shutilia666-sketch)
- Email: shutilia666@gmail.com

---

**Готовый к использованию проект! 🎉**
