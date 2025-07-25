# SEO Настройки для НОК Эксперт

## 📋 Обзор

Данный документ описывает SEO настройки для сайта НОК Эксперт, включая robots.txt, sitemap и другие важные элементы.

## 🤖 Robots.txt

### Расположение
```
public/robots.txt
```

### Основные правила

#### ✅ Разрешенные страницы
- Главная страница (`/`)
- Услуги (`/services`)
- Информация о НОК (`/info`)
- Блог (`/blog`)
- Контакты (`/contacts`)
- FAQ (`/faq`)
- Квалификации (`/qualifications`)

#### ❌ Запрещенные страницы и файлы
- Служебные страницы (`/privacy-policy`, `/admin/`)
- API endpoints (`/api/`)
- Статические файлы (`/assets/`, `/_next/`, `/static/`)
- Технические файлы (`/*.json`, `/*.js`, `/*.css`, `/*.map`)
- URL с параметрами (`/*?*`, `/*&*`, `/*=*`)
- UTM и рекламные параметры (`/*?utm_`, `/*?fbclid`, `/*?gclid`)

#### 🚫 Заблокированные боты
- MJ12bot
- DotBot
- SemrushBot
- AhrefsBot
- Screaming Frog SEO Spider
- BLEXBot
- Ezooms
- Nutch
- Baiduspider

#### ⏱️ Настройки задержки
- YandexBot: 2 секунды
- Googlebot: 1 секунда
- Bingbot: 1 секунда
- Остальные: 1 секунда

## 🗺️ Sitemap

### Структура sitemap

#### Основной sitemap
```
public/sitemap.xml
```
Содержит все основные страницы сайта с приоритетами и частотой обновления.

#### Sitemap блога
```
public/sitemap-blog.xml
```
Содержит статьи блога и категории.

#### Sitemap услуг
```
public/sitemap-services.xml
```
Содержит страницы услуг и их подкатегории.

### Приоритеты страниц

| Страница | Приоритет | Частота обновления |
|----------|-----------|-------------------|
| Главная | 1.0 | daily |
| Услуги | 0.9 | weekly |
| Информация о НОК | 0.8 | weekly |
| Блог | 0.8 | daily |
| Контакты | 0.7 | monthly |
| FAQ | 0.6 | monthly |
| Квалификации | 0.6 | monthly |

## 🔧 Сервисы

### SitemapService
```typescript
// src/app/shared/services/sitemap.service.ts
```
Сервис для работы с sitemap:
- Генерация sitemap на основе данных
- Проверка доступности
- Получение статистики

### SeoService
```typescript
// src/app/shared/services/seo.service.ts
```
Сервис для SEO оптимизации:
- Управление meta тегами
- Структурированные данные
- Хлебные крошки

## 📊 Мониторинг

### Компонент SitemapInfo
```typescript
// src/app/shared/components/sitemap-info/sitemap-info.component.ts
```
Компонент для отображения статистики sitemap в админке.

### Метрики для отслеживания
- Количество URL в sitemap
- Статус доступности
- Последнее обновление
- Ошибки индексации

## 🚀 Рекомендации

### Для разработчиков
1. **Обновляйте sitemap** при добавлении новых страниц
2. **Проверяйте robots.txt** перед деплоем
3. **Мониторьте индексацию** через Google Search Console
4. **Тестируйте sitemap** через онлайн валидаторы

### Для SEO
1. **Регулярно проверяйте** статус индексации
2. **Анализируйте** отчеты поисковых систем
3. **Оптимизируйте** приоритеты страниц
4. **Следите за** ошибками 404

## 🔗 Полезные ссылки

### Валидаторы
- [Google Search Console](https://search.google.com/search-console)
- [Yandex Webmaster](https://webmaster.yandex.ru/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Тестирование
- [Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
- [Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### Документация
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [Yandex Sitemap](https://yandex.ru/support/webmaster/sitemap.html)

## 📝 Чек-лист

### Перед деплоем
- [ ] Проверить robots.txt
- [ ] Обновить sitemap
- [ ] Проверить meta теги
- [ ] Протестировать structured data

### После деплоя
- [ ] Отправить sitemap в поисковые системы
- [ ] Проверить индексацию
- [ ] Мониторить ошибки
- [ ] Анализировать метрики

---

**Последнее обновление**: 19.12.2024
**Версия**: 1.0 