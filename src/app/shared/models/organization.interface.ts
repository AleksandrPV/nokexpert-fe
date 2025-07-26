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
    vk?: string;
    telegram?: string;
    whatsapp?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
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
  
  // Офисы (опционально)
  offices?: OfficeData[];
}

export interface OfficeData {
  name: string;
  type: string;
  address: {
    full: string;
    city: string;
    street: string;
    building: string;
    postalCode: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
} 