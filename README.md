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
# НОК Эксперт - Angular Frontend 🚀

## 🎯 Автоматический CI/CD настроен!

**Последний деплой:** $(date '+%Y-%m-%d %H:%M:%S')  
**Версия сборки:** v1.0.0

### ✅ Этапы деплоя:
- ✅ Node.js 20 + Angular сборка
- ✅ Тестирование (Jest/Karma)  
- ✅ Docker образ (nginx + app)
- ✅ GitHub Container Registry
- 🔄 SSH деплой на VPS (исправлена конфигурация)

### 🌐 Продакшн:
- **Сервер:** 5.181.108.253
- **Домен:** nokexpert.ru (планируется)
- **Статус:** 🔄 Развертывание...

### 🔧 Исправления:
- SSH timeout увеличен до 60s/10m
- Добавлен debug режим для диагностики
- Улучшены permissions для GitHub Actions


---
**Деплой v1.0.1** - 2025-07-24 17:06:30  
🔑 GitHub Secrets обновлены  
�� SSH: нативные команды  
🎯 Тест финального деплоя

## 🔄 Деплой с публичным Docker образом

**2025-07-24 17:49:02** - Образ сделан публичным  
**Версия:** v1.0.2  
**Статус:** Тестирование публичного доступа

### 🎯 Ожидается:
- ✅ Скачивание образа без аутентификации  
- ✅ Запуск Angular приложения на VPS  
- 🌐 Доступность сайта http://5.181.108.253


## 🎉 Деплой с публичным Docker образом

**2025-07-24 18:09:48** - Docker образ сделан публичным!  
**Версия:** v1.0.3  
**Статус:** Финальный деплой с исправленным доступом

### ✅ Исправленные проблемы:
- Docker образ теперь публичный (ghcr.io/aleksandrpv/nokexpert-fe:latest)
- Синтаксис heredoc EOF исправлен
- Repository name в lowercase

### 🎯 Ожидаемый результат:
- ✅ Успешное скачивание образа БЕЗ 'denied'
- 🐳 Запуск Angular приложения на VPS
- 🌐 Доступность: http://5.181.108.253 или :8080

