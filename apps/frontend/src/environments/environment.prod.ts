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
  production: true,
  // Telegram configuration - loaded from GitHub Secrets
  telegram: {
    botToken: getEnvVar('TELEGRAM_BOT_TOKEN', ''),
    chatId: getEnvVar('TELEGRAM_CHAT_ID', '')
  }
};