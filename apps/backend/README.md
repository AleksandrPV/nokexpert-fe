# 🚀 NOK Expert Backend

Система независимой оценки квалификаций - Backend API на NestJS

## 📋 Обзор

NOK Expert Backend - это REST API для системы независимой оценки квалификаций, построенный на NestJS с использованием PostgreSQL и Redis.

## 🏗️ Архитектура

```
VPS Backend (109.172.37.113)
├── Traefik (Reverse Proxy + SSL)
├── NestJS Backend (api.nok-expert.ru + api.testnok.ru)
├── PostgreSQL Database
└── Redis Cache

VPS Frontend 1 (5.181.108.253)
└── Angular App (nok-expert.ru)

VPS Frontend 2 (109.172.46.53)
└── Angular App (testnok.ru)
```

## 🛠️ Технологии

- **Backend**: NestJS, TypeScript, TypeORM
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Containerization**: Docker, Docker Compose
- **Reverse Proxy**: Traefik
- **SSL**: Let's Encrypt (автоматически)
- **CI/CD**: GitHub Actions
- **Monitoring**: Health checks, logging

## 🚀 Быстрый старт

### Локальная разработка

Подробные инструкции по локальной разработке: [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)

```bash
# Клонирование репозитория
git clone https://github.com/AleksandrPV/nok-expert-backend.git
cd nok-expert-backend

# Установка зависимостей
npm install

# Настройка переменных окружения
cp env.example .env
# Отредактируйте .env файл для локальной разработки

# Запуск базы данных
docker-compose up -d postgres pgadmin

# Запуск приложения
npm run start:dev
```

### Продакшн деплой

#### Автоматический деплой через GitHub Actions

1. **Настройка GitHub Secrets**:
   Подробная инструкция: [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)
   
   ```bash
   # Быстрая настройка SSH ключа
   ./get-ssh-key.sh
   ```
   
   Добавьте в GitHub Secrets:
   - `VPS_HOST`: `109.172.37.113`
   - `VPS_USER`: `root`
   - `VPS_SSH_KEY`: Содержимое приватного SSH ключа (без заголовков)

2. **Автоматический деплой**:
   ```bash
   git push origin main
   ```

#### Ручной деплой

```bash
# На сервере
ssh root@109.172.37.113
cd /opt/nok-expert-backend
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📚 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/logout` - Выход из системы

### Пользователи
- `GET /api/users/profile` - Получить профиль
- `PUT /api/users/profile` - Обновить профиль
- `POST /api/users/change-password` - Сменить пароль

### Health Check
- `GET /api/health` - Проверка состояния API
- `GET /health` - Простая проверка

## 🔧 Конфигурация

### Переменные окружения

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=nok_user
DB_PASSWORD=your_secure_password
DB_DATABASE=nok_system

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS
CORS_ORIGIN=https://nok-expert.ru,https://testnok.ru

# Application
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
BCRYPT_ROUNDS=10
```

## 🐳 Docker

### Локальная разработка
```bash
docker-compose up -d
```

### Продакшн
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Мониторинг

### Health Check
```bash
curl https://api.nok-expert.ru/health
```

### Логи
```bash
# Все сервисы
docker-compose -f docker-compose.prod.yml logs -f

# Только backend
docker-compose -f docker-compose.prod.yml logs -f nok-backend
```

### Статус контейнеров
```bash
docker-compose -f docker-compose.prod.yml ps
```

## 🔒 Безопасность

- JWT аутентификация
- bcrypt хеширование паролей
- CORS настройки для доменов
- Rate limiting
- HTTPS принудительно
- Security headers
- Fail2ban защита

## 🚀 CI/CD

GitHub Actions автоматически:
- Запускает тесты
- Собирает Docker образ
- Деплоит на VPS при push в main ветку

## 📁 Структура проекта

```
src/
├── config/                 # Конфигурация
├── domains/               # Доменные модули
│   └── users/            # Модуль пользователей
│       ├── application/  # Сервисы приложения
│       ├── domain/       # Доменная логика
│       ├── infrastructure/ # Репозитории
│       └── presentation/ # Контроллеры и DTO
├── shared/               # Общие модули
│   ├── guards/          # Guards
│   ├── decorators/      # Декораторы
│   └── filters/         # Exception filters
└── main.ts              # Точка входа
```

## 🔧 Управление

### Обновление
```bash
./update.sh
```

### Бэкап
```bash
./backup.sh
```

### Ручной деплой
```bash
./deploy-scripts/deploy-manual.sh
```

## 📞 Поддержка

### Полезные команды

```bash
# Перезапуск приложения
docker-compose -f docker-compose.prod.yml restart nok-backend

# Подключение к базе данных
docker exec -it nok-postgres psql -U nok_user -d nok_system

# Проверка использования ресурсов
docker stats
```

### Логи и отладка

```bash
# Логи приложения
docker-compose -f docker-compose.prod.yml logs nok-backend

# Логи базы данных
docker-compose -f docker-compose.prod.yml logs postgres

# Логи Redis
docker-compose -f docker-compose.prod.yml logs redis
```

## 📄 Лицензия

MIT License

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request 