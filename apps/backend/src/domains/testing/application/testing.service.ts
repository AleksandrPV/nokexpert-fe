import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TestEntity } from '../infrastructure/entities/test.entity';
import { TestQuestionEntity } from '../infrastructure/entities/test-question.entity';
import { UserAnswerEntity } from '../infrastructure/entities/user-answer.entity';
import { QuestionEntity } from '../infrastructure/entities/question.entity';
import { AnswerOptionEntity } from '../infrastructure/entities/answer-option.entity';
import { QuestionService } from './question.service';
import {
  TestMode,
  TestStatus,
  QuestionTypeCode,
} from '../../../shared/types/testing.types';
import { TestSession } from '../domain/test-session.entity';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepo: Repository<TestEntity>,
    @InjectRepository(TestQuestionEntity)
    private readonly testQuestionRepo: Repository<TestQuestionEntity>,
    @InjectRepository(UserAnswerEntity)
    private readonly userAnswerRepo: Repository<UserAnswerEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepo: Repository<QuestionEntity>,
    @InjectRepository(AnswerOptionEntity)
    private readonly optionRepo: Repository<AnswerOptionEntity>,
    private readonly questionService: QuestionService,
  ) {}

  async startTest(
    profQualId: string,
    mode: TestMode,
    questionCount: number,
    userId: string | null = null,
  ) {
    const questions = await this.questionService.getRandomQuestions(
      profQualId,
      questionCount,
    );

    if (questions.length === 0) {
      throw new BadRequestException(
        'Нет доступных вопросов для данной квалификации',
      );
    }

    const test = this.testRepo.create({
      profQualId,
      mode,
      status: TestStatus.IN_PROGRESS,
      totalQuestions: questions.length,
      userId,
    });
    const savedTest = await this.testRepo.save(test);

    const testQuestions = questions.map((q, i) =>
      this.testQuestionRepo.create({
        testId: savedTest.testId,
        questionId: q.questionId,
        orderNumber: i + 1,
      }),
    );
    await this.testQuestionRepo.save(testQuestions);

    return {
      testId: savedTest.testId,
      totalQuestions: savedTest.totalQuestions,
      mode: savedTest.mode,
    };
  }

  async getTestState(testId: string, callerId: string | null = null) {
    const test = await this.findTestOrFail(testId);
    this.verifyOwnership(test, callerId);
    const session = this.toSession(test);

    if (
      session.isExpired() &&
      test.status === TestStatus.IN_PROGRESS
    ) {
      await this.autoCompleteTest(test);
      test.status = TestStatus.EXPIRED;
    }

    const answeredCount = await this.userAnswerRepo.count({
      where: { testId },
    });

    return {
      testId: test.testId,
      mode: test.mode,
      status: test.status,
      totalQuestions: test.totalQuestions,
      answeredQuestions: answeredCount,
      remainingSeconds: session.getRemainingSeconds(),
      startedAt: test.startedAt.toISOString(),
    };
  }

  async getQuestion(testId: string, orderNumber: number, callerId: string | null = null) {
    const test = await this.findTestOrFail(testId);
    this.verifyOwnership(test, callerId);
    const testQuestion = await this.testQuestionRepo.findOne({
      where: { testId, orderNumber },
    });

    if (!testQuestion) {
      throw new NotFoundException(
        `Вопрос с номером ${orderNumber} не найден`,
      );
    }

    const question = await this.questionRepo.findOne({
      where: { questionId: testQuestion.questionId },
      relations: ['options', 'questionType'],
    });

    if (!question) {
      throw new NotFoundException('Вопрос не найден');
    }

    const userAnswer = await this.userAnswerRepo.findOne({
      where: { testId, questionId: question.questionId },
    });

    const options = question.options
      .sort((a, b) => a.orderNumber - b.orderNumber)
      .map((o) => {
        const base = {
          optionId: o.optionId,
          text: o.text,
          orderNumber: o.orderNumber,
        };
        // In training mode after answer, show correctness
        if (test.mode === TestMode.TRAINING && userAnswer) {
          return { ...base, isCorrect: o.isCorrect };
        }
        // In exam mode or before answering, hide correctness
        return base;
      });

    const result: any = {
      questionId: question.questionId,
      orderNumber,
      text: question.text,
      questionType: question.questionType.code as QuestionTypeCode,
      options,
    };

    if (userAnswer) {
      result.userAnswer = {
        selectedOptionIds: userAnswer.selectedOptionIds || (userAnswer.selectedOptionId ? [userAnswer.selectedOptionId] : []),
        isCorrect: userAnswer.isCorrect,
      };
    }

    return result;
  }

  async submitAnswer(
    testId: string,
    questionId: string,
    selectedOptionIds: string[],
    callerId: string | null = null,
  ) {
    const test = await this.findTestOrFail(testId);
    this.verifyOwnership(test, callerId);
    const session = this.toSession(test);

    if (!session.canSubmitAnswer()) {
      throw new BadRequestException('Тест завершён или время истекло');
    }

    // Check question belongs to test
    const testQuestion = await this.testQuestionRepo.findOne({
      where: { testId, questionId },
    });
    if (!testQuestion) {
      throw new BadRequestException('Вопрос не принадлежит данному тесту');
    }

    // Delete previous answer if exists
    await this.userAnswerRepo.delete({ testId, questionId });

    // Check correctness
    const correctOptions = await this.optionRepo.find({
      where: { questionId, isCorrect: true },
    });
    const correctIds = correctOptions.map((o) => o.optionId).sort();
    const selectedSorted = [...selectedOptionIds].sort();
    const isCorrect =
      correctIds.length === selectedSorted.length &&
      correctIds.every((id, i) => id === selectedSorted[i]);

    const answer = this.userAnswerRepo.create({
      testId,
      questionId,
      selectedOptionId: selectedOptionIds.length === 1 ? selectedOptionIds[0] : null,
      selectedOptionIds,
      isCorrect,
    });
    await this.userAnswerRepo.save(answer);

    // In training mode, return feedback
    if (test.mode === TestMode.TRAINING) {
      const question = await this.questionRepo.findOne({
        where: { questionId },
        relations: ['options'],
      });
      return {
        isCorrect,
        correctOptionIds: correctIds,
        options: question?.options
          .sort((a, b) => a.orderNumber - b.orderNumber)
          .map((o) => ({
            optionId: o.optionId,
            text: o.text,
            orderNumber: o.orderNumber,
            isCorrect: o.isCorrect,
          })),
      };
    }

    return { isCorrect: null };
  }

  async completeTest(testId: string, callerId: string | null = null) {
    const test = await this.findTestOrFail(testId);
    this.verifyOwnership(test, callerId);
    const session = this.toSession(test);

    if (!session.canComplete()) {
      throw new BadRequestException('Тест уже завершён');
    }

    return this.finalizeTest(test);
  }

  async getResults(testId: string, callerId: string | null = null) {
    const test = await this.findTestOrFail(testId);
    this.verifyOwnership(test, callerId);

    if (test.status === TestStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Тест ещё не завершён. Завершите тест, чтобы увидеть результаты.',
      );
    }

    const testQuestions = await this.testQuestionRepo.find({
      where: { testId },
      order: { orderNumber: 'ASC' },
    });

    const userAnswers = await this.userAnswerRepo.find({
      where: { testId },
    });
    const answerMap = new Map(
      userAnswers.map((a) => [a.questionId, a]),
    );

    const questionIds = testQuestions.map((tq) => tq.questionId);
    const allQuestions = await this.questionRepo.find({
      where: { questionId: In(questionIds) },
      relations: ['options', 'questionType'],
    });
    const questionMap = new Map(allQuestions.map((q) => [q.questionId, q]));

    const questions: any[] = [];
    let correctCount = 0;
    let incorrectCount = 0;
    let unanswered = 0;

    for (const tq of testQuestions) {
      const question = questionMap.get(tq.questionId);
      if (!question) continue;

      const answer = answerMap.get(tq.questionId);
      const selectedIds = answer
        ? answer.selectedOptionIds || (answer.selectedOptionId ? [answer.selectedOptionId] : [])
        : [];

      if (!answer) {
        unanswered++;
      } else if (answer.isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      questions.push({
        questionId: question.questionId,
        orderNumber: tq.orderNumber,
        text: question.text,
        questionType: question.questionType.code as QuestionTypeCode,
        options: question.options
          .sort((a, b) => a.orderNumber - b.orderNumber)
          .map((o) => ({
            optionId: o.optionId,
            text: o.text,
            orderNumber: o.orderNumber,
            isCorrect: o.isCorrect,
            isSelected: selectedIds.includes(o.optionId),
          })),
        selectedOptionIds: selectedIds,
        isCorrect: answer?.isCorrect ?? false,
      });
    }

    const timeTaken = test.finishedAt
      ? Math.floor(
          (test.finishedAt.getTime() - test.startedAt.getTime()) / 1000,
        )
      : 0;

    return {
      testId: test.testId,
      mode: test.mode,
      totalQuestions: test.totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unanswered,
      score: test.score ?? 0,
      passed: (test.score ?? 0) >= APP_CONSTANTS.DEFAULT_PASSING_SCORE,
      timeTakenSeconds: timeTaken,
      questions,
    };
  }

  private verifyOwnership(test: TestEntity, callerId: string | null): void {
    if (test.userId != null && callerId != null && test.userId !== callerId) {
      throw new ForbiddenException('Нет доступа к данному тесту');
    }
  }

  private async findTestOrFail(testId: string): Promise<TestEntity> {
    const test = await this.testRepo.findOne({
      where: { testId },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден');
    }
    return test;
  }

  private toSession(test: TestEntity): TestSession {
    return new TestSession(
      test.testId,
      test.mode,
      test.status,
      test.totalQuestions,
      0,
      test.startedAt,
      test.finishedAt,
      test.score,
    );
  }

  private async finalizeTest(test: TestEntity) {
    const userAnswers = await this.userAnswerRepo.find({
      where: { testId: test.testId },
    });
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const score = test.totalQuestions > 0
      ? Math.round((correctCount / test.totalQuestions) * 100)
      : 0;

    test.status = TestStatus.COMPLETED;
    test.finishedAt = new Date();
    test.score = score;
    await this.testRepo.save(test);

    return {
      testId: test.testId,
      score,
      passed: score >= APP_CONSTANTS.DEFAULT_PASSING_SCORE,
      correctAnswers: correctCount,
      totalQuestions: test.totalQuestions,
    };
  }

  private async autoCompleteTest(test: TestEntity) {
    await this.finalizeTest(test);
  }
}
