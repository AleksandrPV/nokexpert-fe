#!/bin/bash

# 🚀 Скрипт настройки VPS сервера для NOK Expert Backend
# VPS: 109.172.37.113

set -e

echo "🚀 Начинаем настройку VPS сервера для NOK Expert Backend..."

# Обновление системы
echo "📦 Обновление системы..."
apt update && apt upgrade -y

# Установка необходимых пакетов
echo "📦 Установка необходимых пакетов..."
apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban \
    certbot \
    python3-certbot-nginx \
    htop \
    nano \
    vim

# Установка Docker
echo "🐳 Установка Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Установка Docker Compose
echo "🐳 Установка Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Создание пользователя nokuser
echo "👤 Создание пользователя nokuser..."
useradd -m -s /bin/bash nokuser
usermod -aG docker nokuser
usermod -aG sudo nokuser

# Настройка SSH для nokuser
mkdir -p /home/nokuser/.ssh
chown nokuser:nokuser /home/nokuser/.ssh
chmod 700 /home/nokuser/.ssh

# Настройка UFW
echo "🔥 Настройка UFW..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8080/tcp  # Traefik dashboard
ufw reload

# Настройка Fail2ban
echo "🛡️ Настройка Fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Создание директорий проекта
echo "📁 Создание директорий проекта..."
mkdir -p /opt/nok-expert-backend
mkdir -p /opt/nok-expert-backend/logs
mkdir -p /opt/nok-expert-backend/postgres-init
chown -R nokuser:nokuser /opt/nok-expert-backend
chmod 755 /opt/nok-expert-backend

# Создание Docker сети для Traefik
echo "🌐 Создание Docker сети..."
docker network create traefik_network 2>/dev/null || echo "Сеть traefik_network уже существует"

# Генерация .env файла
echo "🔧 Создание .env файла..."
cat > /opt/nok-expert-backend/.env << 'EOF'
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=nok_user
DB_PASSWORD=$(openssl rand -base64 32)
DB_DATABASE=nok_system

# JWT Configuration
JWT_SECRET=$(openssl rand -base64 64)
JWT_EXPIRES_IN=24h

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS Configuration
CORS_ORIGIN=https://nok-expert.ru,https://testnok.ru

# Application Configuration
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
BCRYPT_ROUNDS=10

# Swagger Configuration
SWAGGER_TITLE=NOK Expert API
SWAGGER_DESCRIPTION=API для системы независимой оценки квалификаций
SWAGGER_VERSION=1.0.0
EOF

# Установка правильных прав
chown nokuser:nokuser /opt/nok-expert-backend/.env
chmod 600 /opt/nok-expert-backend/.env

# Создание systemd сервиса
echo "⚙️ Создание systemd сервиса..."
cat > /etc/systemd/system/nok-backend.service << 'EOF'
[Unit]
Description=NOK Expert Backend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/nok-expert-backend
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable nok-backend.service

# Создание скрипта обновления
echo "📝 Создание скрипта обновления..."
cat > /opt/nok-expert-backend/update.sh << 'EOF'
#!/bin/bash
cd /opt/nok-expert-backend
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
docker image prune -f
echo "Обновление завершено!"
EOF

chmod +x /opt/nok-expert-backend/update.sh
chown nokuser:nokuser /opt/nok-expert-backend/update.sh

# Создание скрипта бэкапа
echo "💾 Создание скрипта бэкапа..."
cat > /opt/nok-expert-backend/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/nok-expert-backend/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Бэкап базы данных
docker exec nok-postgres pg_dump -U nok_user nok_system > $BACKUP_DIR/db_backup_$DATE.sql

# Бэкап .env файла
cp /opt/nok-expert-backend/.env $BACKUP_DIR/env_backup_$DATE

# Удаление старых бэкапов (старше 7 дней)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "env_backup_*" -mtime +7 -delete

echo "Бэкап создан: $BACKUP_DIR/db_backup_$DATE.sql"
EOF

chmod +x /opt/nok-expert-backend/backup.sh
chown nokuser:nokuser /opt/nok-expert-backend/backup.sh

# Настройка cron для автоматических бэкапов
echo "⏰ Настройка автоматических бэкапов..."
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/nok-expert-backend/backup.sh") | crontab -

# Создание директории для бэкапов
mkdir -p /opt/nok-expert-backend/backups
chown nokuser:nokuser /opt/nok-expert-backend/backups

echo "✅ Настройка VPS завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Настройте GitHub Secrets:"
echo "   - VPS_HOST: 109.172.37.113"
echo "   - VPS_USER: nokuser"
echo "   - VPS_SSH_KEY: ваш приватный SSH ключ (без BEGIN/END строк)"
echo ""
echo "2. Создайте SSH ключ для nokuser:"
echo "   su - nokuser"
echo "   ssh-keygen -t rsa -b 4096 -C 'github-deploy' -f ~/.ssh/github_deploy -N ''"
echo "   cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys"
echo "   chmod 600 ~/.ssh/github_deploy"
echo "   chmod 644 ~/.ssh/github_deploy.pub"
echo "   chmod 700 ~/.ssh"
echo ""
echo "3. Настройте DNS записи:"
echo "   A    api.nok-expert.ru    → 109.172.37.113"
echo "   A    api.testnok.ru       → 109.172.37.113"
echo ""
echo "4. Запустите первый деплой через GitHub Actions"
echo ""
echo "🔧 Полезные команды:"
echo "   - Статус: docker-compose -f docker-compose.prod.yml ps"
echo "   - Логи: docker-compose -f docker-compose.prod.yml logs -f"
echo "   - Обновление: ./update.sh"
echo "   - Бэкап: ./backup.sh" 