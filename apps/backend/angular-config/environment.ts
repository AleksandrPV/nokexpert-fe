export const environment = {
  production: true,
  
  // API конфигурация
  apiUrl: 'https://api.nok-expert.ru/api',
  
  // Основные настройки приложения
  appName: 'NOK Expert',
  appVersion: '1.0.0',
  
  // Настройки аутентификации
  auth: {
    tokenKey: 'nok_auth_token',
    refreshTokenKey: 'nok_refresh_token',
    tokenExpiryKey: 'nok_token_expiry',
  },
  
  // Настройки тестирования
  testing: {
    autoSaveInterval: 30000, // 30 секунд
    maxAnswerTime: 300000,   // 5 минут на вопрос
    warningTime: 60000,      // предупреждение за 1 минуту
  },
  
  // Настройки UI
  ui: {
    theme: 'light',
    language: 'ru',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
  },
  
  // Настройки логирования
  logging: {
    level: 'error', // в production только ошибки
    enableConsole: false,
    enableRemote: true,
    remoteEndpoint: 'https://api.nok-expert.ru/api/logs',
  },
  
  // Настройки кэширования
  cache: {
    enable: true,
    maxAge: 3600000, // 1 час
    maxSize: 50,     // максимум 50 элементов
  },
  
  // Настройки уведомлений
  notifications: {
    enablePush: true,
    enableEmail: true,
    enableSMS: false,
  },
  
  // Настройки безопасности
  security: {
    enableHttpsOnly: true,
    enableCSP: true,
    enableXSSProtection: true,
    sessionTimeout: 3600000, // 1 час
  },
  
  // Настройки аналитики
  analytics: {
    enable: true,
    trackingId: 'GA-NOKEXPERT-123',
    endpoint: 'https://api.nok-expert.ru/api/analytics',
  },
  
  // Настройки файлов
  files: {
    maxUploadSize: 10485760, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    uploadEndpoint: 'https://api.nok-expert.ru/api/files/upload',
  },
  
  // Настройки WebSocket
  websocket: {
    enable: true,
    endpoint: 'wss://api.nok-expert.ru/ws',
    reconnectInterval: 5000,
    maxReconnectAttempts: 5,
  },
  
  // Настройки PWA
  pwa: {
    enable: true,
    name: 'NOK Expert',
    shortName: 'NOK Expert',
    description: 'Система независимой оценки квалификаций',
    themeColor: '#1976d2',
    backgroundColor: '#ffffff',
  },
}; 