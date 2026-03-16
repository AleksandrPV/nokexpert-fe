import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  StatisticsApiService,
  UserTestHistoryItem,
  UserStatsResponse,
} from '../services/statistics-api.service';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule, BreadcrumbsComponent, SkeletonComponent],
  template: `
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <section class="bg-slate-950 py-16 lg:py-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
        <div class="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>

      <div class="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-6xl mx-auto">
          <!-- Profile Header -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-600/20">
              {{ userInitials() }}
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-white mb-1">{{ userName() }}</h1>
              <p class="text-slate-400">{{ userEmail() }}</p>
            </div>
            <div class="flex items-center gap-3">
              <a routerLink="/profile"
                 class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 border border-slate-700 hover:bg-white/5 transition-all duration-200">
                <lucide-icon name="pen-line" [size]="14"></lucide-icon>
                Редактировать
              </a>
              <a routerLink="/trainer"
                 class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-200">
                <lucide-icon name="dumbbell" [size]="16"></lucide-icon>
                Перейти к тренажёру
              </a>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            @if (isLoading() && !stats()) {
              @for (i of [1,2,3,4]; track i) {
                <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <app-skeleton width="40px" height="40px" rounded="xl"></app-skeleton>
                  <div class="mt-4"><app-skeleton width="60px" height="28px"></app-skeleton></div>
                  <div class="mt-2"><app-skeleton width="100px" height="16px"></app-skeleton></div>
                </div>
              }
            } @else {
              <!-- Total tests -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <lucide-icon name="file-text" [size]="20" class="text-blue-400"></lucide-icon>
                </div>
                <div class="text-2xl font-bold text-white mb-1">{{ stats()?.totalTests ?? 0 }}</div>
                <div class="text-sm text-slate-500">Всего тестов</div>
              </div>

              <!-- Avg score -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <lucide-icon name="trending-up" [size]="20" class="text-emerald-400"></lucide-icon>
                </div>
                <div class="text-2xl font-bold text-white mb-1">{{ stats()?.avgScore ?? 0 }}%</div>
                <div class="text-sm text-slate-500">Средний балл</div>
              </div>

              <!-- Best score -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <lucide-icon name="trophy" [size]="20" class="text-amber-400"></lucide-icon>
                </div>
                <div class="text-2xl font-bold text-white mb-1">{{ stats()?.bestScore ?? 0 }}%</div>
                <div class="text-sm text-slate-500">Лучший результат</div>
              </div>

              <!-- Pass rate -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div class="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <lucide-icon name="check-circle" [size]="20" class="text-violet-400"></lucide-icon>
                </div>
                <div class="text-2xl font-bold text-white mb-1">{{ stats()?.passRate ?? 0 }}%</div>
                <div class="text-sm text-slate-500">Процент сдачи</div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Test History -->
    <section class="bg-slate-50 py-16 lg:py-20">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">История тестов</h2>

          <!-- Filters -->
          <div *ngIf="tests().length > 0" class="flex flex-wrap gap-2 mb-6">
            <div class="flex gap-1 bg-white rounded-xl border border-slate-200 p-1">
              <button (click)="modeFilter.set('all')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="modeFilter() === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Все
              </button>
              <button (click)="modeFilter.set('training')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="modeFilter() === 'training' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Тренировка
              </button>
              <button (click)="modeFilter.set('exam')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="modeFilter() === 'exam' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Экзамен
              </button>
            </div>
            <div class="flex gap-1 bg-white rounded-xl border border-slate-200 p-1">
              <button (click)="resultFilter.set('all')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="resultFilter() === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Все
              </button>
              <button (click)="resultFilter.set('passed')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="resultFilter() === 'passed' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Сдан
              </button>
              <button (click)="resultFilter.set('failed')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      [ngClass]="resultFilter() === 'failed' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-700'">
                Не сдан
              </button>
            </div>
          </div>

          <!-- Loading skeleton -->
          <div *ngIf="isLoading() && tests().length === 0" class="space-y-3">
            <div *ngFor="let i of [1,2,3]" class="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
              <app-skeleton width="90px" height="30px" rounded="lg"></app-skeleton>
              <div class="flex-1 space-y-2">
                <app-skeleton width="200px" height="16px"></app-skeleton>
                <app-skeleton width="150px" height="12px"></app-skeleton>
              </div>
              <app-skeleton width="50px" height="24px"></app-skeleton>
            </div>
          </div>

          <!-- Empty state -->
          <div *ngIf="tests().length === 0 && !isLoading()" class="text-center py-16">
            <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <lucide-icon name="clipboard-list" [size]="32" class="text-slate-400"></lucide-icon>
            </div>
            <h3 class="text-lg font-semibold text-slate-700 mb-2">Пока нет тестов</h3>
            <p class="text-slate-500 mb-6">Пройдите первый тест, чтобы увидеть результаты здесь</p>
            <a routerLink="/trainer"
               class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
              Начать тренировку
            </a>
          </div>

          <!-- No results with active filters -->
          <div *ngIf="tests().length > 0 && filteredTests().length === 0 && !isLoading()" class="text-center py-12">
            <p class="text-slate-500">Нет тестов, соответствующих фильтрам</p>
          </div>

          <!-- Test list -->
          <div *ngIf="filteredTests().length > 0" class="space-y-3">
            <div *ngFor="let test of filteredTests()"
                 class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
              <!-- Mode badge -->
              <div class="shrink-0">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      [ngClass]="test.mode === 'exam' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-blue-50 text-blue-700 border border-blue-100'">
                  <lucide-icon [name]="test.mode === 'exam' ? 'clock' : 'brain'" [size]="12"></lucide-icon>
                  {{ test.mode === 'exam' ? 'Экзамен' : 'Тренировка' }}
                </span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-slate-900 truncate">{{ test.qualificationTitle || 'Квалификация' }}</div>
                <div class="text-xs text-slate-500 mt-0.5">
                  {{ formatDate(test.startedAt) }} · {{ test.totalQuestions }} вопросов · {{ formatTime(test.timeTakenSeconds) }}
                </div>
              </div>

              <!-- Score -->
              <div class="flex items-center gap-3">
                <div *ngIf="test.score !== null" class="text-right">
                  <div class="text-lg font-bold" [ngClass]="test.passed ? 'text-emerald-600' : 'text-red-500'">
                    {{ test.score }}%
                  </div>
                </div>
                <span *ngIf="test.score !== null"
                      class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                      [ngClass]="test.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'">
                  {{ test.passed ? 'Сдан' : 'Не сдан' }}
                </span>
                <span *ngIf="test.score === null"
                      class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500">
                  В процессе
                </span>
                <a *ngIf="test.status !== 'in_progress'"
                   [routerLink]="['/trainer/test', test.testId, 'results']"
                   class="text-blue-600 hover:text-blue-700 transition-colors">
                  <lucide-icon name="arrow-right" [size]="18"></lucide-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Load more -->
          <div *ngIf="hasMore()" class="text-center mt-8">
            <button (click)="loadMore()"
                    [disabled]="isLoading()"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-800 transition-all duration-200 disabled:opacity-50">
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class UserDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly statsApi = inject(StatisticsApiService);

  stats = signal<UserStatsResponse | null>(null);
  tests = signal<UserTestHistoryItem[]>([]);
  isLoading = signal(false);
  currentPage = 1;
  totalTests = 0;

  modeFilter = signal<'all' | 'training' | 'exam'>('all');
  resultFilter = signal<'all' | 'passed' | 'failed'>('all');

  filteredTests = computed(() => {
    let result = this.tests();
    const mode = this.modeFilter();
    const res = this.resultFilter();

    if (mode !== 'all') {
      result = result.filter((t) => t.mode === mode);
    }
    if (res === 'passed') {
      result = result.filter((t) => t.passed);
    } else if (res === 'failed') {
      result = result.filter((t) => t.score !== null && !t.passed);
    }
    return result;
  });

  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Личный кабинет', active: true },
  ];

  userName = () => {
    const user = this.authService.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  userEmail = () => this.authService.currentUser()?.email ?? '';

  userInitials = () => {
    const user = this.authService.currentUser();
    if (!user) return '';
    return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
  };

  hasMore = () => this.tests().length < this.totalTests;

  ngOnInit(): void {
    this.loadData();
  }

  loadMore(): void {
    this.currentPage++;
    this.loadTests();
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds} сек`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m} мин ${s} сек` : `${m} мин`;
  }

  private loadData(): void {
    this.isLoading.set(true);
    forkJoin({
      stats: this.statsApi.getMyStats(),
      tests: this.statsApi.getMyTests(1, 20),
    }).subscribe({
      next: ({ stats, tests }) => {
        this.stats.set(stats);
        this.tests.set(tests.items);
        this.totalTests = tests.total;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  private loadTests(): void {
    this.isLoading.set(true);
    this.statsApi.getMyTests(this.currentPage, 20).subscribe({
      next: (res) => {
        this.tests.update((prev) => [...prev, ...res.items]);
        this.totalTests = res.total;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
