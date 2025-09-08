#!/usr/bin/env node

/**
 * Обновление только Google Search Console кода верификации
 * Использование: node scripts/update-gsc-only.js GSC_CODE
 */

const fs = require('fs');
const path = require('path');

function updateGscCode(gscCode) {
    if (!gscCode) {
        console.log('❌ Использование: node scripts/update-gsc-only.js GSC_CODE');
        console.log('   Пример: node scripts/update-gsc-only.js abc123def456');
        return;
    }

    console.log('🔄 ОБНОВЛЕНИЕ GOOGLE SEARCH CONSOLE КОДА\n');

    try {
        // Обновление Google Search Console верификации
        let indexHtml = fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8');
        const oldContent = indexHtml;

        indexHtml = indexHtml.replace('placeholder_gsc_code', gscCode);
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);

        console.log('✅ Google Search Console код обновлен!');
        console.log(`   Старый: placeholder_gsc_code`);
        console.log(`   Новый:  ${gscCode}`);

        // Проверка что замена произошла
        if (oldContent !== indexHtml) {
            console.log('\n🎉 ГОТОВО! Теперь можно собирать проект:');
            console.log('   npm run build');
            console.log('   npm run serve:ssr');
        } else {
            console.log('\n⚠️  Код не найден или уже заменен');
        }

    } catch (error) {
        console.log('❌ Ошибка:', error.message);
    }
}

// Получение аргументов командной строки
const args = process.argv.slice(2);
if (args.length === 1) {
    updateGscCode(args[0]);
} else {
    console.log('❌ Неверное количество аргументов');
    console.log('✅ Использование: node scripts/update-gsc-only.js GSC_CODE');
    console.log('   Пример: node scripts/update-gsc-only.js abc123def456');
}
