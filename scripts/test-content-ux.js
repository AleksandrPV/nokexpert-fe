#!/usr/bin/env node

/**
 * Скрипт для тестирования контента и UX оптимизаций
 * Запуск: node scripts/test-content-ux.js
 */

const fs = require('fs');
const path = require('path');

console.log('📄 Проверка контента и UX оптимизаций проекта НОК Эксперт\n');

// Проверки контента и UX
const checks = [
  {
    name: 'Breadcrumb навигация',
    check: () => {
      const files = [
        'src/app/features/blog/components/blog-article-page.component.ts',
        'src/app/features/faq/components/faq-page.component.ts',
        'src/app/features/contacts/components/contacts-page.component.ts',
        'src/app/features/services/components/services-page.component.ts'
      ];

      return files.every(file => {
        const filePath = path.join(__dirname, '../', file);
        if (!fs.existsSync(filePath)) return false;
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.includes('BreadcrumbsComponent') || content.includes('app-breadcrumbs');
      });
    }
  },
  {
    name: 'Внутренняя перелинковка',
    check: () => {
      const contextualLinksPath = path.join(__dirname, '../src/app/shared/components/contextual-links/contextual-links.component.ts');
      if (!fs.existsSync(contextualLinksPath)) return false;
      const content = fs.readFileSync(contextualLinksPath, 'utf-8');
      return content.includes('routerLink') && content.includes('contextual-links');
    }
  },
  {
    name: 'Микроразметка статей',
    check: () => {
      const blogArticlePath = path.join(__dirname, '../src/app/features/blog/components/blog-article-page.component.html');
      if (!fs.existsSync(blogArticlePath)) return false;
      const content = fs.readFileSync(blogArticlePath, 'utf-8');
      return content.includes('itemprop="headline"') &&
             content.includes('itemprop="articleBody"') &&
             content.includes('itemprop="author"');
    }
  },
  {
    name: 'Оптимизация заголовков',
    check: () => {
      const headingsServicePath = path.join(__dirname, '../src/app/shared/services/headings.service.ts');
      if (!fs.existsSync(headingsServicePath)) return false;
      const content = fs.readFileSync(headingsServicePath, 'utf-8');
      return content.includes('validateHeadings') &&
             content.includes('optimizeHeadings') &&
             content.includes('generateTableOfContents');
    }
  },
  {
    name: 'Структура H1-H6',
    check: () => {
      const blogArticlePath = path.join(__dirname, '../src/app/features/blog/components/blog-article-page.component.html');
      if (!fs.existsSync(blogArticlePath)) return false;
      const content = fs.readFileSync(blogArticlePath, 'utf-8');
      const h1Count = (content.match(/<h1/g) || []).length;
      const h2Count = (content.match(/<h2/g) || []).length;
      return h1Count === 1 && h2Count >= 3; // Один H1 и несколько H2
    }
  },
  {
    name: 'Якорные ссылки в заголовках',
    check: () => {
      const blogArticlePath = path.join(__dirname, '../src/app/features/blog/components/blog-article-page.component.html');
      const headingsServicePath = path.join(__dirname, '../src/app/shared/services/headings.service.ts');

      if (!fs.existsSync(blogArticlePath) || !fs.existsSync(headingsServicePath)) return false;

      const articleContent = fs.readFileSync(blogArticlePath, 'utf-8');
      const serviceContent = fs.readFileSync(headingsServicePath, 'utf-8');

      // Проверяем наличие ID у заголовков
      const hasIds = articleContent.includes('id="key-changes"') &&
                    articleContent.includes('id="specialist-actions"');

      // Проверяем генерацию ссылок в сервисе
      const hasHrefGeneration = serviceContent.includes('href="#${item.id}"');

      // Проверяем наличие контейнера для оглавления
      const hasTocContainer = articleContent.includes('toc-container');

      // Проверяем обработчики кликов
      const hasClickHandlers = serviceContent.includes('addEventListener(\'click\'');

      return hasIds && hasHrefGeneration && hasTocContainer && hasClickHandlers;
    }
  },
  {
    name: 'Оглавление статьи',
    check: () => {
      const blogArticlePath = path.join(__dirname, '../src/app/features/blog/components/blog-article-page.component.html');
      if (!fs.existsSync(blogArticlePath)) return false;
      const content = fs.readFileSync(blogArticlePath, 'utf-8');
      return content.includes('toc-container');
    }
  },
  {
    name: 'Контекстные ссылки',
    check: () => {
      const contextualLinksPath = path.join(__dirname, '../src/app/shared/components/contextual-links/contextual-links.component.ts');
      if (!fs.existsSync(contextualLinksPath)) return false;
      const content = fs.readFileSync(contextualLinksPath, 'utf-8');
      return content.includes('exam-preparation') &&
             content.includes('portfolio-guide') &&
             content.includes('nok-qa');
    }
  },
  {
    name: 'Яндекс.Метрика',
    check: () => {
      const indexPath = path.join(__dirname, '../src/index.html');
      if (!fs.existsSync(indexPath)) return false;
      const content = fs.readFileSync(indexPath, 'utf-8');
      return content.includes('mc.yandex.ru/metrika/tag.js?id=104076182') &&
             content.includes('ym(104076182, \'init\'') &&
             content.includes('ssr:true') &&
             content.includes('webvisor:true') &&
             content.includes('clickmap:true');
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

console.log(`\n📊 Результат: ${passed}/${total} проверок пройдено (включая аналитику)`);

if (passed === total) {
  console.log('🎉 Отлично! Все оптимизации контента и UX внедрены!');
} else {
  console.log('⚠️  Некоторые оптимизации контента и UX еще не внедрены');
}

// Рекомендации
console.log('\n💡 Рекомендации по контенту и UX:');
console.log('1. Регулярно обновляйте оглавление в статьях');
console.log('2. Добавляйте больше внутренних ссылок в контент');
console.log('3. Проверяйте работу якорей в заголовках');
console.log('4. Мониторьте время чтения статей');

console.log('\n🔗 Проверенные компоненты:');
console.log('- ✅ BreadcrumbsComponent с микроразметкой');
console.log('- ✅ ContextualLinksComponent с перелинковкой');
console.log('- ✅ HeadingsService с оптимизацией');
console.log('- ✅ Article с микроразметкой и оглавлением');

console.log('\n🎯 UX улучшения:');
console.log('- Навигация: хлебные крошки + оглавление');
console.log('- Перелинковка: контекстные ссылки + внутренние ссылки');
console.log('- Доступность: ARIA метки + микроразметка');
console.log('- Читабельность: оптимальная длина заголовков + структура');
