# NOKexpert Monorepo

Система независимой оценки квалификаций (НОК) для строительной отрасли и пожарной безопасности.

## Структура

```
apps/
├── frontend/    # Angular 20 + SSR + Tailwind CSS
└── backend/     # NestJS 11 + PostgreSQL + TypeORM
ТЗ/              # Техническое задание (docx файлы)
```

npm workspaces монорепо. Команды из корня:

```bash
npm run frontend          # запуск фронтенда (dev)
npm run backend           # запуск бэкенда (dev)
npm run build:frontend    # сборка фронтенда
npm run build:backend     # сборка бэкенда
```

## Стек технологий

- **Frontend**: Angular 20.2.4, Tailwind CSS 3.4.15, TypeScript 5.8.2, SSR (@angular/ssr), RxJS
- **Backend**: NestJS 11.0.1, PostgreSQL 15, TypeORM 0.3.20, JWT, Swagger
- **Инфраструктура**: Docker, Nginx, Traefik, GitHub Actions
- **Хостинг**: VPS 109.172.37.113, домены nok-expert.ru / testnok.ru

## Архитектура

Оба приложения используют DDD (Domain-Driven Design) с feature-based модульной структурой. Каждый домен изолирован: domain/ -> application/ -> infrastructure/ -> presentation/.

## Важно

- БД — PostgreSQL + TypeORM. НЕ использовать MongoDB/Mongoose.
- Все компоненты Angular — standalone.
- Папка `ТЗ/` содержит спецификацию сущностей БД и реальные вопросы НОК для тренажёра.
