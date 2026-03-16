#!/bin/bash

echo "🔧 Настройка SSH на сервере для GitHub Actions"
echo "=============================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для цветного вывода
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Проверяем аргументы
if [ $# -eq 0 ]; then
    print_error "Использование: $0 <публичный_ключ>"
    echo "Пример: $0 'ssh-rsa AAAAB3NzaC1yc2E...'"
    exit 1
fi

PUBLIC_KEY="$1"
SERVER_HOST="109.172.37.113"
SERVER_USER="root"

print_info "Настройка SSH на сервере $SERVER_HOST..."

# Проверяем подключение к серверу
print_info "Проверка подключения к серверу..."
if ! ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "echo 'Connection test successful'" 2>/dev/null; then
    print_error "Не удается подключиться к серверу"
    echo "Убедитесь, что:"
    echo "1. Сервер доступен: ping $SERVER_HOST"
    echo "2. Порт 22 открыт: telnet $SERVER_HOST 22"
    echo "3. У вас есть доступ по SSH"
    exit 1
fi

print_status "Подключение к серверу установлено"

# Создаем SSH директорию на сервере
print_info "Создание SSH директории на сервере..."
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    echo 'SSH директория создана'
"

# Добавляем публичный ключ в authorized_keys
print_info "Добавление публичного ключа в authorized_keys..."
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
    echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    echo 'Публичный ключ добавлен'
"

# Проверяем настройки SSH
print_info "Проверка настроек SSH..."
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
    echo 'Права доступа SSH директории:'
    ls -la ~/.ssh/
    echo ''
    echo 'Содержимое authorized_keys:'
    cat ~/.ssh/authorized_keys
    echo ''
    echo 'Количество ключей:'
    wc -l ~/.ssh/authorized_keys
"

# Настраиваем SSH конфигурацию для лучшей безопасности
print_info "Настройка SSH конфигурации..."
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
    # Создаем backup текущей конфигурации
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d_%H%M%S)
    
    # Настраиваем безопасные параметры
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
    
    # Перезапускаем SSH сервис
    systemctl restart sshd
    
    echo 'SSH конфигурация обновлена'
"

# Тестируем подключение с новым ключом
print_info "Тестирование подключения с новым ключом..."
if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "echo 'New key authentication successful'" 2>/dev/null; then
    print_status "SSH ключ успешно настроен и работает"
else
    print_warning "Подключение с новым ключом не работает"
    echo "Возможные причины:"
    echo "1. Неправильный формат публичного ключа"
    echo "2. SSH сервис не перезапустился"
    echo "3. Проблемы с правами доступа"
fi

echo ""
print_info "Настройка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Скопируйте приватный ключ в GitHub Secret VPS_SSH_KEY"
echo "2. Добавьте VPS_HOST: $SERVER_HOST"
echo "3. Добавьте VPS_USER: $SERVER_USER"
echo "4. Запустите GitHub Actions workflow"
echo ""
echo "🔍 Для проверки используйте:"
echo "ssh $SERVER_USER@$SERVER_HOST 'echo \"Connection test\"'" 