import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-qualifications-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Квалификации', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- ============================================ -->
<!-- HERO -- bg-slate-950                         -->
<!-- ============================================ -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
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
        <span class="text-blue-400">Квалификации</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Квалификации</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">НОК</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-8">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Квалификационные уровни определяются профессиональными стандартами и отражают сложность трудовых функций,
          уровень ответственности и требуемые компетенции специалиста.
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- WHAT ARE QUALIFICATIONS -- bg-white          -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="what-are">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="book-open" [size]="16" [strokeWidth]="2"></lucide-icon>
        Основы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Что такое профессиональные квалификации
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Профессиональная квалификация --- это подтверждённый уровень знаний, навыков и компетенций специалиста,
        определённый в соответствии с профессиональными стандартами Российской Федерации.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
          <lucide-icon name="file-text" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Профессиональные стандарты</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Каждая квалификация привязана к конкретному профессиональному стандарту, который описывает трудовые функции,
          необходимые знания и умения. Стандарты утверждаются Минтрудом России и обязательны для применения.
        </p>
      </div>

      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
          <lucide-icon name="layers" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Уровни квалификации</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Национальная рамка квалификаций включает уровни с 1 по 8. В строительной отрасли и смежных сферах
          наиболее востребованы уровни с 4-го по 8-й, охватывающие рабочих, специалистов и руководителей.
        </p>
      </div>

      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-8">
          <lucide-icon name="badge-check" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Подтверждение через НОК</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Независимая оценка квалификации --- единственный законный способ подтвердить соответствие специалиста
          требованиям профстандарта. Экзамен проводится в аккредитованных ЦОК, свидетельство действует 5 лет.
        </p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- BY LEVEL -- bg-slate-50                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="by-level">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="bar-chart-3" [size]="16" [strokeWidth]="2"></lucide-icon>
        По уровням
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Квалификационные уровни 4--8
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        В строительной отрасли, проектировании и пожарной безопасности применяются уровни
        квалификации с 4-го по 8-й. Каждый уровень отражает сложность выполняемых функций и степень ответственности.
      </p>
    </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        *ngFor="let level of qualificationLevels"
        class="level-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
               [ngClass]="{
                 'bg-slate-100 text-slate-700': level.level === 4,
                 'bg-blue-50 text-blue-600': level.level === 5,
                 'bg-cyan-50 text-cyan-600': level.level === 6,
                 'bg-violet-50 text-violet-600': level.level === 7,
                 'bg-amber-50 text-amber-700': level.level === 8
               }">
            {{ level.level }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-900">{{ level.title }}</h3>
            <span class="text-sm font-medium text-slate-400">Уровень {{ level.level }}</span>
          </div>
        </div>
        <p class="text-lg text-slate-600 leading-relaxed mb-5">{{ level.description }}</p>
        <div class="pt-5 border-t border-slate-100">
          <div class="text-sm font-semibold text-slate-500 mb-2">Примеры должностей:</div>
          <div class="flex flex-wrap gap-2">
            <span
              *ngFor="let example of level.examples"
              class="inline-block text-sm px-3 py-1 rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-200">
              {{ example }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- BY INDUSTRY -- bg-white                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="by-industry">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="building-2" [size]="16" [strokeWidth]="2"></lucide-icon>
        По отраслям
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Квалификации по направлениям
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Независимая оценка квалификации проводится в рамках конкретных отраслевых советов по профессиональным квалификациям.
        Каждое направление имеет свои профстандарты и особенности экзамена.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div
        *ngFor="let industry of industries"
        class="industry-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-blue-50 text-blue-600': industry.color === 'blue',
               'bg-cyan-50 text-cyan-600': industry.color === 'cyan',
               'bg-orange-50 text-orange-600': industry.color === 'orange',
               'bg-teal-50 text-teal-600': industry.color === 'teal'
             }">
          <lucide-icon [name]="industry.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ industry.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed mb-5">{{ industry.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span
            *ngFor="let tag of industry.tags"
            class="inline-block text-sm px-3 py-1 rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-200">
            {{ tag }}
          </span>
        </div>
        <a [routerLink]="industry.link"
           class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mt-6 hover:text-blue-800 transition-colors">
          Подробнее
          <lucide-icon name="arrow-right" [size]="16" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
        </a>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- HOW TO DETERMINE LEVEL -- bg-slate-950 dark  -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950 overflow-hidden" id="determine-level">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="compass" [size]="16" [strokeWidth]="2"></lucide-icon>
        Определите свой уровень
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Как определить нужную квалификацию
      </h2>
      <p class="section-subtitle text-xl text-slate-400 leading-relaxed">
        Квалификационный уровень зависит от вашей должности, стажа, образования и выполняемых трудовых функций.
        Следуйте этим шагам, чтобы определить подходящий уровень.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        *ngFor="let step of determinationSteps; let last = last"
        class="determine-step bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/20">
        <div class="flex items-center gap-4 mb-6">
          <div class="step-number w-14 h-14 rounded-2xl text-white flex items-center justify-center text-xl font-bold"
               [class.bg-blue-600]="!last"
               [class.bg-emerald-600]="last">
            <ng-container *ngIf="!last">{{ step.step }}</ng-container>
            <lucide-icon *ngIf="last" name="check" [size]="24" [strokeWidth]="2.5"></lucide-icon>
          </div>
        </div>
        <h3 class="text-lg font-bold text-white mb-3" [class.text-emerald-400]="last">{{ step.title }}</h3>
        <p class="text-base text-slate-400 leading-relaxed">{{ step.description }}</p>
      </div>
    </div>

    <div class="mt-16 text-center">
      <button
        (click)="openConsultationPopup()"
        class="inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5">
        <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
        Помочь определить квалификацию
      </button>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- FAQ -- bg-slate-50                           -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="faq">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="circle-help" [size]="16" [strokeWidth]="2"></lucide-icon>
        Вопросы и ответы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
        Частые вопросы о квалификациях
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
<!-- CTA -- bg-white                              -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="cta-gradient-card relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Нужна помощь с квалификацией?
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
          Бесплатно определим нужный уровень квалификации, подберём профстандарт и подготовим
          вас к успешной сдаче экзамена НОК.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a [href]="phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-10 py-5 text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
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
    // FAQ expand/collapse transition
    .max-h-0 {
      max-height: 0;
    }

    .max-h-96 {
      max-height: 24rem;
    }

    // Focus styles
    button:focus-visible,
    a:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }

    // Reduced motion
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    // Print styles
    @media print {
      button {
        display: none !important;
      }

      section {
        break-inside: avoid;
      }
    }
  `]
})
export class QualificationsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  qualificationLevels = [
    {
      level: 4,
      title: 'Квалифицированные рабочие',
      description: 'Самостоятельное выполнение работ, требующих профессиональных знаний и навыков. Ответственность за результат собственной деятельности и работу группы.',
      examples: ['Каменщик', 'Монтажник', 'Сварщик', 'Электрогазосварщик']
    },
    {
      level: 5,
      title: 'Высококвалифицированные рабочие',
      description: 'Выполнение сложных работ, руководство бригадами, контроль качества. Требуется среднее профессиональное образование и стаж от 3 лет.',
      examples: ['Бригадир', 'Мастер участка', 'Старший монтажник', 'Техник']
    },
    {
      level: 6,
      title: 'Специалисты и ИТР',
      description: 'Инженерно-технические работники, ответственные за организацию и контроль строительных процессов. Высшее образование и стаж от 3--5 лет.',
      examples: ['Инженер-строитель', 'Проектировщик', 'Инженер ОПБ', 'Изыскатель']
    },
    {
      level: 7,
      title: 'Руководители проектов',
      description: 'Главные инженеры проектов, главные архитекторы, руководители направлений. Определяют стратегию, несут персональную ответственность. Стаж от 5--7 лет.',
      examples: ['ГИП', 'ГАП', 'Начальник отдела', 'Руководитель проекта']
    },
    {
      level: 8,
      title: 'Высшее руководство',
      description: 'Топ-менеджмент строительных и проектных организаций. Стратегическое управление, принятие решений на уровне компании. Стаж от 10 лет.',
      examples: ['Генеральный директор', 'Технический директор', 'Главный инженер компании']
    }
  ];

  industries = [
    {
      icon: 'building-2',
      title: 'НОСТРОЙ --- строительство',
      description: 'Квалификации для специалистов строительных организаций, членов СРО. Обязательны для включения в Национальный реестр специалистов (НРС) НОСТРОЙ.',
      tags: ['Уровни 4--7', 'НРС', 'СРО'],
      color: 'blue',
      link: '/services/nok-nostroy'
    },
    {
      icon: 'search',
      title: 'НОПРИЗ --- проектирование и изыскания',
      description: 'Квалификации для проектировщиков, архитекторов и изыскателей. Необходимы для включения в НРС НОПРИЗ и занятия руководящих должностей.',
      tags: ['Уровни 6--7', 'НРС', 'Проектирование'],
      color: 'cyan',
      link: '/services/nok-nopriz'
    },
    {
      icon: 'flame',
      title: 'ОПБ --- пожарная безопасность',
      description: 'Квалификации для инженеров по обеспечению пожарной безопасности объектов. Обязательны для специалистов, ответственных за противопожарную защиту.',
      tags: ['Уровни 5--7', 'Пожарная безопасность'],
      color: 'orange',
      link: '/services/nok-opb'
    },
    {
      icon: 'house',
      title: 'ЖКХ --- жилищное хозяйство',
      description: 'Квалификации для управляющих многоквартирными домами, специалистов обслуживающих организаций и работников коммунального хозяйства.',
      tags: ['Уровни 4--6', 'Управление МКД'],
      color: 'teal',
      link: '/services/nok-housing'
    }
  ];

  determinationSteps = [
    {
      step: '01',
      title: 'Определите профстандарт',
      description: 'Найдите профессиональный стандарт, соответствующий вашей должности и трудовым функциям. Реестр профстандартов доступен на сайте Минтруда.'
    },
    {
      step: '02',
      title: 'Оцените стаж и образование',
      description: 'Сопоставьте свой стаж работы и уровень образования с требованиями профстандарта. Каждый уровень предъявляет свои минимальные требования.'
    },
    {
      step: '03',
      title: 'Сверьте трудовые функции',
      description: 'Определите, какие трудовые функции вы выполняете. Уровень квалификации определяется сложностью и ответственностью выполняемых функций.'
    },
    {
      step: '04',
      title: 'Получите консультацию',
      description: 'Обратитесь к нам для точного определения квалификации. Мы проверим документы, подберём ЦОК и подготовим вас к экзамену.'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Чем отличаются уровни квалификации друг от друга?',
      answer: 'Уровни отличаются сложностью выполняемых трудовых функций, степенью ответственности, требованиями к образованию и стажу. Уровни 4--5 предназначены для квалифицированных рабочих, уровень 6 --- для инженеров и специалистов, 7 --- для руководителей проектов (ГИП, ГАП), 8 --- для топ-менеджмента.'
    },
    {
      question: 'Можно ли сдать экзамен на уровень выше текущей должности?',
      answer: 'Нет, квалификационный уровень определяется профессиональным стандартом и должен соответствовать вашим реальным трудовым функциям, образованию и стажу. Экзамен сдаётся на тот уровень, требованиям которого вы фактически соответствуете.'
    },
    {
      question: 'Одинаковый ли экзамен для разных отраслей?',
      answer: 'Нет, экзаменационные задания разрабатываются для каждого профстандарта отдельно. Экзамен для НОСТРОЙ отличается от экзамена для НОПРИЗ или ОПБ как по содержанию вопросов, так и по формату практической части.'
    },
    {
      question: 'Что даёт более высокий уровень квалификации?',
      answer: 'Более высокий уровень позволяет занимать руководящие должности, нести ответственность за организацию работ и быть включённым в НРС. Например, для должности ГИП необходим 7-й уровень квалификации, без которого специалист не может быть назначен на эту позицию.'
    },
    {
      question: 'Нужно ли пересдавать экзамен при смене работодателя?',
      answer: 'Нет, свидетельство о квалификации действует 5 лет независимо от смены работодателя. Оно привязано к специалисту, а не к организации. Данные хранятся в Федеральном реестре сведений о квалификациях и доступны для проверки.'
    },
    {
      question: 'Как определить нужный уровень для НРС НОСТРОЙ?',
      answer: 'Для включения в НРС НОСТРОЙ необходим уровень 6 или 7 в зависимости от должности. Уровень 6 --- для специалистов, организующих строительство. Уровень 7 --- для главных инженеров проекта. Точный уровень определяется профстандартом и вашими трудовыми функциями.'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setQualificationsPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Квалификации НОК', url: `${this.seoService.getBaseUrl()}/qualifications` }
    ]);
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  scrollToSection(sectionId: string): void {
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
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // WHAT ARE QUALIFICATIONS
    const aboutTl = await this.animationService.sectionTimeline('#what-are');
    if (aboutTl) {
      aboutTl.fromTo('#what-are .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      aboutTl.fromTo('#what-are h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      aboutTl.fromTo('#what-are .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      aboutTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // BY LEVEL
    const levelTl = await this.animationService.sectionTimeline('#by-level');
    if (levelTl) {
      levelTl.fromTo('#by-level .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      levelTl.fromTo('#by-level h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      levelTl.fromTo('#by-level .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      levelTl.fromTo('.level-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // BY INDUSTRY
    const industryTl = await this.animationService.sectionTimeline('#by-industry');
    if (industryTl) {
      industryTl.fromTo('#by-industry .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      industryTl.fromTo('#by-industry h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      industryTl.fromTo('#by-industry .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      industryTl.fromTo('.industry-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // DETERMINE LEVEL (dark section)
    const determineSection = document.querySelector('#determine-level');
    if (determineSection) {
      const determineTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: determineSection, start: 'top 92%', once: true }
      });
      determineTl.fromTo('#determine-level .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      determineTl.fromTo('#determine-level h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      determineTl.fromTo('#determine-level .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      determineTl.fromTo('.determine-step',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
      determineTl.fromTo('.determine-step .step-number',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }, 0.35);
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
