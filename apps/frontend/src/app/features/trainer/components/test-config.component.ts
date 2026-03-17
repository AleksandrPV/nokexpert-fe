import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TrainerApiService } from '../services/trainer-api.service';
import { Qualification, TestMode } from '../models/trainer.interfaces';

@Component({
  selector: 'app-test-config',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconModule, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <section class="bg-slate-50 min-h-screen py-12">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-3xl mx-auto">

          <!-- Header -->
          <div class="mb-10 text-center">
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Настройка теста
            </h1>
            <p class="text-lg text-slate-500">
              Выберите параметры и начните проверку знаний
            </p>
          </div>

          <!-- Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">

            <!-- Qualification Select -->
            <div class="mb-8">
              <label for="qualification" class="block text-sm font-semibold text-slate-700 mb-2">
                Квалификация
              </label>
              <select
                id="qualification"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-colors duration-200 appearance-none cursor-pointer"
                [ngModel]="selectedQualId()"
                (ngModelChange)="selectedQualId.set($event)">
                <option value="" disabled>Выберите квалификацию</option>
                <option
                  *ngFor="let q of qualifications()"
                  [value]="q.profQualId">
                  {{ q.code }} — {{ q.title }} ({{ q.questionCount }} вопросов)
                </option>
              </select>
            </div>

            <!-- Mode Selection -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-slate-700 mb-3">
                Режим прохождения
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Training Card -->
                <button
                  type="button"
                  (click)="selectedMode.set('training')"
                  class="relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center"
                  [class]="selectedMode() === 'training'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    [class]="selectedMode() === 'training' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'">
                    <lucide-icon name="brain" [size]="24"></lucide-icon>
                  </div>
                  <span class="text-base font-semibold text-slate-900 mb-1">Тренировка</span>
                  <span class="text-xs text-slate-500 leading-relaxed">
                    Правильный ответ после каждого вопроса, без таймера
                  </span>
                  <div
                    *ngIf="selectedMode() === 'training'"
                    class="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <lucide-icon name="check" [size]="14" class="text-white"></lucide-icon>
                  </div>
                </button>

                <!-- Exam Card -->
                <button
                  type="button"
                  (click)="selectedMode.set('exam')"
                  class="relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center"
                  [class]="selectedMode() === 'exam'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    [class]="selectedMode() === 'exam' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'">
                    <lucide-icon name="timer" [size]="24"></lucide-icon>
                  </div>
                  <span class="text-base font-semibold text-slate-900 mb-1">Экзамен</span>
                  <span class="text-xs text-slate-500 leading-relaxed">
                    Результат только в конце, таймер 120 минут
                  </span>
                  <div
                    *ngIf="selectedMode() === 'exam'"
                    class="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <lucide-icon name="check" [size]="14" class="text-white"></lucide-icon>
                  </div>
                </button>
              </div>
            </div>

            <!-- Question Count -->
            <div class="mb-10">
              <label class="block text-sm font-semibold text-slate-700 mb-3">
                Количество вопросов
              </label>
              <div class="flex flex-wrap gap-3">
                <button
                  *ngFor="let opt of countOptions()"
                  type="button"
                  (click)="selectedCount.set(opt.value)"
                  [disabled]="opt.value > maxQuestions() && opt.value !== 0"
                  class="px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200"
                  [class]="selectedCount() === opt.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : opt.value > maxQuestions() && opt.value !== 0
                      ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600 cursor-pointer'">
                  {{ opt.label }}
                </button>
              </div>
              <p class="mt-2 text-xs text-slate-400" *ngIf="maxQuestions() > 0">
                Доступно вопросов: {{ maxQuestions() }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="button"
              (click)="startTest()"
              [disabled]="!canStart() || loading()"
              class="w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              [class]="canStart() && !loading()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'">
              <lucide-icon
                *ngIf="!loading()"
                name="play"
                [size]="20">
              </lucide-icon>
              <svg
                *ngIf="loading()"
                class="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ loading() ? 'Запуск...' : 'Начать тест' }}
            </button>

          </div>

        </div>
      </div>
    </section>
  `,
})
export class TestConfigComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly trainerApi = inject(TrainerApiService);

  readonly breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Тренажёр', url: '/trainer' },
    { label: 'Настройка теста' },
  ];

  qualifications = signal<Qualification[]>([]);
  selectedQualId = signal<string>('');
  selectedMode = signal<TestMode>('training');
  selectedCount = signal<number>(20);
  loading = signal(false);

  maxQuestions = computed(() => {
    const qual = this.qualifications().find(q => q.profQualId === this.selectedQualId());
    return qual ? qual.questionCount : 0;
  });

  countOptions = computed(() => {
    const max = this.maxQuestions();
    return [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: `Все (${max || '?'})`, value: 0 },
    ];
  });

  canStart = computed(() => {
    return this.selectedQualId() !== '' && this.effectiveCount() > 0;
  });

  private effectiveCount = computed(() => {
    const count = this.selectedCount();
    const max = this.maxQuestions();
    if (count === 0) return max;
    return Math.min(count, max);
  });

  ngOnInit(): void {
    const councilId = this.route.snapshot.queryParamMap.get('councilId') || undefined;
    const councilCode = this.route.snapshot.queryParamMap.get('councilCode') || undefined;
    this.trainerApi.getQualifications({ councilId, councilCode }).subscribe({
      next: (quals) => {
        this.qualifications.set(quals);
        if (quals.length === 1) {
          this.selectedQualId.set(quals[0].profQualId);
        }
      },
    });
  }

  startTest(): void {
    if (!this.canStart() || this.loading()) return;

    this.loading.set(true);
    const questionCount = this.effectiveCount();

    this.trainerApi.startTest({
      profQualId: this.selectedQualId(),
      mode: this.selectedMode(),
      questionCount,
    }).subscribe({
      next: (res) => {
        this.router.navigate(['/trainer/test', res.testId]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
