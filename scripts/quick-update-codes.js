#!/usr/bin/env node

/**
 * Быстрое обновление кодов Google сервисов
 * Использование: node scripts/quick-update-codes.js GSC_CODE GA4_ID
 */

const fs = require('fs');
const path = require('path');

function updateCodes(gscCode, ga4Id) {
    if (!gscCode || !ga4Id) {
        console.log('❌ Использование: node scripts/quick-update-codes.js GSC_CODE GA4_ID');
        console.log('   Пример: node scripts/quick-update-codes.js abc123def456 G-XXXXXXXXXX');
        return;
    }

    console.log('🔄 БЫСТРОЕ ОБНОВЛЕНИЕ КОДОВ GOOGLE СЕРВИСОВ\n');

    try {
        // 1. Обновление Google Search Console
        let indexHtml = fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8');
        indexHtml = indexHtml.replace('PLACEHOLDER_FOR_GOOGLE_VERIFICATION_CODE', gscCode);
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);
        console.log('✅ Google Search Console код обновлен');

        // 2. Обновление Google Analytics ID
        indexHtml = indexHtml.replace(/GA_MEASUREMENT_ID/g, ga4Id);
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);
        console.log('✅ Google Analytics ID обновлен в index.html');

        let analyticsService = fs.readFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), 'utf8');
        analyticsService = analyticsService.replace('GA_MEASUREMENT_ID', ga4Id);
        fs.writeFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), analyticsService);
        console.log('✅ Google Analytics ID обновлен в analytics.service.ts');

        console.log('\n🎉 КОДЫ УСПЕШНО ОБНОВЛЕНЫ!');
        console.log(`   GSC: ${gscCode}`);
        console.log(`   GA4: ${ga4Id}`);

    } catch (error) {
        console.log('❌ Ошибка:', error.message);
    }
}

// Получение аргументов командной строки
const args = process.argv.slice(2);
if (args.length === 2) {
    updateCodes(args[0], args[1]);
} else {
    console.log('❌ Неверное количество аргументов');
    console.log('✅ Использование: node scripts/quick-update-codes.js GSC_CODE GA4_ID');
    console.log('   Пример: node scripts/quick-update-codes.js abc123def456 G-XXXXXXXXXX');
}
