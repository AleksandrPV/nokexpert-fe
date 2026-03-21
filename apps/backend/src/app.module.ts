import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

// Конфигурации
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';

// Доменные модули
import { UsersModule } from './domains/users/users.module';
import { QualificationModule } from './domains/qualification/qualification.module';
import { TestingModule } from './domains/testing/testing.module';
import { TrainerDemoModule } from './domains/trainer-demo/trainer-demo.module';

// Базовые компоненты NestJS
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Фильтры
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

// Сущности
import { UserEntity } from './domains/users/infrastructure/entities/user.entity';
import { QualificationCouncilEntity } from './domains/qualification/infrastructure/entities/qualification-council.entity';
import { ProfessionalQualificationEntity } from './domains/qualification/infrastructure/entities/professional-qualification.entity';
import { QuestionTypeEntity } from './domains/testing/infrastructure/entities/question-type.entity';
import { QuestionEntity } from './domains/testing/infrastructure/entities/question.entity';
import { AnswerOptionEntity } from './domains/testing/infrastructure/entities/answer-option.entity';
import { TestEntity } from './domains/testing/infrastructure/entities/test.entity';
import { TestQuestionEntity } from './domains/testing/infrastructure/entities/test-question.entity';
import { UserAnswerEntity } from './domains/testing/infrastructure/entities/user-answer.entity';
import { TrainerDemoRequestEntity } from './domains/trainer-demo/infrastructure/entities/trainer-demo-request.entity';

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
        entities: [
          UserEntity,
          QualificationCouncilEntity,
          ProfessionalQualificationEntity,
          QuestionTypeEntity,
          QuestionEntity,
          AnswerOptionEntity,
          TestEntity,
          TestQuestionEntity,
          UserAnswerEntity,
          TrainerDemoRequestEntity,
        ],
        synchronize: configService.get<string>('NODE_ENV') === 'development', // Только для разработки!
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl: false, // PostgreSQL on internal Docker network, no SSL needed
      }),
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 30 }],
    }),

    // Доменные модули системы НОК
    UsersModule,
    QualificationModule,
    TestingModule,
    TrainerDemoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Глобальные провайдеры
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
