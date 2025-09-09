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
    botToken: '8215196694:AAEHXjwAsDSiRZCmURWPIwArIS2-d_LBwm4',
    chatId: '679991424'
  }
};
