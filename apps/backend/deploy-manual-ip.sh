#!/bin/bash

echo "🚀 Ручной деплой на IP 109.172.37.113"

# Создаем директорию если её нет
ssh root@109.172.37.113 "mkdir -p /opt/nok-expert-backend"

# Копируем файлы проекта
echo "📁 Копируем файлы проекта..."
scp -r . root@109.172.37.113:/opt/nok-expert-backend/

# Подключаемся к серверу и запускаем деплой
ssh root@109.172.37.113 << 'EOF'
  cd /opt/nok-expert-backend
  
  # Создаем .env файл если его нет
  if [ ! -f .env ]; then
    cp env.example .env
    echo "⚠️  Создан .env файл из примера. Настройте переменные окружения!"
  fi
  
  # Создаем Docker сеть если её нет
  docker network create traefik_network 2>/dev/null || echo "Сеть traefik_network уже существует"
  
  # Останавливаем старые контейнеры
  docker-compose -f docker-compose.prod.yml down
  
  # Собираем и запускаем контейнеры
  docker-compose -f docker-compose.prod.yml up -d --build
  
  # Проверяем статус
  docker-compose -f docker-compose.prod.yml ps
  
  echo "✅ Деплой завершен!"
  echo "🌐 API доступен по адресу: https://109.172.37.113/api/health"
EOF

echo "🎉 Деплой завершен!" 