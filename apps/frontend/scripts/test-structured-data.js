#!/usr/bin/env node

/**
 * Скрипт для тестирования структурированных данных
 * Запуск: node scripts/test-structured-data.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка структурированных данных (Schema.org)\n');

// Проверки structured data
const checks = [
  {
    name: 'FAQ Structured Data',
    check: () => {
      const faqPage = path.join(__dirname, '../src/app/features/faq/components/faq-page.component.ts');
      const content = fs.readFileSync(faqPage, 'utf-8');
      return content.includes('addCompleteFaqStructuredData');
    }
  },
  {
    name: 'Services Pricing Structured Data',
    check: () => {
      const servicesPage = path.join(__dirname, '../src/app/features/services/components/services-page.component.ts');
      const content = fs.readFileSync(servicesPage, 'utf-8');
      return content.includes('addServicesPricingStructuredData');
    }
  },
  {
    name: 'Service Availability Structured Data',
    check: () => {
      const contactsPage = path.join(__dirname, '../src/app/features/contacts/components/contacts-page.component.ts');
      const content = fs.readFileSync(contactsPage, 'utf-8');
      return content.includes('addServiceAvailabilityStructuredData');
    }
  },
  {
    name: 'Specific Service Structured Data',
    check: () => {
      const nokNostroyPage = path.join(__dirname, '../src/app/features/services/nok-nostroy/nok-nostroy-page.component.ts');
      const content = fs.readFileSync(nokNostroyPage, 'utf-8');
      return content.includes('addServicesPricingStructuredData');
    }
  },
  {
    name: 'SEO Service Methods',
    check: () => {
      const seoService = path.join(__dirname, '../src/app/shared/services/seo.service.ts');
      const content = fs.readFileSync(seoService, 'utf-8');
      return content.includes('addCompleteFaqStructuredData') &&
             content.includes('addServicesPricingStructuredData') &&
             content.includes('addServiceAvailabilityStructuredData');
    }
  },
  {
    name: 'Organization Data Structure',
    check: () => {
      const orgConfig = path.join(__dirname, '../src/environments/organization.config.ts');
      const content = fs.readFileSync(orgConfig, 'utf-8');
      return content.includes('offices:') && content.includes('workingHours:');
    }
  }
];

// Выполнение проверок
let passed = 0;
let total = checks.length;

checks.forEach(({ name, check }) => {
  try {
    const result = check();
    const status = result ? '✅' : '❌';
    console.log(`${status} ${name}`);
    if (result) passed++;
  } catch (error) {
    console.log(`❌ ${name} - Ошибка: ${error.message}`);
  }
});

console.log(`\n📊 Результат: ${passed}/${total} проверок пройдено`);

if (passed === total) {
  console.log('🎉 Отлично! Все структурированные данные внедрены!');
} else {
  console.log('⚠️  Некоторые structured data еще не внедрены');
}

// Рекомендации
console.log('\n💡 Проверка structured data:');
console.log('1. Используйте Google Rich Results Test для проверки');
console.log('2. Schema.org validator для валидации');
console.log('3. Убедитесь что цены парсятся корректно');
console.log('4. Проверьте работу FAQ в Google Поиске');

console.log('\n🔗 Полезные ссылки:');
console.log('- Google Rich Results: https://search.google.com/test/rich-results');
console.log('- Schema.org Validator: https://validator.schema.org/');
console.log('- Google Merchant Center: https://merchants.google.com/');
