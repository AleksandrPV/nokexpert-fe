# 🔄 Быстрое восстановление индексации

## ⚡ Экспресс-восстановление (3 шага)

### 1. robots.txt
```bash
# Открыть файл
nano public/robots.txt

# Заменить содержимое на:
User-agent: *
Allow: /

Sitemap: https://нок-эксперт.рф/sitemap.xml
Sitemap: https://нок-эксперт.рф/sitemap-blog.xml
Sitemap: https://нок-эксперт.рф/sitemap-services.xml
```

### 2. index.html
```bash
# Открыть файл
nano src/index.html

# Удалить или закомментировать строки:
<!-- <meta name="robots" content="noindex, nofollow"> -->
<!-- <meta name="googlebot" content="noindex, nofollow"> -->
<!-- <meta name="bingbot" content="noindex, nofollow"> -->
<!-- <meta name="yandex" content="noindex, nofollow"> -->
```

### 3. SEO сервис
```bash
# Открыть файл
nano src/app/shared/services/seo.service.ts

# Найти строку 58 и изменить:
this.updateMetaTag('robots', 'index, follow'); // Восстанавливаем индексацию

# Найти строку 95 и изменить:
this.updateMetaTag('robots', data.noIndex ? 'noindex, nofollow' : 'index, follow');
```

## 🚀 Пересборка и деплой
```bash
npm run build
# Деплой на сервер
```

## ✅ Проверка
1. Открыть сайт в браузере
2. Проверить мета-теги через F12 → Elements
3. Найти `<meta name="robots" content="index, follow">`
4. Проверить robots.txt по адресу: `https://нок-эксперт.рф/robots.txt`

## 📅 Время восстановления
- **robots.txt**: 1-7 дней
- **Мета-теги**: 1-3 дня
- **Полная индексация**: 1-2 недели

---
*Создано: 27.01.2025*
*Статус: Временно отключено* 