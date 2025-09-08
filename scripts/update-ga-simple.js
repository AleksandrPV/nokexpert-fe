#!/usr/bin/env node

/**
 * Замена Google Analytics кода на простой вариант
 * Использование: node scripts/update-ga-simple.js
 */

const fs = require('fs');
const path = require('path');

function updateGASimple() {
    console.log('🔄 ЗАМЕНА НА ПРОСТОЙ GOOGLE ANALYTICS КОД\n');

    try {
        // Новый простой код
        const simpleGACode = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XDYTVNXHCS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-XDYTVNXHCS');
  </script>`;

        // Читаем текущий файл
        let indexHtml = fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8');

        // Находим и заменяем расширенный код на простой
        const extendedPattern = /  <!-- Google Analytics 4 -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-XDYTVNXHCS"><\/script>\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'G-XDYTVNXHCS', \{\s*anonymize_ip: true,\s*allow_google_signals: true,\s*allow_ad_features: false,\s*allow_ad_personalization_signals: false,\s*send_page_view: true\s*\}\);\s*<\/script>/s;

        if (extendedPattern.test(indexHtml)) {
            indexHtml = indexHtml.replace(extendedPattern, simpleGACode);
            fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);

            console.log('✅ Google Analytics код заменен на простой вариант!');
            console.log('   ⚠️  ВНИМАНИЕ: Отключены настройки приватности');
            console.log('   • anonymize_ip: false');
            console.log('   • allow_ad_features: по умолчанию');
            console.log('   • allow_ad_personalization_signals: по умолчанию');
        } else {
            console.log('⚠️  Расширенный код не найден или уже заменен');
        }

        // Также нужно обновить analytics.service.ts если там есть расширенные настройки
        let analyticsService = fs.readFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), 'utf8');

        // Удаляем расширенные настройки из конфигурации
        analyticsService = analyticsService.replace(
            /window\.gtag\('config', 'G-XDYTVNXHCS', \{\s*page_title: pageView\.title,\s*page_location: window\.location\.href,\s*page_path: pageView\.url\s*\}\);/,
            "window.gtag('config', 'G-XDYTVNXHCS');"
        );

        fs.writeFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), analyticsService);
        console.log('✅ Analytics service также обновлен');

    } catch (error) {
        console.log('❌ Ошибка:', error.message);
    }
}

// Запуск скрипта
updateGASimple();
