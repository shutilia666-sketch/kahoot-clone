# Kahoot Clone - Getting Started

Это полностью функциональное веб-приложение для проведения онлайн-викторин.

## 🚀 Быстрый старт

### С Docker (рекомендуется)

```bash
# 1. Клонировать репозиторий
git clone https://github.com/shutilia666-sketch/kahoot-clone.git
cd kahoot-clone

# 2. Создать .env файл
cp .env.example .env

# 3. Запустить контейнеры
docker-compose up -d

# 4. Инициализировать БД (первый запуск)
docker-compose exec backend npm run prisma:migrate

# 5. Открыть приложение
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### Без Docker (локальная разработка)

#### Backend

```bash
cd backend

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env
# Отредактировать DATABASE_URL для локальной БД

# Запустить миграции
npm run prisma:migrate

# Запустить в режиме разработки
npm run dev
```

#### Frontend

```bash
cd frontend

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Запустить dev сервер
npm run dev
# Открить http://localhost:5173
```

## 📖 Документация

- [Требования](./docs/REQUIREMENTS.md) - полное описание функционала
- [Технологический стек](./docs/TECH_STACK.md) - используемые технологии
- [Архитектура](./docs/ARCHITECTURE.md) - структура приложения
- [Схема БД](./docs/DATABASE_SCHEMA.md) - модели данных
- [Docker Setup](./docker/DOCKER.md) - развертывание в контейнерах

## 🎮 Как использовать

### Для хоста (тот, кто проводит викторину)

1. Откройте приложение на основном экране (телевизор, проектор)
2. Нажмите **"Создать игру"**
3. Выберите квиз и настройки
4. Получите PIN и QR-код для игроков
5. Игроки могут присоединиться по PIN или QR-коду
6. Нажмите **"Начать игру"** когда все готовы
7. Следите за прогрессом и результатами

### Для игрока (тот, кто отвечает)

1. Откройте приложение на телефоне
2. Нажмите **"Присоединиться"**
3. Введите PIN комнаты (или отсканируйте QR-код)
4. Введите своё имя и выберите аватар
5. Ждите начала игры
6. Отвечайте на вопросы быстро!
7. Смотрите свой рейтинг в таблице лидеров

## 📋 Требования

### Системные требования

- Node.js 18+
- PostgreSQL 14+ (если не используется Docker)
- Docker & Docker Compose (для контейнеризации)

### Браузеры

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🏗️ Структура проекта

```
kahoot-clone/
├── backend/                   # Express.js + Prisma
│   ├── src/
│   │   ├── config/           # Конфигурация
│   │   ├── routes/           # API маршруты
│   │   ├── services/         # Бизнес-логика
│   │   ├── middleware/       # Middleware
│   │   ├── socket/           # Socket.IO обработчики
│   │   └── server.ts         # Главный файл
│   ├── prisma/
│   │   └── schema.prisma     # Схема БД
│   └── Dockerfile
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── pages/            # Страницы
│   │   ├── components/       # Компоненты
│   │   ├── hooks/            # Custom hooks
│   │   ├── store/            # Zustand store
│   │   ├── config/           # Конфигурация
│   │   └── App.tsx           # Главный компонент
│   └── Dockerfile
├── docs/                      # Документация
├── docker-compose.yml         # Docker конфигурация
├── nginx.conf                 # Nginx конфигурация
└── README.md
```

## 🔧 Команды

### Backend

```bash
cd backend

# Разработка
npm run dev

# Сборка
npm run build

# Запуск
npm run start

# Миграции
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

### Frontend

```bash
cd frontend

# Разработка
npm run dev

# Сборка
npm run build

# Предпросмотр
npm run preview
```

### Docker

```bash
# Запустить
docker-compose up -d

# Остановить
docker-compose down

# Логи
docker-compose logs -f

# Выполнить команду
docker-compose exec backend npm run prisma:migrate
```

## 🎯 Основные возможности

- ✅ 12+ типов вопросов (множественный выбор, текст, число, изображение и т.д.)
- ✅ Вещественная коммуникация через Socket.IO
- ✅ Таблица лидеров в реальном времени
- ✅ Система подсчёта очков с бонусом за скорость
- ✅ Настраиваемые параметры игры
- ✅ Поддержка мобильных устройств
- ✅ QR-код и PIN для присоединения
- ✅ Адаптивный дизайн для всех устройств
- ✅ Docker контейнеризация

## 🔐 Безопасность

- JWT токены для аутентификации
- Bcrypt хеширование паролей
- CORS настроены
- Rate limiting (рекомендуется добавить)
- HTTPS поддержка через Nginx

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход

### Rooms

- `POST /api/rooms/create` - создать комнату
- `POST /api/rooms/join` - присоединиться
- `GET /api/rooms/:roomId` - получить информацию

### Games

- `POST /api/games/:roomId/start` - начать игру
- `POST /api/games/:gameSessionId/answer` - отправить ответ
- `GET /api/games/:gameSessionId/leaderboard` - таблица лидеров

## 🚨 Решение проблем

### Контейнеры не запускаются

```bash
# Проверить логи
docker-compose logs

# Пересоздать контейнеры
docker-compose down -v
docker-compose up -d
```

### БД не подключается

```bash
# Проверить переменные окружения
cat .env

# Проверить миграции
docker-compose exec backend npm run prisma:migrate
```

### Frontend не подключается к backend

```bash
# Проверить переменные
echo $VITE_API_URL
echo $VITE_SOCKET_URL

# Проверить консоль браузера на ошибки
```

## 📝 Лицензия

MIT

## 👨‍💻 Контрибьютинг

Открыто для pull requests и issues!

## 📧 Контакты

Создатель: shutilia666-sketch
Почта: shutilia666@gmail.com
