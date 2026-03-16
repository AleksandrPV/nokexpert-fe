// Пример файла конфигурации для локальной разработки
// Скопируйте этот файл в environment.local.ts и заполните своими данными

// Helper function to safely access environment variables
function getEnvVar(key: string, defaultValue: string = ''): string {
  // Check if we're in a Node.js environment (build time)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // In browser environment, return empty string or default
  return defaultValue;
}

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
    botToken: getEnvVar('TELEGRAM_BOT_TOKEN', 'ВАШ_TELEGRAM_BOT_TOKEN'),
    // Получите Chat ID отправив сообщение боту и проверив getUpdates
    chatId: getEnvVar('TELEGRAM_CHAT_ID', 'ВАШ_TELEGRAM_CHAT_ID')
  }
};
