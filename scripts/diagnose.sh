#!/bin/bash

# Скрипт для диагностики проблем на сервере
# Использование: ./scripts/diagnose.sh

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

# Диагностика на сервере
diagnose_server() {
    log_info "🔍 Начинаем диагностику сервера..."
    
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" << 'EOF'
        echo "=== 🖥️ Системная информация ==="
        echo "ОС: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
        echo "Ядро: $(uname -r)"
        echo "Память: $(free -h | grep Mem | awk '{print $2}')"
        echo "Диск: $(df -h / | tail -1 | awk '{print $4}') свободно"
        
        echo -e "\n=== 🐳 Docker статус ==="
        if command -v docker &> /dev/null; then
            echo "Docker версия: $(docker --version)"
            echo "Docker Compose версия: $(docker-compose --version)"
        else
            echo "❌ Docker не установлен"
            exit 1
        fi
        
        echo -e "\n=== 📦 Контейнеры ==="
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        
        echo -e "\n=== 🌐 Сетевые порты ==="
        netstat -tlnp | grep -E ":(80|443|8080)" || echo "Нет активных портов 80/443/8080"
        
        echo -e "\n=== 📁 Файловая система ==="
        ls -la /opt/nokexpert-fe/ || echo "Директория /opt/nokexpert-fe/ не найдена"
        
        echo -e "\n=== 🔧 Docker Compose статус ==="
        cd /opt/nokexpert-fe/ 2>/dev/null && docker-compose ps || echo "Docker Compose не настроен"
        
        echo -e "\n=== 📋 Логи Traefik ==="
        docker-compose logs --tail=20 traefik 2>/dev/null || echo "Traefik не запущен"
        
        echo -e "\n=== 📋 Логи приложения ==="
        docker-compose logs --tail=20 nokexpert-fe 2>/dev/null || echo "Приложение не запущено"
        
        echo -e "\n=== 🔍 Проверка доступности ==="
        echo "Проверка localhost:80:"
        curl -I http://localhost:80 2>/dev/null | head -3 || echo "❌ Порт 80 недоступен"
        
        echo "Проверка localhost:443:"
        curl -I https://localhost:443 2>/dev/null | head -3 || echo "❌ Порт 443 недоступен"
        
        echo "Проверка localhost:8080:"
        curl -I http://localhost:8080 2>/dev/null | head -3 || echo "❌ Порт 8080 недоступен"
        
        echo -e "\n=== 🔐 SSL сертификаты ==="
        ls -la /opt/nokexpert-fe/letsencrypt/ 2>/dev/null || echo "SSL сертификаты не найдены"
        
        echo -e "\n=== 🌍 DNS проверка ==="
        nslookup nokexpert.ru 2>/dev/null || echo "DNS запрос не удался"
        
        echo -e "\n=== 🔥 Процессы ==="
        ps aux | grep -E "(nginx|traefik|docker)" | grep -v grep || echo "Процессы не найдены"
EOF
}

# Основная функция
main() {
    log_info "🚀 Диагностика приложения НОК Эксперт"
    log_info "Сервер: ${VPS_HOST}"
    
    if [[ "${VPS_HOST}" == "your-vps-ip" ]]; then
        log_error "❌ Не настроен VPS_HOST. Установите переменную окружения:"
        log_info "export VPS_HOST=your-real-server-ip"
        exit 1
    fi
    
    diagnose_server
    
    log_success "✅ Диагностика завершена"
}

# Запуск с обработкой ошибок
trap 'log_error "Диагностика прервана с ошибкой на строке $LINENO"' ERR

main "$@" 