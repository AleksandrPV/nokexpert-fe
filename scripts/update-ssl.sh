#!/bin/bash

# Скрипт для обновления SSL сертификатов
# Использование: ./scripts/update-ssl.sh

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

# Обновление SSL на сервере
update_ssl() {
    log_info "🔐 Обновляем SSL сертификаты..."
    
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" << 'EOF'
        echo "=== 🔐 Обновление SSL сертификатов ==="
        
        cd /opt/nokexpert-fe
        
        # Останавливаем контейнеры
        echo "Останавливаем контейнеры..."
        docker-compose down
        
        # Удаляем старые сертификаты
        echo "Удаляем старые сертификаты..."
        rm -rf letsencrypt/*
        
        # Запускаем контейнеры заново
        echo "Запускаем контейнеры..."
        docker-compose up -d
        
        # Ждем запуска
        echo "Ждем запуска контейнеров..."
        sleep 30
        
        # Проверяем статус
        echo "Проверяем статус контейнеров..."
        docker-compose ps
        
        # Проверяем SSL сертификаты
        echo "Проверяем SSL сертификаты..."
        if [ -f "letsencrypt/acme.json" ]; then
            echo "✅ Файл сертификатов создан"
            ls -la letsencrypt/
        else
            echo "❌ Файл сертификатов не найден"
        fi
        
        # Проверяем логи Traefik
        echo "Логи Traefik:"
        docker-compose logs --tail=20 traefik
        
        # Тестируем HTTPS
        echo "Тестируем HTTPS..."
        curl -I https://nokexpert.ru 2>/dev/null | head -3 || echo "❌ HTTPS недоступен"
        
        echo "✅ Обновление SSL завершено"
EOF
}

# Проверка SSL сертификатов
check_ssl() {
    log_info "🔍 Проверяем SSL сертификаты..."
    
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" << 'EOF'
        echo "=== 🔍 Проверка SSL сертификатов ==="
        
        # Проверяем файл сертификатов
        if [ -f "/opt/nokexpert-fe/letsencrypt/acme.json" ]; then
            echo "✅ Файл сертификатов существует"
            ls -la /opt/nokexpert-fe/letsencrypt/
        else
            echo "❌ Файл сертификатов не найден"
        fi
        
        # Проверяем SSL сертификат через openssl
        echo "Проверяем SSL сертификат..."
        timeout 10 openssl s_client -connect nokexpert.ru:443 -servername nokexpert.ru < /dev/null 2>/dev/null | grep -E "(subject=|issuer=|notAfter=)" || echo "❌ Не удалось получить информацию о сертификате"
        
        # Проверяем доступность HTTPS
        echo "Проверяем доступность HTTPS..."
        curl -I https://nokexpert.ru 2>/dev/null | head -3 || echo "❌ HTTPS недоступен"
        
        # Проверяем редирект с HTTP на HTTPS
        echo "Проверяем редирект HTTP -> HTTPS..."
        curl -I http://nokexpert.ru 2>/dev/null | grep -E "(301|302|Location)" || echo "❌ Редирект не работает"
EOF
}

# Основная функция
main() {
    log_info "🚀 Обновление SSL сертификатов"
    log_info "Сервер: ${VPS_HOST}"
    
    if [[ "${VPS_HOST}" == "your-vps-ip" ]]; then
        log_error "❌ Не настроен VPS_HOST. Установите переменную окружения:"
        log_info "export VPS_HOST=your-real-server-ip"
        exit 1
    fi
    
    update_ssl
    check_ssl
    
    log_success "✅ SSL сертификаты обновлены"
    log_info "🌐 Сайт должен быть доступен по HTTPS: https://nokexpert.ru"
}

# Запуск с обработкой ошибок
trap 'log_error "Обновление SSL прервано с ошибкой на строке $LINENO"' ERR

main "$@" 