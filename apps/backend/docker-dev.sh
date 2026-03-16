#!/bin/bash

# 🐳 Скрипт для локальной разработки с Docker

echo "🚀 Запуск локальной разработки с Docker..."

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Ошибка: Docker не установлен"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Ошибка: Docker Compose не установлен"
    exit 1
fi

# Создаем .env файл если его нет
if [ ! -f ".env" ]; then
    echo "📝 Создаем .env файл из примера..."
    cp env.example .env
    echo "✅ Файл .env создан"
fi

# Создаем папку для логов
mkdir -p logs

# Создаем папку для данных PostgreSQL
mkdir -p pgdata

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Удаляем старые образы (опционально)
read -p "🗑️  Удалить старые образы? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Удаляем старые образы..."
    docker-compose down --rmi all
fi

# Собираем и запускаем контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
docker-compose up --build -d

# Ждем запуска сервисов
echo "⏳ Ждем запуска сервисов..."
sleep 10

# Проверяем статус контейнеров
echo "📊 Статус контейнеров:"
docker-compose ps

# Проверяем логи приложения
echo "📋 Логи приложения:"
docker-compose logs app --tail=20

echo ""
echo "✅ Локальная разработка запущена!"
echo ""
echo "🌐 Доступные сервисы:"
echo "   📱 API: http://localhost:3000"
echo "   📚 Swagger: http://localhost:3000/api-docs"
echo "   🗄️  PostgreSQL: localhost:5433"
echo "   🖥️  pgAdmin: http://localhost:8080"
echo ""
echo "🔧 Полезные команды:"
echo "   📋 Логи: docker-compose logs -f"
echo "   🛑 Остановка: docker-compose down"
echo "   🔄 Перезапуск: docker-compose restart"
echo "   🧹 Очистка: docker-compose down -v --rmi all" 