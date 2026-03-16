#!/bin/bash

# 🚀 Скрипт ручного деплоя NOK Expert Backend
# VPS: 109.172.37.113

set -e

echo "🚀 Начинаем ручной деплой NOK Expert Backend..."

# Проверяем что мы в правильной директории
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Ошибка: docker-compose.prod.yml не найден"
    echo "Убедитесь что вы находитесь в корневой директории проекта"
    exit 1
fi

# Останавливаем текущие контейнеры
echo "🛑 Останавливаем текущие контейнеры..."
docker-compose -f docker-compose.prod.yml down

# Получаем последние изменения
echo "📥 Получаем последние изменения..."
git pull origin main

# Проверяем наличие .env файла
if [ ! -f ".env" ]; then
    echo "❌ Ошибка: .env файл не найден"
    echo "Создайте .env файл на основе .env.example"
    exit 1
fi

# Собираем и запускаем контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
docker-compose -f docker-compose.prod.yml up -d --build

# Ждем немного для запуска
echo "⏳ Ждем запуска сервисов..."
sleep 30

# Проверяем статус контейнеров
echo "📊 Проверяем статус контейнеров..."
docker-compose -f docker-compose.prod.yml ps

# Проверяем health check
echo "🏥 Проверяем health check..."
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Health check прошел успешно"
else
    echo "⚠️ Health check не прошел, проверьте логи"
    docker-compose -f docker-compose.prod.yml logs nok-backend
fi

# Очищаем неиспользуемые образы
echo "🧹 Очищаем неиспользуемые образы..."
docker image prune -f

echo "✅ Ручной деплой завершен!"
echo ""
echo "📊 Полезные команды:"
echo "   - Статус: docker-compose -f docker-compose.prod.yml ps"
echo "   - Логи: docker-compose -f docker-compose.prod.yml logs -f"
echo "   - Health check: curl http://localhost:3000/health"
echo "   - API test: curl https://api.nok-expert.ru/health" 