# Промт для быстрой настройки SSR в Angular проекте

## Шаг 1: Установка зависимостей

```bash
npm install @angular/platform-server@20.2.1 @angular/ssr@20.2.0 express
npm install --save-dev @types/express @types/node
```

## Шаг 2: Создание серверных файлов

### src/main.server.ts
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);
export default bootstrap;
```

### src/server.ts
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

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
```

### src/app/app.config.server.ts
```typescript
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### src/app/app.routes.server.ts
```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Статические страницы
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  
  // Динамические страницы
  {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ id: 'product-1' }, { id: 'product-2' }];
    }
  },
  
  // Все остальные
  { path: '**', renderMode: RenderMode.Prerender }
];
```

## Шаг 3: Обновление angular.json

```json
{
  "architect": {
    "build": {
      "builder": "@angular/build:application",
      "options": {
        "browser": "src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "tsconfig.app.json",
        "server": "src/main.server.ts",
        "outputMode": "server",
        "ssr": {
          "entry": "src/server.ts"
        }
      }
    }
  }
}
```

## Шаг 4: Добавление скриптов в package.json

```json
{
  "scripts": {
    "build:prod": "ng build --configuration=production",
    "serve:ssr:your-app": "node dist/your-app/server/server.mjs"
  }
}
```

## Шаг 5: Тестирование

```bash
# Сборка
npm run build:prod

# Запуск SSR сервера
npm run serve:ssr:your-app

# Проверка на http://localhost:4000
```

## Шаг 6: Docker (опционально)

### Dockerfile
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
RUN apk add --no-cache nodejs npm
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/your-app/browser /usr/share/nginx/html
COPY --from=build /app/dist/your-app/server /usr/share/nginx/server
COPY start-ssr.sh /usr/local/bin/start-ssr.sh
RUN chmod +x /usr/local/bin/start-ssr.sh
EXPOSE 80 4000
CMD ["sh", "-c", "/usr/local/bin/start-ssr.sh & nginx -g 'daemon off;'"]
```

### start-ssr.sh
```bash
#!/bin/sh
cd /usr/share/nginx/server
node server.mjs
```

### nginx.conf
```nginx
events { worker_connections 1024; }

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        location ~ ^/(api|dynamic)/.*$ {
            proxy_pass http://localhost:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

## Ключевые моменты:

1. **Замените `your-app`** на имя вашего приложения во всех файлах
2. **Настройте маршруты** в `app.routes.server.ts` под ваши страницы
3. **Проверьте зависимости** - все должны быть совместимы с Angular 20+
4. **Тестируйте локально** перед деплоем в продакшен
5. **Настройте prerendering** для статических страниц для лучшей производительности

## Проверка работы:

```bash
# Проверка сборки
npm run build:prod

# Проверка SSR
curl -I http://localhost:4000

# Проверка статических файлов
curl -I http://localhost:80
``` 