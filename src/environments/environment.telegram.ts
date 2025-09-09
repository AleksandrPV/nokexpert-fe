// Пример файла с настройками Telegram
// Скопируйте этот файл в environment.telegram.ts и заполните реальными данными

export const TELEGRAM_CONFIG = {
  // Токен вашего Telegram бота (получить у @BotFather)
  BOT_TOKEN: '8215196694:AAEHXjwAsDSiRZCmURWPIwArIS2-d_LBwm4',

  // ID чата, куда будут приходить сообщения
  // Можно получить отправив сообщение боту и вызвав getUpdates
  CHAT_ID: '@avsemenov88'
};

// Инструкция по получению данных:
// 1. BOT_TOKEN: https://t.me/botfather -> /newbot
// 2. CHAT_ID: https://api.telegram.org/bot<TOKEN>/getUpdates

export default TELEGRAM_CONFIG;
