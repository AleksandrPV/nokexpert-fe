import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualificationCouncilEntity } from '../infrastructure/entities/qualification-council.entity';
import { ProfessionalQualificationEntity } from '../infrastructure/entities/professional-qualification.entity';

@Injectable()
export class QualificationService {
  constructor(
    @InjectRepository(QualificationCouncilEntity)
    private readonly councilRepo: Repository<QualificationCouncilEntity>,
    @InjectRepository(ProfessionalQualificationEntity)
    private readonly qualificationRepo: Repository<ProfessionalQualificationEntity>,
  ) {}

  async findAllCouncils(): Promise<QualificationCouncilEntity[]> {
    return this.councilRepo.find({ order: { code: 'ASC' } });
  }

  async findQualificationsByCouncil(
    councilId?: string,
  ): Promise<ProfessionalQualificationEntity[]> {
    const where = councilId ? { councilId } : {};
    return this.qualificationRepo.find({
      where,
      order: { level: 'ASC', title: 'ASC' },
    });
  }

  async findCouncilByCode(
    code: string,
  ): Promise<QualificationCouncilEntity | null> {
    return this.councilRepo.findOne({ where: { code } });
  }

  async findQualificationById(
    id: string,
  ): Promise<ProfessionalQualificationEntity | null> {
    return this.qualificationRepo.findOne({
      where: { profQualId: id },
      relations: ['council'],
    });
  }

  async updateQuestionCount(profQualId: string, count: number): Promise<void> {
    await this.qualificationRepo.update(
      { profQualId },
      { questionCount: count },
    );
  }
}
