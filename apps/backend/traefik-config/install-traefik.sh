#!/bin/bash

echo "Устанавливаем Traefik..."

# Создаем директории
mkdir -p /opt/traefik/acme

# Создаем Docker сеть
docker network create traefik_network 2>/dev/null || echo "Сеть traefik_network уже существует"

# Копируем конфигурационные файлы
cp traefik.yml /opt/traefik/
cp docker-compose.traefik.yml /opt/traefik/docker-compose.yml

# Переходим в директорию
cd /opt/traefik

# Запускаем Traefik
docker-compose up -d

echo "Traefik установлен и запущен!"
echo "Dashboard доступен по адресу: https://traefik.nok-expert.ru"
echo "Логин: admin"
echo "Пароль: admin123" 