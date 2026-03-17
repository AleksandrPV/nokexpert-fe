import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TrainerApiService } from '../services/trainer-api.service';
import { TestSessionService } from '../services/test-session.service';
import { TestResults, ResultQuestion, ResultOption } from '../models/trainer.interfaces';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <section class="bg-slate-50 min-h-screen py-12">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

        <!-- Loading State -->
        <div *ngIf="loading()" class="flex flex-col items-center justify-center py-32">
          <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p class="text-slate-500 text-lg">Загрузка результатов...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="!loading() && !results()" class="max-w-lg mx-auto text-center py-32">
          <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="circle-alert" [size]="32" class="text-red-500"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Не удалось загрузить результаты</h2>
          <p class="text-slate-500 mb-6">Попробуйте обновить страницу или вернуться к тренажёру</p>
          <a routerLink="/trainer" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            <lucide-icon name="arrow-left" [size]="18"></lucide-icon>
            На главную тренажёра
          </a>
        </div>

        <!-- Results Content -->
        <div *ngIf="!loading() && results()" class="max-w-4xl mx-auto">

          <!-- Score Hero Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 mb-8 text-center">
            <!-- Score Circle -->
            <div class="relative inline-flex items-center justify-center mb-6">
              <svg class="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke="#e2e8f0"
                  stroke-width="10"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  [attr.stroke]="scoreColor()"
                  stroke-width="10"
                  stroke-linecap="round"
                  [attr.stroke-dasharray]="circumference"
                  [attr.stroke-dashoffset]="scoreOffset()"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-5xl font-bold" [style.color]="scoreColor()">
                  {{ results()!.score }}%
                </span>
                <span class="text-sm text-slate-400 mt-1">результат</span>
              </div>
            </div>

            <!-- Pass/Fail Badge -->
            <div class="mb-4">
              <span
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-bold"
                [class]="results()!.passed
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'">
                <lucide-icon
                  [name]="results()!.passed ? 'circle-check' : 'circle-x'"
                  [size]="22">
                </lucide-icon>
                {{ results()!.passed ? 'Сдан' : 'Не сдан' }}
              </span>
            </div>

            <p class="text-slate-500 text-sm">
              Порог прохождения: <span class="font-semibold text-slate-700">70%</span>
              &middot;
              Режим:
              <span class="font-semibold text-slate-700">
                {{ results()!.mode === 'exam' ? 'Экзамен' : 'Тренировка' }}
              </span>
            </p>
          </div>

          <!-- Statistics Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <!-- Correct -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <div class="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <lucide-icon name="check" [size]="20" class="text-emerald-600"></lucide-icon>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-1">{{ results()!.correctAnswers }}</div>
              <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Правильных</div>
            </div>

            <!-- Incorrect -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <div class="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <lucide-icon name="x" [size]="20" class="text-red-600"></lucide-icon>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-1">{{ results()!.incorrectAnswers }}</div>
              <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Неправильных</div>
            </div>

            <!-- Unanswered -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <div class="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <lucide-icon name="circle-help" [size]="20" class="text-amber-600"></lucide-icon>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-1">{{ results()!.unanswered }}</div>
              <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Без ответа</div>
            </div>

            <!-- Time Taken -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <div class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <lucide-icon name="timer" [size]="20" class="text-blue-600"></lucide-icon>
              </div>
              <div class="text-2xl font-bold text-slate-900 mb-1">{{ formatTime(results()!.timeTakenSeconds) }}</div>
              <div class="text-xs font-medium text-slate-500 uppercase tracking-wide">Затрачено</div>
            </div>
          </div>

          <!-- Question-by-Question Review -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div class="px-8 py-6 border-b border-slate-100">
              <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                <lucide-icon name="list-checks" [size]="22" class="text-slate-400"></lucide-icon>
                Разбор ответов
              </h2>
            </div>

            <div class="divide-y divide-slate-100">
              <div
                *ngFor="let question of results()!.questions; trackBy: trackByQuestion"
                class="group">

                <!-- Question Header (clickable) -->
                <button
                  type="button"
                  (click)="toggleQuestion(question.orderNumber)"
                  class="w-full flex items-center gap-4 px-8 py-5 text-left hover:bg-slate-50 transition-colors cursor-pointer">

                  <!-- Status Icon -->
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    [class]="question.isCorrect
                      ? 'bg-emerald-100'
                      : isUnanswered(question)
                        ? 'bg-amber-100'
                        : 'bg-red-100'">
                    <lucide-icon
                      [name]="question.isCorrect ? 'check' : isUnanswered(question) ? 'circle-help' : 'x'"
                      [size]="18"
                      [class]="question.isCorrect
                        ? 'text-emerald-600'
                        : isUnanswered(question)
                          ? 'text-amber-600'
                          : 'text-red-600'">
                    </lucide-icon>
                  </div>

                  <!-- Question Number & Text -->
                  <div class="flex-1 min-w-0">
                    <span class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Вопрос {{ question.orderNumber }}
                    </span>
                    <p class="text-sm text-slate-800 font-medium mt-0.5 line-clamp-2">
                      {{ question.text }}
                    </p>
                  </div>

                  <!-- Expand Arrow -->
                  <lucide-icon
                    [name]="isExpanded(question.orderNumber) ? 'chevron-up' : 'chevron-down'"
                    [size]="18"
                    class="text-slate-400 flex-shrink-0 transition-transform">
                  </lucide-icon>
                </button>

                <!-- Expanded Detail -->
                <div
                  *ngIf="isExpanded(question.orderNumber)"
                  class="px-8 pb-6 pt-2 bg-slate-50/50">

                  <p class="text-sm text-slate-700 mb-4 leading-relaxed">{{ question.text }}</p>

                  <div
                    *ngIf="question.questionType === 'MULTIPLE_CHOICE'"
                    class="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                    <lucide-icon name="info" [size]="14"></lucide-icon>
                    Можно выбрать несколько вариантов
                  </div>

                  <!-- Options -->
                  <div class="space-y-2">
                    <div
                      *ngFor="let option of question.options"
                      class="flex items-start gap-3 px-4 py-3 rounded-xl text-sm border transition-colors"
                      [class]="getOptionClasses(option, question)">

                      <!-- Option indicator -->
                      <div
                        class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        [class]="getOptionIconClasses(option, question)">
                        <lucide-icon
                          *ngIf="option.isCorrect"
                          name="check"
                          [size]="12">
                        </lucide-icon>
                        <lucide-icon
                          *ngIf="option.isSelected && !option.isCorrect"
                          name="x"
                          [size]="12">
                        </lucide-icon>
                      </div>

                      <!-- Option text -->
                      <span class="flex-1" [class]="option.isCorrect ? 'font-medium' : ''">
                        {{ option.text }}
                      </span>

                      <!-- Labels -->
                      <span
                        *ngIf="option.isCorrect && option.isSelected"
                        class="text-xs font-semibold text-emerald-600 flex-shrink-0">
                        Ваш ответ (верно)
                      </span>
                      <span
                        *ngIf="option.isCorrect && !option.isSelected"
                        class="text-xs font-semibold text-emerald-600 flex-shrink-0">
                        Правильный ответ
                      </span>
                      <span
                        *ngIf="!option.isCorrect && option.isSelected"
                        class="text-xs font-semibold text-red-500 flex-shrink-0">
                        Ваш ответ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
            <button
              (click)="retryTest()"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <lucide-icon name="repeat" [size]="18"></lucide-icon>
              Пройти заново
            </button>

            <a
              routerLink="/trainer/start"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition-all">
              <lucide-icon name="shuffle" [size]="18"></lucide-icon>
              Другой тест
            </a>

            <a
              routerLink="/trainer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition-all">
              <lucide-icon name="house" [size]="18"></lucide-icon>
              На главную тренажёра
            </a>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class TestResultsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly trainerApi = inject(TrainerApiService);
  private readonly testSession = inject(TestSessionService);

  readonly results = signal<TestResults | null>(null);
  readonly loading = signal(true);
  readonly expandedQuestions = signal<Set<number>>(new Set());

  readonly circumference = 2 * Math.PI * 70; // r=70

  readonly scoreColor = computed(() => {
    const r = this.results();
    if (!r) return '#94a3b8'; // slate-400
    return r.score >= 70 ? '#059669' : '#dc2626'; // emerald-600 / red-600
  });

  readonly scoreOffset = computed(() => {
    const r = this.results();
    if (!r) return this.circumference;
    const progress = r.score / 100;
    return this.circumference * (1 - progress);
  });

  readonly breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Тренажёр', url: '/trainer' },
    { label: 'Результаты', active: true },
  ];

  ngOnInit(): void {
    this.testSession.clearSession();
    this.loadResults();
  }

  loadResults(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (!testId) {
      this.loading.set(false);
      return;
    }

    this.trainerApi.getResults(testId).subscribe({
      next: (data) => {
        this.results.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  toggleQuestion(orderNumber: number): void {
    const current = new Set(this.expandedQuestions());
    if (current.has(orderNumber)) {
      current.delete(orderNumber);
    } else {
      current.add(orderNumber);
    }
    this.expandedQuestions.set(current);
  }

  isExpanded(orderNumber: number): boolean {
    return this.expandedQuestions().has(orderNumber);
  }

  isUnanswered(question: ResultQuestion): boolean {
    return question.selectedOptionIds.length === 0;
  }

  formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} сек`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (secs === 0) {
      return `${mins} мин`;
    }
    return `${mins} мин ${secs} сек`;
  }

  retryTest(): void {
    this.router.navigate(['/trainer/start']);
  }

  trackByQuestion(_index: number, question: ResultQuestion): string {
    return question.questionId;
  }

  getOptionClasses(option: ResultOption, question: ResultQuestion): string {
    if (option.isCorrect && option.isSelected) {
      return 'bg-emerald-50 border-emerald-200 text-emerald-900';
    }
    if (option.isCorrect && !option.isSelected) {
      return 'bg-emerald-50/60 border-emerald-200/60 text-emerald-800';
    }
    if (!option.isCorrect && option.isSelected) {
      return 'bg-red-50 border-red-200 text-red-900';
    }
    return 'bg-white border-slate-200 text-slate-600';
  }

  getOptionIconClasses(option: ResultOption, _question: ResultQuestion): string {
    if (option.isCorrect) {
      return 'bg-emerald-500 text-white';
    }
    if (option.isSelected && !option.isCorrect) {
      return 'bg-red-500 text-white';
    }
    return 'bg-slate-200 text-slate-400';
  }
}
