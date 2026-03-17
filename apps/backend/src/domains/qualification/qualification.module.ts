import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationCouncilEntity } from './infrastructure/entities/qualification-council.entity';
import { ProfessionalQualificationEntity } from './infrastructure/entities/professional-qualification.entity';
import { QualificationService } from './application/qualification.service';
import { QualificationSeedService } from './application/qualification-seed.service';
import { QualificationsController } from './presentation/qualifications.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QualificationCouncilEntity,
      ProfessionalQualificationEntity,
    ]),
  ],
  controllers: [QualificationsController],
  providers: [QualificationService, QualificationSeedService],
  exports: [QualificationService],
})
export class QualificationModule {}
