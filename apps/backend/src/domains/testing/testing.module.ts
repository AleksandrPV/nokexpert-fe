import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { QuestionTypeEntity } from './infrastructure/entities/question-type.entity';
import { QuestionEntity } from './infrastructure/entities/question.entity';
import { AnswerOptionEntity } from './infrastructure/entities/answer-option.entity';
import { TestEntity } from './infrastructure/entities/test.entity';
import { TestQuestionEntity } from './infrastructure/entities/test-question.entity';
import { UserAnswerEntity } from './infrastructure/entities/user-answer.entity';
import { ProfessionalQualificationEntity } from '../qualification/infrastructure/entities/professional-qualification.entity';
import { TestingService } from './application/testing.service';
import { QuestionService } from './application/question.service';
import { QuestionSeedService } from './application/question-seed.service';
import { StatisticsService } from './application/statistics.service';
import { TestingController } from './presentation/testing.controller';
import { StatisticsController } from './presentation/statistics.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionTypeEntity,
      QuestionEntity,
      AnswerOptionEntity,
      TestEntity,
      TestQuestionEntity,
      UserAnswerEntity,
      ProfessionalQualificationEntity,
    ]),
    PassportModule,
    UsersModule,
  ],
  controllers: [TestingController, StatisticsController],
  providers: [TestingService, QuestionService, QuestionSeedService, StatisticsService],
  exports: [TestingService, QuestionService],
})
export class TestingModule {}
