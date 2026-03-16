#!/usr/bin/env node

/**
 * Настройка Google Tag Manager вместо прямого GA кода
 * Использование: node scripts/setup-gtm.js
 */

const fs = require('fs');
const path = require('path');

function setupGTM() {
    console.log('🔄 НАСТРОЙКА GOOGLE TAG MANAGER\n');

    try {
        // GTM код для head
        const gtmHeadCode = `  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GT-MQJR3V9N');</script>
  <!-- End Google Tag Manager -->`;

        // GTM код для body (noscript)
        const gtmBodyCode = `  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GT-MQJR3V9N"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`;

        // Читаем index.html
        let indexHtml = fs.readFileSync(path.join(__dirname, '..', 'src/index.html'), 'utf8');

        // Заменяем Google Analytics код на GTM
        const gaPattern = /  <!-- Google Analytics 4 -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-XDYTVNXHCS"><\/script>\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'G-XDYTVNXHCS', \{\s*anonymize_ip: true,\s*allow_google_signals: true,\s*allow_ad_features: false,\s*allow_ad_personalization_signals: false,\s*send_page_view: true\s*\}\);\s*<\/script>/s;

        if (gaPattern.test(indexHtml)) {
            indexHtml = indexHtml.replace(gaPattern, gtmHeadCode);
            console.log('✅ Google Analytics код заменен на GTM в head');
        } else {
            console.log('⚠️  Google Analytics код не найден, добавляем GTM');
            // Добавляем перед Yandex Metrika
            const yandexPattern = /  <!-- Yandex\.Metrika counter -->/;
            if (yandexPattern.test(indexHtml)) {
                indexHtml = indexHtml.replace(yandexPattern, gtmHeadCode + '\n\n  <!-- Yandex.Metrika counter -->');
                console.log('✅ GTM код добавлен перед Yandex Metrika');
            }
        }

        // Добавляем noscript код в body
        const bodyPattern = /  <app-root><\/app-root>/;
        if (bodyPattern.test(indexHtml)) {
            indexHtml = indexHtml.replace(bodyPattern, gtmBodyCode + '\n\n  <app-root></app-root>');
            console.log('✅ GTM noscript код добавлен в body');
        }

        // Сохраняем изменения
        fs.writeFileSync(path.join(__dirname, '..', 'src/index.html'), indexHtml);

        // Обновляем analytics.service.ts для работы с GTM
        let analyticsService = fs.readFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), 'utf8');

        // Заменяем прямые вызовы gtag на dataLayer.push для GTM
        analyticsService = analyticsService.replace(
            /if \(typeof window !== 'undefined' && window\.gtag\) \{\s*window\.gtag\('config', 'G-XDYTVNXHCS', \{\s*page_title: pageView\.title,\s*page_location: window\.location\.href,\s*page_path: pageView\.url\s*\}\);\s*\}/g,
            `if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': 'page_view',
        'page_title': pageView.title,
        'page_location': window.location.href,
        'page_path': pageView.url
      });
    }`
        );

        analyticsService = analyticsService.replace(
            /if \(typeof window !== 'undefined' && window\.gtag\) \{\s*window\.gtag\('event', event\.action, \{\s*event_category: event\.category,\s*event_label: event\.label,\s*value: event\.value\s*\}\);\s*\}/g,
            `if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': event.action,
        'event_category': event.category,
        'event_label': event.label,
        'value': event.value
      });
    }`
        );

        fs.writeFileSync(path.join(__dirname, '..', 'src/app/shared/services/analytics.service.ts'), analyticsService);
        console.log('✅ Analytics service обновлен для работы с GTM');

        console.log('\n🎉 GOOGLE TAG MANAGER НАСТРОЕН!');
        console.log('\n📋 ВАЖНЫЕ ДЕЙСТВИЯ:');
        console.log('1. ✅ Убедитесь что в GTM создан тег Google Analytics 4');
        console.log('2. ✅ Опубликуйте изменения в GTM контейнере');
        console.log('3. ✅ Соберите проект: npm run build');
        console.log('4. ✅ Разверните обновленный сайт');

        console.log('\n🔧 ПРОВЕРКА РАБОТЫ:');
        console.log('• GTM код: https://www.googletagmanager.com/gtm.js?id=GT-MQJR3V9N');
        console.log('• GA4 через GTM: G-XDYTVNXHCS');
        console.log('• Отслеживание событий через dataLayer');

    } catch (error) {
        console.log('❌ Ошибка:', error.message);
    }
}

// Запуск скрипта
setupGTM();
