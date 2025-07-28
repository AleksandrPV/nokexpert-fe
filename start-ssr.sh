#!/bin/bash

# Запуск SSR сервера
echo "Starting SSR server..."

# Переходим в директорию с серверными файлами
cd /usr/share/nginx/server

# Запускаем SSR сервер
node server.mjs

echo "SSR server started on port 4000" 