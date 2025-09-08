#!/usr/bin/env node

/**
 * Скрипт для проверки производительности проекта
 * Запуск: node scripts/check-performance.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Проверка производительности проекта НОК Эксперт\n');

// Проверки
const checks = [
  {
    name: 'Lazy Loading маршрутов',
    check: () => {
      const routesFile = path.join(__dirname, '../src/app/app.routes.ts');
      const content = fs.readFileSync(routesFile, 'utf-8');
      return content.includes('loadComponent:');
    }
  },
  {
    name: 'Service Worker',
    check: () => {
      const configFile = path.join(__dirname, '../src/app/app.config.ts');
      const content = fs.readFileSync(configFile, 'utf-8');
      return content.includes('provideServiceWorker');
    }
  },
  {
    name: 'Inline Critical CSS',
    check: () => {
      const angularJson = path.join(__dirname, '../angular.json');
      const content = fs.readFileSync(angularJson, 'utf-8');
      return content.includes('"inlineCritical": true');
    }
  },
  {
    name: 'Оптимизация Zone.js',
    check: () => {
      const configFile = path.join(__dirname, '../src/app/app.config.ts');
      const content = fs.readFileSync(configFile, 'utf-8');
      return content.includes('runCoalescing: true');
    }
  },
  {
    name: 'Preload шрифтов',
    check: () => {
      const indexFile = path.join(__dirname, '../src/index.html');
      const content = fs.readFileSync(indexFile, 'utf-8');
      return content.includes('rel="preload"') && content.includes('fonts.googleapis.com');
    }
  },
  {
    name: 'Оптимизация изображений',
    check: () => {
      const imgComponent = path.join(__dirname, '../src/app/shared/components/optimized-image/optimized-image.component.ts');
      const content = fs.readFileSync(imgComponent, 'utf-8');
      return content.includes('decoding="async"') && content.includes('priority ? \'high\' : null');
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
  console.log('🎉 Отлично! Все оптимизации производительности внедрены!');
} else {
  console.log('⚠️  Некоторые оптимизации еще не внедрены');
}

// Рекомендации
console.log('\n💡 Рекомендации для дальнейшей оптимизации:');
console.log('1. Регулярно проверяйте Core Web Vitals в Google PageSpeed Insights');
console.log('2. Мониторьте размер бандла командой: npm run build:analyze');
console.log('3. Оптимизируйте изображения с помощью WebP формата');
console.log('4. Рассмотрите внедрение CDN для статических ресурсов');
console.log('5. Добавьте preload для критических изображений');
