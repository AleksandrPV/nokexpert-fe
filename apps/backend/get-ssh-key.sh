#!/bin/bash

echo "🔐 Генерация и настройка SSH ключа для GitHub Actions"
echo "====================================================="

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

# Проверяем наличие SSH директории
if [ ! -d ~/.ssh ]; then
    print_info "Создание SSH директории..."
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    print_status "SSH директория создана"
else
    print_status "SSH директория уже существует"
fi

# Проверяем наличие SSH ключа
if [ ! -f ~/.ssh/id_rsa ]; then
    print_warning "SSH ключ не найден. Создаем новый..."
    ssh-keygen -t rsa -b 4096 -C "github-actions@nok-expert.ru" -f ~/.ssh/id_rsa -N ""
    print_status "SSH ключ создан"
else
    print_status "SSH ключ найден"
fi

# Проверяем права доступа
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
print_status "Права доступа установлены"

echo ""
echo "📋 Публичный ключ (добавьте на сервер):"
echo "========================================"
cat ~/.ssh/id_rsa.pub

echo ""
echo "🔑 Приватный ключ для GitHub Secret VPS_SSH_KEY:"
echo "================================================"
echo "Скопируйте содержимое ниже в GitHub Secret VPS_SSH_KEY:"
echo ""

# Получаем содержимое приватного ключа без заголовков
PRIVATE_KEY_CONTENT=$(cat ~/.ssh/id_rsa | grep -v "BEGIN\|END" | tr -d '\n')
echo "$PRIVATE_KEY_CONTENT"

echo ""
echo ""
echo "📝 Инструкции по настройке:"
echo "============================"
echo "1. Скопируйте публичный ключ выше и добавьте на сервер:"
echo "   ssh-copy-id -i ~/.ssh/id_rsa.pub root@109.172.37.113"
echo ""
echo "2. Скопируйте приватный ключ выше в GitHub Secret VPS_SSH_KEY"
echo "   (только содержимое без заголовков)"
echo ""
echo "3. Добавьте другие secrets в GitHub:"
echo "   - VPS_HOST: 109.172.37.113"
echo "   - VPS_USER: root"
echo ""
echo "4. Проверьте подключение к серверу:"
echo "   ssh root@109.172.37.113 'echo \"Connection successful\"'"
echo ""

# Проверяем подключение к серверу
print_info "Проверка подключения к серверу..."
if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no root@109.172.37.113 "echo 'Connection successful'" 2>/dev/null; then
    print_status "SSH подключение к серверу работает"
else
    print_error "SSH подключение к серверу не работает"
    echo ""
    echo "🔧 Устранение проблем:"
    echo "1. Убедитесь, что сервер доступен: ping 109.172.37.113"
    echo "2. Проверьте, что порт 22 открыт: telnet 109.172.37.113 22"
    echo "3. Добавьте публичный ключ на сервер:"
    echo "   cat ~/.ssh/id_rsa.pub | ssh root@109.172.37.113 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
    echo "4. Проверьте права на сервере:"
    echo "   ssh root@109.172.37.113 'chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh'"
fi

echo ""
echo "🔍 Дополнительная диагностика:"
echo "=============================="
echo "SSH ключ fingerprint:"
ssh-keygen -lf ~/.ssh/id_rsa

echo ""
echo "Проверка SSH агента:"
eval "$(ssh-agent -s)" 2>/dev/null
ssh-add ~/.ssh/id_rsa 2>/dev/null
ssh-add -l

echo ""
print_info "Настройка завершена! Теперь настройте GitHub Secrets и запустите workflow." 