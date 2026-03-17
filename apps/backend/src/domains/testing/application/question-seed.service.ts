import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { QuestionEntity } from '../infrastructure/entities/question.entity';
import { AnswerOptionEntity } from '../infrastructure/entities/answer-option.entity';
import { QuestionTypeEntity } from '../infrastructure/entities/question-type.entity';
import { ProfessionalQualificationEntity } from '../../qualification/infrastructure/entities/professional-qualification.entity';
import { QuestionTypeCode } from '../../../shared/types/testing.types';

interface ParsedQuestion {
  text: string;
  options: { text: string; isCorrect: boolean; orderNumber: number }[];
  type: QuestionTypeCode;
}

@Injectable()
export class QuestionSeedService implements OnModuleInit {
  private readonly logger = new Logger(QuestionSeedService.name);

  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepo: Repository<QuestionEntity>,
    @InjectRepository(AnswerOptionEntity)
    private readonly optionRepo: Repository<AnswerOptionEntity>,
    @InjectRepository(QuestionTypeEntity)
    private readonly questionTypeRepo: Repository<QuestionTypeEntity>,
    @InjectRepository(ProfessionalQualificationEntity)
    private readonly qualificationRepo: Repository<ProfessionalQualificationEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedQuestionTypes();
    await this.seedQuestionsFromDocx();
  }

  private async seedQuestionTypes(): Promise<void> {
    const types = [
      {
        code: QuestionTypeCode.SINGLE_CHOICE,
        name: 'Один правильный ответ',
      },
      {
        code: QuestionTypeCode.MULTIPLE_CHOICE,
        name: 'Несколько правильных ответов',
      },
    ];

    for (const t of types) {
      const existing = await this.questionTypeRepo.findOne({
        where: { code: t.code },
      });
      if (!existing) {
        await this.questionTypeRepo.save(
          this.questionTypeRepo.create({ ...t, isActive: true }),
        );
        this.logger.log(`Created question type: ${t.code}`);
      }
    }
  }

  private async seedQuestionsFromDocx(): Promise<void> {
    // Check if questions already exist
    const existingCount = await this.questionRepo.count();
    if (existingCount > 0) {
      this.logger.log(
        `Questions already seeded (${existingCount} found). Skipping.`,
      );
      return;
    }

    const docxPath = path.resolve(
      process.cwd(),
      '..',
      '..',
      'ТЗ',
      'input.docx',
    );

    if (!fs.existsSync(docxPath)) {
      // Try alternative path
      const altPath = path.resolve(process.cwd(), 'ТЗ', 'input.docx');
      if (!fs.existsSync(altPath)) {
        this.logger.warn(
          `input.docx not found at ${docxPath} or ${altPath}. Skipping question seed.`,
        );
        return;
      }
      return this.parseAndSeed(altPath);
    }

    return this.parseAndSeed(docxPath);
  }

  private async parseAndSeed(docxPath: string): Promise<void> {
    this.logger.log(`Parsing questions from: ${docxPath}`);

    let textContent: string;
    try {
      const mammoth = await import('mammoth');
      const buffer = fs.readFileSync(docxPath);
      const result = await mammoth.extractRawText({ buffer });
      textContent = result.value;
    } catch (error) {
      this.logger.error(`Failed to parse docx: ${error}`);
      return;
    }

    const questions = this.parseQuestions(textContent);
    this.logger.log(`Parsed ${questions.length} questions from input.docx`);

    if (questions.length === 0) return;

    // Find qualification by code (16.032 or legacy NOSTROY-GENERAL)
    let qualification = await this.qualificationRepo.findOne({
      where: { code: '16.032' },
    });
    if (!qualification) {
      qualification = await this.qualificationRepo.findOne({
        where: { code: 'NOSTROY-GENERAL' },
      });
    }

    if (!qualification) {
      this.logger.error(
        'Qualification 16.032 not found. Run qualification seed first.',
      );
      return;
    }

    // Get question types
    const singleType = await this.questionTypeRepo.findOne({
      where: { code: QuestionTypeCode.SINGLE_CHOICE },
    });
    const multiType = await this.questionTypeRepo.findOne({
      where: { code: QuestionTypeCode.MULTIPLE_CHOICE },
    });

    if (!singleType || !multiType) {
      this.logger.error('Question types not found.');
      return;
    }

    let savedCount = 0;
    for (const pq of questions) {
      const typeEntity =
        pq.type === QuestionTypeCode.MULTIPLE_CHOICE
          ? multiType
          : singleType;

      const question = this.questionRepo.create({
        text: pq.text,
        profQualId: qualification.profQualId,
        questionTypeId: typeEntity.questionTypeId,
      });
      const savedQuestion = await this.questionRepo.save(question);

      const options = pq.options.map((o) =>
        this.optionRepo.create({
          questionId: savedQuestion.questionId,
          text: o.text,
          isCorrect: o.isCorrect,
          orderNumber: o.orderNumber,
        }),
      );
      await this.optionRepo.save(options);
      savedCount++;
    }

    // Update question count on qualification
    await this.qualificationRepo.update(
      { profQualId: qualification.profQualId },
      { questionCount: savedCount },
    );

    this.logger.log(
      `Seeded ${savedCount} questions for ${qualification.code}`,
    );
  }

  private parseQuestions(text: string): ParsedQuestion[] {
    const questions: ParsedQuestion[] = [];
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

    let currentQuestion: { text: string; options: { text: string; isCorrect: boolean; orderNumber: number }[] } | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Match question pattern: number followed by dot and space, then text
      // e.g. "51. Какое из определений..."
      const questionMatch = line.match(/^(\d+)\.\s+(.+)/);

      if (questionMatch) {
        // Check if this looks like an option (starts with * or # or is a small number <= current option count)
        // Questions typically have numbers > options count
        const num = parseInt(questionMatch[1], 10);

        // If we have a current question and this number is small (1-10), it's likely an option
        if (currentQuestion && num <= 10) {
          // It's an option, not a question
          const optText = questionMatch[2];
          currentQuestion.options.push({
            text: optText,
            isCorrect: false,
            orderNumber: num,
          });
          continue;
        }

        // Save previous question
        if (currentQuestion && currentQuestion.options.length >= 2) {
          const correctCount = currentQuestion.options.filter(
            (o) => o.isCorrect,
          ).length;
          questions.push({
            text: currentQuestion.text,
            options: currentQuestion.options,
            type:
              correctCount > 1
                ? QuestionTypeCode.MULTIPLE_CHOICE
                : QuestionTypeCode.SINGLE_CHOICE,
          });
        }

        currentQuestion = {
          text: questionMatch[2],
          options: [],
        };
        continue;
      }

      // Match correct answer option: *N. text or #N. text
      const correctMatch = line.match(/^[*#](\d+)\.\s+(.+)/);
      if (correctMatch && currentQuestion) {
        currentQuestion.options.push({
          text: correctMatch[2],
          isCorrect: true,
          orderNumber: parseInt(correctMatch[1], 10),
        });
        continue;
      }

      // Match regular option: N. text (1-10)
      const optionMatch = line.match(/^(\d{1,2})\.\s+(.+)/);
      if (optionMatch && currentQuestion) {
        const optNum = parseInt(optionMatch[1], 10);
        if (optNum <= 10) {
          currentQuestion.options.push({
            text: optionMatch[2],
            isCorrect: false,
            orderNumber: optNum,
          });
          continue;
        }
      }

      // If line doesn't match any pattern, append to current question text
      if (currentQuestion && currentQuestion.options.length === 0) {
        currentQuestion.text += ' ' + line;
      }
    }

    // Save last question
    if (currentQuestion && currentQuestion.options.length >= 2) {
      const correctCount = currentQuestion.options.filter(
        (o) => o.isCorrect,
      ).length;
      questions.push({
        text: currentQuestion.text,
        options: currentQuestion.options,
        type:
          correctCount > 1
            ? QuestionTypeCode.MULTIPLE_CHOICE
            : QuestionTypeCode.SINGLE_CHOICE,
      });
    }

    return questions;
  }
}
