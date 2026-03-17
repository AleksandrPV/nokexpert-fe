import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualificationCouncilEntity } from '../infrastructure/entities/qualification-council.entity';
import { ProfessionalQualificationEntity } from '../infrastructure/entities/professional-qualification.entity';

const COUNCILS_SEED = [
  {
    code: 'NOSTROY',
    title: 'СПК в строительстве (НОСТРОЙ)',
    description: 'Строительная отрасль',
  },
  {
    code: 'NOPRIZ',
    title: 'СПК в проектировании (НОПРИЗ)',
    description: 'Проектирование и изыскания',
  },
  {
    code: 'OPB',
    title: 'СПК пожарной безопасности',
    description: 'Пожарная безопасность',
  },
  {
    code: 'GKH',
    title: 'СПК ЖКХ',
    description: 'Жилищно-коммунальное хозяйство',
  },
  {
    code: 'MCHS',
    title: 'СПК МЧС',
    description: 'Гражданская оборона и защита',
  },
];

const QUALIFICATIONS_SEED = [
  {
    code: '16.032',
    title: 'Главный инженер проекта (специалист по организации строительства)',
    level: 7,
    councilCode: 'NOSTROY',
    /** If a qualification with this old code exists, update it instead of creating new */
    oldCode: 'NOSTROY-GENERAL',
  },
];

@Injectable()
export class QualificationSeedService implements OnModuleInit {
  private readonly logger = new Logger(QualificationSeedService.name);

  constructor(
    @InjectRepository(QualificationCouncilEntity)
    private readonly councilRepo: Repository<QualificationCouncilEntity>,
    @InjectRepository(ProfessionalQualificationEntity)
    private readonly qualificationRepo: Repository<ProfessionalQualificationEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seed();
  }

  async seed(): Promise<void> {
    this.logger.log('Seeding qualification councils...');

    for (const data of COUNCILS_SEED) {
      const existing = await this.councilRepo.findOne({
        where: { code: data.code },
      });
      if (!existing) {
        await this.councilRepo.save(this.councilRepo.create(data));
        this.logger.log(`Created council: ${data.code}`);
      }
    }

    this.logger.log('Seeding professional qualifications...');

    for (const data of QUALIFICATIONS_SEED) {
      const council = await this.councilRepo.findOne({
        where: { code: data.councilCode },
      });
      if (!council) continue;

      // Check if qualification already exists by current code
      let existing = await this.qualificationRepo.findOne({
        where: { code: data.code },
      });

      // If not found, check by old code (upsert from NOSTROY-GENERAL → 16.032)
      if (!existing && data.oldCode) {
        existing = await this.qualificationRepo.findOne({
          where: { code: data.oldCode },
        });
        if (existing) {
          existing.code = data.code;
          existing.title = data.title;
          existing.level = data.level;
          await this.qualificationRepo.save(existing);
          this.logger.log(`Updated qualification: ${data.oldCode} → ${data.code}`);
          continue;
        }
      }

      if (!existing) {
        await this.qualificationRepo.save(
          this.qualificationRepo.create({
            title: data.title,
            code: data.code,
            level: data.level,
            councilId: council.councilId,
          }),
        );
        this.logger.log(`Created qualification: ${data.code}`);
      }
    }

    this.logger.log('Qualification seed completed.');
  }
}
