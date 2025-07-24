#!/bin/bash

# Скрипт для деплоя приложения НОК Эксперт на VPS
# Использование: ./scripts/deploy.sh [environment]

set -e

# Конфигурация
ENVIRONMENT="${1:-production}"
PROJECT_NAME="nokexpert-fe"
DOCKER_IMAGE="ghcr.io/username/${PROJECT_NAME}"
VPS_USER="${VPS_USERNAME:-root}"
VPS_HOST="${VPS_HOST:-your-vps-ip}"
VPS_PORT="${VPS_PORT:-22}"
DEPLOY_PATH="/opt/${PROJECT_NAME}"

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

# Проверка зависимостей
check_dependencies() {
    log_info "Проверка зависимостей..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker не установлен"
        exit 1
    fi
    
    if ! command -v ssh &> /dev/null; then
        log_error "SSH не установлен"
        exit 1
    fi
    
    log_success "Все зависимости установлены"
}

# Сборка Docker образа
build_image() {
    log_info "Сборка Docker образа..."
    
    # Получаем версию из package.json
    VERSION=$(node -p "require('./package.json').version")
    GIT_HASH=$(git rev-parse --short HEAD)
    IMAGE_TAG="${VERSION}-${GIT_HASH}"
    
    docker build -t "${DOCKER_IMAGE}:${IMAGE_TAG}" -t "${DOCKER_IMAGE}:latest" .
    
    log_success "Образ собран: ${DOCKER_IMAGE}:${IMAGE_TAG}"
}

# Загрузка образа в registry
push_image() {
    log_info "Загрузка образа в registry..."
    
    # Проверяем авторизацию в GitHub Container Registry
    if ! docker images | grep -q ghcr.io; then
        log_warning "Необходима авторизация в GitHub Container Registry"
        log_info "Выполните: echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
    fi
    
    docker push "${DOCKER_IMAGE}:latest"
    docker push "${DOCKER_IMAGE}:${IMAGE_TAG}" 2>/dev/null || true
    
    log_success "Образ загружен в registry"
}

# Деплой на VPS
deploy_to_vps() {
    log_info "Деплой на VPS сервер..."
    
    # Создаем временный скрипт для выполнения на сервере
    cat > /tmp/deploy_commands.sh << EOF
#!/bin/bash
set -e

cd ${DEPLOY_PATH}

# Останавливаем текущие контейнеры
docker-compose down || true

# Обновляем код
git pull origin main

# Загружаем новый образ
docker-compose pull

# Запускаем обновленные контейнеры
docker-compose up -d

# Ждем запуска
sleep 15

# Проверяем здоровье приложения
if curl -f http://localhost:8080/health; then
    echo "✅ Приложение успешно развернуто"
else
    echo "❌ Ошибка при проверке здоровья приложения"
    docker-compose logs --tail=50
    exit 1
fi

# Очищаем старые образы
docker image prune -f

echo "🚀 Деплой завершен успешно!"
EOF

    # Копируем скрипт на сервер и выполняем
    scp -P "${VPS_PORT}" /tmp/deploy_commands.sh "${VPS_USER}@${VPS_HOST}:/tmp/"
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "bash /tmp/deploy_commands.sh"
    
    # Удаляем временный файл
    rm /tmp/deploy_commands.sh
    
    log_success "Деплой на VPS завершен"
}

# Проверка статуса приложения
check_status() {
    log_info "Проверка статуса приложения..."
    
    ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" << 'EOF'
        echo "=== Статус контейнеров ==="
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        
        echo -e "\n=== Использование ресурсов ==="
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
        
        echo -e "\n=== Проверка доступности ==="
        curl -s -o /dev/null -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" http://localhost:8080/health
EOF
    
    log_success "Проверка статуса завершена"
}

# Основная функция
main() {
    log_info "🚀 Начало деплоя приложения НОК Эксперт"
    log_info "Среда: ${ENVIRONMENT}"
    
    check_dependencies
    
    if [[ "${ENVIRONMENT}" == "production" ]]; then
        log_warning "Деплой в production среду. Продолжить? (y/N)"
        read -r confirm
        if [[ ! "${confirm}" =~ ^[Yy]$ ]]; then
            log_info "Деплой отменен пользователем"
            exit 0
        fi
    fi
    
    build_image
    push_image
    deploy_to_vps
    check_status
    
    log_success "🎉 Деплой успешно завершен!"
    log_info "Сайт доступен по адресу: https://nokexpert.ru"
}

# Запуск с обработкой ошибок
trap 'log_error "Деплой прерван с ошибкой на строке $LINENO"' ERR

main "$@" 