# Инструкция по восстановлению индексации

## 🚫 Текущий статус: Сайт закрыт от индексации

Сайт временно закрыт от поисковых роботов Google и Яндекс, так как находится в разработке.

## ✅ Как быстро восстановить индексацию

### 1. Восстановить robots.txt
Заменить в `public/robots.txt`:
```txt
# Основные правила для всех роботов
User-agent: *
Allow: /

# Разрешаем индексацию основных страниц
Allow: /$
Allow: /services
Allow: /info
Allow: /blog
Allow: /contacts
Allow: /faq
Allow: /qualifications
Allow: /qa-centers
Allow: /reviews

# Настройки задержки для основных ботов
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 1

User-agent: YandexBot
Crawl-delay: 2

User-agent: Baiduspider
Crawl-delay: 1
```

### 2. Восстановить мета-теги в index.html
Заменить в `src/index.html`:
```html
<meta name="robots" content="index, follow">
```

### 3. Восстановить SEO сервис
Заменить в `src/app/shared/services/seo.service.ts`:
```typescript
this.updateMetaTag('robots', 'index, follow'); // Разрешаем индексацию
```

И:
```typescript
this.updateMetaTag('robots', data.noIndex ? 'noindex, nofollow' : 'index, follow'); // По умолчанию index
```

### 4. Обновить статус
Изменить в `public/robots.txt`:
```txt
# Статус: Активная индексация разрешена
```

## 🚀 Команды для быстрого восстановления

```bash
# 1. Восстановить robots.txt
git checkout HEAD~1 -- public/robots.txt

# 2. Восстановить index.html
git checkout HEAD~1 -- src/index.html

# 3. Восстановить SEO сервис
git checkout HEAD~1 -- src/app/shared/services/seo.service.ts

# 4. Закоммитить изменения
git add .
git commit -m "Восстановлена индексация сайта"
git push
```

## 📊 Проверка восстановления

После восстановления проверить:
1. `https://nok-expert.ru/robots.txt` - должен разрешать индексацию
2. `https://nok-expert.ru/` - в исходном коде должен быть `index, follow`
3. Google Search Console - проверить статус индексации
4. Yandex Webmaster - проверить статус индексации

## ⚠️ Важные замечания

- После восстановления индексации может потребоваться время для переиндексации
- Рекомендуется отправить sitemap в поисковые системы
- Мониторить статус индексации через вебмастеры

---
**Дата создания**: 2025-01-27
**Статус**: Сайт закрыт от индексации 