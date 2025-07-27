#!/bin/bash

# Скрипт для перезапуска с HTTPS
# Использование: ./scripts/restart-https.sh

set -e

# Конфигурация
VPS_USER="${VPS_USERNAME:-deploy}"
VPS_HOST="${VPS_HOST:-your-vps-ip}"
VPS_PORT="${VPS_PORT:-22}"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции для логирования
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Перезапуск на сервере
restart_https() {
    log_info "🔄 Перезапускаем контейнеры с HTTPS..."
    
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" << 'EOF'
        echo "=== 🔄 Перезапуск с HTTPS ==="
        
        cd /opt/nokexpert-fe
        
        # Останавливаем контейнеры
        echo "Останавливаем контейнеры..."
        docker-compose down
        
        # Запускаем контейнеры заново
        echo "Запускаем контейнеры..."
        docker-compose up -d
        
        # Ждем запуска
        echo "Ждем запуска контейнеров..."
        sleep 30
        
        # Проверяем статус
        echo "Проверяем статус контейнеров..."
        docker-compose ps
        
        # Проверяем логи Traefik
        echo "Логи Traefik:"
        docker-compose logs --tail=10 traefik
        
        # Ждем получения SSL сертификатов
        echo "Ждем получения SSL сертификатов..."
        sleep 30
        
        # Проверяем HTTPS
        echo "Проверяем HTTPS..."
        if curl -f https://nokexpert.ru 2>/dev/null; then
            echo "✅ HTTPS работает"
        else
            echo "⚠️ HTTPS еще не готов, но HTTP работает"
        fi
        
        echo "✅ Перезапуск завершен"
EOF
}

# Основная функция
main() {
    log_info "🚀 Перезапуск с HTTPS"
    log_info "Сервер: ${VPS_HOST}"
    
    if [[ "${VPS_HOST}" == "your-vps-ip" ]]; then
        log_error "❌ Не настроен VPS_HOST. Установите переменную окружения:"
        log_info "export VPS_HOST=your-real-server-ip"
        exit 1
    fi
    
    restart_https
    
    log_success "✅ Перезапуск завершен"
    log_info "🌐 Сайт должен быть доступен по HTTPS: https://nokexpert.ru"
}

# Запуск с обработкой ошибок
trap 'log_error "Перезапуск прерван с ошибкой на строке $LINENO"' ERR

main "$@" 