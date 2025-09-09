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
  name: 'development',
  apiUrl: 'http://localhost:3000/api',
  baseUrl: 'http://localhost:4200',
  enableAnalytics: false,
  enableLogging: true,
  version: '1.0.0',
  // Telegram configuration - loaded from environment variables
  telegram: {
    botToken: getEnvVar('TELEGRAM_BOT_TOKEN', ''),
    chatId: getEnvVar('TELEGRAM_CHAT_ID', '')
  }
}; 