# 🔧 Устранение проблем с деплоем

## Проблема: Сайт не работает после деплоя

### Диагностика

1. **Запустите диагностику сервера:**
   ```bash
   # Установите переменные окружения
   export VPS_HOST=your-real-server-ip
   export VPS_USERNAME=deploy
   
   # Запустите диагностику
   ./scripts/diagnose.sh
   ```

2. **Проверьте логи GitHub Actions:**
   - Перейдите в GitHub → Actions → Deploy to VPS
   - Посмотрите логи последнего деплоя

### Возможные причины и решения

#### 1. ❌ Неправильная конфигурация портов

**Симптомы:**
- Health check не проходит
- Приложение недоступно по домену

**Решение:**
```bash
# На сервере
cd /opt/nokexpert-fe
docker-compose down
docker-compose up -d
```

#### 2. ❌ Traefik не запущен

**Симптомы:**
- Нет SSL сертификатов
- Домен не работает

**Решение:**
```bash
# Проверьте логи Traefik
docker-compose logs traefik

# Перезапустите Traefik
docker-compose restart traefik
```

#### 3. ❌ SSL сертификаты не получены

**Симптомы:**
- Ошибки SSL в браузере
- Traefik не может получить сертификаты

**Решение:**
```bash
# Удалите старые сертификаты
rm -rf /opt/nokexpert-fe/letsencrypt/*

# Перезапустите контейнеры
docker-compose down
docker-compose up -d
```

#### 4. ❌ DNS не настроен

**Симптомы:**
- Домен не резолвится
- Сайт недоступен по домену

**Решение:**
- Проверьте DNS записи в панели управления доменом
- Убедитесь что A-запись указывает на IP сервера

#### 5. ❌ Файрвол блокирует порты

**Симптомы:**
- Порт 80/443 недоступен
- Соединение отклоняется

**Решение:**
```bash
# На сервере
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
```

### Быстрое исправление

Если сайт не работает, выполните следующие команды на сервере:

```bash
# 1. Остановите все контейнеры
cd /opt/nokexpert-fe
docker-compose down

# 2. Очистите старые образы
docker system prune -f

# 3. Загрузите новый образ
docker-compose pull

# 4. Запустите контейнеры
docker-compose up -d

# 5. Проверьте статус
docker-compose ps
docker-compose logs --tail=20
```

### Включение HTTPS

Если сайт работает только на HTTP, но нужен HTTPS:

```bash
# Используйте скрипт для перезапуска с HTTPS
./scripts/restart-https.sh

# Или вручную на сервере:
cd /opt/nokexpert-fe
docker-compose down
docker-compose up -d
# Подождите 1-2 минуты для получения SSL сертификатов
```

### Проверка работоспособности

```bash
# Проверьте доступность
curl -I http://localhost:80
curl -I https://nokexpert.ru

# Проверьте SSL сертификат
openssl s_client -connect nokexpert.ru:443 -servername nokexpert.ru
```

### Логи для анализа

```bash
# Логи Traefik
docker-compose logs traefik

# Логи приложения
docker-compose logs nokexpert-fe

# Логи системы
journalctl -u docker.service
```

### Контакты для поддержки

Если проблемы не решаются:
1. Сохраните логи: `docker-compose logs > logs.txt`
2. Запустите диагностику: `./scripts/diagnose.sh`
3. Отправьте результаты в поддержку 