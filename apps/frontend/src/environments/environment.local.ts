// Helper function to safely access environment variables
function getEnvVar(key: string, defaultValue: string = ''): string {
  // Check if we're in a Node.js environment (build time)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // In browser environment, return empty string or default
  return defaultValue;
}

// Конфигурация для локальной разработки
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
    botToken: getEnvVar('TELEGRAM_BOT_TOKEN', '8215196694:AAEHXjwAsDSiRZCmURWPIwArIS2-d_LBwm4'),
    chatId: getEnvVar('TELEGRAM_CHAT_ID', '679991424')
  }
};
