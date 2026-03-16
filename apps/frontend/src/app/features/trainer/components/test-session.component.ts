import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  signal,
  computed,
  inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { TrainerApiService } from '../services/trainer-api.service';
import { TestSessionService } from '../services/test-session.service';
import { TestTimerService } from '../services/test-timer.service';
import {
  TestQuestion,
  QuestionOption,
  TestMode,
} from '../models/trainer.interfaces';

@Component({
  selector: 'app-test-session',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <!-- Progress -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-700">
            Вопрос {{ session.questionIndex() }} из {{ session.totalQuestions() }}
          </span>
          <div class="hidden sm:block w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-600 rounded-full transition-all duration-300"
              [style.width.%]="progressPercent()"
            ></div>
          </div>
        </div>

        <!-- Timer (exam mode) -->
        @if (session.isExam() && timer.isRunning()) {
          <div
            class="flex items-center gap-1.5 px-3 py-1 rounded-lg"
            [class]="timer.remaining() <= 60 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'"
          >
            <lucide-icon name="timer" [size]="16"></lucide-icon>
            <span class="text-sm font-mono font-semibold">{{ timer.timeDisplay() }}</span>
          </div>
        }

        <!-- Exit -->
        <button
          (click)="showCompleteModal.set(true)"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <lucide-icon name="x" [size]="16"></lucide-icon>
          <span class="hidden sm:inline">Выйти</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="pt-20 pb-32 min-h-screen bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <!-- Loading -->
        @if (loading()) {
          <div class="flex flex-col items-center justify-center py-24">
            <div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-sm text-gray-500">Загрузка вопроса...</p>
          </div>
        }

        <!-- Question Card -->
        @if (!loading() && session.currentQuestion()) {
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Question Header -->
            <div class="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100">
              <div class="flex items-center gap-2 mb-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {{ session.currentQuestion()!.questionType === 'SINGLE_CHOICE' ? 'Один ответ' : 'Несколько ответов' }}
                </span>
                @if (session.isExam()) {
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                    Экзамен
                  </span>
                }
              </div>
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">
                {{ session.currentQuestion()!.text }}
              </h2>
            </div>

            <!-- Options -->
            <div class="px-6 sm:px-8 py-6 space-y-3">
              @for (option of session.currentQuestion()!.options; track option.optionId) {
                <button
                  (click)="selectOption(option.optionId)"
                  [disabled]="showFeedback()"
                  class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group"
                  [class]="getOptionClasses(option)"
                >
                  <div class="flex items-start gap-3">
                    <!-- Radio / Checkbox indicator -->
                    <div
                      class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                      [class]="getIndicatorClasses(option)"
                      [class.rounded-md]="session.currentQuestion()!.questionType === 'MULTIPLE_CHOICE'"
                      [class.rounded-full]="session.currentQuestion()!.questionType === 'SINGLE_CHOICE'"
                    >
                      @if (isSelected(option.optionId)) {
                        @if (session.currentQuestion()!.questionType === 'SINGLE_CHOICE') {
                          <div class="w-2 h-2 rounded-full bg-current"></div>
                        } @else {
                          <lucide-icon name="check" [size]="12"></lucide-icon>
                        }
                      }
                    </div>
                    <!-- Option text -->
                    <span class="text-sm sm:text-base leading-relaxed">
                      {{ option.text }}
                    </span>
                  </div>

                  <!-- Feedback icon -->
                  @if (showFeedback()) {
                    <div class="absolute top-4 right-4">
                      @if (option.isCorrect) {
                        <lucide-icon name="circle-check" [size]="20" class="text-green-500"></lucide-icon>
                      }
                      @if (!option.isCorrect && isSelected(option.optionId)) {
                        <lucide-icon name="circle-x" [size]="20" class="text-red-500"></lucide-icon>
                      }
                    </div>
                  }
                </button>
              }
            </div>

            <!-- Action Area -->
            <div class="px-6 sm:px-8 pb-6 sm:pb-8">
              @if (!showFeedback() && !isCurrentAnswered()) {
                <button
                  (click)="submitAnswer()"
                  [disabled]="selectedOptions().length === 0"
                  class="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Ответить
                </button>
              }

              @if (showFeedback()) {
                <div class="flex items-center gap-3">
                  @if (lastAnswerCorrect()) {
                    <div class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                      <lucide-icon name="circle-check" [size]="18"></lucide-icon>
                      <span class="text-sm font-medium">Правильно!</span>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                      <lucide-icon name="circle-x" [size]="18"></lucide-icon>
                      <span class="text-sm font-medium">Неправильно</span>
                    </div>
                  }
                  <button
                    (click)="nextQuestion()"
                    class="ml-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Далее
                    <lucide-icon name="arrow-right" [size]="16" class="inline ml-1"></lucide-icon>
                  </button>
                </div>
              }

              @if (isCurrentAnswered() && !showFeedback()) {
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <lucide-icon name="check" [size]="16"></lucide-icon>
                  <span>Вы уже ответили на этот вопрос</span>
                </div>
              }
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-6 flex items-center justify-between">
            <button
              (click)="prevQuestion()"
              [disabled]="session.questionIndex() <= 1"
              class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <lucide-icon name="chevron-left" [size]="16"></lucide-icon>
              Назад
            </button>

            <button
              (click)="showCompleteModal.set(true)"
              class="px-5 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
            >
              Завершить тест
            </button>

            <button
              (click)="nextQuestion()"
              [disabled]="session.questionIndex() >= session.totalQuestions()"
              class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Далее
              <lucide-icon name="chevron-right" [size]="16"></lucide-icon>
            </button>
          </div>
        }
      </div>
    </div>

    <!-- Question Grid (fixed bottom) -->
    @if (session.totalQuestions() > 0) {
      <div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div class="flex flex-wrap gap-1.5 justify-center max-h-20 overflow-y-auto">
            @for (num of questionNumbers(); track num) {
              <button
                (click)="goToQuestion(num)"
                class="w-8 h-8 text-xs font-medium rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-110"
                [class]="getGridButtonClasses(num)"
              >
                {{ num }}
              </button>
            }
          </div>
        </div>
      </div>
    }

    <!-- Complete Confirmation Modal -->
    @if (showCompleteModal()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          (click)="showCompleteModal.set(false)"
        ></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8">
          <div class="text-center">
            <div class="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <lucide-icon name="triangle-alert" [size]="24" class="text-amber-600"></lucide-icon>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Завершить тест?</h3>
            <p class="text-sm text-gray-500 mb-2">
              Вы ответили на
              <span class="font-medium text-gray-700">{{ session.answeredQuestions().size }}</span>
              из
              <span class="font-medium text-gray-700">{{ session.totalQuestions() }}</span>
              вопросов.
            </p>
            @if (unansweredCount() > 0) {
              <p class="text-sm text-amber-600 mb-6">
                Без ответа: {{ unansweredCount() }} {{ unansweredLabel() }}
              </p>
            } @else {
              <p class="text-sm text-green-600 mb-6">
                Вы ответили на все вопросы!
              </p>
            }
          </div>

          <div class="flex gap-3">
            <button
              (click)="showCompleteModal.set(false)"
              class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Продолжить
            </button>
            <button
              (click)="doComplete()"
              class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
            >
              Завершить
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class TestSessionComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(TrainerApiService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly session = inject(TestSessionService);
  readonly timer = inject(TestTimerService);

  readonly selectedOptions = signal<string[]>([]);
  readonly showFeedback = signal(false);
  readonly showCompleteModal = signal(false);
  readonly loading = signal(false);
  readonly lastAnswerCorrect = signal(false);

  readonly progressPercent = computed(
    () => (this.session.questionIndex() / this.session.totalQuestions()) * 100,
  );

  readonly questionNumbers = computed(() =>
    Array.from({ length: this.session.totalQuestions() }, (_, i) => i + 1),
  );

  readonly unansweredCount = computed(
    () => this.session.totalQuestions() - this.session.answeredQuestions().size,
  );

  readonly unansweredLabel = computed(() => {
    const n = this.unansweredCount();
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'вопрос';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'вопроса';
    return 'вопросов';
  });

  private completing = false;
  private testCompleted = false;

  canLeave(): boolean {
    return this.testCompleted || !this.session.testId();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.canLeave()) {
      event.preventDefault();
    }
  }

  constructor() {
    effect(() => {
      if (this.timer.isExpired()) {
        this.doComplete();
      }
    });
  }

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (!testId) {
      this.router.navigate(['/trainer']);
      return;
    }

    this.loading.set(true);
    this.api.getTestState(testId).subscribe({
      next: (state) => {
        if (state.status === 'completed' || state.status === 'expired') {
          this.testCompleted = true;
          this.router.navigate(['/trainer/test', testId, 'results']);
          return;
        }

        this.session.initSession(testId, state);

        if (state.mode === 'exam' && state.remainingSeconds !== null) {
          this.timer.start(state.remainingSeconds);
        }

        this.loadQuestion(1);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/trainer']);
      },
    });
  }

  ngOnDestroy(): void {
    this.timer.stop();
  }

  loadQuestion(orderNumber: number): void {
    const testId = this.session.testId();
    if (!testId) return;

    this.loading.set(true);
    this.showFeedback.set(false);
    this.selectedOptions.set([]);

    this.api.getQuestion(testId, orderNumber).subscribe({
      next: (question) => {
        this.session.setQuestion(question);

        // Restore previously selected options if question was already answered
        if (question.userAnswer) {
          this.selectedOptions.set([...question.userAnswer.selectedOptionIds]);
          this.session.markAnswered(question.orderNumber, question.userAnswer.isCorrect);
        }

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  selectOption(optionId: string): void {
    if (this.showFeedback() || this.isCurrentAnswered()) return;

    const question = this.session.currentQuestion();
    if (!question) return;

    if (question.questionType === 'SINGLE_CHOICE') {
      this.selectedOptions.set([optionId]);
    } else {
      const current = this.selectedOptions();
      if (current.includes(optionId)) {
        this.selectedOptions.set(current.filter((id) => id !== optionId));
      } else {
        this.selectedOptions.set([...current, optionId]);
      }
    }
  }

  submitAnswer(): void {
    const testId = this.session.testId();
    const question = this.session.currentQuestion();
    const selected = this.selectedOptions();
    if (!testId || !question || selected.length === 0) return;

    this.api
      .submitAnswer(testId, {
        questionId: question.questionId,
        selectedOptionIds: selected,
      })
      .subscribe({
        next: (response) => {
          if (this.session.isExam()) {
            // Exam mode: just mark as answered and move to next
            this.session.markAnswered(question.orderNumber);
            this.autoAdvance();
          } else {
            // Training mode: show feedback with correct/incorrect highlighting
            const isCorrect = response.isCorrect ?? false;
            this.lastAnswerCorrect.set(isCorrect);
            this.session.markAnswered(question.orderNumber, isCorrect);

            // Update options with correct answers from response
            if (response.options) {
              const updated: TestQuestion = {
                ...question,
                options: response.options,
                userAnswer: {
                  selectedOptionIds: selected,
                  isCorrect,
                },
              };
              this.session.setQuestion(updated);
            } else if (response.correctOptionIds) {
              const updatedOptions = question.options.map((opt) => ({
                ...opt,
                isCorrect: response.correctOptionIds!.includes(opt.optionId),
              }));
              const updated: TestQuestion = {
                ...question,
                options: updatedOptions,
                userAnswer: {
                  selectedOptionIds: selected,
                  isCorrect,
                },
              };
              this.session.setQuestion(updated);
            }

            this.showFeedback.set(true);
          }
        },
      });
  }

  nextQuestion(): void {
    const current = this.session.questionIndex();
    if (current < this.session.totalQuestions()) {
      this.loadQuestion(current + 1);
    }
  }

  prevQuestion(): void {
    const current = this.session.questionIndex();
    if (current > 1) {
      this.loadQuestion(current - 1);
    }
  }

  goToQuestion(num: number): void {
    if (num !== this.session.questionIndex()) {
      this.loadQuestion(num);
    }
  }

  confirmComplete(): void {
    this.showCompleteModal.set(true);
  }

  doComplete(): void {
    if (this.completing) return;
    this.completing = true;

    const testId = this.session.testId();
    if (!testId) return;

    this.timer.stop();
    this.showCompleteModal.set(false);

    this.api.completeTest(testId).subscribe({
      next: () => {
        this.testCompleted = true;
        this.session.clearSession();
        this.router.navigate(['/trainer/test', testId, 'results']);
      },
      error: () => {
        this.completing = false;
      },
    });
  }

  isSelected(optionId: string): boolean {
    return this.selectedOptions().includes(optionId);
  }

  isCurrentAnswered(): boolean {
    const question = this.session.currentQuestion();
    if (!question) return false;
    return this.session.answeredQuestions().has(question.orderNumber);
  }

  getOptionClasses(option: QuestionOption): string {
    const selected = this.isSelected(option.optionId);
    const feedback = this.showFeedback();

    if (feedback) {
      if (option.isCorrect) {
        return 'border-green-400 bg-green-50 text-green-900';
      }
      if (selected && !option.isCorrect) {
        return 'border-red-400 bg-red-50 text-red-900';
      }
      return 'border-gray-200 bg-gray-50 text-gray-400 opacity-60';
    }

    if (this.isCurrentAnswered()) {
      return selected
        ? 'border-blue-300 bg-blue-50 text-gray-700 cursor-default'
        : 'border-gray-200 bg-white text-gray-500 cursor-default';
    }

    if (selected) {
      return 'border-blue-500 bg-blue-50 text-gray-900 shadow-sm';
    }

    return 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer';
  }

  getIndicatorClasses(option: QuestionOption): string {
    const selected = this.isSelected(option.optionId);
    const feedback = this.showFeedback();

    if (feedback) {
      if (option.isCorrect) return 'border-green-500 text-green-500';
      if (selected && !option.isCorrect) return 'border-red-500 text-red-500';
      return 'border-gray-300 text-gray-300';
    }

    if (selected) return 'border-blue-500 text-blue-500';
    return 'border-gray-300 text-gray-300 group-hover:border-gray-400';
  }

  getGridButtonClasses(num: number): string {
    const current = this.session.questionIndex();
    const answered = this.session.answeredQuestions().has(num);
    const correct = this.session.correctQuestions().has(num);
    const incorrect = this.session.incorrectQuestions().has(num);

    if (num === current) {
      return 'bg-blue-600 text-white shadow-sm';
    }
    if (incorrect) {
      return 'bg-red-100 text-red-700 border border-red-200';
    }
    if (correct) {
      return 'bg-green-100 text-green-700 border border-green-200';
    }
    if (answered) {
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    }
    return 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200';
  }

  private autoAdvance(): void {
    const current = this.session.questionIndex();
    if (current < this.session.totalQuestions()) {
      setTimeout(() => this.loadQuestion(current + 1), 300);
    }
  }
}
