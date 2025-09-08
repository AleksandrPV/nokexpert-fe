# SEO Сервис - Документация

## 📋 Обзор

`SeoService` - это централизованный сервис для управления SEO мета-тегами, структурированными данными и аналитикой в приложении НОК Эксперт.

## 🚀 Основные возможности

### ✅ Автоматическая инициализация
- Базовые SEO теги устанавливаются при запуске приложения
- Автоматическое обновление canonical URL при навигации
- Структурированные данные для организации

### ✅ Динамическое управление
- Обновление title, description, keywords
- Open Graph теги для социальных сетей
- Twitter Card теги
- Структурированные данные (JSON-LD)

### ✅ Готовые методы для страниц
- `setHomePageSeo()` - главная страница
- `setServicesPageSeo()` - страница услуг
- `setContactsPageSeo()` - контакты
- `setInfoPageSeo()` - информация о НОК
- `setPrivacyPageSeo()` - политика конфиденциальности

## 📖 Использование

### 1. Базовое использование в компоненте

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class MyPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // Используем готовый метод
    this.seoService.setHomePageSeo();
  }
}
```

### 2. Кастомные SEO данные

```typescript
ngOnInit(): void {
  this.seoService.setSeoData({
    title: 'Моя кастомная страница | НОК Эксперт',
    description: 'Описание моей страницы с ключевыми словами',
    keywords: 'ключевое слово 1, ключевое слово 2',
    canonical: 'https://нок-эксперт.рф/my-page',
    ogTitle: 'Заголовок для соцсетей',
    ogDescription: 'Описание для соцсетей',
    ogImage: '/assets/images/my-page.jpg',
    noIndex: false // разрешить индексацию
  });
}
```

### 3. SEO для статей блога

```typescript
ngOnInit(): void {
  const article = {
    title: 'Как подготовиться к НОК',
    excerpt: 'Подробное руководство по подготовке к экзамену',
    slug: 'kak-podgotovitsya-k-nok',
    tags: ['НОК', 'подготовка', 'экзамен'],
    featuredImage: '/assets/images/article.jpg',
    publishedAt: '2024-12-19'
  };

  this.seoService.setBlogArticleSeo(article);
}
```

### 4. SEO для услуг

```typescript
ngOnInit(): void {
  const service = {
    title: 'Подготовка к НОК НОСТРОЙ',
    description: 'Профессиональная подготовка к экзамену НОСТРОЙ',
    slug: 'nok-nostroy',
    category: 'НОСТРОЙ',
    price: 25000,
    image: '/assets/images/nostroy.jpg'
  };

  this.seoService.setServiceSeo(service);
}
```

### 5. Хлебные крошки

```typescript
// В компоненте
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  imports: [BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>
  `
})
export class MyPageComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Услуги', url: '/services' },
    { label: 'НОК НОСТРОЙ', url: '/services/nostroy' },
    { label: 'Подготовка', active: true }
  ];
}
```

### 6. Структурированные данные

```typescript
// FAQ структурированные данные
const faqItems = [
  {
    question: 'Что такое НОК?',
    answer: 'НОК - это независимая оценка квалификации...'
  },
  {
    question: 'Как проходит экзамен?',
    answer: 'Экзамен состоит из теоретической и практической части...'
  }
];

this.seoService.addFaqStructuredData(faqItems);

// Отзывы структурированные данные
const reviews = [
  {
    author: 'Иван Петров',
    rating: 5,
    text: 'Отличная подготовка, сдал с первого раза!',
    date: '2024-12-01'
  }
];

this.seoService.addReviewsStructuredData(reviews);
```

## 🎯 Аналитика

### Отслеживание событий

```typescript
import { AnalyticsService } from '../../../shared/services/analytics.service';

export class MyComponent {
  private analytics = inject(AnalyticsService);

  onButtonClick(): void {
    this.analytics.trackButtonClick('Записаться на курс', '/services');
  }

  onFormSubmit(): void {
    this.analytics.trackFormSubmit('Заявка на консультацию', '/contacts');
  }

  onPhoneCall(): void {
    this.analytics.trackPhoneCall('+7-800-123-45-67');
  }
}
```

## 🔧 Конфигурация

### Настройка базовых параметров

В `SeoService` можно изменить базовые настройки:

```typescript
private readonly baseUrl = 'https://нок-эксперт.рф';
private readonly defaultImage = '/assets/images/og-default.jpg';

private readonly defaultSeoData: SeoData = {
  title: 'Ваш заголовок',
  description: 'Ваше описание',
  keywords: 'ваши, ключевые, слова',
  // ...
};
```

### Добавление новых методов

```typescript
// Добавить новый метод для специфичной страницы
setCustomPageSeo(): void {
  this.setSeoData({
    title: 'Моя страница | НОК Эксперт',
    description: 'Описание моей страницы',
    canonical: `${this.baseUrl}/my-page`,
    structuredData: this.getCustomStructuredData()
  });
}

private getCustomStructuredData(): any {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Моя страница",
    "description": "Описание страницы"
  };
}
```

## 📊 Мониторинг

### Проверка SEO тегов

1. Откройте DevTools (F12)
2. Перейдите на вкладку Elements
3. Проверьте `<head>` секцию
4. Убедитесь что все meta теги присутствуют

### Проверка структурированных данных

1. Используйте [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Вставьте URL страницы или код
3. Проверьте что все структурированные данные корректны

### Проверка в поисковиках

1. **Google**: `site:нок-эксперт.рф`
2. **Yandex**: `site:нок-эксперт.рф`
3. Проверьте сниппеты в поисковой выдаче

## 🚨 Частые ошибки

### ❌ Неправильно
```typescript
// Не устанавливать SEO в ngOnInit
export class MyComponent {
  constructor() {
    // SEO не будет работать при навигации
  }
}
```

### ✅ Правильно
```typescript
// Всегда устанавливать SEO в ngOnInit
export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.seoService.setHomePageSeo();
  }
}
```

### ❌ Неправильно
```typescript
// Дублировать SEO теги в index.html
<meta name="description" content="Хардкод описание">
```

### ✅ Правильно
```typescript
// Управлять через SEO сервис
this.seoService.setSeoData({
  description: 'Динамическое описание'
});
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте консоль браузера на ошибки
2. Убедитесь что SEO сервис инжектирован
3. Проверьте что метод вызывается в `ngOnInit`
4. Обратитесь к команде разработки

---

*Документация обновляется при изменении функциональности* 