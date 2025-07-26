# OrganizationService - Централизованное управление данными организации

## Описание

`OrganizationService` - это сервис для централизованного управления всеми данными организации, которые используются на сайте. Вместо захардкоженных значений в компонентах, теперь все данные берутся из единого источника.

## Преимущества

- **Единый источник истины** - все данные организации в одном месте
- **Легкое обновление** - изменить данные можно в одном файле
- **Типизация** - TypeScript интерфейсы обеспечивают безопасность типов
- **Гибкость** - возможность переопределения через environment файлы
- **Переиспользование** - данные доступны во всех компонентах

## Структура данных

### OrganizationData Interface

```typescript
interface OrganizationData {
  // Основная информация
  name: string;           // Краткое название
  fullName: string;       // Полное название
  shortName: string;      // Короткое название
  
  // Контактная информация
  phone: {
    display: string;      // Для отображения (8 (800) 123-45-67)
    href: string;         // Для ссылок (+78001234567)
  };
  email: string;
  
  // Адрес
  address: {
    full: string;         // Полный адрес
    city: string;         // Город
    street: string;       // Улица
    building: string;     // Дом
  };
  
  // Лицензия
  license: {
    year: number;         // Год лицензии
    description: string;  // Описание лицензии
  };
  
  // Веб-сайт
  website: {
    domain: string;       // Домен
    url: string;          // Полный URL
  };
  
  // Социальные сети (опционально)
  social?: {
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
  
  // Рабочее время (опционально)
  workingHours?: {
    weekdays: string;
    weekends?: string;
  };
  
  // Дополнительная информация
  description?: string;
  foundedYear?: number;
}
```

## Использование в компонентах

### 1. Импорт сервиса

```typescript
import { OrganizationService } from '../../../shared/services/organization.service';
```

### 2. Инъекция в компонент

```typescript
export class MyComponent {
  private organizationService = inject(OrganizationService);
  
  // Геттеры для удобства
  get organizationName(): string {
    return this.organizationService.getName();
  }
  
  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }
  
  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }
}
```

### 3. Использование в шаблоне

```html
<!-- Название организации -->
<h1>{{ organizationName }}</h1>

<!-- Телефон -->
<a [href]="'tel:' + phoneHref">{{ phoneDisplay }}</a>

<!-- Email -->
<a [href]="'mailto:' + organizationService.getEmail()">{{ organizationService.getEmail() }}</a>

<!-- Адрес -->
<p>{{ organizationService.getAddress() }}</p>
```

## Доступные методы

### Основная информация
- `getName()` - название организации
- `getFullName()` - полное название
- `getShortName()` - короткое название

### Контакты
- `getPhoneDisplay()` - телефон для отображения
- `getPhoneHref()` - телефон для ссылок
- `getEmail()` - email

### Адрес
- `getAddress()` - полный адрес
- `getCity()` - город
- `getStreet()` - улица
- `getBuilding()` - дом

### Лицензия
- `getLicenseDescription()` - описание лицензии
- `getLicenseYear()` - год лицензии

### Веб-сайт
- `getWebsiteDomain()` - домен сайта
- `getWebsiteUrl()` - полный URL

### Дополнительно
- `getWorkingHours()` - рабочее время
- `getDescription()` - описание организации
- `getFoundedYear()` - год основания

## Конфигурация через Environment

Данные организации можно переопределить через environment файлы:

### 1. Создать environment файл

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  organization: {
    name: 'НОК Эксперт',
    phone: {
      display: '8 (800) 123-45-67',
      href: '+78001234567'
    },
    email: 'info@nokexpert.ru',
    // ... другие данные
  }
};
```

### 2. Обновить конфигурацию

```typescript
// src/environments/organization.config.ts
import { environment } from './environment';

export const ORGANIZATION_CONFIG: OrganizationData = {
  ...DEFAULT_ORGANIZATION_CONFIG,
  ...environment.organization
};
```

## Примеры использования

### Header компонент
```typescript
export class HeaderComponent {
  private organizationService = inject(OrganizationService);
  
  get organizationName(): string {
    return this.organizationService.getName();
  }
  
  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }
}
```

### Контакты страница
```typescript
export class ContactsPageComponent {
  private organizationService = inject(OrganizationService);
  
  get mapMarkers(): MapMarker[] {
    return [
      {
        coordinates: [55.7558, 37.6176],
        title: this.organizationService.getName(),
        description: `${this.organizationService.getAddress()}<br>Профессиональная подготовка к НОК`,
        icon: 'islands#redIcon'
      }
    ];
  }
}
```

## Миграция существующих компонентов

### До (захардкоженные значения)
```html
<h1>НОК Эксперт</h1>
<a href="tel:+78001234567">8 (800) 123-45-67</a>
<p>Москва, ул. Примерная, д. 1</p>
```

### После (динамические значения)
```html
<h1>{{ organizationName }}</h1>
<a [href]="'tel:' + phoneHref">{{ phoneDisplay }}</a>
<p>{{ organizationService.getAddress() }}</p>
```

## Обновление данных

Для изменения данных организации:

1. Откройте файл `src/environments/organization.config.ts`
2. Измените нужные значения
3. Все компоненты автоматически получат обновленные данные

## Типизация

Все данные типизированы через TypeScript интерфейсы, что обеспечивает:
- Автодополнение в IDE
- Проверку типов при компиляции
- Защиту от ошибок

## Тестирование

Сервис легко тестируется:

```typescript
describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationService);
  });

  it('should return organization name', () => {
    expect(service.getName()).toBe('НОК Эксперт');
  });

  it('should return phone number', () => {
    expect(service.getPhoneDisplay()).toBe('8 (800) 123-45-67');
  });
});
``` 