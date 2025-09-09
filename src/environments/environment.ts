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
    botToken: process.env['TELEGRAM_BOT_TOKEN'] || '',
    chatId: process.env['TELEGRAM_CHAT_ID'] || ''
  }
}; 