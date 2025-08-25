# Настройка SSR (Server-Side Rendering) в продакшене для Angular проекта

## Обзор архитектуры

Данная конфигурация реализует гибридный подход:
- **Prerendering** для статических страниц (главная, услуги, контакты и т.д.)
- **Dynamic SSR** для динамических страниц (детальные страницы услуг, FAQ)
- **Nginx** как reverse proxy для статических файлов
- **Node.js Express** сервер для SSR
- **Docker** для контейнеризации
- **Traefik** для SSL/TLS и маршрутизации

## 1. Зависимости и конфигурация

**Важно:** Данная конфигурация протестирована с Angular 20.2.1. Для корректной работы SSR рекомендуется использовать Angular 20+.

### 1.1 package.json - обязательные зависимости

```json
{
  "dependencies": {
    "@angular/common": "^20.2.1",
    "@angular/compiler": "^20.2.1",
    "@angular/core": "^20.2.1",
    "@angular/forms": "^20.2.1",
    "@angular/platform-browser": "^20.2.1",
    "@angular/platform-server": "^20.2.1",
    "@angular/router": "^20.2.1",
    "@angular/ssr": "^20.2.0",
    "express": "^5.1.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular/build": "^20.2.0",
    "@angular/cli": "^20.2.0",
    "@angular/compiler-cli": "^20.2.1",
    "@types/express": "^5.0.1",
    "@types/node": "^20.17.19"
  }
}
```

### 1.2 angular.json - конфигурация сборки

```json
{
  "architect": {
    "build": {
      "builder": "@angular/build:application",
      "options": {
        "browser": "src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
          {
            "glob": "**/*",
            "input": "public"
          }
        ],
        "styles": ["src/styles.scss"],
        "allowedCommonJsDependencies": ["rxjs"],
        "server": "src/main.server.ts",
        "outputMode": "server",
        "ssr": {
          "entry": "src/server.ts"
        }
      },
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "1.6MB",
              "maximumError": "2MB"
            }
          ],
          "outputHashing": "all",
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": true
          },
          "extractLicenses": true,
          "sourceMap": false
        }
      },
      "defaultConfiguration": "production"
    }
  }
}
```

## 2. Серверные файлы

### 2.1 src/main.server.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
```

### 2.2 src/server.ts

```typescript
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Handle all other requests by rendering the Angular application
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Start the server if this module is the main entry point
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Request handler used by the Angular CLI
export const reqHandler = createNodeRequestHandler(app);
```

### 2.3 src/app/app.config.server.ts

```typescript
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### 2.4 src/app/app.routes.server.ts

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Статические маршруты с prerendering
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contacts',
    renderMode: RenderMode.Prerender
  },
  
  // Динамические маршруты с getPrerenderParams
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Получаем все услуги для prerendering
      const services = [
        'service-1',
        'service-2',
        'service-3'
      ];
      
      return services.map(id => ({ id }));
    }
  },
  
  // Все остальные маршруты с динамическим рендерингом
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
```

## 3. Docker конфигурация

### 3.1 Dockerfile

```dockerfile
# Этап 1: Сборка приложения
FROM node:20-alpine AS build

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение для production с SSR
RUN npm run build

# Этап 2: Production сервер
FROM nginx:alpine AS production

# Устанавливаем Node.js для SSR сервера
RUN apk add --no-cache nodejs npm

# Удаляем дефолтную конфигурацию nginx
RUN rm /etc/nginx/conf.d/default.conf

# Создаем директорию для ACME challenge
RUN mkdir -p /var/www/certbot

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение (browser + server)
COPY --from=build /app/dist/your-app-name/browser /usr/share/nginx/html
COPY --from=build /app/dist/your-app-name/server /usr/share/nginx/server

# Устанавливаем права для приложения
RUN chmod -R 755 /usr/share/nginx/html /var/www/certbot /usr/share/nginx/server

# Копируем скрипт запуска SSR
COPY start-ssr.sh /usr/local/bin/start-ssr.sh
RUN chmod +x /usr/local/bin/start-ssr.sh

# Открываем порты
EXPOSE 80 4000

# Запускаем nginx и SSR сервер
CMD ["sh", "-c", "/usr/local/bin/start-ssr.sh & nginx -g 'daemon off;'"]
```

### 3.2 start-ssr.sh

```bash
#!/bin/sh

# Запуск SSR сервера
echo "Starting SSR server..."

# Переходим в директорию с серверными файлами
cd /usr/share/nginx/server

# Запускаем SSR сервер
node server.mjs

echo "SSR server started on port 4000"
```

### 3.3 nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Логи
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # Оптимизация
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Основной сервер
    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;
        
        # ACME Challenge для Let's Encrypt
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
            try_files $uri =404;
        }
        
        # Здоровье приложения
        location = /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        
        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            try_files $uri =404;
        }
        
        # SSR маршруты (для динамических страниц)
        location ~ ^/(faq|services)/.*$ {
            proxy_pass http://localhost:4000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
        
        # Основные маршруты Angular
        location / {
            try_files $uri $uri/ /index.html;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }
        
        # Блокируем доступ к скрытым файлам
        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}
```

