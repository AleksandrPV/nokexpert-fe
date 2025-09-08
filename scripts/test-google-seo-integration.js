#!/usr/bin/env node

/**
 * Тестирование интеграции Google SEO сервисов
 * Запуск: node scripts/test-google-seo-integration.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ТЕСТИРОВАНИЕ ИНТЕГРАЦИИ GOOGLE SEO СЕРВИСОВ\n');

// Функции тестирования
function testFileExists(filePath, description) {
    const fullPath = path.join(__dirname, '..', filePath);
    const exists = fs.existsSync(fullPath);

    console.log(`${exists ? '✅' : '❌'} ${description}`);
    if (!exists) {
        console.log(`   Файл не найден: ${fullPath}`);
    }

    return exists;
}

function testFileContent(filePath, searchPatterns, description) {
    const fullPath = path.join(__dirname, '..', filePath);

    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        let allFound = true;

        console.log(`🔍 ${description}`);

        searchPatterns.forEach(pattern => {
            const found = content.includes(pattern.search);
            console.log(`   ${found ? '✅' : '❌'} ${pattern.description}`);

            if (!found && pattern.required) {
                console.log(`      ОШИБКА: Не найдено "${pattern.search}"`);
                allFound = false;
            }
        });

        return allFound;
    } catch (error) {
        console.log(`❌ Ошибка чтения файла ${filePath}: ${error.message}`);
        return false;
    }
}

// Тесты
console.log('📋 ПРОВЕРКА ФАЙЛОВ:');
console.log('==================');

// 1. Проверка основных файлов
const filesExist = [
    testFileExists('src/index.html', 'Основной HTML файл'),
    testFileExists('public/robots.txt', 'Файл robots.txt'),
    testFileExists('public/sitemap.xml', 'Основная карта сайта'),
    testFileExists('src/app/shared/services/analytics.service.ts', 'Сервис аналитики'),
    testFileExists('GOOGLE_SEO_SETUP.md', 'Инструкция по настройке')
];

console.log('\n📋 ПРОВЕРКА КОНТЕНТА:');
console.log('===================');

// 2. Проверка index.html
const indexHtmlTests = testFileContent('src/index.html', [
    { search: 'google-site-verification', description: 'Google Search Console верификация', required: true },
    { search: 'googletagmanager.com/gtag/js', description: 'Google Analytics 4 скрипт', required: true },
    { search: 'gtag(\'config\', \'GA_MEASUREMENT_ID\'', description: 'GA4 конфигурация', required: true },
    { search: 'mc.yandex.ru', description: 'Yandex Metrika интеграция', required: true },
    { search: 'Content-Security-Policy', description: 'CSP политика безопасности', required: true },
    { search: 'googletagmanager.com', description: 'Google domains в CSP', required: true }
], 'Проверка index.html');

// 3. Проверка robots.txt
const robotsTxtTests = testFileContent('public/robots.txt', [
    { search: 'User-agent: Googlebot', description: 'Правила для Googlebot', required: true },
    { search: 'User-agent: YandexBot', description: 'Правила для YandexBot', required: true },
    { search: 'Sitemap: https://nok-expert.ru/', description: 'Карты сайта', required: true },
    { search: 'Host: https://nok-expert.ru', description: 'Основной хост', required: true },
    { search: 'ГОТОВ К ИНДЕКСАЦИИ', description: 'Статус готовности к индексации', required: false }
], 'Проверка robots.txt');

// 4. Проверка sitemap.xml
const sitemapTests = testFileContent('public/sitemap.xml', [
    { search: 'https://nok-expert.ru/', description: 'Основная страница', required: true },
    { search: 'https://nok-expert.ru/services', description: 'Страница услуг', required: true },
    { search: 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"', description: 'Google image namespace', required: true },
    { search: 'changefreq', description: 'Частота обновления', required: true },
    { search: 'priority', description: 'Приоритет страниц', required: true }
], 'Проверка sitemap.xml');

// 5. Проверка analytics.service.ts
const analyticsTests = testFileContent('src/app/shared/services/analytics.service.ts', [
    { search: 'window.gtag', description: 'Google Analytics интеграция', required: true },
    { search: 'window.ym', description: 'Yandex Metrika интеграция', required: true },
    { search: 'GA_MEASUREMENT_ID', description: 'GA4 ID placeholder', required: true },
    { search: '104076182', description: 'Yandex Metrika ID', required: true }
], 'Проверка analytics.service.ts');

// Проверка конфигурации
console.log('\n⚙️  ПРОВЕРКА КОНФИГУРАЦИИ:');
console.log('========================');

// 6. Проверка на placeholder'ы
const placeholderTests = [
    testFileContent('src/index.html', [
        { search: 'PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE', description: 'Google верификация placeholder', required: false }
    ], 'Проверка placeholder\'ов в index.html'),

    testFileContent('src/app/shared/services/analytics.service.ts', [
        { search: 'GA_MEASUREMENT_ID', description: 'GA4 ID placeholder', required: false }
    ], 'Проверка GA4 placeholder\'ов')
];

// Итоги
console.log('\n📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
console.log('===========================');

const allTestsPassed = [
    ...filesExist,
    indexHtmlTests,
    robotsTxtTests,
    sitemapTests,
    analyticsTests
].every(test => test);

if (allTestsPassed) {
    console.log('✅ ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!');
    console.log('\n🎯 ДАЛЕЕ:');
    console.log('1. Замените GA_MEASUREMENT_ID на реальный ID из Google Analytics');
    console.log('2. Замените PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE на код из Search Console');
    console.log('3. Следуйте инструкциям в GOOGLE_SEO_SETUP.md');
    console.log('4. Протестируйте интеграцию через Google Rich Results Test');
} else {
    console.log('❌ НЕКОТОРЫЕ ТЕСТЫ НЕ ПРОШЛИ!');
    console.log('\n🔧 РЕКОМЕНДАЦИИ:');
    console.log('1. Проверьте отсутствующие файлы');
    console.log('2. Убедитесь в корректности содержимого файлов');
    console.log('3. Следуйте инструкциям в GOOGLE_SEO_SETUP.md');
}

// Проверка на placeholder'ы для замены
const hasPlaceholders = [
    fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8').includes('PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE'),
    fs.readFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), 'utf8').includes('GA_MEASUREMENT_ID')
].some(has => has);

if (hasPlaceholders) {
    console.log('\n⚠️  ВАЖНО:');
    console.log('Обнаружены placeholder\'ы, которые нужно заменить на реальные значения!');
    console.log('См. GOOGLE_SEO_SETUP.md для подробных инструкций.');
}

console.log('\n🔗 ПОЛЕЗНЫЕ ССЫЛКИ:');
console.log('===================');
console.log('• Google Search Console: https://search.google.com/search-console');
console.log('• Google Analytics: https://analytics.google.com/');
console.log('• Google Rich Results Test: https://search.google.com/test/rich-results');
console.log('• Google PageSpeed Insights: https://pagespeed.web.dev/');
console.log('• Инструкция по настройке: GOOGLE_SEO_SETUP.md');
