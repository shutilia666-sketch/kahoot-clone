# Kahoot Clone - Docker Setup

Докер конфигурация для полного развертывания приложения в контейнерах.

## Структура

```
docker-compose.yml    # Основная конфигурация
nginx.conf            # Конфигурация Nginx
backend/Dockerfile    # Docker для backend
frontend/Dockerfile   # Docker для frontend
```

## Сервисы

### 1. PostgreSQL Database (db)
- Порт: 5432
- Том: `db_data` для сохранения данных

### 2. Backend (backend)
- Порт: 3001
- Node.js + Express
- Автоматическое применение миграций Prisma

### 3. Frontend (frontend)
- Порт: 3000
- React + Vite
- Статический сервер с `serve`

### 4. Nginx (nginx)
- Порт: 80 (HTTP) и 443 (HTTPS)
- Reverse proxy для frontend, backend и Socket.IO
- Gzip компрессия

## Переменные окружения

Создайте `.env` файл в корне проекта:

```env
# Database
DB_USER=user
DB_PASSWORD=password
DB_NAME=kahoot_clone

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

## Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/shutilia666-sketch/kahoot-clone.git
cd kahoot-clone
```

### 2. Создайте `.env` файл

```bash
cp .env.example .env
```

### 3. Запустите контейнеры

```bash
docker-compose up -d
```

Приложение будет доступно на:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API: http://localhost:3001/api
- Nginx: http://localhost

### 4. Инициализируйте БД (первый запуск)

```bash
# Применить миграции
docker-compose exec backend npm run prisma:migrate

# Просмотр БД в Prisma Studio
docker-compose exec backend npm run prisma:studio
```

## Основные команды

### Запуск контейнеров

```bash
# Запустить в фоне
docker-compose up -d

# Запустить с логами
docker-compose up

# Пересобрать образы
docker-compose up -d --build
```

### Остановка контейнеров

```bash
# Остановить
docker-compose down

# Остановить и удалить тома (включая БД)
docker-compose down -v
```

### Логи

```bash
# Логи всех сервисов
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Управление базой данных

```bash
# Запустить миграции
docker-compose exec backend npm run prisma:migrate

# Сбросить БД (ВНИМАНИЕ: удалит все данные)
docker-compose exec backend npm run prisma:reset

# Открыть Prisma Studio
docker-compose exec backend npm run prisma:studio
```

### Shell доступ

```bash
# Shell в backend контейнере
docker-compose exec backend sh

# Shell в frontend контейнере
docker-compose exec frontend sh

# Shell в БД контейнере
docker-compose exec db psql -U user -d kahoot_clone
```

## Развертывание на сервер

### 1. Подготовка сервера

```bash
# Установить Docker и Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Клонировать и настроить

```bash
git clone https://github.com/shutilia666-sketch/kahoot-clone.git /opt/kahoot-clone
cd /opt/kahoot-clone

# Создать .env с production значениями
cp .env.example .env
nano .env  # Отредактировать для production
```

### 3. Запустить

```bash
docker-compose up -d
```

### 4. Настроить Nginx (опционально)

Если используете отдельный Nginx снаружи контейнеров:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io {
        proxy_pass http://localhost:3001/socket.io;
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

## Мониторинг

### Проверка статуса контейнеров

```bash
docker-compose ps
```

### Проверка использования ресурсов

```bash
docker stats
```

### Проверка сетевого взаимодействия

```bash
docker-compose exec backend curl http://backend:3001/health
```

## Решение проблем

### Port already in use

```bash
# Найти процесс на порту
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Убить процесс
kill -9 <PID>
```

### БД не инициализируется

```bash
# Удалить тома и пересоздать
docker-compose down -v
docker-compose up -d
```

### Ошибки подключения

```bash
# Проверить логи
docker-compose logs backend
docker-compose logs frontend

# Проверить сетевое подключение
docker-compose exec backend ping db
```

## Production Checklist

- [ ] Изменить `JWT_SECRET` на безопасный ключ
- [ ] Изменить пароль БД (`DB_PASSWORD`)
- [ ] Включить HTTPS (SSL/TLS)
- [ ] Включить редирект HTTP на HTTPS
- [ ] Настроить резервные копии БД
- [ ] Включить логирование и мониторинг
- [ ] Настроить автоматический перезапуск контейнеров
- [ ] Установить лимиты на ресурсы контейнеров
- [ ] Настроить health checks
- [ ] Включить rate limiting в Nginx
