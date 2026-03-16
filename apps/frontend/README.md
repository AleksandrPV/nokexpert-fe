# NokexpertFe

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# НОК Эксперт - Frontend

Веб-приложение для помощи в подготовке к экзаменам НОК (Независимая оценка квалификации).

## 🌐 Сайт

**Производственная версия:** https://nok-expert.ru

## 🚀 Технологии

- **Framework:** Angular 18
- **Styling:** Tailwind CSS
- **Deployment:** Docker + Traefik + Let's Encrypt
- **CI/CD:** GitHub Actions

## 📦 Установка и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
```

### Docker

```bash
# Сборка образа
docker build -t nokexpert-fe .

# Запуск контейнера
docker run -p 80:80 nokexpert-fe
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `deploy.env` на основе `deploy.env.example`:

```bash
# Конфигурация деплоя
VPS_HOST=your-server-ip
VPS_USERNAME=deploy
VPS_PORT=22
# GitHub Container Registry
GITHUB_TOKEN=your-github-token
# Домен
DOMAIN=nok-expert.ru
EMAIL=admin@nok-expert.ru
```

## 🚀 Деплой

### Автоматический деплой

При пуше в ветку `main` автоматически запускается:

1. **Сборка и тестирование** - проверка кода и сборка Docker образа
2. **Публикация образа** - загрузка в GitHub Container Registry
3. **Деплой на VPS** - обновление контейнеров на сервере

### Ручной деплой

```bash
# Использование скрипта деплоя
./scripts/deploy.sh

# Или прямое подключение к серверу
ssh deploy@your-server-ip
cd /opt/nokexpert-fe
docker-compose pull
docker-compose up -d
```

## 📁 Структура проекта

```
src/
├── app/
│   ├── core/           # Основные сервисы и интерцепторы
│   ├── features/       # Модули приложения
│   │   ├── blog/       # Блог
│   │   ├── faq/        # FAQ
│   │   ├── info/       # Информационные страницы
│   │   ├── services/   # Услуги
│   │   └── ...
│   └── shared/         # Общие компоненты
├── environments/       # Конфигурация окружений
└── ...
```

## 🔍 Диагностика

### Проверка статуса

```bash
# Локальная диагностика
./scripts/diagnose.sh

# Проверка на сервере
ssh root@your-server-ip
cd /opt/nokexpert-fe
docker-compose ps
docker-compose logs
```

### Обновление SSL сертификатов

```bash
# Принудительное обновление SSL
./scripts/update-ssl.sh

# Быстрый рестарт HTTPS
./scripts/restart-https.sh
```

## 📝 Скрипты

- `scripts/deploy.sh` - Ручной деплой
- `scripts/diagnose.sh` - Диагностика сервера
- `scripts/update-ssl.sh` - Обновление SSL сертификатов
- `scripts/restart-https.sh` - Рестарт HTTPS

## 🔒 Безопасность

- **HTTPS** - автоматическое получение SSL сертификатов через Let's Encrypt
- **Security Headers** - настройка заголовков безопасности в Nginx
- **Docker** - изоляция приложения в контейнерах

## 📊 Мониторинг

- **Health Check** - проверка работоспособности приложения
- **Traefik Dashboard** - мониторинг прокси-сервера
- **Watchtower** - автоматическое обновление контейнеров

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

Этот проект является частным и не подлежит публичному распространению.

