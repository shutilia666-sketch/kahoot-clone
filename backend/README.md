# Kahoot Clone - Backend

Backend приложения Kahoot Clone на Express.js с TypeScript, Prisma ORM и Socket.IO для вещественной коммуникации.

## Установка

### 1. Установите зависимости

```bash
cd backend
npm install
```

### 2. Настройте переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```bash
cp .env.example .env
```

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/kahoot_clone
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRY=7d
```

### 3. Настройте базу данных

```bash
# Создайте базу данных PostgreSQL
sudo -u postgres createdb kahoot_clone

# Запустите миграции
npm run prisma:migrate
```

## Разработка

### Запуск сервера в режиме разработки

```bash
npm run dev
```

Сервер будет доступен на `http://localhost:3001`

### Генерация Prisma клиента

```bash
npm run prisma:generate
```

### Просмотр БД через Prisma Studio

```bash
npm run prisma:studio
```

## Структура проекта

```
src/
├── config/           # Конфигурация (JWT, БД)
├── controllers/      # Контроллеры (бизнес-логика)
├── middleware/       # Middleware (auth, validation)
├── routes/          # API маршруты
├── services/        # Бизнес-сервисы
├── socket/          # Socket.IO handlers
├── types/           # TypeScript типы
├── utils/           # Утилиты и хелперы
└── server.ts        # Главный файл
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход

### Rooms
- `POST /api/rooms/create` - Создать комнату (требует auth)
- `POST /api/rooms/join` - Присоединиться к комнате
- `GET /api/rooms/:roomId` - Получить информацию о комнате
- `GET /api/rooms/pin/:pin` - Найти комнату по PIN

### Games
- `POST /api/games/:roomId/start` - Начать игру
- `GET /api/games/:gameSessionId` - Получить состояние игры
- `POST /api/games/:gameSessionId/answer` - Отправить ответ
- `GET /api/games/:gameSessionId/leaderboard` - Получить таблицу лидеров
- `POST /api/games/:gameSessionId/finish` - Завершить игру

## Socket.IO Events

### Клиент → Сервер
- `room:join` - Присоединиться к комнате
- `game:start` - Начать игру
- `question:show` - Показать вопрос
- `answer:submit` - Отправить ответ
- `question:end` - Завершить вопрос
- `leaderboard:update` - Обновить таблицу
- `game:finish` - Завершить игру
- `room:leave` - Покинуть комнату

### Сервер → Клиент
- `room:joined` - Успешное присоединение
- `room:updated` - Обновление списка игроков
- `game:started` - Игра началась
- `question:displayed` - Вопрос отображен
- `answer:received` - Ответ получен
- `question:ended` - Вопрос завершен
- `leaderboard:updated` - Таблица обновлена
- `game:finished` - Игра завершена

## Сборка

```bash
npm run build
```

## Запуск в продакшене

```bash
npm run start
```
