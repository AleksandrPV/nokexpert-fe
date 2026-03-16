# Backend — NestJS 11 + PostgreSQL + TypeORM

## Стек

- NestJS 11.0.1, TypeScript 5.7.3
- PostgreSQL 15 + TypeORM 0.3.20
- JWT (passport-jwt) + bcrypt
- class-validator для валидации DTO
- Swagger/OpenAPI для документации API
- Throttler для rate limiting
- Jest для тестов

## Архитектура — DDD + Modular Monolith

Каждый домен — изолированный модуль NestJS:

```
src/
├── main.ts
├── app.module.ts
├── config/                  # database, jwt, app конфиги
├── shared/                  # guards, decorators, filters, types, constants
│   ├── guards/              # jwt-auth.guard, roles.guard
│   ├── decorators/          # @Public(), @Roles()
│   ├── filters/             # http-exception.filter
│   └── types/               # user.types (UserRole, UserStatus и др.)
├── migrations/
└── domains/
    └── users/               # Реализованный домен
        ├── domain/          # Бизнес-сущности, интерфейсы репозиториев
        ├── application/     # Сервисы (бизнес-логика)
        ├── infrastructure/  # TypeORM-сущности, репозитории, стратегии
        └── presentation/    # Контроллеры, DTO
```

### Принципы DDD

- `domain/` — бизнес-логика без зависимостей от NestJS/инфраструктуры
- `application/` — use cases, зависит от domain и интерфейсов инфраструктуры
- `infrastructure/` — TypeORM-сущности, репозитории, внешние сервисы
- `presentation/` — контроллеры, DTO, валидация
- Между модулями — только через публичные сервисы/интерфейсы

### Планируемые домены (из ТЗ)

- `users/` — реализован (регистрация, JWT, RBAC)
- `qualification/` — советы (СПК), профессиональные квалификации
- `testing/` — тесты, вопросы, варианты ответов, ответы пользователей
- `sites/` — центры оценки (ЦОК), экзаменационные площадки
- `media/` — медиафайлы

## API (текущий — домен users)

Публичные:
- `POST /api/users/register` — регистрация
- `POST /api/users/login` — вход

Защищённые (JWT):
- `GET /api/users/profile` — профиль текущего пользователя

Админские (JWT + Role ADMIN):
- `POST /api/users/create` — создать пользователя
- `POST /api/users/admin` — создать админа
- `GET /api/users/all` — список пользователей
- `GET /api/users/:id` — пользователь по ID
- `PATCH /api/users/:id` — обновить
- `DELETE /api/users/:id` — деактивировать
- `PATCH /api/users/:id/activate` — активировать
- `PATCH /api/users/change-password` — сменить свой пароль
- `PATCH /api/users/:id/change-password` — сменить пароль пользователя

## Роли и статусы

```
UserRole: USER, CANDIDATE, ADMIN, PROCTOR
UserStatus: ACTIVE, INACTIVE, SUSPENDED, PENDING
```

## Сущности БД (из ТЗ, для реализации)

- **QualificationCouncil** — СПК (код, название)
- **ProfessionalQualification** — квалификация (название, код, уровень, FK->council)
- **Test** — тест (user_id, prof_qual_id, started_at, finished_at)
- **Question** — вопрос (prof_qual_id, text)
- **QuestionType** — тип вопроса (code, name)
- **AnswerOption** — вариант ответа (question_id, text, is_correct)
- **UserAnswer** — ответ пользователя (test_id, question_id, selected_option_id, answered_at)

## Деплой

Docker multi-stage сборка. docker-compose.prod.yml: NestJS + PostgreSQL 15 + Redis 7.
Traefik для маршрутизации. Health check: `GET /api/health`.

## Команды

```bash
npm run start:dev          # dev-сервер с hot reload
npm run build              # production сборка
npm test                   # тесты (Jest)
npm run migration:generate # генерация миграции
npm run migration:run      # применение миграций
```

## Конфигурация

Через `.env` (см. `env.example`). CORS настроен для localhost:4200, nok-expert.ru, testnok.ru.
Swagger доступен в dev-режиме по `/api-docs`.
