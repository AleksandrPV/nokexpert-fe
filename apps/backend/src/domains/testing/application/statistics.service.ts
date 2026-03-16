import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEntity } from '../infrastructure/entities/test.entity';
import {
  TestStatus,
  UserTestHistoryItem,
  UserStatsResponse,
} from '../../../shared/types/testing.types';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepo: Repository<TestEntity>,
  ) {}

  async getUserTests(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ items: UserTestHistoryItem[]; total: number }> {
    const [tests, total] = await this.testRepo.findAndCount({
      where: { userId },
      relations: ['qualification'],
      order: { startedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const items: UserTestHistoryItem[] = tests.map((t) => {
      const timeTaken =
        t.finishedAt && t.startedAt
          ? Math.floor(
              (t.finishedAt.getTime() - t.startedAt.getTime()) / 1000,
            )
          : 0;

      return {
        testId: t.testId,
        mode: t.mode,
        status: t.status,
        score: t.score,
        passed: (t.score ?? 0) >= APP_CONSTANTS.DEFAULT_PASSING_SCORE,
        totalQuestions: t.totalQuestions,
        qualificationTitle: t.qualification?.title ?? '',
        startedAt: t.startedAt.toISOString(),
        finishedAt: t.finishedAt?.toISOString() ?? null,
        timeTakenSeconds: timeTaken,
      };
    });

    return { items, total };
  }

  async getUserStats(userId: string): Promise<UserStatsResponse> {
    const result = await this.testRepo
      .createQueryBuilder('t')
      .select('COUNT(*)', 'totalTests')
      .addSelect(
        `COUNT(*) FILTER (WHERE t.status IN ('${TestStatus.COMPLETED}', '${TestStatus.EXPIRED}'))`,
        'completedTests',
      )
      .addSelect(
        `COALESCE(AVG(t.score) FILTER (WHERE t.status IN ('${TestStatus.COMPLETED}', '${TestStatus.EXPIRED}')), 0)`,
        'avgScore',
      )
      .addSelect(
        `COALESCE(MAX(t.score) FILTER (WHERE t.status IN ('${TestStatus.COMPLETED}', '${TestStatus.EXPIRED}')), 0)`,
        'bestScore',
      )
      .addSelect(
        `COALESCE(SUM(EXTRACT(EPOCH FROM (t.finished_at - t.started_at))) FILTER (WHERE t.finished_at IS NOT NULL), 0)`,
        'totalTimeSec',
      )
      .where('t.user_id = :userId', { userId })
      .getRawOne();

    const completedTests = parseInt(result.completedTests, 10) || 0;

    // passRate: tests with score >= 70 / completed tests
    const passedResult = await this.testRepo
      .createQueryBuilder('t')
      .select('COUNT(*)', 'passedCount')
      .where('t.user_id = :userId', { userId })
      .andWhere(`t.status IN (:...statuses)`, {
        statuses: [TestStatus.COMPLETED, TestStatus.EXPIRED],
      })
      .andWhere('t.score >= :passing', { passing: APP_CONSTANTS.DEFAULT_PASSING_SCORE })
      .getRawOne();

    const passedCount = parseInt(passedResult.passedCount, 10) || 0;
    const passRate =
      completedTests > 0
        ? Math.round((passedCount / completedTests) * 100)
        : 0;

    return {
      totalTests: parseInt(result.totalTests, 10) || 0,
      completedTests,
      avgScore: Math.round(parseFloat(result.avgScore) || 0),
      bestScore: parseInt(result.bestScore, 10) || 0,
      passRate,
      totalTimeSec: Math.round(parseFloat(result.totalTimeSec) || 0),
    };
  }
}
