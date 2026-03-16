import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS для работы с Angular приложениями
  const corsOrigins = process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:4200',
    'https://nok-expert.ru',
    'https://www.nok-expert.ru',
    'https://testnok.ru',
    'https://www.testnok.ru',
    'http://109.172.37.113',
    'https://109.172.37.113',
  ];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
    ],
  });

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Глобальный префикс API
  app.setGlobalPrefix('api');

  // Swagger документация
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(process.env.SWAGGER_TITLE || 'NOK Expert API')
      .setDescription(
        process.env.SWAGGER_DESCRIPTION ||
          'API для системы независимой оценки квалификаций',
      )
      .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
      .addBearerAuth()
      .addTag('auth', 'Аутентификация')
      .addTag('users', 'Пользователи')
      .addTag('qualifications', 'Квалификации')
      .addTag('testing', 'Тестирование')
      .addTag('sites', 'Площадки')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Приложение запущено на порту ${port}`);
  console.log(`📚 Swagger документация: http://localhost:${port}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log(`🌍 Окружение: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🕐 Время запуска: ${new Date().toISOString()}`);
}

void bootstrap();
// Test commit for CI/CD - Thu Jul 31 16:51:48 MSK 2025
// Test SSH connection - Thu Jul 31 17:09:03 MSK 2025
// Test new SSH key - Thu Jul 31 17:17:16 MSK 2025
