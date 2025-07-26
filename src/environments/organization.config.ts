import { OrganizationData } from '../app/shared/models/organization.interface';

/**
 * Конфигурация данных организации
 * Может быть переопределена через environment файлы
 */
export const ORGANIZATION_CONFIG: OrganizationData = {
  // Основная информация
  name: 'НОК Эксперт',
  fullName: 'НОК Эксперт - Центр профессиональной подготовки к независимой оценке квалификации',
  shortName: 'НОК Эксперт',
  
  // Контактная информация
  phone: {
    display: '8 (800) 123-45-67',
    href: '+78001234567'
  },
  email: 'info@nok-expert.ru',
  
  // Адрес (главный офис)
  address: {
    full: 'Москва, ул. Тверская, д. 15, стр. 1',
    city: 'Москва',
    street: 'ул. Тверская',
    building: 'д. 15, стр. 1'
  },
  
  // Офисы
  offices: [
    {
      name: 'Москва',
      type: 'Главный офис',
      address: {
        full: 'Москва, ул. Тверская, д. 15, стр. 1',
        city: 'Москва',
        street: 'ул. Тверская',
        building: 'д. 15, стр. 1',
        postalCode: '125009'
      },
      coordinates: {
        latitude: 55.7558,
        longitude: 37.6176
      },
      phone: '+7-800-123-45-67',
      email: 'info@nok-expert.ru',
      workingHours: {
        weekdays: 'Пн-Пт: 9:00-18:00',
        saturday: 'Сб: 10:00-16:00'
      }
    },
    {
      name: 'Санкт-Петербург',
      type: 'Северо-Западный филиал',
      address: {
        full: 'Санкт-Петербург, Невский проспект, д. 28',
        city: 'Санкт-Петербург',
        street: 'Невский проспект',
        building: 'д. 28',
        postalCode: '191186'
      },
      coordinates: {
        latitude: 59.9311,
        longitude: 30.3609
      },
      phone: '+7-800-123-45-67',
      email: 'spb@nok-expert.ru',
      workingHours: {
        weekdays: 'Пн-Пт: 9:00-18:00',
        saturday: 'Сб: 10:00-16:00'
      }
    },
    {
      name: 'Екатеринбург',
      type: 'Уральский филиал',
      address: {
        full: 'Екатеринбург, ул. Ленина, д. 50',
        city: 'Екатеринбург',
        street: 'ул. Ленина',
        building: 'д. 50',
        postalCode: '620075'
      },
      coordinates: {
        latitude: 56.8431,
        longitude: 60.6454
      },
      phone: '+7-800-123-45-67',
      email: 'ekb@nok-expert.ru',
      workingHours: {
        weekdays: 'Пн-Пт: 9:00-18:00',
        saturday: 'Сб: 10:00-16:00'
      }
    }
  ],
  
  // Веб-сайт
  website: {
    domain: 'nok-expert.ru',
    url: 'https://nok-expert.ru'
  },
  
  // Социальные сети
  social: {
    vk: 'nok_expert',
    telegram: 'nok_expert',
    whatsapp: '+78001234567',
    youtube: '@nokexpert',
    instagram: 'nok_expert',
    linkedin: 'nok-expert'
  },
  
  // Рабочее время
  workingHours: {
    weekdays: 'Пн-Пт: 9:00-18:00'
  },
  
  // Дополнительная информация
  description: 'Профессиональная подготовка к независимой оценке квалификации',
  foundedYear: 2017,
  latitude: 59.9847,
  longitude: 30.3165
}; 