# Kahoot Clone - Frontend

Frontend приложения Kahoot Clone на React с Vite, TypeScript, TailwindCSS и Socket.IO.

## Установка

### 1. Установите зависимости

```bash
cd frontend
npm install
```

### 2. Настройте переменные окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Отредактируйте `.env` при необходимости:

```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

## Разработка

### Запуск сервера разработки

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
```

### Предпросмотр продакшена

```bash
npm run preview
```

## Структура проекта

```
src/
├── pages/              # Страницы приложения
│   ├── Home.tsx
│   ├── HostSetup.tsx
│   ├── PlayerJoin.tsx
│   ├── WaitingRoom.tsx
│   ├── GameHost.tsx
│   ├── GamePlayer.tsx
│   └── Results.tsx
├── components/         # Переиспользуемые компоненты
├── hooks/             # Custom hooks
│   ├── useSocket.ts   # Socket.IO hook
│   └── useApi.ts      # API hook
├── store/             # Zustand store
│   └── gameStore.ts
├── config/            # Конфигурация
│   ├── api.ts         # Axios instance
│   └── socket.ts      # Socket.IO setup
├── types/             # TypeScript типы
└── App.tsx            # Main component
```

## Страницы

### Home (`/`)
Главная страница с кнопками "Создать игру" и "Присоединиться"

### HostSetup (`/host-setup`)
Создание новой игры (выбор квиза и настроек)

### PlayerJoin (`/player-join`)
Присоединение к игре по PIN

### WaitingRoom (`/waiting-room/:roomId`)
Ожидание начала игры, отображение входящих игроков

### GameHost (`/game-host/:roomId`)
Вид хоста во время игры (отображение вопроса, таймера, таблицы лидеров)

### GamePlayer (`/game/:roomId`)
Вид игрока во время игры (отображение вопроса и вариантов ответов)

### Results (`/results/:roomId`)
Финальные результаты игры

## Hooks

### useSocket()
Управление Socket.IO соединением

```typescript
const { emit, on, off } = useSocket();

// Отправить событие
emit('room:join', { roomId, playerId, playerName });

// Слушать событие
on('room:updated', (data) => console.log(data));

// Отписаться от события
off('room:updated');
```

### useApi()
Управление API запросами

```typescript
const { request, loading, error } = useApi();

// Сделать запрос
const data = await request('get', '/endpoint');
const data = await request('post', '/endpoint', { body });
```

## Zustand Store

Управление глобальным состоянием:

```typescript
const { user, setUser, token, setToken, logout } = useGameStore();
const { room, setRoom, updatePlayers } = useGameStore();
const { currentQuestion, setCurrentQuestion } = useGameStore();
const { scores, setScores } = useGameStore();
```

## Стили

Проект использует TailwindCSS для стилизации. Кастомные стили в `src/index.css`:

```css
.btn-primary   /* Основная кнопка */
.btn-secondary /* Вторичная кнопка */
.btn-danger    /* Кнопка опасного действия */
.card          /* Карточка */
.input         /* Поле ввода */
```

## Адаптивность

Проект полностью адаптивен:
- Мобильные телефоны (< 640px)
- Планшеты (640px - 1024px)
- Ноутбуки (> 1024px)
- Телевизоры/Проекторы (> 1920px)

## Переменные окружения

- `VITE_API_URL` - URL backend API
- `VITE_SOCKET_URL` - URL для Socket.IO соединения
