export const environment = {
  production: true,
  // Telegram configuration - loaded from GitHub Secrets
  telegram: {
    botToken: process.env['TELEGRAM_BOT_TOKEN'] || '',
    chatId: process.env['TELEGRAM_CHAT_ID'] || ''
  }
};