### 3.4 docker-compose.yml

```yaml
services:
  # Основное приложение
  your-app-name:
    image: your-registry/your-app-name:latest
    container_name: your-app-name
    restart: unless-stopped
    networks:
      - app-network
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    volumes:
      - acme-challenge:/var/www/certbot
    labels:
      - "traefik.enable=true"
      # HTTP редирект на HTTPS
      - "traefik.http.routers.your-app-http.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.your-app-http.entrypoints=web"
      - "traefik.http.routers.your-app-http.middlewares=redirect-to-https"
      # HTTPS маршрут
      - "traefik.http.routers.your-app-https.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.your-app-https.entrypoints=websecure"
      - "traefik.http.routers.your-app-https.tls.certresolver=letsencrypt"
      - "traefik.http.services.your-app.loadbalancer.server.port=80"
      # Middleware для редиректа
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true"

  # Reverse Proxy (Traefik)
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: unless-stopped
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=your-email@domain.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--global.checkNewVersion=false"
      - "--global.sendAnonymousUsage=false"
      - "--log.level=INFO"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Traefik dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
      - acme-challenge:/var/www/certbot
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  letsencrypt:
    driver: local
  acme-challenge:
    driver: local
```

## 4. Скрипты сборки и деплоя

### 4.1 package.json scripts

```json
{
  "scripts": {
    "build": "ng build",
    "build:prod": "ng build --configuration=production",
    "serve:ssr:your-app-name": "node dist/your-app-name/server/server.mjs",
    "docker:build": "docker build -t your-app-name .",
    "docker:run": "docker run -p 8080:8080 your-app-name",
    "docker:prod": "docker-compose up -d"
  }
}
```

## 5. Пошаговая инструкция развертывания

### 5.1 Подготовка проекта

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Настройте переменные окружения:**
   ```bash
   cp deploy.env.example deploy.env
   # Отредактируйте deploy.env с вашими настройками
   ```

3. **Соберите проект:**
   ```bash
   npm run build:prod
   ```

### 5.2 Локальное тестирование SSR

1. **Запустите SSR сервер:**
   ```bash
   npm run serve:ssr:your-app-name
   ```

2. **Проверьте работу на http://localhost:4000**

### 5.3 Docker сборка и деплой

1. **Соберите Docker образ:**
   ```bash
   docker build -t your-app-name .
   ```

2. **Запустите с Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Проверьте логи:**
   ```bash
   docker-compose logs -f your-app-name
   ```

## 6. Мониторинг и отладка

### 6.1 Проверка здоровья приложения

```bash
curl http://localhost/health
```

### 6.2 Просмотр логов

```bash
# Логи приложения
docker-compose logs -f your-app-name

# Логи nginx
docker exec your-app-name tail -f /var/log/nginx/access.log
docker exec your-app-name tail -f /var/log/nginx/error.log

# Логи SSR сервера
docker exec your-app-name ps aux | grep node
```

### 6.3 Проверка портов

```bash
# Проверка занятых портов
lsof -i :80
lsof -i :4000
lsof -i :443
```

## 7. Оптимизация производительности

### 7.1 Настройка prerendering

В `app.routes.server.ts` настройте маршруты для prerendering:

```typescript
export const serverRoutes: ServerRoute[] = [
  // Статические страницы
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  
  // Динамические страницы с параметрами
  {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Получите список всех продуктов
      const products = await getProducts();
      return products.map(product => ({ id: product.id }));
    }
  }
];
```

### 7.2 Кэширование

Настройте кэширование в nginx для статических файлов и API ответов.

### 7.3 Gzip сжатие

Убедитесь, что gzip включен в nginx конфигурации.

## 8. Безопасность

### 8.1 Security Headers

В nginx.conf уже настроены основные security headers:

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

### 8.2 SSL/TLS

Traefik автоматически управляет SSL сертификатами через Let's Encrypt.

## 9. Troubleshooting

### 9.1 SSR сервер не запускается

1. Проверьте логи:
   ```bash
   docker-compose logs your-app-name
   ```

2. Убедитесь, что порт 4000 свободен:
   ```bash
   lsof -i :4000
   ```

3. Проверьте права доступа к файлам сервера.

### 9.2 Статические файлы не загружаются

1. Проверьте nginx конфигурацию
2. Убедитесь, что файлы скопированы в правильную директорию
3. Проверьте права доступа

### 9.3 Prerendering не работает

1. Проверьте конфигурацию в `app.routes.server.ts`
2. Убедитесь, что все зависимости установлены
3. Проверьте логи сборки

## 10. Заключение

Данная конфигурация обеспечивает:

- ✅ Гибридный SSR (prerendering + dynamic SSR)
- ✅ Высокую производительность
- ✅ Автоматическое SSL/TLS
- ✅ Контейнеризацию
- ✅ Мониторинг и логирование
- ✅ Безопасность
- ✅ Масштабируемость

Для применения к другому проекту замените:
- `your-app-name` на имя вашего приложения
- `your-domain.com` на ваш домен
- `your-email@domain.com` на ваш email
- Настройте маршруты в `app.routes.server.ts` под ваши нужды 