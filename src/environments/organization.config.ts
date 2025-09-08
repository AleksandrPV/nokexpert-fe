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
    display: '+7 (911) 111-33-96',
    href: '+79111113396'
  },
  email: 'info@nok-expert.ru',
  
  // Адрес (главный офис)
  address: {
    full: 'Санкт-Петербург, наб. Черной речки, д. 15, оф. 310',
    city: 'Санкт-Петербург',
    street: 'наб. Черной речки',
    building: 'д. 15, оф. 310',
    postalCode: '197342'
  },
  
  // Офисы
  offices: [
    {
      name: 'Санкт-Петербург',
      type: 'Главный офис',
      address: {
        full: 'Санкт-Петербург, наб. Черной речки, д. 15, оф. 310',
        city: 'Санкт-Петербург',
        street: 'наб. Черной речки',
        building: 'д. 15, оф. 310',
        postalCode: '197342'
      },
      coordinates: {
        latitude: 59.9847,
        longitude: 30.3165
      },
      phone: '+7-911-111-33-96',
      email: 'info@nok-expert.ru',
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
    whatsapp: '+79111113396',
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