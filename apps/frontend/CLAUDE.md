# Frontend — Angular 20 + SSR

## Стек

- Angular 20.2.4, standalone компоненты, Angular signals
- Tailwind CSS 3.4.15 + SCSS
- TypeScript 5.8.2 (strict mode)
- SSR через @angular/ssr 20.2.0 (порт 4000)
- RxJS 7.8, Service Worker (PWA)

## Архитектура

Feature-based с DDD принципами:

```
src/app/
├── features/          # Бизнес-домены
│   ├── main/          # Главная страница
│   ├── services/      # Услуги НОК (5 видов: НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ, МЧС)
│   ├── service-detail/
│   ├── info/          # Информация о НОК (15+ страниц)
│   ├── faq/           # FAQ с категориями
│   ├── contacts/      # Контакты + Яндекс-карта
│   ├── qa-centers/    # Центры оценки квалификации
│   ├── qualifications/
│   ├── consultation/
│   ├── center/
│   ├── feedback-popup/
│   ├── cookies/
│   ├── privacy-policy/
│   ├── user-agreement/
│   ├── sitemap/
│   └── not-found/
├── shared/            # Переиспользуемые компоненты, сервисы, модели
│   ├── components/    # header, footer, breadcrumbs, cta-section, yandex-map и др.
│   ├── services/      # seo, analytics, telegram, cookies, organization и др.
│   └── models/
└── core/              # Guards, interceptors, инфраструктурные сервисы
```

## Правила разработки

- Standalone компоненты (`standalone: true`) — всегда
- Lazy loading для всех маршрутов (`loadComponent`)
- Tailwind CSS для стилизации, `@apply` в SCSS только для переиспользуемых стилей
- Порядок Tailwind классов: layout -> spacing -> typography -> colors -> borders -> effects
- Angular signals для реактивного состояния
- HttpClient с типизированными ответами и `catchError`
- Строгие границы между доменами — не смешивать бизнес-логику
- `RenderMode.Prerender` для статических страниц, `getPrerenderParams` для динамических

## Деплой

Docker multi-stage: Angular build -> Nginx (статика) + Node.js (SSR, порт 4000).
Nginx проксирует `/faq/*` и `/services/*` на SSR-сервер.
Traefik для SSL/TLS. Watchtower для авто-обновлений.

## Команды

```bash
npm start             # dev-сервер
npm run build         # production сборка
npm run test          # тесты (Karma + Jasmine)
```
