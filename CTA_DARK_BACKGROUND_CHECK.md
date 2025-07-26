# Проверка темного фона для CTA блоков

## 🔍 Проблема
Темный фон не применялся для страниц услуг в CTA блоках.

## ✅ Исправления

### 1. Обновлен метод `getSectionClasses()`
- Улучшена логика применения классов фона
- Исправлен градиент для темного фона: `bg-gradient-to-br from-slate-900 via-brand-navy to-black text-white`

### 2. Обновлен метод `getButtonClasses()`
- Добавлена адаптивная логика для кнопок в зависимости от фона
- Кнопки `secondary` и `outline` теперь правильно отображаются на темном фоне

### 3. Исправлены конфигурации страниц услуг

#### НОК НОСТРОЙ
```typescript
nokNostroyCtaConfig: CtaSectionConfig = {
  title: 'Готовы начать подготовку к НОК НОСТРОЙ?',
  subtitle: 'Получите персональный план подготовки и гарантированно сдайте экзамен с первого раза',
  background: 'dark', // ✅ Темный фон
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
      variant: 'secondary' // ✅ Правильный стиль для темного фона
    }
  ]
};
```

#### НОК НОПРИЗ
```typescript
nokNoprizCtaConfig: CtaSectionConfig = {
  title: 'Готовы начать подготовку к НОК НОПРИЗ?',
  subtitle: 'Получите персональный план подготовки и гарантированно сдайте экзамен с первого раза',
  background: 'dark', // ✅ Исправлено с 'gradient' на 'dark'
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
      variant: 'secondary' // ✅ Исправлено с 'outline' на 'secondary'
    }
  ]
};
```

#### НОК ОПБ
```typescript
nokOpbCtaConfig: CtaSectionConfig = {
  title: 'Готовы начать подготовку к НОК ОПБ?',
  subtitle: 'Получите персональный план подготовки и гарантированно сдайте экзамен с первого раза',
  background: 'dark', // ✅ Темный фон
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

#### Центры оценки квалификации
```typescript
qaCentersCtaConfig: CtaSectionConfig = {
  title: 'Нужна помощь в подготовке к НОК?',
  subtitle: 'Наши эксперты помогут выбрать подходящий ЦОК и успешно подготовиться к экзамену',
  background: 'dark', // ✅ Темный фон
  padding: 'medium',
  showAdditionalInfo: true,
  buttons: [
    {
      text: 'Получить консультацию',
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

## 🎨 Применяемые стили

### Темный фон
```css
bg-gradient-to-br from-slate-900 via-brand-navy to-black text-white
```

### Кнопки на темном фоне
- **Primary**: `bg-brand-coral hover:bg-orange-600 text-white`
- **Secondary**: `bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20`

## 📱 Как проверить

1. Откройте любую страницу услуги:
   - `/services/nok-nostroy`
   - `/services/nok-nopriz`
   - `/services/nok-opb`
   - `/qa-centers`

2. Прокрутите вниз до CTA блока

3. Проверьте:
   - ✅ Темный градиентный фон
   - ✅ Белый текст
   - ✅ Оранжевая кнопка консультации
   - ✅ Полупрозрачная белая кнопка телефона
   - ✅ Дополнительная информация внизу

## 🔧 Технические детали

### Адаптивная логика кнопок
```typescript
const isDark = this.config.background === 'dark' || this.config.background === 'brand';

const variantClasses = {
  secondary: isDark 
    ? 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20' 
    : 'bg-white/80 backdrop-blur-sm text-brand-dark border border-brand-sky/30 hover:bg-white',
  // ...
};
```

### Применение классов
```typescript
const background = this.config.background || 'white';
const padding = this.config.padding || 'medium';

return `${baseClasses} ${paddingClasses[padding]} ${backgroundClasses[background]}`;
```

---
*Исправлено: 27.01.2025* 