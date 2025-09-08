#!/usr/bin/env node

/**
 * Скрипт для проверки внедрения SEO на всех страницах проекта
 * Запуск: node scripts/test-seo-implementation.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ПРОВЕРКА ВНЕДРЕНИЯ SEO НА ВСЕХ СТРАНИЦАХ ПРОЕКТА НОК ЭКСПЕРТ\n');

// Компоненты для проверки
const pageComponents = [
  {
    name: 'Главная страница',
    file: 'src/app/features/main/main-page.component.ts',
    expectedSeo: 'setHomePageSeo()',
    expectedStructuredData: ['addCustomerReviewsStructuredData', 'addLocalBusinessStructuredData']
  },
  {
    name: 'Страница услуг',
    file: 'src/app/features/services/components/services-page.component.ts',
    expectedSeo: 'setServicesPageSeo()',
    expectedStructuredData: ['addServicesPricingStructuredData']
  },
  {
    name: 'Страница FAQ',
    file: 'src/app/features/faq/components/faq-page.component.ts',
    expectedSeo: 'setSeoData({',
    expectedStructuredData: ['addCompleteFaqStructuredData', 'addBreadcrumbsStructuredData']
  },
  {
    name: 'Страница контактов',
    file: 'src/app/features/contacts/components/contacts-page.component.ts',
    expectedSeo: 'setContactsPageSeo()',
    expectedStructuredData: ['addContactStructuredData', 'addServiceAvailabilityStructuredData']
  },
  {
    name: 'Страница блога',
    file: 'src/app/features/blog/components/blog-page.component.ts',
    expectedSeo: 'setBlogPageSeo()',
    expectedStructuredData: ['addBreadcrumbsStructuredData']
  },
  {
    name: 'Страница "Что такое НОК"',
    file: 'src/app/features/info/components/what-is-nok-page.component.ts',
    expectedSeo: 'setWhatIsNokPageSeo()',
    expectedStructuredData: ['addBreadcrumbsStructuredData']
  },
  {
    name: 'Страница НОК НОСТРОЙ',
    file: 'src/app/features/services/nok-nostroy/nok-nostroy-page.component.ts',
    expectedSeo: 'setNokNostroyPageSeo()',
    expectedStructuredData: ['addServicesPricingStructuredData']
  }
];

// Проверка каждого компонента
let totalPages = pageComponents.length;
let pagesWithSeo = 0;
let pagesWithStructuredData = 0;

console.log('📋 ПРОВЕРКА СТРАНИЦ:\n');

pageComponents.forEach((component, index) => {
  console.log(`${index + 1}. ${component.name}`);
  console.log(`   📄 Файл: ${component.file}`);

  try {
    const filePath = path.join(__dirname, '..', component.file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Проверка SEO внедрения
    const hasSeo = content.includes(component.expectedSeo);
    console.log(`   ${hasSeo ? '✅' : '❌'} SEO: ${component.expectedSeo}`);

    // Проверка structured data
    let structuredDataCount = 0;
    component.expectedStructuredData.forEach(method => {
      const hasMethod = content.includes(method);
      console.log(`   ${hasMethod ? '✅' : '❌'} Structured Data: ${method}`);
      if (hasMethod) structuredDataCount++;
    });

    if (hasSeo) pagesWithSeo++;
    if (structuredDataCount > 0) pagesWithStructuredData++;

    console.log('');

  } catch (error) {
    console.log(`   ❌ Ошибка чтения файла: ${error.message}`);
    console.log('');
  }
});

// Проверка SEO сервиса на наличие всех методов
console.log('🔧 ПРОВЕРКА SEO СЕРВИСА:\n');

const seoServiceFile = 'src/app/shared/services/seo.service.ts';
const seoMethods = [
  'setHomePageSeo',
  'setServicesPageSeo',
  'setContactsPageSeo',
  'setBlogPageSeo',
  'setWhatIsNokPageSeo',
  'setNokNostroyPageSeo',
  'addCompleteFaqStructuredData',
  'addServicesPricingStructuredData',
  'addServiceAvailabilityStructuredData',
  'addContactStructuredData',
  'addCustomerReviewsStructuredData',
  'addLocalBusinessStructuredData',
  'addBreadcrumbsStructuredData'
];

try {
  const seoServicePath = path.join(__dirname, '..', seoServiceFile);
  const seoContent = fs.readFileSync(seoServicePath, 'utf-8');

  console.log('SEO методы:');
  let methodsFound = 0;

  seoMethods.forEach(method => {
    const hasMethod = seoContent.includes(method + '(');
    console.log(`   ${hasMethod ? '✅' : '❌'} ${method}`);
    if (hasMethod) methodsFound++;
  });

  console.log(`\n📊 Методы SEO сервиса: ${methodsFound}/${seoMethods.length} найдено`);

} catch (error) {
  console.log(`❌ Ошибка чтения SEO сервиса: ${error.message}`);
}

// Проверка использования Schema.org
console.log('\n🎯 ПРОВЕРКА SCHEMA.ORG:\n');

const schemaTypes = [
  'FAQPage',
  'Service',
  'Organization',
  'LocalBusiness',
  'Offer',
  'ContactPoint',
  'BreadcrumbList'
];

try {
  const seoServicePath = path.join(__dirname, '..', seoServiceFile);
  const seoContent = fs.readFileSync(seoServicePath, 'utf-8');

  console.log('Schema.org типы в SEO сервисе:');
  let schemasFound = 0;

  schemaTypes.forEach(schema => {
    const hasSchema = seoContent.includes(`"@type": "${schema}"`);
    console.log(`   ${hasSchema ? '✅' : '❌'} ${schema}`);
    if (hasSchema) schemasFound++;
  });

  console.log(`\n📊 Schema.org типы: ${schemasFound}/${schemaTypes.length} внедрено`);

} catch (error) {
  console.log(`❌ Ошибка проверки Schema.org: ${error.message}`);
}

// Финальные результаты
console.log('\n' + '='.repeat(60));
console.log('📊 ФИНАЛЬНЫЕ РЕЗУЛЬТАТЫ:');
console.log('='.repeat(60));

console.log(`📄 Страницы с SEO: ${pagesWithSeo}/${totalPages}`);
console.log(`🔗 Страницы со Structured Data: ${pagesWithStructuredData}/${totalPages}`);
console.log(`🔧 SEO методы в сервисе: ${seoMethods.length} доступно`);
console.log(`🎯 Schema.org типы: ${schemaTypes.length} типов`);

const seoCoverage = Math.round((pagesWithSeo / totalPages) * 100);
const structuredDataCoverage = Math.round((pagesWithStructuredData / totalPages) * 100);

console.log(`\n📈 ПОКРЫТИЕ SEO: ${seoCoverage}%`);
console.log(`📈 ПОКРЫТИЕ STRUCTURED DATA: ${structuredDataCoverage}%`);

if (seoCoverage === 100 && structuredDataCoverage === 100) {
  console.log('\n🎉 ОТЛИЧНО! SEO полностью внедрен на всех страницах!');
  console.log('✅ Schema.org активно используется');
  console.log('🚀 Проект готов к продакшену!');
} else {
  console.log('\n⚠️  SEO внедрение неполное');
  console.log('❌ Некоторые страницы требуют доработки');
}

console.log('\n💡 РЕКОМЕНДАЦИИ:');
console.log('1. Проверьте все страницы в Google Search Console');
console.log('2. Тестируйте rich snippets в Google Rich Results Test');
console.log('3. Валидируйте structured data в Schema.org Validator');
console.log('4. Мониторьте Core Web Vitals в Google PageSpeed Insights');
console.log('5. Настройте Google Analytics и Яндекс.Метрику');
