#!/usr/bin/env node

/**
 * Скрипт для получения Chat ID из обновлений бота
 * Запуск: node get-chat-id.js
 */

const https = require('https');

// Конфигурация из проекта
const BOT_TOKEN = '8215196694:AAEHXjwAsDSiRZCmURWPIwArIS2-d_LBwm4';

function getUpdates() {
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${BOT_TOKEN}/getUpdates`,
    method: 'GET'
  };

  console.log('🔍 Получение обновлений от Telegram бота...');
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

        if (response.ok && response.result && response.result.length > 0) {
          console.log('✅ ПОЛУЧЕНЫ ОБНОВЛЕНИЯ!');
          console.log('📊 Количество сообщений:', response.result.length);
          console.log('');

          // Показываем последние сообщения
          response.result.forEach((update, index) => {
            if (update.message && update.message.chat) {
              const chat = update.message.chat;
              console.log(`💬 Сообщение ${index + 1}:`);
              console.log(`   👤 От: ${chat.first_name || 'N/A'} ${chat.last_name || ''} (@${chat.username || 'N/A'})`);
              console.log(`   🆔 Chat ID: ${chat.id}`);
              console.log(`   📝 Тип чата: ${chat.type}`);
              console.log(`   💬 Текст: "${update.message.text || 'N/A'}"`);
              console.log(`   🕐 Время: ${new Date(update.message.date * 1000).toLocaleString('ru-RU')}`);
              console.log('');
            }
          });

          // Находим последний Chat ID
          const lastUpdate = response.result[response.result.length - 1];
          if (lastUpdate.message && lastUpdate.message.chat) {
            const chatId = lastUpdate.message.chat.id;
            console.log('🎯 ПОСЛЕДНИЙ CHAT ID:', chatId);
            console.log('');
            console.log('📋 СКОПИРУЙТЕ ЭТОТ ID В КОНФИГУРАЦИЮ:');
            console.log(`   CHAT_ID: '${chatId}'`);
            console.log('');
            console.log('💡 Этот ID нужно вставить в файл:');
            console.log('   src/environments/environment.telegram.ts');
          }

        } else if (response.ok && response.result && response.result.length === 0) {
          console.log('📭 ОБНОВЛЕНИЙ НЕТ');
          console.log('');
          console.log('💡 Возможные причины:');
          console.log('   • Вы еще не отправили сообщение боту');
          console.log('   • Прошло много времени с момента последнего сообщения');
          console.log('   • Бот не получил сообщений');
          console.log('');
          console.log('📱 Отправьте сообщение боту @nokexpert_bot и запустите скрипт снова');

        } else {
          console.log('❌ ОШИБКА при получении обновлений:');
          console.log('📋 Описание:', response.description || 'Неизвестная ошибка');
        }

      } catch (error) {
        console.log('❌ ОШИБКА парсинга ответа:', error.message);
        console.log('📄 Сырой ответ:', data.substring(0, 500) + (data.length > 500 ? '...' : ''));
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ ОШИБКА сети:', error.message);
    console.log('💡 Проверьте подключение к интернету');
  });

  req.end();
}

// Запуск получения обновлений
console.log('🆔 ПОЛУЧЕНИЕ CHAT ID ИЗ TELEGRAM');
console.log('=' .repeat(50));
getUpdates();
