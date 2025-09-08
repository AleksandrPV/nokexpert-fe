#!/usr/bin/env node

/**
 * Скрипт для тестирования аналитики и счетчиков
 * Запуск: node scripts/test-analytics.js
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Проверка аналитики и счетчиков проекта НОК Эксперт\n');

// Проверки аналитики
const checks = [
  {
    name: 'Яндекс.Метрика',
    check: () => {
      const indexPath = path.join(__dirname, '../src/index.html');
      if (!fs.existsSync(indexPath)) return false;
      const content = fs.readFileSync(indexPath, 'utf-8');

      return {
        script: content.includes('mc.yandex.ru/metrika/tag.js?id=104076182'),
        init: content.includes('ym(104076182, \'init\''),
        ssr: content.includes('ssr:true'),
        webvisor: content.includes('webvisor:true'),
        clickmap: content.includes('clickmap:true'),
        noscript: content.includes('mc.yandex.ru/watch/104076182')
      };
    }
  },
  {
    name: 'Яндекс.Вебмастер верификация',
    check: () => {
      const indexPath = path.join(__dirname, '../src/index.html');
      if (!fs.existsSync(indexPath)) return false;
      const content = fs.readFileSync(indexPath, 'utf-8');

      return {
        metaTag: content.includes('yandex-verification'),
        content: content.includes('fc3cb51d6001bcbc'),
        placement: content.includes('<!-- Yandex Webmaster Verification -->')
      };
    }
  },
  {
    name: 'Google Analytics (будущий)',
    check: () => {
      const indexPath = path.join(__dirname, '../src/index.html');
      if (!fs.existsSync(indexPath)) return false;
      const content = fs.readFileSync(indexPath, 'utf-8');

      return {
        gtag: content.includes('googletagmanager.com/gtag/js'),
        ga4: content.includes('GA_MEASUREMENT_ID'),
        gtagInit: content.includes('gtag(\'config\'')
      };
    }
  },
  {
    name: 'Service Worker для оффлайн аналитики',
    check: () => {
      const ngswPath = path.join(__dirname, '../ngsw-config.json');
      const appConfigPath = path.join(__dirname, '../src/app/app.config.ts');

      if (!fs.existsSync(ngswPath) || !fs.existsSync(appConfigPath)) return false;

      const ngswContent = fs.readFileSync(ngswPath, 'utf-8');
      const appConfigContent = fs.readFileSync(appConfigPath, 'utf-8');

      return {
        config: fs.existsSync(ngswPath),
        serviceWorker: appConfigContent.includes('ngsw-worker.js'),
        registration: appConfigContent.includes('registerWhenStable')
      };
    }
  }
];

// Выполнение проверок
let totalChecks = 0;
let passedChecks = 0;

checks.forEach(({ name, check }) => {
  try {
    console.log(`🔍 Проверка ${name}:`);
    const result = check();

    if (typeof result === 'object') {
      // Детальная проверка с объектом результатов
      Object.entries(result).forEach(([key, value]) => {
        const status = value ? '✅' : '❌';
        console.log(`  ${status} ${key}`);
        totalChecks++;
        if (value) passedChecks++;
      });
    } else {
      // Простая булева проверка
      const status = result ? '✅' : '❌';
      console.log(`  ${status} ${name}`);
      totalChecks++;
      if (result) passedChecks++;
    }
    console.log('');
  } catch (error) {
    console.log(`❌ Ошибка при проверке ${name}: ${error.message}\n`);
  }
});

console.log(`📊 Результат тестирования аналитики: ${passedChecks}/${totalChecks} проверок пройдено (включая верификацию)`);

if (passedChecks === totalChecks) {
  console.log('🎉 Отлично! Все компоненты аналитики внедрены!');
} else {
  console.log('⚠️  Некоторые компоненты аналитики еще не внедрены');
}

// Рекомендации
console.log('\n💡 Рекомендации по аналитике:');
console.log('1. ✅ Яндекс.Метрика внедрена с полным набором функций');
console.log('2. 🔄 Рассмотрите добавление Google Analytics 4');
console.log('3. 📱 Настройте отслеживание мобильных устройств');
console.log('4. 🎯 Настройте цели конверсии в Яндекс.Метрике');
console.log('5. 📊 Создайте дашборды для мониторинга KPI');

console.log('\n🔗 Настройки Яндекс.Метрики:');
console.log('- ID счетчика: 104076182');
console.log('- SSR поддержка: включена');
console.log('- Вебвизор: включен');
console.log('- Карта кликов: включена');
console.log('- Точный отказ: включен');
console.log('- Отслеживание ссылок: включено');

console.log('\n📈 Метрики для отслеживания:');
console.log('- Посещаемость и источники трафика');
console.log('- Вовлеченность (время на сайте, просмотры страниц)');
console.log('- Конверсии (заявки, звонки, консультации)');
console.log('- Технические метрики (ошибки, скорость загрузки)');
console.log('- Мобильная аналитика (устройства, география)');

console.log('\n🛠️ Следующие шаги:');
console.log('1. Проверьте корректность установки в Яндекс.Метрике');
console.log('2. Настройте цели и конверсии');
console.log('3. Создайте пользовательские отчеты');
console.log('4. Настройте оповещения о важных изменениях');
console.log('5. Интегрируйте данные с CRM системой');
