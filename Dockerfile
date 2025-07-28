# Этап 1: Сборка приложения
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение для production с SSR
RUN npm run build

# Этап 2: Production сервер
FROM nginx:alpine AS production

# Удаляем дефолтную конфигурацию nginx
RUN rm /etc/nginx/conf.d/default.conf

# Создаем директорию для ACME challenge
RUN mkdir -p /var/www/certbot

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение (browser + server)
COPY --from=build /app/dist/nokexpert-fe/browser /usr/share/nginx/html
COPY --from=build /app/dist/nokexpert-fe/server /usr/share/nginx/server

# Устанавливаем права для приложения
RUN chmod -R 755 /usr/share/nginx/html /var/www/certbot /usr/share/nginx/server

# Копируем скрипт запуска SSR
COPY start-ssr.sh /usr/local/bin/start-ssr.sh
RUN chmod +x /usr/local/bin/start-ssr.sh

# Открываем порты
EXPOSE 80 4000

# Запускаем nginx и SSR сервер
CMD ["sh", "-c", "start-ssr.sh & nginx -g 'daemon off;'"] 