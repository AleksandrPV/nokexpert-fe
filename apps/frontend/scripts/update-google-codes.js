#!/usr/bin/env node

/**
 * Обновление кодов Google сервисов
 * Использование: node scripts/update-google-codes.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function updateGoogleCodes() {
    console.log('🔧 ОБНОВЛЕНИЕ КОДОВ GOOGLE СЕРВИСОВ\n');

    // Получение кодов от пользователя
    console.log('📋 Вам понадобятся коды из Google сервисов:\n');

    const gscCode = await askQuestion('1. Google Search Console - код верификации (content из meta-тега): ');
    const ga4Id = await askQuestion('2. Google Analytics 4 - Measurement ID (G-XXXXXXXXXX): ');

    if (!gscCode || !ga4Id) {
        console.log('❌ Все поля обязательны для заполнения!');
        rl.close();
        return;
    }

    console.log('\n🔄 ОБНОВЛЕНИЕ ФАЙЛОВ...\n');

    try {
        // 1. Обновление Google Search Console верификации
        let indexHtml = fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8');
        indexHtml = indexHtml.replace('PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE', gscCode);
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);
        console.log('✅ Google Search Console код обновлен в index.html');

        // 2. Обновление Google Analytics ID в index.html
        indexHtml = indexHtml.replace(/GA_MEASUREMENT_ID/g, ga4Id);
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);
        console.log('✅ Google Analytics ID обновлен в index.html');

        // 3. Обновление Google Analytics ID в analytics.service.ts
        let analyticsService = fs.readFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), 'utf8');
        analyticsService = analyticsService.replace('GA_MEASUREMENT_ID', ga4Id);
        fs.writeFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), analyticsService);
        console.log('✅ Google Analytics ID обновлен в analytics.service.ts');

        console.log('\n🎉 ВСЕ КОДЫ УСПЕШНО ОБНОВЛЕНЫ!\n');

        console.log('📋 СЛЕДУЮЩИЕ ШАГИ:');
        console.log('==================');
        console.log('1. ✅ Проверьте что сайт собирается: npm run build');
        console.log('2. ✅ Разверните обновленный сайт на сервере');
        console.log('3. ✅ В Google Search Console подтвердите HTML-тег верификацию');
        console.log('4. ✅ В Google Analytics проверьте поступление данных (через 24 часа)');
        console.log('5. ✅ Добавьте sitemap в Search Console');

        console.log('\n🔗 ПОЛЕЗНЫЕ ССЫЛКИ:');
        console.log('===================');
        console.log('• Google Search Console: https://search.google.com/search-console');
        console.log('• Google Analytics: https://analytics.google.com/');
        console.log('• Проверка rich results: https://search.google.com/test/rich-results');

    } catch (error) {
        console.log('❌ Ошибка при обновлении файлов:', error.message);
    }

    rl.close();
}

// Запуск скрипта
updateGoogleCodes().catch(console.error);
