import { TestMode, TestStatus } from '../../../shared/types/testing.types';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';

export class TestSession {
  constructor(
    public readonly testId: string,
    public readonly mode: TestMode,
    public readonly status: TestStatus,
    public readonly totalQuestions: number,
    public readonly answeredQuestions: number,
    public readonly startedAt: Date,
    public readonly finishedAt: Date | null,
    public readonly score: number | null,
  ) {}

  isExpired(): boolean {
    if (this.mode !== TestMode.EXAM) return false;
    if (this.status !== TestStatus.IN_PROGRESS) return false;
    const elapsed =
      (Date.now() - this.startedAt.getTime()) / 1000 / 60;
    return elapsed >= APP_CONSTANTS.DEFAULT_TEST_DURATION_MINUTES;
  }

  getRemainingSeconds(): number | null {
    if (this.mode !== TestMode.EXAM) return null;
    const totalSeconds = APP_CONSTANTS.DEFAULT_TEST_DURATION_MINUTES * 60;
    const elapsed = Math.floor(
      (Date.now() - this.startedAt.getTime()) / 1000,
    );
    return Math.max(0, totalSeconds - elapsed);
  }

  getProgress(): { answered: number; total: number } {
    return {
      answered: this.answeredQuestions,
      total: this.totalQuestions,
    };
  }

  calculateScore(correctAnswers: number): number {
    if (this.totalQuestions === 0) return 0;
    return Math.round((correctAnswers / this.totalQuestions) * 100);
  }

  canSubmitAnswer(): boolean {
    return this.status === TestStatus.IN_PROGRESS && !this.isExpired();
  }

  canComplete(): boolean {
    return this.status === TestStatus.IN_PROGRESS;
  }
}
