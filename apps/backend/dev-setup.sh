#!/bin/bash

echo "🚀 Настройка локальной разработки NOK Expert Backend"

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js 20+"
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Требуется Node.js 20+. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker"
    exit 1
fi

echo "✅ Docker установлен"

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Создаем .env файл если его нет
if [ ! -f .env ]; then
    echo "📝 Создаем .env файл..."
    cp env.example .env
    
    # Настраиваем для локальной разработки
    sed -i '' 's/NODE_ENV=production/NODE_ENV=development/' .env
    sed -i '' 's/DB_HOST=postgres/DB_HOST=localhost/' .env
    sed -i '' 's/DB_PORT=5432/DB_PORT=5433/' .env
    sed -i '' 's/DB_USERNAME=nok_user/DB_USERNAME=postgres/' .env
    sed -i '' 's/DB_PASSWORD=your_secure_password_here/DB_PASSWORD=password/' .env
    sed -i '' 's/CORS_ORIGIN=.*/CORS_ORIGIN=http:\/\/localhost:4200,http:\/\/localhost:3000/' .env
    
    echo "✅ .env файл настроен для локальной разработки"
else
    echo "✅ .env файл уже существует"
fi

# Запускаем базу данных
echo "🗄️ Запускаем PostgreSQL..."
docker-compose up -d postgres pgadmin

# Ждем запуска базы данных
echo "⏳ Ждем запуска базы данных..."
sleep 10

# Проверяем подключение к базе данных
if docker exec nok-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ База данных запущена"
else
    echo "❌ Ошибка запуска базы данных"
    exit 1
fi

echo ""
echo "🎉 Настройка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Запустите приложение: npm run start:dev"
echo "2. Откройте Swagger: http://localhost:3000/api-docs"
echo "3. Проверьте API: curl http://localhost:3000/api/health"
echo "4. PgAdmin: http://localhost:8080 (admin@nok.ru / password123)"
echo ""
echo "📚 Подробная документация: LOCAL_DEVELOPMENT.md" 