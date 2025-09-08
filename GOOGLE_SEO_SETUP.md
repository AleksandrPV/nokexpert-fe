# Настройка Google SEO сервисов для НОК Эксперт

## 🎯 Цель
Привязать сайт к Google Search Console и Google Analytics 4 для полного контроля над SEO и аналитикой.

## 📋 Шаги настройки

### 1. Google Search Console

#### Шаг 1.1: Регистрация и верификация
1. Перейдите на [Google Search Console](https://search.google.com/search-console)
2. Войдите с помощью Google аккаунта
3. Нажмите "Добавить ресурс"
4. Выберите "URL-префикс" и введите: `https://nok-expert.ru`

#### Шаг 1.2: Получение кода верификации
1. Выберите метод верификации "HTML-тег"
2. Скопируйте content из meta-тега (например: `abc123def456`)
3. Замените `PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE` в `src/index.html`:

```html
<meta name="google-site-verification" content="ВАШ_КОД_ВЕРИФИКАЦИИ" />
```

#### Шаг 1.3: Отправка sitemap
1. После верификации перейдите в раздел "Карты сайта"
2. Добавьте следующие sitemap:
   - `https://nok-expert.ru/sitemap.xml`
   - `https://nok-expert.ru/sitemap-blog.xml`
   - `https://nok-expert.ru/sitemap-services.xml`
   - `https://nok-expert.ru/sitemap-faq.xml`

### 2. Google Analytics 4

#### Шаг 2.1: Создание аккаунта GA4
1. Перейдите на [Google Analytics](https://analytics.google.com/)
2. Создайте новый аккаунт: "НОК Эксперт"
3. Выберите "Веб-сайт" как тип ресурса
4. Укажите URL: `https://nok-expert.ru`
5. Получите Measurement ID (например: `G-XXXXXXXXXX`)

#### Шаг 2.2: Настройка кода отслеживания
1. Замените `GA_MEASUREMENT_ID` в следующих местах:

**В `src/index.html`:**
```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    anonymize_ip: true,
    allow_google_signals: true,
    allow_ad_features: false,
    allow_ad_personalization_signals: false,
    send_page_view: true
  });
</script>
```

**В `src/app/shared/services/analytics.service.ts`:**
```typescript
window.gtag('config', 'G-XXXXXXXXXX', {
  page_title: pageView.title,
  page_location: window.location.href,
  page_path: pageView.url
});
```

#### Шаг 2.3: Настройка целей (Conversions)
Рекомендуемые цели для отслеживания:
1. **Форма консультации** - `form_submit`
2. **Звонок по телефону** - `phone_call`
3. **Переход в контакты** - `contact_page_view`
4. **Отправка заявки** - `lead_generation`

### 3. Google Tag Manager (опционально)

#### Шаг 3.1: Создание контейнера
1. Перейдите на [Google Tag Manager](https://tagmanager.google.com/)
2. Создайте новый аккаунт
3. Создайте веб-контейнер для домена `nok-expert.ru`
4. Получите Container ID (например: `GTM-XXXXXXX`)

#### Шаг 3.2: Интеграция GTM
Добавьте код GTM в `src/index.html` перед закрывающим тегом `</head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

И в `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 4. Проверка интеграции

#### Шаг 4.1: Проверка Google Search Console
1. Через 24-48 часов проверьте статус индексации
2. Проверьте покрытие индексации
3. Проверьте ошибки сканирования

#### Шаг 4.2: Проверка Google Analytics
1. Через 24 часа проверьте поступление данных
2. Настройте отчеты по ключевым показателям:
   - Просмотры страниц
   - Время на сайте
   - Показатель отказов
   - Конверсии

### 5. Настройки для SEO

#### Шаг 5.1: Настройки в Google Search Console
- Включите отправку данных в Google Analytics
- Настройте геотаргетинг (Россия)
- Добавьте hreflang для многоязычности (если планируется)

#### Шаг 5.2: Мониторинг производительности
- Регулярно проверяйте Core Web Vitals
- Мониторьте индексацию страниц
- Следите за мобильной оптимизацией

## 🔧 Технические особенности интеграции

### Content Security Policy
Уже настроен для поддержки Google сервисов в `src/index.html`.

### Robots.txt
Оптимизирован для Google, Yandex и Bing ботов.

### Sitemap.xml
- Содержит все важные страницы
- Правильные приоритеты и частота обновления
- Поддерживает изображения

### Structured Data
Уже реализованы Schema.org разметки для:
- Organization
- Service
- FAQPage
- BlogPosting
- BreadcrumbList

## 📊 Ключевые метрики для отслеживания

### Google Analytics 4
- **Пользователи** - общее количество посетителей
- **Сеансы** - количество визитов
- **Показатель отказов** - процент одностраничных визитов
- **Среднее время на сайте** - время взаимодействия
- **Конверсии** - достижения целей

### Google Search Console
- **Клики** - количество переходов из поиска
- **Показы** - сколько раз сайт появился в поиске
- **CTR** - кликабельность сниппетов
- **Позиции** - средняя позиция в поиске

## ⚠️ Важные замечания

1. **GA_MEASUREMENT_ID** нужно заменить на реальный ID из Google Analytics
2. **PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE** нужно заменить на код из Search Console
3. После настройки подождите 24-48 часов для появления данных
4. Регулярно проверяйте статус индексации и аналитику

## 🔗 Полезные ссылки

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

## 📞 Поддержка

При возникновении проблем с настройкой обратитесь к документации Google или оставьте issue в репозитории проекта.
