#!/usr/bin/env node

/**
 * Скрипт для генерации XML sitemap на основе маршрутов приложения
 * Запуск: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://nok-expert.ru';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

/**
 * Статические маршруты с их метаданными
 */
const staticRoutes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    title: 'Главная страница'
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Услуги по подготовке к НОК'
  },
  {
    path: '/services/nok-nostroy',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'НОК НОСТРОЙ - Подготовка к НОК для строителей'
  },
  {
    path: '/services/nok-nopriz',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'НОК НОПРИЗ - Подготовка к НОК для проектировщиков'
  },
  {
    path: '/services/nok-opb',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'НОК ОПБ - Подготовка к НОК для пожарной безопасности'
  },
  {
    path: '/info',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Информация о НОК'
  },
  {
    path: '/info/what-is-nok',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Что такое НОК'
  },
  {
    path: '/info/who-must-pass-nok',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Кому обязательно проходить НОК'
  },
  {
    path: '/info/nok-procedure',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Процедура прохождения НОК'
  },
  {
    path: '/info/exam-preparation',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Подготовка к экзамену НОК'
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'daily',
    title: 'Блог НОК Эксперт'
  },
  {
    path: '/faq',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Часто задаваемые вопросы'
  },
  {
    path: '/contacts',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Контакты НОК Эксперт'
  },
  {
    path: '/qa-centers',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Центры оценки квалификации'
  },
  {
    path: '/qualifications',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Квалификации и требования'
  },
  {
    path: '/reviews',
    priority: '0.5',
    changefreq: 'weekly',
    title: 'Отзывы клиентов'
  },
  {
    path: '/sitemap',
    priority: '0.3',
    changefreq: 'monthly',
    title: 'Карта сайта'
  }
];

/**
 * Генерирует XML для одного URL
 */
function generateUrlXml(route) {
  return `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

/**
 * Генерирует основной sitemap
 */
function generateMainSitemap() {
  const urls = staticRoutes.map(generateUrlXml).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls}

</urlset>`;

  return sitemap;
}

/**
 * Генерирует sitemap index
 */
function generateSitemapIndex() {
  const sitemaps = [
    'sitemap.xml',
    'sitemap-blog.xml',
    'sitemap-services.xml',
    'sitemap-faq.xml'
  ];

  const sitemapEntries = sitemaps.map(sitemap => `  <sitemap>
    <loc>${BASE_URL}/${sitemap}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>`).join('\n');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${sitemapEntries}

</sitemapindex>`;

  return sitemapIndex;
}

/**
 * Сохраняет файл
 */
function saveFile(filename, content) {
  const filePath = path.join(__dirname, '../public', filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Сгенерирован: ${filename}`);
}

/**
 * Основная функция
 */
function main() {
  console.log('🚀 Генерация XML sitemap...\n');

  try {
    // Генерируем основной sitemap
    const mainSitemap = generateMainSitemap();
    saveFile('sitemap.xml', mainSitemap);

    // Генерируем sitemap index
    const sitemapIndex = generateSitemapIndex();
    saveFile('sitemap-index.xml', sitemapIndex);

    console.log('\n✅ Генерация sitemap завершена успешно!');
    console.log(`📊 Всего страниц: ${staticRoutes.length}`);
    console.log(`🔗 Основной sitemap: ${BASE_URL}/sitemap.xml`);
    console.log(`🔗 Sitemap Index: ${BASE_URL}/sitemap-index.xml`);

  } catch (error) {
    console.error('❌ Ошибка при генерации sitemap:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
main();
