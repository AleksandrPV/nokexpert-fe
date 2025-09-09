// Пример файла с настройками Telegram
// Скопируйте этот файл в environment.telegram.ts и заполните реальными данными

export const TELEGRAM_CONFIG = {
  // Токен вашего Telegram бота (получить у @BotFather)
  BOT_TOKEN: 'ВАШ_BOT_TOKEN_ЗДЕСЬ',

  // ID чата, куда будут приходить сообщения
  // Можно получить отправив сообщение боту и вызвав getUpdates
  CHAT_ID: 'ВАШ_CHAT_ID_ЗДЕСЬ'
};

// Инструкция по получению данных:
// 1. BOT_TOKEN: https://t.me/botfather -> /newbot
// 2. CHAT_ID: https://api.telegram.org/bot<TOKEN>/getUpdates

export default TELEGRAM_CONFIG;
