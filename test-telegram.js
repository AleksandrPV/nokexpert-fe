#!/usr/bin/env node

/**
 * Скрипт для тестирования Telegram интеграции
 * Запуск: node test-telegram.js
 */

const https = require('https');

// Конфигурация из проекта
const BOT_TOKEN = '8215196694:AAEHXjwAsDSiRZCmURWPIwArIS2-d_LBwm4';
const CHAT_ID = '@avsemenov88'; // Временно username, нужно заменить на числовой ID

const TEST_MESSAGE = `
🧪 Тестовое сообщение от сайта НОК Эксперт

👤 Имя: Тестовый Пользователь
📞 Телефон: +7 (999) 123-45-67
📧 Email: test@example.com
🎯 Тема: 🧪 Тестирование

💬 Сообщение:
Это тестовое сообщение для проверки работы Telegram интеграции

🕐 Время отправки: ${new Date().toLocaleString('ru-RU')}
🌐 Источник: Тестовый скрипт
`.trim();

function sendTestMessage() {
  const postData = JSON.stringify({
    chat_id: CHAT_ID,
    text: TEST_MESSAGE,
    parse_mode: 'HTML'
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('🚀 Отправка тестового сообщения в Telegram...');
  console.log('📋 Chat ID:', CHAT_ID);
  console.log('🤖 Bot Token:', BOT_TOKEN.substring(0, 20) + '...');
  console.log('');

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);

        if (response.ok) {
          console.log('✅ УСПЕХ! Сообщение отправлено в Telegram');
          console.log('📨 Ответ сервера:', JSON.stringify(response, null, 2));
        } else {
          console.log('❌ ОШИБКА! Сообщение не отправлено');
          console.log('📋 Описание ошибки:', response.description);
          console.log('🔍 Полный ответ:', JSON.stringify(response, null, 2));

          if (response.description && response.description.includes('chat not found')) {
            console.log('');
            console.log('💡 СОВЕТ: Возможно указан неправильный Chat ID');
            console.log('   1. Отправьте сообщение боту @nokexpert_bot');
            console.log('   2. Откройте: https://api.telegram.org/bot' + BOT_TOKEN + '/getUpdates');
            console.log('   3. Найдите числовой "id" в поле "chat"');
            console.log('   4. Замените username на этот числовой ID');
          }
        }
      } catch (error) {
        console.log('❌ ОШИБКА парсинга ответа:', error.message);
        console.log('📄 Сырой ответ:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ ОШИБКА сети:', error.message);
    console.log('💡 Проверьте подключение к интернету');
  });

  req.write(postData);
  req.end();
}

// Запуск теста
console.log('🧪 ТЕСТИРОВАНИЕ TELEGRAM ИНТЕГРАЦИИ');
console.log('=' .repeat(50));
sendTestMessage();
