export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || 'NOK System API',
    description:
      process.env.SWAGGER_DESCRIPTION ||
      'API документация системы независимой оценки квалификаций',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
});
