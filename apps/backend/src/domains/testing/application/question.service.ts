import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../infrastructure/entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepo: Repository<QuestionEntity>,
  ) {}

  async getRandomQuestions(
    profQualId: string,
    count: number,
  ): Promise<QuestionEntity[]> {
    const allQuestions = await this.questionRepo.find({
      where: { profQualId },
      relations: ['options', 'questionType'],
    });

    // Fisher-Yates shuffle
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  async countByQualification(profQualId: string): Promise<number> {
    return this.questionRepo.count({ where: { profQualId } });
  }
}
