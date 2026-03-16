import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { IconModule } from '../../../shared/components/icon/icon.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { TrainerApiService } from '../services/trainer-api.service';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { Council, Qualification } from '../models/trainer.interfaces';

interface CouncilCardData {
  council: Council;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  totalQuestions: number;
  isAvailable: boolean;
}

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule, BreadcrumbsComponent, SkeletonComponent],
  template: `
    <!-- Breadcrumbs -->
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <!-- Hero Section -->
    <section class="relative bg-slate-950 overflow-hidden">
      <!-- Floating orbs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
        <div class="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-3xl"></div>
      </div>

      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.03]"
           style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;">
      </div>

      <div class="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Badge -->
          <div id="hero-badge" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 opacity-0">
            <lucide-icon name="dumbbell" [size]="16" class="text-blue-400"></lucide-icon>
            <span class="text-sm font-medium text-blue-300 tracking-wide">
              <span class="text-trainer-badge"></span>
            </span>
          </div>

          <!-- Title -->
          <h1 id="hero-title" class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 opacity-0">
            <span class="text-trainer-title"></span>
            <span class="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              <span class="text-trainer-title-accent"></span>
            </span>
          </h1>

          <!-- Subtitle -->
          <p id="hero-subtitle" class="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 opacity-0">
            <span class="text-trainer-subtitle"></span>
          </p>

          <!-- Stats Row -->
          <div id="hero-stats" class="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-0">
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-white mb-1">{{ totalQuestions() }}</div>
              <div class="text-sm text-slate-500 uppercase tracking-wider font-medium">Вопросов</div>
            </div>
            <div class="w-px h-12 bg-slate-800 hidden sm:block"></div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-white mb-1">5</div>
              <div class="text-sm text-slate-500 uppercase tracking-wider font-medium">Направлений</div>
            </div>
            <div class="w-px h-12 bg-slate-800 hidden sm:block"></div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-white mb-1">2</div>
              <div class="text-sm text-slate-500 uppercase tracking-wider font-medium">Режима</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom gradient divider -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
    </section>

    <!-- Councils Cards Section -->
    <section class="bg-slate-50 py-20 lg:py-28" id="councils-section">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16" id="section-header">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <lucide-icon name="compass" [size]="14" class="text-blue-600"></lucide-icon>
              <span class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Направления подготовки</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Выберите направление
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto">
              Тренажёр содержит реальные вопросы из базы независимой оценки квалификаций
              для различных советов по профессиональным квалификациям
            </p>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="cards-grid">
            <!-- Skeleton cards while loading -->
            <ng-container *ngIf="cardsLoading() && councilCards().length === 0">
              <div *ngFor="let i of [1,2,3]" class="bg-white rounded-2xl border border-slate-200 p-8">
                <app-skeleton width="56px" height="56px" rounded="xl"></app-skeleton>
                <div class="mt-6"><app-skeleton width="180px" height="24px"></app-skeleton></div>
                <div class="mt-3 space-y-2">
                  <app-skeleton height="14px"></app-skeleton>
                  <app-skeleton width="80%" height="14px"></app-skeleton>
                </div>
                <div class="mt-6"><app-skeleton width="120px" height="40px" rounded="xl"></app-skeleton></div>
              </div>
            </ng-container>
            <ng-container *ngFor="let card of councilCards(); let i = index">
              <!-- Active Card -->
              <div *ngIf="card.isAvailable"
                   class="council-card group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
                <!-- Top accent line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                     [ngClass]="getGradientClass(card.color)"></div>

                <div class="p-8">
                  <!-- Icon -->
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                       [ngClass]="card.bgColor">
                    <lucide-icon [name]="card.icon" [size]="28" [ngClass]="card.color"></lucide-icon>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-200">
                    {{ card.council.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-slate-500 text-sm leading-relaxed mb-6">
                    {{ card.description }}
                  </p>

                  <!-- Question count badge -->
                  <div class="flex items-center gap-2 mb-6">
                    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                      <lucide-icon name="file-text" [size]="14" class="text-emerald-600"></lucide-icon>
                      <span class="text-xs font-semibold text-emerald-700">
                        {{ card.totalQuestions }} {{ getQuestionsLabel(card.totalQuestions) }}
                      </span>
                    </div>
                  </div>

                  <!-- CTA Button -->
                  <a [routerLink]="['/trainer/start']"
                     [queryParams]="{ councilCode: card.council.code }"
                     class="inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200 group/btn">
                    <span>Начать подготовку</span>
                    <lucide-icon name="arrow-right" [size]="16"
                                 class="transition-transform duration-200 group-hover/btn:translate-x-0.5"></lucide-icon>
                  </a>
                </div>

                <!-- Hover glow -->
                <div class="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
                     [ngClass]="getGlowClass(card.color)"></div>
              </div>

              <!-- Disabled Card -->
              <div *ngIf="!card.isAvailable"
                   class="council-card relative bg-white/60 rounded-2xl border border-slate-200/60 overflow-hidden">
                <!-- Top accent line (muted) -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 to-slate-300"></div>

                <div class="p-8 opacity-50 grayscale">
                  <!-- Icon -->
                  <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                    <lucide-icon [name]="card.icon" [size]="28" class="text-slate-400"></lucide-icon>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl font-bold text-slate-700 mb-3">
                    {{ card.council.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-slate-400 text-sm leading-relaxed mb-6">
                    {{ card.description }}
                  </p>

                  <!-- Coming soon badge -->
                  <div class="flex items-center gap-2 mb-6">
                    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                      <lucide-icon name="clock" [size]="14" class="text-slate-400"></lucide-icon>
                      <span class="text-xs font-semibold text-slate-500">Скоро</span>
                    </div>
                  </div>

                  <!-- Disabled button -->
                  <div class="inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-400 bg-slate-100 cursor-not-allowed">
                    <span>Скоро</span>
                    <lucide-icon name="lock" [size]="14"></lucide-icon>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-20 lg:py-28 border-t border-slate-100" id="features-section">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16" id="features-header">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Как это работает
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto">
              Простой и эффективный процесс подготовки к экзамену НОК
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="features-grid">
            <!-- Step 1 -->
            <div class="feature-card relative text-center p-8">
              <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <lucide-icon name="compass" [size]="32" class="text-blue-600"></lucide-icon>
              </div>
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-blue-600/30">
                1
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Выберите направление</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Определите совет по профессиональным квалификациям и выберите квалификацию для подготовки
              </p>
            </div>

            <!-- Step 2 -->
            <div class="feature-card relative text-center p-8">
              <div class="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                <lucide-icon name="brain" [size]="32" class="text-indigo-600"></lucide-icon>
              </div>
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-indigo-600/30">
                2
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Тренируйтесь</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Отвечайте на реальные вопросы из базы НОК в режиме тренировки с подсказками или в режиме экзамена
              </p>
            </div>

            <!-- Step 3 -->
            <div class="feature-card relative text-center p-8">
              <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <lucide-icon name="trophy" [size]="32" class="text-emerald-600"></lucide-icon>
              </div>
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-emerald-600/30">
                3
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Сдайте экзамен</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Придите на экзамен подготовленным и уверенно пройдите независимую оценку квалификаций
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-slate-950 py-20 lg:py-24 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>

      <div class="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 text-center" id="cta-section">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
            Готовы начать подготовку?
          </h2>
          <p class="text-lg text-slate-400 mb-10">
            Не оставляйте результат экзамена на волю случая. Начните тренировку прямо сейчас
            и приходите на экзамен уверенным в своих знаниях.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a *ngIf="activeCouncilId()"
               [routerLink]="['/trainer/start']"
               [queryParams]="{ councilCode: 'NOSTROY' }"
               class="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200">
              <span>Начать тренировку</span>
              <lucide-icon name="arrow-right" [size]="18"></lucide-icon>
            </a>
            <a routerLink="/services"
               class="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-white transition-all duration-200">
              <span>Узнать об услугах</span>
              <lucide-icon name="arrow-up-right" [size]="16"></lucide-icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TrainerDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly trainerApi = inject(TrainerApiService);
  private readonly animationService = inject(AnimationService);
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  councils = signal<Council[]>([]);
  qualificationsMap = signal<Map<string, Qualification[]>>(new Map());
  councilCards = signal<CouncilCardData[]>([]);
  cardsLoading = signal(true);
  totalQuestions = signal<number>(0);
  activeCouncilId = signal<string | null>(null);

  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Тренажёр НОК', active: true },
  ];

  /** Maps council code to icon name */
  private readonly councilIcons: Record<string, string> = {
    'NOSTROY': 'hard-hat',
    'NOPRIZ': 'pen-tool',
    'OPB': 'flame',
    'GKH': 'building-2',
    'MCHS': 'shield',
  };

  /** Maps council code to color config */
  private readonly councilColors: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    'NOSTROY': { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    'NOPRIZ': { color: 'text-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
    'OPB': { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    'GKH': { color: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
    'MCHS': { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  };

  /** Default descriptions per council code */
  private readonly councilDescriptions: Record<string, string> = {
    'NOSTROY': 'Главный инженер проекта (специалист по организации строительства), 7 уровень. Вопросы из базы НОК НОСТРОЙ для подготовки к экзамену.',
    'NOPRIZ': 'Национальное объединение проектировщиков и изыскателей. Квалификации в области архитектурно-строительного проектирования и инженерных изысканий.',
    'OPB': 'Оценка пожарной безопасности. Квалификации специалистов по обеспечению пожарной безопасности объектов.',
    'GKH': 'Жилищно-коммунальное хозяйство. Квалификации специалистов по управлению и обслуживанию жилищного фонда.',
    'MCHS': 'Министерство по чрезвычайным ситуациям. Квалификации специалистов по гражданской обороне и защите от ЧС.',
  };

  /** Council codes that currently have questions available */
  private readonly availableCodes = new Set(['NOSTROY']);

  ngOnInit(): void {
    this.setSeo();
    this.loadData();
    this.injectHeroText();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.runAnimations();
    }
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }

  /** Inject text content to avoid template interpolation issues with SSR */
  private injectHeroText(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const badge = document.querySelector('.text-trainer-badge');
      if (badge) badge.textContent = 'Тренажёр НОК';

      const title = document.querySelector('.text-trainer-title');
      if (title) title.textContent = 'Подготовьтесь к экзамену';

      const titleAccent = document.querySelector('.text-trainer-title-accent');
      if (titleAccent) titleAccent.textContent = 'независимой оценки квалификаций';

      const subtitle = document.querySelector('.text-trainer-subtitle');
      if (subtitle) subtitle.textContent = 'Тренируйтесь на реальных вопросах из базы НОК. Два режима подготовки: тренировка с моментальной проверкой ответов и имитация реального экзамена с таймером и порогом прохождения.';
    });
  }

  private setSeo(): void {
    this.seoService.setSeoData({
      title: 'Тренажёр НОК — подготовка к экзамену | НОК Эксперт',
      description:
        'Онлайн-тренажёр для подготовки к независимой оценке квалификаций (НОК). Реальные вопросы НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ, МЧС. Режимы тренировки и экзамена.',
      keywords:
        'тренажёр НОК, подготовка к НОК, тест НОК, вопросы НОК НОСТРОЙ, экзамен НОК онлайн, тренировка НОК',
      canonical: '/trainer',
    });
  }

  private loadData(): void {
    forkJoin({
      councils: this.trainerApi.getCouncils(),
      qualifications: this.trainerApi.getQualifications({}),
    }).subscribe({
      next: ({ councils, qualifications }) => {
        this.councils.set(councils);

        // Build qualifications map
        const qMap = new Map<string, Qualification[]>();
        for (const q of qualifications) {
          const list = qMap.get(q.councilId) || [];
          list.push(q);
          qMap.set(q.councilId, list);
        }
        this.qualificationsMap.set(qMap);

        // Build card data
        const cards: CouncilCardData[] = councils.map((council) => {
          const code = council.code || '';
          const quals = qMap.get(council.councilId) || [];
          const questions = quals.reduce((sum, q) => sum + (q.questionCount || 0), 0);
          const isAvailable = this.availableCodes.has(code);
          const colors = this.councilColors[code] || {
            color: 'text-slate-600',
            bgColor: 'bg-slate-50',
            borderColor: 'border-slate-200',
          };

          if (isAvailable) {
            this.activeCouncilId.set(council.councilId);
          }

          return {
            council,
            icon: this.councilIcons[code] || 'building-2',
            color: colors.color,
            bgColor: colors.bgColor,
            borderColor: colors.borderColor,
            description: council.description || this.councilDescriptions[code] || '',
            totalQuestions: questions,
            isAvailable,
          };
        });

        // Sort: available first
        cards.sort((a, b) => (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0));
        this.councilCards.set(cards);
        this.cardsLoading.set(false);

        // Total questions across all
        const total = cards.reduce((sum, c) => sum + c.totalQuestions, 0);
        this.totalQuestions.set(total);
      },
      error: () => {
        this.cardsLoading.set(false);
        // Graceful fallback: show static card data
        this.buildFallbackCards();
      },
    });
  }

  private buildFallbackCards(): void {
    const fallbackCodes = ['NOSTROY', 'NOPRIZ', 'OPB', 'GKH', 'MCHS'];
    const fallbackTitles: Record<string, string> = {
      'NOSTROY': 'СПК в строительстве (НОСТРОЙ)',
      'NOPRIZ': 'СПК в проектировании (НОПРИЗ)',
      'OPB': 'СПК пожарной безопасности',
      'GKH': 'СПК ЖКХ',
      'MCHS': 'СПК МЧС',
    };

    const cards: CouncilCardData[] = fallbackCodes.map((code) => {
      const colors = this.councilColors[code];
      const isAvailable = this.availableCodes.has(code);
      return {
        council: {
          councilId: code.toLowerCase(),
          code,
          title: fallbackTitles[code],
          description: null,
        },
        icon: this.councilIcons[code],
        color: colors.color,
        bgColor: colors.bgColor,
        borderColor: colors.borderColor,
        description: this.councilDescriptions[code],
        totalQuestions: isAvailable ? 600 : 0,
        isAvailable,
      };
    });

    // Sort: available first
    cards.sort((a, b) => (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0));
    this.councilCards.set(cards);
    this.totalQuestions.set(600);
  }

  private async runAnimations(): Promise<void> {
    // Hero entrance
    await this.animationService.heroEntrance({
      badge: '#hero-badge',
      title: '#hero-title',
      subtitle: '#hero-subtitle',
      cta: '#hero-stats',
    });

    // Section header
    this.animationService.fadeInOnScroll('#section-header', { y: 25, duration: 0.6 });

    // Council cards
    this.animationService.revealCards('#cards-grid', '.council-card', {
      y: 35,
      stagger: 0.1,
      duration: 0.6,
    });

    // Features header
    this.animationService.fadeInOnScroll('#features-header', { y: 25, duration: 0.6 });

    // Feature cards
    this.animationService.revealCards('#features-grid', '.feature-card', {
      y: 30,
      stagger: 0.12,
      duration: 0.6,
    });

    // CTA section
    this.animationService.fadeInOnScroll('#cta-section', { y: 30, duration: 0.7 });
  }

  /** Return Tailwind gradient class based on color token */
  getGradientClass(colorClass: string): string {
    if (colorClass.includes('blue')) return 'from-blue-500 to-indigo-500';
    if (colorClass.includes('violet')) return 'from-violet-500 to-purple-500';
    if (colorClass.includes('orange')) return 'from-orange-500 to-amber-500';
    if (colorClass.includes('teal')) return 'from-teal-500 to-cyan-500';
    if (colorClass.includes('red')) return 'from-red-500 to-rose-500';
    return 'from-slate-400 to-slate-500';
  }

  /** Return glow class for hover effect */
  getGlowClass(colorClass: string): string {
    if (colorClass.includes('blue')) return 'bg-blue-400/20';
    if (colorClass.includes('violet')) return 'bg-violet-400/20';
    if (colorClass.includes('orange')) return 'bg-orange-400/20';
    if (colorClass.includes('teal')) return 'bg-teal-400/20';
    if (colorClass.includes('red')) return 'bg-red-400/20';
    return 'bg-slate-400/20';
  }

  /** Russian-aware pluralization for "вопрос" */
  getQuestionsLabel(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod100 >= 11 && mod100 <= 19) return 'вопросов';
    if (mod10 === 1) return 'вопрос';
    if (mod10 >= 2 && mod10 <= 4) return 'вопроса';
    return 'вопросов';
  }
}
