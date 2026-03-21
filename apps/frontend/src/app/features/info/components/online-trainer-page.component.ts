import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { TrainerDemoService } from '../services/trainer-demo.service';
import { PRICING } from '../../../shared/config/pricing.config';

@Component({
  selector: 'app-online-trainer-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Информация о НОК', url: '/info' },
    { label: 'Онлайн-тренажёр НОК', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- ============================================ -->
<!-- HERO — bg-slate-950, product hero            -->
<!-- ============================================ -->
<section class="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <!-- Floating orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    <div class="hero-orb absolute w-[300px] h-[300px] rounded-full bg-violet-600/[0.06] blur-[90px] top-1/3 right-1/4"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[70%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"></div>
  </div>

  <!-- Particles -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-400/40 top-[15%] left-[10%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 top-[25%] left-[75%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-300/40 top-[65%] left-[85%]"></div>
    <div class="hero-particle absolute w-2 h-2 rounded-full bg-violet-400/20 top-[45%] left-[5%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-cyan-300/30 top-[80%] left-[40%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-blue-400/25 top-[10%] left-[55%]"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-24 lg:py-32">
    <div class="max-w-4xl">
      <!-- Breadcrumb-style nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <a routerLink="/info" class="hover:text-slate-300 transition-colors">Информация о НОК</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Онлайн-тренажёр</span>
      </nav>

      <!-- Price badge -->
      <div class="hero-badge inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 text-sm text-blue-300 font-medium mb-8">
        <lucide-icon name="zap" [size]="16" [strokeWidth]="2" class="text-blue-400"></lucide-icon>
        {{ trainerPrice }} за {{ trainerDuration }} доступа
      </div>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Онлайн-</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">тренажёр</span>
        <span class="hero-word inline-block">НОК</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-10">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Готовьтесь к экзамену самостоятельно с базой из
          <strong class="text-white font-semibold">600+ реальных вопросов</strong>.
          Режим тренировки, симуляция экзамена, подробные разборы ответов и аналитика прогресса.
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>

      <!-- CTA -->
      <div class="hero-cta flex flex-col sm:flex-row gap-4">
        <button
          (click)="scrollToSection('pricing')"
          class="inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
          <lucide-icon name="play" [size]="22" [strokeWidth]="2"></lucide-icon>
          Получить доступ
        </button>
        <button
          (click)="scrollToSection('pricing')"
          class="inline-flex items-center justify-center gap-2.5 text-white px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
          <lucide-icon name="tag" [size]="20" [strokeWidth]="2"></lucide-icon>
          Подробнее о тарифе
        </button>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- HOW IT WORKS — bg-white                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="how-it-works">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div class="max-w-3xl">
        <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
          <lucide-icon name="list-checks" [size]="16" [strokeWidth]="2"></lucide-icon>
          Как это работает
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Три шага к успешной сдаче
        </h2>
        <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
          Простой и эффективный процесс подготовки к экзамену НОК.
          Начните прямо сейчас и отслеживайте свой прогресс.
        </p>
      </div>
      <div class="flex justify-center lg:justify-end mt-8 lg:mt-0">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-[2.5rem] blur-2xl transform group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div class="absolute inset-0 bg-gradient-to-bl from-white/40 to-transparent rounded-3xl opacity-50"></div>
          <img src="/assets/images/online_testing.png" alt="Онлайн-тренажер НОК" class="relative z-10 w-full max-w-sm lg:max-w-[420px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        *ngFor="let step of howItWorksSteps; let i = index; let last = last"
        class="how-card group">
        <div class="flex items-center gap-4 mb-6">
          <div class="step-number w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
               [class.bg-blue-600]="!last"
               [class.bg-emerald-600]="last">
            {{ step.step }}
          </div>
          <div *ngIf="!last" class="hidden md:block flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
        </div>
        <div class="bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
               [ngClass]="step.iconBg">
            <lucide-icon [name]="step.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">{{ step.title }}</h3>
          <p class="text-lg text-slate-600 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- FEATURES — bg-slate-50                       -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="features">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="sparkles" [size]="16" [strokeWidth]="2"></lucide-icon>
        Возможности
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Всё для успешной подготовки
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Тренажёр объединяет реальные экзаменационные вопросы, интеллектуальную аналитику
        и удобный интерфейс --- всё, что нужно для уверенной сдачи экзамена НОК.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        *ngFor="let feature of features"
        class="feature-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="feature.iconBg">
          <lucide-icon [name]="feature.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feature.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- WHAT'S INSIDE — bg-white                     -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="whats-inside">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="database" [size]="16" [strokeWidth]="2"></lucide-icon>
        Что внутри
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        База из 600+ реальных вопросов
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Все вопросы взяты из реальных экзаменов НОК и регулярно обновляются.
        Охватывают все направления квалификации.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <div
        *ngFor="let topic of topics"
        class="topic-card bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center"
               [ngClass]="topic.iconBg">
            <lucide-icon [name]="topic.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900">{{ topic.title }}</h3>
            <p class="text-sm text-slate-500">{{ topic.count }}</p>
          </div>
        </div>
        <ul class="space-y-2">
          <li *ngFor="let item of topic.items" class="flex items-start gap-2 text-base text-slate-600">
            <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-emerald-500 mt-1 flex-shrink-0"></lucide-icon>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        *ngFor="let stat of contentStats"
        class="stat-card bg-slate-50 rounded-2xl p-6 text-center ring-1 ring-slate-200">
        <div class="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
        <p class="text-base text-slate-600">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- PRICING — bg-slate-950 dark                  -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950 overflow-hidden" id="pricing">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="tag" [size]="16" [strokeWidth]="2"></lucide-icon>
        Доступ к тренажёру
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Выберите удобный вариант
      </h2>
      <p class="section-subtitle text-xl text-slate-400 leading-relaxed">
        Попробуйте демо-версию бесплатно или получите полный доступ ко всем возможностям тренажёра.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 max-w-4xl">

      <!-- Demo Access Form -->
      <div class="pricing-card relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-10 lg:p-12 hover:bg-white/[0.07] transition-all duration-500 hover:border-cyan-500/20">
        <div class="absolute -top-4 left-8 bg-cyan-500 text-white text-sm font-semibold px-5 py-1.5 rounded-full">
          Бесплатно
        </div>

        <h3 class="text-2xl font-bold text-white mb-2 mt-2">Демо-версия</h3>
        <p class="text-slate-400 mb-8">Оставьте контакты и получите бесплатный доступ к демо-версии тренажёра с ограниченным набором вопросов.</p>

        <!-- Success message -->
        <div *ngIf="demoFormSuccess()" class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="check" [size]="32" [strokeWidth]="2" class="text-emerald-400"></lucide-icon>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Заявка отправлена!</h4>
          <p class="text-slate-400">Мы свяжемся с вами в ближайшее время и предоставим доступ к демо-версии.</p>
        </div>

        <!-- Error message -->
        <div *ngIf="demoFormError()" class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
          <p class="text-red-400 text-sm">{{ demoFormError() }}</p>
        </div>

        <!-- Form -->
        <form *ngIf="!demoFormSuccess()" (ngSubmit)="submitDemoForm()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5">Имя *</label>
            <input
              type="text"
              [(ngModel)]="demoForm.name"
              name="name"
              required
              placeholder="Иван Иванов"
              class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5">Телефон *</label>
            <input
              type="tel"
              [(ngModel)]="demoForm.phone"
              name="phone"
              required
              placeholder="+7 (999) 123-45-67"
              class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5">Email *</label>
            <input
              type="email"
              [(ngModel)]="demoForm.email"
              name="email"
              required
              placeholder="user&#64;example.com"
              class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200">
          </div>
          <button
            type="submit"
            [disabled]="demoFormSubmitting()"
            class="w-full inline-flex items-center justify-center gap-2.5 bg-cyan-500 text-white px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:bg-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            <lucide-icon [name]="demoFormSubmitting() ? 'loader-2' : 'send'" [size]="20" [strokeWidth]="2"
                         [class.animate-spin]="demoFormSubmitting()"></lucide-icon>
            {{ demoFormSubmitting() ? 'Отправка...' : 'Получить демо-доступ' }}
          </button>
        </form>
      </div>

      <!-- Full Access Card -->
      <div class="pricing-card relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-10 lg:p-12 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/20">
        <div class="absolute -top-4 left-8 bg-blue-500 text-white text-sm font-semibold px-5 py-1.5 rounded-full">
          Полный доступ
        </div>

        <div class="flex items-end gap-2 mb-2 mt-2">
          <span class="text-5xl sm:text-6xl font-extrabold text-white">{{ trainerPrice }}</span>
        </div>
        <p class="text-lg text-slate-400 mb-8">за {{ trainerDuration }} доступа</p>

        <ul class="space-y-3 mb-8">
          <li *ngFor="let item of pricingFeatures" class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <lucide-icon name="check" [size]="14" [strokeWidth]="2.5" class="text-emerald-400"></lucide-icon>
            </div>
            <span class="text-base text-slate-300">{{ item }}</span>
          </li>
        </ul>

        <a
          href="#"
          class="w-full inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
          <lucide-icon name="credit-card" [size]="20" [strokeWidth]="2"></lucide-icon>
          Оплатить и получить доступ
        </a>

        <p class="text-sm text-slate-500 text-center mt-4">Мгновенное подключение после оплаты</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- RESULTS — bg-slate-50                        -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="results">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="trophy" [size]="16" [strokeWidth]="2"></lucide-icon>
        Результаты
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Наши пользователи сдают с первого раза
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Статистика успешных сдач экзамена НОК среди пользователей тренажёра.
      </p>
    </div>

    <div class="grid sm:grid-cols-3 gap-8 mb-16">
      <div
        *ngFor="let result of resultStats"
        class="result-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 text-center">
        <div class="text-5xl sm:text-6xl font-extrabold mb-3" [ngClass]="result.color">{{ result.value }}</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">{{ result.title }}</h3>
        <p class="text-base text-slate-600 leading-relaxed">{{ result.description }}</p>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        *ngFor="let review of reviews"
        class="review-card bg-white rounded-2xl p-8 ring-1 ring-slate-200">
        <div class="flex items-center gap-1 mb-4">
          <lucide-icon *ngFor="let s of [1,2,3,4,5]" name="star" [size]="18" [strokeWidth]="1.5" class="text-amber-400 fill-amber-400"></lucide-icon>
        </div>
        <p class="text-lg text-slate-700 leading-relaxed mb-6 italic">{{ review.text }}</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
            <lucide-icon name="user-check" [size]="18" [strokeWidth]="1.5" class="text-slate-500"></lucide-icon>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ review.name }}</p>
            <p class="text-sm text-slate-500">{{ review.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- FAQ — bg-white                               -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="faq">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="circle-help" [size]="16" [strokeWidth]="2"></lucide-icon>
        Вопросы и ответы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
        Частые вопросы о тренажёре
      </h2>
    </div>

    <div class="max-w-3xl">
      <div class="space-y-4">
        <div
          *ngFor="let item of faqItems; let i = index"
          class="faq-item bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden transition-all duration-300"
          [class.ring-blue-200]="expandedFaq === i">
          <button
            (click)="toggleFaq(i)"
            class="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer">
            <h3 class="text-lg font-semibold text-slate-900">{{ item.question }}</h3>
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center transition-transform duration-300"
                 [class.rotate-180]="expandedFaq === i"
                 [class.bg-blue-100]="expandedFaq === i">
              <lucide-icon name="chevron-down" [size]="18" [strokeWidth]="2"
                           [class.text-blue-600]="expandedFaq === i"
                           [class.text-slate-500]="expandedFaq !== i"></lucide-icon>
            </div>
          </button>
          <div class="overflow-hidden transition-all duration-300"
               [class.max-h-0]="expandedFaq !== i"
               [class.max-h-96]="expandedFaq === i">
            <div class="px-6 sm:px-8 pb-6 sm:pb-8">
              <p class="text-lg text-slate-600 leading-relaxed">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- CTA — Final conversion, bg-white             -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="cta-gradient-card relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Начните подготовку прямо сейчас
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-4">
          600+ вопросов, симуляция экзамена, подробные разборы ответов.
          Получите доступ к тренажёру и сдайте НОК с первого раза.
        </p>
        <p class="text-2xl font-bold text-white mb-10">{{ trainerPrice }} за {{ trainerDuration }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="scrollToSection('pricing')"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="play" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить доступ к тренажёру
          </button>
          <a [href]="'tel:' + phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
        <p class="text-sm text-blue-200/60 mt-6">Ответим в течение 15 минут в рабочее время</p>
      </div>
    </div>
  </div>
</section>

</main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class OnlineTrainerPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private trainerDemoService = inject(TrainerDemoService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  trainerPrice = PRICING['trainer'].price;
  trainerDuration = PRICING['trainer'].duration;

  // Demo form state
  demoForm = { name: '', phone: '', email: '' };
  demoFormSubmitting = signal(false);
  demoFormSuccess = signal(false);
  demoFormError = signal<string | null>(null);

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  howItWorksSteps = [
    {
      step: '01',
      icon: 'compass',
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Выберите направление',
      description: 'Определите свою квалификацию --- НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ или МЧС --- и получите персонализированный набор вопросов для вашего экзамена.'
    },
    {
      step: '02',
      icon: 'target',
      iconBg: 'bg-cyan-50 text-cyan-600',
      title: 'Решайте вопросы',
      description: 'Тренируйтесь в режиме обучения с подсказками или пройдите симуляцию реального экзамена с таймером и ограничением попыток.'
    },
    {
      step: '03',
      icon: 'bar-chart-3',
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Отслеживайте прогресс',
      description: 'Анализируйте статистику по каждой теме, выявляйте слабые места и сосредоточьтесь на вопросах, которые вызывают затруднения.'
    }
  ];

  features = [
    {
      icon: 'file-check',
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Реальные вопросы экзамена',
      description: 'База из 600+ вопросов, собранных из реальных экзаменов НОК. Вопросы регулярно обновляются в соответствии с изменениями в профессиональных стандартах.'
    },
    {
      icon: 'timer',
      iconBg: 'bg-violet-50 text-violet-600',
      title: 'Симуляция экзамена',
      description: 'Полная имитация условий реального экзамена: таймер, ограниченное количество вопросов, случайный порядок --- точно как в ЦОК.'
    },
    {
      icon: 'bar-chart-3',
      iconBg: 'bg-cyan-50 text-cyan-600',
      title: 'Детальная аналитика',
      description: 'Статистика по каждой теме, процент правильных ответов, динамика прогресса и рекомендации по улучшению результатов.'
    },
    {
      icon: 'clock',
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Доступ 24/7',
      description: 'Занимайтесь в любое удобное время. Тренажёр доступен круглосуточно с любого устройства --- компьютера, планшета или телефона.'
    },
    {
      icon: 'headphones',
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'Поддержка экспертов',
      description: 'Если возникнут вопросы по материалу --- наши специалисты помогут разобраться. Поддержка включена в стоимость доступа.'
    },
    {
      icon: 'smartphone',
      iconBg: 'bg-rose-50 text-rose-600',
      title: 'Мобильная версия',
      description: 'Адаптивный интерфейс для всех устройств. Готовьтесь к экзамену в дороге, на обеденном перерыве или дома --- где угодно.'
    }
  ];

  topics = [
    {
      icon: 'building-2',
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'НОК НОСТРОЙ',
      count: '200+ вопросов',
      items: [
        'Организация строительства',
        'Техника безопасности',
        'Проектная документация',
        'Градостроительный кодекс'
      ]
    },
    {
      icon: 'ruler',
      iconBg: 'bg-cyan-50 text-cyan-600',
      title: 'НОК НОПРИЗ',
      count: '180+ вопросов',
      items: [
        'Проектирование зданий',
        'Инженерные изыскания',
        'Архитектурные решения',
        'Нормативная база'
      ]
    },
    {
      icon: 'flame',
      iconBg: 'bg-orange-50 text-orange-600',
      title: 'НОК ОПБ',
      count: '120+ вопросов',
      items: [
        'Пожарная безопасность',
        'Системы оповещения',
        'Эвакуационные планы',
        'Огнестойкость конструкций'
      ]
    },
    {
      icon: 'house',
      iconBg: 'bg-teal-50 text-teal-600',
      title: 'НОК ЖКХ',
      count: '60+ вопросов',
      items: [
        'Управление МКД',
        'Жилищное законодательство',
        'Эксплуатация зданий',
        'Коммунальные услуги'
      ]
    },
    {
      icon: 'siren',
      iconBg: 'bg-red-50 text-red-600',
      title: 'НОК МЧС',
      count: '40+ вопросов',
      items: [
        'Гражданская оборона',
        'Аварийно-спасательные работы',
        'Защита населения',
        'Предупреждение ЧС'
      ]
    },
    {
      icon: 'layers',
      iconBg: 'bg-violet-50 text-violet-600',
      title: 'Общие вопросы',
      count: 'Все направления',
      items: [
        'Трудовое законодательство',
        'Охрана труда',
        'Профессиональные стандарты',
        'Федеральный закон 238-ФЗ'
      ]
    }
  ];

  contentStats = [
    { value: '600+', label: 'Вопросов в базе' },
    { value: '6', label: 'Направлений НОК' },
    { value: '50+', label: 'Тематических разделов' },
    { value: '2x в мес.', label: 'Обновление базы' }
  ];

  pricingFeatures = [
    '600+ реальных экзаменационных вопросов',
    'Режим тренировки с подробными разборами',
    'Симуляция экзамена с таймером',
    'Аналитика прогресса по каждой теме',
    'Все направления: НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ, МЧС',
    'Мобильный доступ с любого устройства',
    'Поддержка экспертов',
    'Обновления базы вопросов'
  ];

  resultStats = [
    {
      value: '94%',
      color: 'text-emerald-600',
      title: 'Успешная сдача',
      description: 'Пользователей тренажёра сдают экзамен НОК с первой попытки'
    },
    {
      value: '2 нед.',
      color: 'text-blue-600',
      title: 'Средний срок подготовки',
      description: 'Достаточно для уверенной сдачи при ежедневных занятиях по 30--60 минут'
    },
    {
      value: '1 200+',
      color: 'text-violet-600',
      title: 'Пользователей',
      description: 'Специалистов уже подготовились к экзамену с помощью нашего тренажёра'
    }
  ];

  reviews = [
    {
      text: 'Готовился к НОК НОСТРОЙ 10 дней. Вопросы в тренажёре практически совпали с реальным экзаменом. Сдал на 46 баллов из 50.',
      name: 'Алексей К.',
      role: 'Инженер-строитель, Москва'
    },
    {
      text: 'Удобно, что можно заниматься с телефона. Занимался по дороге на работу. Симуляция экзамена помогла справиться со стрессом на реальном тестировании.',
      name: 'Дмитрий В.',
      role: 'Проектировщик, Санкт-Петербург'
    },
    {
      text: 'Особенно полезны подробные разборы ответов. Не просто правильный вариант, а объяснение со ссылками на нормативы. Рекомендую коллегам.',
      name: 'Ирина М.',
      role: 'Специалист ОПБ, Екатеринбург'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Как получить доступ к тренажёру?',
      answer: 'После оплаты вы получаете логин и пароль на указанный email. Доступ активируется мгновенно --- вы можете начать заниматься сразу после оплаты. Вход через личный кабинет на нашем сайте.'
    },
    {
      question: 'На какой срок предоставляется доступ?',
      answer: 'Стандартный доступ --- 30 дней с момента активации. Этого времени достаточно для полноценной подготовки к экзамену НОК. При необходимости доступ можно продлить.'
    },
    {
      question: 'Совпадают ли вопросы с реальным экзаменом?',
      answer: 'Да, база вопросов составлена на основе реальных экзаменационных материалов НОК. Вопросы охватывают все темы профессиональных стандартов и регулярно обновляются. По отзывам пользователей, совпадение с реальным экзаменом составляет 85--90%.'
    },
    {
      question: 'Можно ли заниматься с мобильного устройства?',
      answer: 'Да, тренажёр полностью адаптирован для мобильных устройств. Вы можете заниматься со смартфона или планшета в любом месте, где есть интернет. Интерфейс оптимизирован для удобной работы на экранах любого размера.'
    },
    {
      question: 'Есть ли гарантия сдачи экзамена?',
      answer: 'Мы не можем гарантировать 100% сдачу, так как результат зависит от вашей подготовки и усердия. Однако 94% наших пользователей успешно сдают экзамен с первой попытки. Если вы пройдёте всю программу тренажёра и не сдадите --- мы предоставим бесплатное продление доступа.'
    },
    {
      question: 'Какие направления НОК доступны в тренажёре?',
      answer: 'Тренажёр включает вопросы по всем основным направлениям: НОК НОСТРОЙ (строительство), НОК НОПРИЗ (проектирование и изыскания), НОК ОПБ (пожарная безопасность), НОК ЖКХ (жилищно-коммунальное хозяйство) и НОК МЧС (гражданская оборона и чрезвычайные ситуации).'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setOnlineTrainerPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Онлайн-тренажёр НОК', url: `${this.seoService.getBaseUrl()}/info/online-trainer` }
    ]);
  }

  submitDemoForm(): void {
    if (!this.demoForm.name.trim() || !this.demoForm.phone.trim() || !this.demoForm.email.trim()) {
      this.demoFormError.set('Пожалуйста, заполните все поля.');
      return;
    }

    this.demoFormSubmitting.set(true);
    this.demoFormError.set(null);

    this.trainerDemoService.submitDemoRequest(this.demoForm).subscribe({
      next: () => {
        this.demoFormSubmitting.set(false);
        this.demoFormSuccess.set(true);
      },
      error: () => {
        this.demoFormSubmitting.set(false);
        this.demoFormError.set('Произошла ошибка при отправке. Попробуйте ещё раз.');
      },
    });
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Floating orbs
    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    // Grid lines
    masterTl.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' },
      0
    );
    masterTl.fromTo('.hero-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' },
      0.3
    );

    // Particles
    gsap.to('.hero-particle', {
      y: 'random(-60, 60)',
      x: 'random(-40, 40)',
      opacity: 'random(0.2, 0.6)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 3, from: 'random' }
    });

    // Breadcrumb nav
    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      0.3
    );

    // Badge
    masterTl.fromTo('.hero-badge',
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      0.4
    );

    // Title words stagger
    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' },
      0.5
    );

    // Subtitle
    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );

    // Underline
    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' },
      1.4
    );

    // CTA
    masterTl.fromTo('.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      1.6
    );
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // HOW IT WORKS
    const howTl = await this.animationService.sectionTimeline('#how-it-works');
    if (howTl) {
      howTl.fromTo('#how-it-works .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      howTl.fromTo('#how-it-works h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      howTl.fromTo('#how-it-works .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      howTl.fromTo('.how-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
    }

    // FEATURES
    const featuresTl = await this.animationService.sectionTimeline('#features');
    if (featuresTl) {
      featuresTl.fromTo('#features .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      featuresTl.fromTo('#features h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      featuresTl.fromTo('#features .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      featuresTl.fromTo('.feature-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // WHAT'S INSIDE
    const insideTl = await this.animationService.sectionTimeline('#whats-inside');
    if (insideTl) {
      insideTl.fromTo('#whats-inside .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      insideTl.fromTo('#whats-inside h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      insideTl.fromTo('#whats-inside .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      insideTl.fromTo('.topic-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
      insideTl.fromTo('.stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.8);
    }

    // PRICING (dark section)
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      const pricingTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: pricingSection, start: 'top 92%', once: true }
      });
      pricingTl.fromTo('#pricing .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      pricingTl.fromTo('#pricing h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      pricingTl.fromTo('#pricing .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      pricingTl.fromTo('.pricing-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)' }, 0.3);
    }

    // RESULTS
    const resultsTl = await this.animationService.sectionTimeline('#results');
    if (resultsTl) {
      resultsTl.fromTo('#results .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      resultsTl.fromTo('#results h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      resultsTl.fromTo('#results .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      resultsTl.fromTo('.result-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
      resultsTl.fromTo('.review-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.7);
    }

    // FAQ
    const faqTl = await this.animationService.sectionTimeline('#faq');
    if (faqTl) {
      faqTl.fromTo('#faq .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      faqTl.fromTo('#faq h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      faqTl.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.3);
    }

    // CTA
    const ctaCard = document.querySelector('.cta-gradient-card');
    if (ctaCard) {
      const ctaSection = ctaCard.closest('section');
      if (ctaSection) {
        gsap.fromTo(ctaCard,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.1)',
            scrollTrigger: { trigger: ctaSection, start: 'top 92%', once: true }
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
