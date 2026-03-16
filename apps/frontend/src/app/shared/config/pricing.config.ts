/**
 * Единый конфиг цен на услуги НОК Эксперт.
 * Все страницы должны брать цены отсюда — единственный источник правды.
 */

export interface ServicePricing {
  price: string;
  priceValue: number;
  gosposhlina?: string;
  duration: string;
}

export const PRICING: Record<string, ServicePricing> = {
  'nok-nostroy': {
    price: '35 000 ₽',
    priceValue: 35000,
    gosposhlina: '18 000 - 24 000 ₽',
    duration: '30 дней',
  },
  'nok-nopriz': {
    price: '40 000 ₽',
    priceValue: 40000,
    gosposhlina: '22 000 - 28 000 ₽',
    duration: '35 дней',
  },
  'nok-opb': {
    price: 'от 13 900 ₽',
    priceValue: 13900,
    gosposhlina: '4 900 ₽',
    duration: '14 дней',
  },
  'nok-emergency': {
    price: '32 000 ₽',
    priceValue: 32000,
    gosposhlina: '22 000 - 28 000 ₽',
    duration: '45 дней',
  },
  'nok-housing': {
    price: '26 000 ₽',
    priceValue: 26000,
    gosposhlina: '18 000 - 22 000 ₽',
    duration: '35 дней',
  },
  'trainer': {
    price: '10 000 ₽',
    priceValue: 10000,
    duration: '30 дней',
  },
  'nok-guaranteed': {
    price: '50 000 ₽',
    priceValue: 50000,
    duration: '30 дней',
  },
};
