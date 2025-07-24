# Этап 1: Сборка приложения
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Этап 2: Production сервер
FROM nginx:alpine AS production

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение
COPY --from=build /app/dist/nokexpert-fe /usr/share/nginx/html

# Создаем пользователя для nginx
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001

# Устанавливаем права
RUN chown -R angular:nodejs /usr/share/nginx/html
RUN chown -R angular:nodejs /var/cache/nginx
RUN chown -R angular:nodejs /var/log/nginx
RUN chown -R angular:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R angular:nodejs /var/run/nginx.pid

# Переключаемся на пользователя
USER angular

# Открываем порт
EXPOSE 8080

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"] 