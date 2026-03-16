# Используем официальный Node.js образ
FROM node:20-alpine as builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

    # Устанавливаем зависимости
    RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Собираем приложение (используем только TypeScript)
RUN npx tsc -p tsconfig.build.json

# Production image
FROM node:20-alpine as production

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Копируем только необходимые файлы из builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Меняем владельца файлов
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

# Проверка здоровья приложения
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/main || exit 1

CMD ["node", "dist/main"] 