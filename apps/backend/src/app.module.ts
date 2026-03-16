import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

// Конфигурации
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';

// Доменные модули
import { UsersModule } from './domains/users/users.module';

// Базовые компоненты NestJS
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Фильтры
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

// Сущности
import { UserEntity } from './domains/users/infrastructure/entities/user.entity';

@Module({
  imports: [
    // Глобальная конфигурация приложения
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig],
      envFilePath: '.env',
    }),

    // Подключение к PostgreSQL через TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [UserEntity],
        synchronize: configService.get<string>('NODE_ENV') === 'development', // Только для разработки!
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),

    // Доменные модули системы НОК
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Глобальные провайдеры
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // Примечание: JWT Guard будет применяться выборочно через декораторы
    // Раскомментировать для глобального применения:
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
