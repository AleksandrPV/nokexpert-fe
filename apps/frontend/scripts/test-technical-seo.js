#!/usr/bin/env node

/**
 * Скрипт для тестирования технического SEO
 * Запуск: node scripts/test-technical-seo.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Проверка технического SEO проекта НОК Эксперт\n');

// Проверки технического SEO
const checks = [
  {
    name: 'XML Sitemap существует',
    check: () => {
      const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
      return fs.existsSync(sitemapPath);
    }
  },
  {
    name: 'Sitemap Index существует',
    check: () => {
      const sitemapIndexPath = path.join(__dirname, '../public/sitemap-index.xml');
      return fs.existsSync(sitemapIndexPath);
    }
  },
  {
    name: 'OpenSearch существует',
    check: () => {
      const opensearchPath = path.join(__dirname, '../public/opensearch.xml');
      return fs.existsSync(opensearchPath);
    }
  },
  {
    name: 'hreflang в HTML',
    check: () => {
      const indexFile = path.join(__dirname, '../src/index.html');
      const content = fs.readFileSync(indexFile, 'utf-8');
      return content.includes('hreflang="ru"') && content.includes('hreflang="x-default"');
    }
  },
  {
    name: 'OpenSearch ссылка в HTML',
    check: () => {
      const indexFile = path.join(__dirname, '../src/index.html');
      const content = fs.readFileSync(indexFile, 'utf-8');
      return content.includes('rel="search"') && content.includes('opensearch.xml');
    }
  },
  {
    name: 'Расширенная контактная structured data',
    check: () => {
      const seoService = path.join(__dirname, '../src/app/shared/services/seo.service.ts');
      const content = fs.readFileSync(seoService, 'utf-8');
      return content.includes('addContactStructuredData') &&
             content.includes('contactPoint') &&
             content.includes('aggregateRating');
    }
  },
  {
    name: 'Sitemap содержит правильные URL',
    check: () => {
      const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
      if (!fs.existsSync(sitemapPath)) return false;
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      return content.includes('https://nok-expert.ru') &&
             !content.includes('нок-эксперт.рф');
    }
  },
  {
    name: 'Robots.txt разрешает индексацию',
    check: () => {
      const robotsPath = path.join(__dirname, '../public/robots.txt');
      if (!fs.existsSync(robotsPath)) return false;
      const content = fs.readFileSync(robotsPath, 'utf-8');
      return content.includes('Allow: /') &&
             content.includes('nok-expert.ru/sitemap.xml');
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
  console.log('🎉 Отлично! Все технические SEO оптимизации внедрены!');
} else {
  console.log('⚠️  Некоторые технические SEO оптимизации еще не внедрены');
}

// Рекомендации
console.log('\n💡 Рекомендации по техническому SEO:');
console.log('1. Отправьте sitemap.xml в Google Search Console');
console.log('2. Отправьте sitemap.xml в Яндекс.Вебмастер');
console.log('3. Проверьте корректность hreflang через Google Search Console');
console.log('4. Настройте мониторинг Core Web Vitals');
console.log('5. Добавьте Google Analytics и Яндекс.Метрику');

console.log('\n🔗 Полезные ссылки:');
console.log('- Google Search Console: https://search.google.com/search-console');
console.log('- Яндекс.Вебмастер: https://webmaster.yandex.ru/');
console.log('- Google PageSpeed Insights: https://pagespeed.web.dev/');
console.log('- Schema.org Validator: https://validator.schema.org/');
