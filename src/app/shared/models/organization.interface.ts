export interface OrganizationData {
  // Основная информация
  name: string;
  fullName: string;
  shortName: string;
  
  // Контактная информация
  phone: {
    display: string;
    href: string;
  };
  email: string;
  
  // Адрес
  address: {
    full: string;
    city: string;
    street: string;
    building: string;
  };
  
  // Лицензия и сертификация (опционально)
  license?: {
    year: number;
    description: string;
  };
  
  // Веб-сайт
  website: {
    domain: string;
    url: string;
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
  };
  
  // Дополнительная информация
  description?: string;
  foundedYear?: number;

  // Координаты (опционально)
  latitude?: number;
  longitude?: number;
} 