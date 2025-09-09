// Пример файла конфигурации для локальной разработки
// Скопируйте этот файл в environment.local.ts и заполните своими данными

export const environment = {
  production: false,
  name: 'local',
  apiUrl: 'http://localhost:3000/api',
  baseUrl: 'http://localhost:4200',
  enableAnalytics: false,
  enableLogging: true,
  version: '1.0.0',
  // Telegram configuration
  telegram: {
    // Получите токен у @BotFather в Telegram
    botToken: 'ВАШ_TELEGRAM_BOT_TOKEN',
    // Получите Chat ID отправив сообщение боту и проверив getUpdates
    chatId: 'ВАШ_TELEGRAM_CHAT_ID'
  }
};
