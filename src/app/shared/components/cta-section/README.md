# CTA Section Component

## 📋 Описание

Переиспользуемый компонент для создания Call-to-Action секций на сайте. Поддерживает различные варианты отображения, кнопки и стили.

## 🚀 Использование

### Базовое использование

```typescript
import { CtaSectionComponent, CtaSectionConfig } from '../../../shared/components/cta-section/cta-section.component';

@Component({
  imports: [CtaSectionComponent],
  // ...
})
export class MyComponent {
  ctaConfig: CtaSectionConfig = {
    title: 'Готовы начать?',
    description: 'Получите консультацию эксперта',
    buttons: [
      {
        text: 'Записаться на консультацию',
        icon: '📞',
        action: 'consultation',
        variant: 'primary'
      }
    ]
  };
}
```

```html
<app-cta-section [config]="ctaConfig"></app-cta-section>
```

## ⚙️ Конфигурация

### CtaSectionConfig

| Свойство | Тип | Описание | По умолчанию |
|----------|-----|----------|--------------|
| `title` | `string` | Заголовок секции | - |
| `subtitle` | `string` | Подзаголовок | - |
| `description` | `string` | Описание | - |
| `buttons` | `CtaButton[]` | Массив кнопок | `[]` |
| `background` | `'white' \| 'gradient' \| 'dark' \| 'brand'` | Фон секции | `'white'` |
| `padding` | `'small' \| 'medium' \| 'large'` | Отступы | `'medium'` |
| `showPhone` | `boolean` | Показать кнопку телефона | `false` |
| `showEmail` | `boolean` | Показать кнопку email | `false` |
| `showConsultationButton` | `boolean` | Показать кнопку консультации | `false` |
| `showAdditionalInfo` | `boolean` | Показать дополнительную информацию | `false` |
| `additionalInfo` | `string` | Текст дополнительной информации | `'Ответим в течение 15 минут • Консультация бесплатна'` |

### CtaButton

| Свойство | Тип | Описание |
|----------|-----|----------|
| `text` | `string` | Текст кнопки |
| `icon` | `string` | Иконка (эмодзи) |
| `action` | `'consultation' \| 'phone' \| 'email' \| 'scroll' \| 'link'` | Тип действия |
| `target` | `string` | Цель для scroll или link |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'glass'` | Стиль кнопки |
| `routerLink` | `string` | Ссылка для роутинга |

## 🎨 Варианты фона

### white
```typescript
{
  background: 'white'
}
```
Белый фон с градиентным заголовком.

### gradient
```typescript
{
  background: 'gradient'
}
```
Градиентный фон от brand-sky до brand-coral.

### dark
```typescript
{
  background: 'dark'
}
```
Темный градиентный фон.

### brand
```typescript
{
  background: 'brand'
}
```
Брендовый градиент от brand-navy до brand-sky.

## 🔘 Типы кнопок

### consultation
Открывает popup для консультации.

### phone
Ссылка на телефон.

### email
Ссылка на email.

### scroll
Прокрутка к элементу на странице.

### link
Обычная ссылка или роутинг.

## 📱 Примеры использования

### Простая CTA с консультацией
```typescript
{
  title: 'Готовы к успешной аттестации?',
  description: 'Получите профессиональную консультацию',
  buttons: [
    {
      text: 'Записаться на консультацию',
      icon: '💼',
      action: 'consultation',
      variant: 'primary'
    }
  ]
}
```

### CTA с телефоном и email
```typescript
{
  title: 'Нужна помощь?',
  subtitle: 'Свяжитесь с нами любым удобным способом',
  background: 'dark',
  showPhone: true,
  showEmail: true,
  buttons: [
    {
      text: 'Бесплатная консультация',
      icon: '📞',
      action: 'consultation',
      variant: 'primary'
    }
  ]
}
```

### CTA с прокруткой
```typescript
{
  title: 'Узнайте больше',
  background: 'gradient',
  buttons: [
    {
      text: 'Узнать процесс',
      icon: '📋',
      action: 'scroll',
      target: 'process',
      variant: 'secondary'
    },
    {
      text: 'Записаться на консультацию',
      icon: '💼',
      action: 'consultation',
      variant: 'primary'
    }
  ]
}
```

### CTA с дополнительной информацией
```typescript
{
  title: 'Готовы начать подготовку?',
  subtitle: 'Получите персональный план',
  background: 'dark',
  showAdditionalInfo: true,
  additionalInfo: 'Ответим в течение 15 минут • Консультация бесплатна',
  buttons: [
    {
      text: 'Бесплатная консультация',
      icon: '📞',
      action: 'consultation',
      variant: 'primary'
    },
    {
      text: 'Позвонить',
      icon: '📱',
      action: 'phone',
      variant: 'secondary'
    }
  ]
}
```

## 🎯 Готовые конфигурации

### Главная страница
```typescript
mainCtaConfig: CtaSectionConfig = {
  title: 'Готовы к успешной аттестации?',
  description: 'Получите профессиональную консультацию и выберите оптимальную программу подготовки',
  background: 'white',
  padding: 'large',
  showPhone: true,
  showEmail: true,
  buttons: [
    {
      text: 'Записаться на консультацию',
      icon: '💼',
      action: 'consultation',
      variant: 'primary'
    }
  ]
};
```

### Страницы услуг
```typescript
serviceCtaConfig: CtaSectionConfig = {
  title: 'Готовы начать подготовку к НОК?',
  subtitle: 'Получите персональный план подготовки и гарантированно сдайте экзамен с первого раза',
  background: 'dark',
  padding: 'medium',
  showAdditionalInfo: true,
  buttons: [
    {
      text: 'Бесплатная консультация',
      icon: '📞',
      action: 'consultation',
      variant: 'primary'
    },
    {
      text: 'Позвонить',
      icon: '📱',
      action: 'phone',
      variant: 'secondary'
    }
  ]
};
```

## 🔧 Автоматические функции

- **Телефон**: Автоматически использует данные из `OrganizationService`
- **Email**: Автоматически использует данные из `OrganizationService`
- **Консультация**: Автоматически открывает popup через `FeedbackPopupService`
- **Прокрутка**: Автоматически находит элемент по ID и прокручивает к нему

## 📝 Примечания

1. Компонент автоматически адаптирует стили кнопок под выбранный фон
2. При использовании темного фона кнопки `outline` автоматически становятся `secondary`
3. Все кнопки имеют hover эффекты и focus состояния
4. Компонент полностью адаптивен для мобильных устройств 