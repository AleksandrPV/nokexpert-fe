import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  TestState,
  TestQuestion,
  TestMode,
  TestStatusType,
} from '../models/trainer.interfaces';

const STORAGE_KEY = 'nok_active_test';

@Injectable({ providedIn: 'root' })
export class TestSessionService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly testId = signal<string | null>(null);
  readonly testState = signal<TestState | null>(null);
  readonly currentQuestion = signal<TestQuestion | null>(null);
  readonly questionIndex = signal<number>(1);
  readonly answers = signal<Map<string, string[]>>(new Map());
  readonly answeredQuestions = signal<Set<number>>(new Set());
  readonly correctQuestions = signal<Set<number>>(new Set());
  readonly incorrectQuestions = signal<Set<number>>(new Set());

  readonly mode = computed(() => this.testState()?.mode ?? 'training');
  readonly totalQuestions = computed(() => this.testState()?.totalQuestions ?? 0);
  readonly isExam = computed(() => this.mode() === 'exam');

  initSession(testId: string, state: TestState): void {
    this.testId.set(testId);
    this.testState.set(state);
    this.questionIndex.set(1);
    this.answers.set(new Map());
    this.answeredQuestions.set(new Set());
    this.correctQuestions.set(new Set());
    this.incorrectQuestions.set(new Set());
    this.saveToStorage(testId);
  }

  setQuestion(question: TestQuestion): void {
    this.currentQuestion.set(question);
    this.questionIndex.set(question.orderNumber);
  }

  markAnswered(orderNumber: number, isCorrect?: boolean): void {
    const answered = new Set(this.answeredQuestions());
    answered.add(orderNumber);
    this.answeredQuestions.set(answered);

    if (isCorrect !== undefined) {
      if (isCorrect) {
        const correct = new Set(this.correctQuestions());
        correct.add(orderNumber);
        this.correctQuestions.set(correct);
      } else {
        const incorrect = new Set(this.incorrectQuestions());
        incorrect.add(orderNumber);
        this.incorrectQuestions.set(incorrect);
      }
    }
  }

  clearSession(): void {
    this.testId.set(null);
    this.testState.set(null);
    this.currentQuestion.set(null);
    this.questionIndex.set(1);
    this.answers.set(new Map());
    this.answeredQuestions.set(new Set());
    this.correctQuestions.set(new Set());
    this.incorrectQuestions.set(new Set());
    this.removeFromStorage();
  }

  getStoredTestId(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(STORAGE_KEY);
  }

  private saveToStorage(testId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, testId);
    }
  }

  private removeFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
