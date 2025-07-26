# FAQ Система - Документация

## Обзор

Умная система FAQ с возможностью фильтрации по категориям, поиска и отображения на различных страницах сайта.

## Структура

```
faq/
├── models/
│   └── faq.interface.ts          # Интерфейсы данных
├── data/
│   ├── faq-categories.ts         # Категории FAQ
│   └── faq-questions.ts          # Данные вопросов
├── services/
│   └── faq.service.ts            # Сервис для работы с FAQ
├── components/
│   ├── faq-page.component.ts     # Основная страница FAQ
│   ├── faq-detail-page.component.ts # Детальная страница вопроса
│   └── faq-widget.component.ts   # Виджет для других страниц
└── README.md                     # Эта документация
```

## Модели данных

### FaqQuestion
```typescript
interface FaqQuestion {
  id: string;                    // Уникальный ID
  slug: string;                  // URL-friendly идентификатор
  question: string;              // Вопрос
  shortAnswer: string;           // Краткий ответ
  fullAnswer: string;            // Полный ответ
  category: string;              // ID категории
  tags: string[];                // Теги для поиска
  relatedQuestions?: string[];   // Связанные вопросы
  priority: number;              // Приоритет отображения
  isPopular: boolean;            // Популярный вопрос
  createdAt: Date;               // Дата создания
  updatedAt: Date;               // Дата обновления
}
```

### FaqCategory
```typescript
interface FaqCategory {
  id: string;                    // Уникальный ID
  name: string;                  // Название категории
  description: string;           // Описание
  icon: string;                  // Эмодзи иконка
  color: string;                 // CSS классы для цвета
}
```

## Категории

Система поддерживает 5 основных категорий:

1. **Общие вопросы** (`general`) - Основные вопросы о НОК
2. **НОСТРОЙ** (`nostroy`) - Вопросы для строителей
3. **НОПРИЗ** (`nopriz`) - Вопросы для проектировщиков
4. **Пожарная безопасность** (`fire-safety`) - Вопросы по пожарной безопасности
5. **Практические вопросы** (`practical`) - Процедуры и документы

## Использование

### 1. Основная страница FAQ

Доступна по адресу `/faq` с возможностями:
- Поиск по тексту
- Фильтрация по категориям
- Фильтр популярных вопросов
- Аккордеон с краткими ответами
- Ссылки на детальные страницы

### 2. Детальная страница вопроса

Доступна по адресу `/faq/:slug` с:
- Полным ответом на вопрос
- Метаданными (категория, теги, дата)
- Связанными вопросами
- Навигацией

### 3. FAQ Виджет

Компонент для отображения на других страницах:

```html
<!-- По категории -->
<app-faq-widget 
  category="nostroy"
  [limit]="5">
</app-faq-widget>

<!-- По тегам страницы -->
<app-faq-widget 
  [pageTags]="['строительство', 'экзамен', 'документы']"
  [limit]="3">
</app-faq-widget>

<!-- Популярные вопросы -->
<app-faq-widget 
  [limit]="4">
</app-faq-widget>
```

## API Сервиса

### Основные методы

```typescript
// Получить все вопросы
getAllQuestions(): Observable<FaqQuestion[]>

// Получить все категории
getAllCategories(): Observable<FaqCategory[]>

// Получить вопрос по slug
getQuestionBySlug(slug: string): Observable<FaqQuestion | null>

// Получить вопросы по категории
getQuestionsByCategory(categoryId: string): Observable<FaqQuestion[]>

// Получить популярные вопросы
getPopularQuestions(limit: number = 10): Observable<FaqQuestion[]>

// Поиск с фильтрами
searchQuestions(filter: FaqFilter): Observable<FaqSearchResult>

// Получить связанные вопросы
getRelatedQuestions(questionId: string, limit: number = 5): Observable<FaqQuestion[]>

// Получить вопросы для страницы по тегам
getQuestionsForPage(pageTags: string[], limit: number = 5): Observable<FaqQuestion[]>
```

### Фильтры

```typescript
interface FaqFilter {
  category?: string;             // ID категории
  tags?: string[];               // Массив тегов
  search?: string;               // Поисковый запрос
  isPopular?: boolean;           // Только популярные
}
```

## Добавление новых вопросов

1. Добавьте вопрос в `faq-questions.ts`:
```typescript
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  question: 'Ваш вопрос?',
  shortAnswer: 'Краткий ответ',
  fullAnswer: 'Подробный ответ',
  category: 'nostroy', // или другая категория
  tags: ['тег1', 'тег2'],
  priority: 1,
  isPopular: false,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

2. Убедитесь, что slug уникален
3. Используйте соответствующие теги для лучшего поиска

## SEO

Система автоматически:
- Генерирует мета-теги для каждой страницы
- Создает структурированные данные для FAQ
- Поддерживает breadcrumbs
- Оптимизирует URL для поисковых систем

## Умная логика

### Алгоритм связанных вопросов
1. Одинаковая категория (+3 балла)
2. Общие теги (+2 балла за каждый)
3. Популярность (+1 балл)

### Алгоритм релевантности для страниц
1. Совпадение тегов (+3 балла за каждый)
2. Популярность вопроса (+2 балла)
3. Приоритет вопроса (+0.5 балла за единицу)

## Примеры использования

### На странице НОСТРОЙ
```html
<app-faq-widget 
  category="nostroy"
  [limit]="5">
</app-faq-widget>
```

### На странице проектирования
```html
<app-faq-widget 
  [pageTags]="['проектирование', 'портфолио', 'экзамен']"
  [limit]="3">
</app-faq-widget>
```

### На главной странице
```html
<app-faq-widget 
  [limit]="4">
</app-faq-widget>
```

## Расширение системы

### Добавление новой категории
1. Добавьте категорию в `faq-categories.ts`
2. Обновите стили при необходимости
3. Добавьте вопросы в новую категорию

### Кастомные фильтры
Расширьте `FaqFilter` интерфейс и обновите логику в сервисе.

### Дополнительные виджеты
Создайте новые компоненты на основе `faq-widget.component.ts`. 