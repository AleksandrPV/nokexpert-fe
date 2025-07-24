# 🚀 Деплой НОК Эксперт на VPS

Данное руководство описывает процесс деплоя Angular приложения "НОК Эксперт" на VPS сервер с использованием Docker, GitHub Actions и автоматизированных скриптов.

## 📋 Предварительные требования

### На локальной машине:
- [Git](https://git-scm.com/)
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://docker.com/)
- [GitHub CLI](https://cli.github.com/) (опционально)

### На VPS сервере:
- Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- Docker & Docker Compose
- Git
- Nginx (или Traefik как в нашей конфигурации)
- SSL сертификат (Let's Encrypt)

## 🔧 Настройка VPS сервера

### 1. Установка Docker
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Создание структуры проекта
```bash
sudo mkdir -p /opt/nokexpert-fe
sudo chown $USER:$USER /opt/nokexpert-fe
cd /opt/nokexpert-fe

# Клонирование репозитория
git clone https://github.com/USERNAME/nokexpert-fe.git .
```

### 3. Настройка окружения
```bash
# Создание .env файла
cat > .env << EOF
GITHUB_REPOSITORY_OWNER=your-github-username
NODE_ENV=production
DOMAIN=nokexpert.ru
EMAIL=admin@nokexpert.ru
EOF
```

## 🔐 Настройка GitHub Secrets

В настройках репозитория GitHub добавьте следующие секреты:

```bash
# Подключение к VPS
VPS_HOST=your-server-ip
VPS_USERNAME=your-username
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22

# GitHub Container Registry (автоматически)
GITHUB_TOKEN=автоматически_предоставляется
```

### Генерация SSH ключа для деплоя:
```bash
# На локальной машине
ssh-keygen -t ed25519 -C "deploy@nokexpert-fe" -f ~/.ssh/nokexpert_deploy
cat ~/.ssh/nokexpert_deploy.pub

# Скопируйте публичный ключ на сервер
ssh-copy-id -i ~/.ssh/nokexpert_deploy.pub user@your-server-ip

# Приватный ключ добавьте в GitHub Secrets как VPS_SSH_KEY
cat ~/.ssh/nokexpert_deploy
```

## 🚀 Методы деплоя

### 1. Автоматический деплой (GitHub Actions)

При каждом push в ветку `main` автоматически запускается pipeline:

1. **Тестирование** - линтинг и unit тесты
2. **Сборка Docker образа** - многоэтапная сборка
3. **Публикация** в GitHub Container Registry
4. **Деплой** на VPS сервер
5. **Проверка здоровья** приложения

```yaml
# .github/workflows/deploy.yml уже настроен
```

### 2. Ручной деплой

#### Используя npm скрипт:
```bash
npm run deploy
```

#### Используя bash скрипт напрямую:
```bash
./scripts/deploy.sh production
```

#### Поэтапно:
```bash
# 1. Сборка образа
npm run docker:build

# 2. Публикация в registry
docker tag nokexpert-fe ghcr.io/username/nokexpert-fe:latest
docker push ghcr.io/username/nokexpert-fe:latest

# 3. Деплой на сервер
ssh user@server "cd /opt/nokexpert-fe && docker-compose pull && docker-compose up -d"
```

## 🏗️ Архитектура деплоя

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │    │  GitHub Actions  │    │   VPS Server    │
│                 │───▶│                  │───▶│                 │
│  Source Code    │    │  CI/CD Pipeline  │    │  Docker Stack   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                │
                                                ├─ Traefik (Reverse Proxy)
                                                ├─ NOK Expert App (Angular)
                                                ├─ Watchtower (Auto-updates)
                                                └─ Let's Encrypt (SSL)
```

## 🔍 Мониторинг и логи

### Проверка статуса сервисов:
```bash
# На сервере
docker-compose ps
docker-compose logs -f nokexpert-fe
```

### Проверка здоровья:
```bash
curl -f http://localhost:8080/health
curl -f https://nokexpert.ru/health
```

### Мониторинг ресурсов:
```bash
docker stats
htop
df -h
```

### Traefik Dashboard:
- URL: `https://traefik.nokexpert.ru`
- Логин: `admin` / пароль из docker-compose.yml

## 🔄 Откат к предыдущей версии

### Автоматический откат:
```bash
# На сервере
cd /opt/nokexpert-fe
git log --oneline -5  # Смотрим последние коммиты
git checkout PREVIOUS_COMMIT_HASH
docker-compose pull
docker-compose up -d
```

### Ручной откат образа:
```bash
# Посмотреть доступные образы
docker images ghcr.io/username/nokexpert-fe

# Запустить конкретную версию
docker tag ghcr.io/username/nokexpert-fe:PREVIOUS_TAG ghcr.io/username/nokexpert-fe:latest
docker-compose up -d
```

## 🛠️ Устранение неполадок

### Проблемы с доступом к сайту:
1. Проверьте статус контейнеров: `docker-compose ps`
2. Проверьте логи: `docker-compose logs -f`
3. Проверьте SSL сертификат: `curl -vI https://nokexpert.ru`
4. Проверьте DNS записи: `nslookup nokexpert.ru`

### Проблемы с деплоем:
1. Проверьте GitHub Actions логи
2. Проверьте SSH доступ: `ssh user@server`
3. Проверьте Docker registry доступ
4. Освободите место на диске: `docker system prune -a`

### Проблемы с производительностью:
1. Мониторинг ресурсов: `docker stats`
2. Оптимизация Nginx кэша
3. Настройка CDN (CloudFlare)
4. Масштабирование контейнеров

## 📊 Метрики и аналитика

### Встроенные эндпоинты:
- `/health` - статус приложения
- `/metrics` - метрики производительности (если настроено)

### Дополнительный мониторинг:
- **Grafana** + **Prometheus** для метрик
- **ELK Stack** для логов
- **Uptime Robot** для мониторинга доступности

## 🔐 Безопасность

### Рекомендации:
1. **Firewall**: Откройте только порты 80, 443, 22
2. **SSH**: Используйте ключи, отключите пароли
3. **Updates**: Регулярно обновляйте образы
4. **Backup**: Настройте резервное копирование
5. **SSL**: Используйте только HTTPS

### Команды безопасности:
```bash
# Обновление образов
docker-compose pull
docker-compose up -d

# Проверка уязвимостей
docker scan ghcr.io/username/nokexpert-fe:latest

# Очистка системы
docker system prune -af
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs -f`
2. Проверьте [Issues](https://github.com/username/nokexpert-fe/issues)
3. Создайте новый Issue с описанием проблемы

---

## 🎯 Быстрый старт

```bash
# 1. Клонирование
git clone https://github.com/username/nokexpert-fe.git
cd nokexpert-fe

# 2. Установка зависимостей
npm install

# 3. Настройка окружения
cp .env.example .env
# Отредактируйте .env файл

# 4. Деплой
npm run deploy
```

**Готово! 🚀 Ваш сайт доступен по адресу https://nokexpert.ru** 