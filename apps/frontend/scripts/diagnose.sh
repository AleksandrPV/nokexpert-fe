#!/bin/bash

# Скрипт диагностики сервера для проекта nokexpert-fe
# Использование: ./scripts/diagnose.sh

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции логирования
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_info "🔍 Начинаем диагностику сервера..."

# 1. Системная информация
log_info "📊 Системная информация:"
echo "OS: $(uname -a)"
echo "CPU: $(nproc) cores"
echo "Memory: $(free -h | grep Mem | awk '{print $2}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $4}') available"

# 2. Проверка Docker
log_info "🐳 Проверка Docker:"
if command -v docker &> /dev/null; then
    log_success "Docker установлен"
    docker --version
    docker info | grep -E "(Containers|Images|Server Version)"
else
    log_error "Docker не установлен"
fi

# 3. Проверка Docker Compose
log_info "📦 Проверка Docker Compose:"
if command -v docker-compose &> /dev/null; then
    log_success "Docker Compose установлен"
    docker-compose --version
else
    log_error "Docker Compose не установлен"
fi

# 4. Статус контейнеров
log_info "📋 Статус контейнеров:"
if [ -f "/opt/nokexpert-fe/docker-compose.yml" ]; then
    cd /opt/nokexpert-fe
    docker-compose ps
else
    log_warning "Файл docker-compose.yml не найден в /opt/nokexpert-fe/"
fi

# 5. Проверка портов
log_info "🔌 Проверка портов:"
netstat -tlnp | grep -E ":(80|443|8080)" || log_warning "Порты 80, 443, 8080 не найдены"

# 6. Проверка файловой системы
log_info "💾 Проверка файловой системы:"
ls -la /opt/nokexpert-fe/ 2>/dev/null || log_warning "Директория /opt/nokexpert-fe/ не найдена"

# 7. Проверка Docker Compose конфигурации
log_info "⚙️  Проверка Docker Compose конфигурации:"
if [ -f "/opt/nokexpert-fe/docker-compose.yml" ]; then
    cd /opt/nokexpert-fe
    docker-compose config --quiet && log_success "Конфигурация корректна" || log_error "Ошибка в конфигурации"
else
    log_warning "Файл docker-compose.yml не найден"
fi

# 8. Логи Traefik
log_info "🚦 Логи Traefik (последние 10 строк):"
docker logs traefik --tail=10 2>/dev/null || log_warning "Контейнер traefik не найден"

# 9. Логи приложения
log_info "📱 Логи приложения (последние 10 строк):"
docker logs nokexpert-fe --tail=10 2>/dev/null || log_warning "Контейнер nokexpert-fe не найден"

# 10. Проверка доступности localhost
log_info "🏠 Проверка доступности localhost:"
curl -f http://localhost:80/health 2>/dev/null && log_success "HTTP (порт 80) доступен" || log_error "HTTP (порт 80) недоступен"
curl -f http://localhost:8080/ 2>/dev/null && log_success "Traefik Dashboard (порт 8080) доступен" || log_warning "Traefik Dashboard (порт 8080) недоступен"

# 11. Проверка SSL сертификатов
log_info "🔒 Проверка SSL сертификатов:"
if [ -f "/opt/nokexpert-fe/letsencrypt/acme.json" ]; then
    log_success "Файл acme.json найден"
    ls -la /opt/nokexpert-fe/letsencrypt/
else
    log_warning "Файл acme.json не найден"
fi

# 12. Проверка DNS
log_info "🌐 Проверка DNS:"
nslookup nok-expert.ru 2>/dev/null || echo "DNS запрос не удался"

# 13. Проверка процессов
log_info "🔄 Активные процессы:"
ps aux | grep -E "(nginx|traefik|docker)" | grep -v grep || log_warning "Процессы не найдены"

log_info "🔍 Диагностика завершена!" 