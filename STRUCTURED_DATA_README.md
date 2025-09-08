# Структурированные данные (Schema.org) - НОК Эксперт

## 📋 Обзор

Проект НОК Эксперт использует структурированные данные Schema.org для улучшения SEO и отображения rich snippets в поисковых системах.

## 🎯 Внедренные типы структурированных данных

### 1. FAQ Structured Data
**Местоположение:** `src/app/features/faq/components/faq-page.component.ts`
**Тип:** `FAQPage`
**Цель:** Отображение часто задаваемых вопросов в результатах поиска

```typescript
// Автоматическая генерация из 80+ вопросов
this.seo.addCompleteFaqStructuredData(FAQ_QUESTIONS);
```

**Особенности:**
- Автоматическая сортировка по популярности и приоритету
- Ограничение до 20 вопросов для производительности
- Использование полных ответов вместо коротких

### 2. Services Pricing Structured Data
**Местоположение:** `src/app/features/services/components/services-page.component.ts`
**Тип:** `Service` + `Offer`
**Цель:** Отображение цен и доступности услуг

```typescript
// Для всех услуг
this.servicesService.getAllServices().subscribe(services => {
  this.seoService.addServicesPricingStructuredData(services);
});
```

**Особенности:**
- Автоматический парсинг цен из строк
- Поддержка диапазонов цен
- Категоризация услуг
- Информация о доступности

### 3. Service Availability Structured Data
**Местоположение:** `src/app/features/contacts/components/contacts-page.component.ts`
**Тип:** `Organization` + `LocalBusiness`
**Цель:** Информация о доступности и контактных данных

```typescript
// Для всех офисов
this.seoService.addServiceAvailabilityStructuredData(this.organizationService.getData());
```

**Особенности:**
- Множественные офисы
- График работы
- Контактная информация
- Каталог услуг

### 4. Individual Service Structured Data
**Местоположение:** `src/app/features/services/nok-nostroy/nok-nostroy-page.component.ts`
**Тип:** `Service`
**Цель:** Детальная информация о конкретной услуге

```typescript
// Для конкретной услуги
servicesService.getServiceById('nok-construction').subscribe(service => {
  if (service) {
    this.seoService.addServicesPricingStructuredData([service]);
  }
});
```

## 🔧 Техническая реализация

### SEO Service методы

```typescript
// Полная FAQ structured data
addCompleteFaqStructuredData(faqQuestions: FaqQuestion[]): void

// Цены услуг
addServicesPricingStructuredData(services: Service[]): void

// Доступность услуг
addServiceAvailabilityStructuredData(organizationData: OrganizationData): void

// Базовый FAQ (устаревший)
addFaqStructuredData(faqItems: {question: string, answer: string}[]): void
```

### Автоматическая генерация

- **FAQ:** Автоматический импорт всех 80+ вопросов
- **Цены:** Парсинг из строковых значений
- **Организация:** Данные из конфигурации
- **Услуги:** Из сервиса данных

## 📊 Ожидаемые результаты

### Rich Snippets в Google
- **FAQ:** Развернутые ответы в результатах поиска
- **Цены:** Отображение стоимости услуг
- **Организация:** Контакты и рейтинг
- **Услуги:** Каталог с ценами

### Улучшение CTR
- Более привлекательные сниппеты
- Дополнительная информация без клика
- Повышение доверия пользователей

## 🧪 Тестирование

### Инструменты проверки
```bash
# Запуск скрипта тестирования
node scripts/test-structured-data.js

# Google Rich Results Test
# https://search.google.com/test/rich-results

# Schema.org Validator
# https://validator.schema.org/
```

### Проверка корректности
1. **JSON-LD синтаксис** - валидный JSON
2. **Schema.org типы** - правильные типы данных
3. **Обязательные поля** - все required поля заполнены
4. **Цены** - корректный парсинг и формат

## 📈 Мониторинг и оптимизация

### Метрики для отслеживания
- **Rich snippets impressions** в Google Search Console
- **CTR** для страниц с structured data
- **Позиции** в поиске
- **Конверсии** из органического поиска

### Регулярные проверки
- Еженедельно: Google Search Console
- Ежемесячно: Rich Results Test
- После изменений: Schema.org Validator

## 🚀 Дополнительные возможности

### Будущие улучшения
1. **Отзывы structured data** - интеграция с реальными отзывами
2. **События** - вебинары и консультации
3. **Курсы** - детальная информация о курсах
4. **Видео** - структурированные данные для видео

### Продвинутые фичи
- **Dynamic structured data** - на основе пользовательских данных
- **Multilingual support** - многоязычные structured data
- **Personalization** - персонализированные предложения

## 📚 Полезные ссылки

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Guide](https://developers.google.com/search/docs/guides/intro-structured-data)
- [JSON-LD Specification](https://json-ld.org/)
- [SEO Structured Data Examples](https://developers.google.com/search/docs/guides/search-gallery)

## 🔧 Техническая поддержка

При добавлении новых structured data:
1. Использовать существующие методы SEO сервиса
2. Тестировать в Google Rich Results Test
3. Валидировать в Schema.org Validator
4. Обновлять документацию
