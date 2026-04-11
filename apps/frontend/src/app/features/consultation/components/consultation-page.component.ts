import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { InlineContactFormComponent } from '../../../shared/components/inline-contact-form/inline-contact-form.component';
import { FeedbackSubject } from '../../feedback-popup/models/feedback.interface';

@Component({
  selector: 'app-consultation-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule, BreadcrumbsComponent, InlineContactFormComponent],
  template: `
<main>

  <!-- ============================================ -->
  <!-- HERO — Dark immersive                        -->
  <!-- ============================================ -->
  <section class="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-950" id="consult-hero">
    <!-- Background orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="consult-hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
      <div class="consult-hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    </div>

    <!-- Grid lines -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="consult-grid-line absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
      <div class="consult-grid-line absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
      <div class="consult-grid-line absolute top-0 left-[75%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    </div>

    <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-32 lg:py-40">
      <div class="max-w-4xl">
        <!-- Breadcrumbs -->
        <div class="mb-10">
          <app-breadcrumbs
            [breadcrumbs]="[
              { label: 'Главная', url: '/' },
              { label: 'Консультация', active: true }
            ]">
          </app-breadcrumbs>
        </div>

        <!-- Badge -->
        <div class="consult-hero-badge inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-full mb-8 border border-emerald-500/20">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span class="text-sm font-semibold tracking-wide uppercase">Бесплатно и без обязательств</span>
        </div>

        <!-- Heading -->
        <h1 class="consult-hero-title text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
          Бесплатная консультация
          <br class="hidden md:block" />
          <span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">по НОК</span>
        </h1>

        <!-- Subtitle -->
        <div class="consult-hero-subtitle mb-12 max-w-2xl">
          <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
            Проверим ваши документы, определим квалификационный уровень, подберём ЦОК
            и составим персональный план подготовки к экзамену.
          </p>
        </div>

        <!-- CTAs -->
        <div class="consult-hero-cta flex flex-col sm:flex-row gap-4 mb-10">
          <button
            (click)="openConsultationPopup()"
            class="group relative inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/25 hover:-translate-y-0.5 overflow-hidden">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2" class="relative z-10"></lucide-icon>
            <span class="relative z-10">Получить консультацию</span>
            <lucide-icon name="arrow-right" [size]="18" [strokeWidth]="2" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
          </button>
          <a [href]="'tel:' + phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-slate-300 hover:text-white px-8 py-5 text-lg font-medium rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:bg-white/5">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>

        <!-- Social proof -->
        <div class="consult-hero-stats flex items-center gap-6 text-sm text-slate-500">
          <div class="flex items-center gap-2">
            <lucide-icon name="clock" [size]="16" [strokeWidth]="2" class="text-blue-400"></lucide-icon>
            <span>Ответ за 15 минут</span>
          </div>
          <div class="w-px h-4 bg-slate-700"></div>
          <div class="flex items-center gap-2">
            <lucide-icon name="shield" [size]="16" [strokeWidth]="2" class="text-emerald-500"></lucide-icon>
            <span>Результат за 1 рабочий день</span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ============================================ -->
  <!-- WHAT YOU GET — 4 cards                       -->
  <!-- ============================================ -->
  <section class="py-24 lg:py-32 bg-white" id="consult-benefits">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

      <!-- Section header -->
      <div class="max-w-3xl mb-20">
        <div class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
          <lucide-icon name="zap" [size]="16" [strokeWidth]="2"></lucide-icon>
          Что вы получите
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Полный аудит вашей ситуации
        </h2>
        <p class="text-xl text-slate-500 leading-relaxed">
          На консультации эксперт проанализирует ваш опыт, документы и подберёт оптимальный путь к свидетельству НОК.
        </p>
      </div>

      <!-- Cards grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 consult-benefits-grid">
        <!-- Card 1: Проверка документов -->
        <div class="consult-benefit-card bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-blue-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <lucide-icon name="file-check" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Проверка документов</h3>
          <p class="text-base text-slate-500 leading-relaxed">
            Аудит диплома, трудовой книжки и стажа на соответствие требованиям профессиональных стандартов
          </p>
        </div>

        <!-- Card 2: Квалификационный уровень -->
        <div class="consult-benefit-card bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-cyan-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
            <lucide-icon name="bar-chart-3" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Квалификационный уровень</h3>
          <p class="text-base text-slate-500 leading-relaxed">
            Определим подходящий уровень квалификации на основе вашего образования и профессионального опыта
          </p>
        </div>

        <!-- Card 3: Подбор ЦОК -->
        <div class="consult-benefit-card bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-violet-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6">
            <lucide-icon name="compass" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Подбор ЦОК</h3>
          <p class="text-base text-slate-500 leading-relaxed">
            Подберём аккредитованный Центр оценки квалификации с удобным расположением и ближайшими датами экзамена
          </p>
        </div>

        <!-- Card 4: План подготовки -->
        <div class="consult-benefit-card bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-emerald-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <lucide-icon name="list-checks" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">План подготовки</h3>
          <p class="text-base text-slate-500 leading-relaxed">
            Персональный план с чёткими сроками, этапами и рекомендациями для успешной сдачи экзамена
          </p>
        </div>
      </div>
    </div>
  </section>


  <!-- ============================================ -->
  <!-- HOW IT WORKS — 3 steps                      -->
  <!-- ============================================ -->
  <section class="py-24 lg:py-32 bg-slate-50" id="consult-steps">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

      <!-- Section header -->
      <div class="max-w-3xl mb-20">
        <div class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
          <lucide-icon name="list-checks" [size]="16" [strokeWidth]="2"></lucide-icon>
          Как это работает
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          3 простых шага
        </h2>
        <p class="text-xl text-slate-500 leading-relaxed">
          Оставьте заявку, и мы сделаем всё остальное. Весь процесс занимает не более 1 рабочего дня.
        </p>
      </div>

      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-8 consult-steps-grid">
        <div class="consult-step group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">01</div>
            <div class="hidden md:block flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Оставьте заявку</h3>
          <p class="text-lg text-slate-500 leading-relaxed">
            Заполните форму или позвоните нам. Укажите ваше направление и опыт работы — мы свяжемся в течение 15 минут.
          </p>
        </div>

        <div class="consult-step group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">02</div>
            <div class="hidden md:block flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Консультация с экспертом</h3>
          <p class="text-lg text-slate-500 leading-relaxed">
            Эксперт проверит ваши документы, определит квалификационный уровень и подберёт оптимальный ЦОК для сдачи.
          </p>
        </div>

        <div class="consult-step group">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <lucide-icon name="check" [size]="28" [strokeWidth]="2.5"></lucide-icon>
            </div>
          </div>
          <h3 class="text-xl font-bold text-emerald-600 mb-3">Персональный план</h3>
          <p class="text-lg text-slate-500 leading-relaxed">
            Получите готовый план подготовки с конкретными сроками, списком документов и рекомендациями по тренажёру.
          </p>
        </div>
      </div>
    </div>
  </section>


  <!-- ============================================ -->
  <!-- WHO WE HELP — Direction cards                -->
  <!-- ============================================ -->
  <section class="py-24 lg:py-32 bg-white" id="consult-directions">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

      <!-- Section header -->
      <div class="max-w-3xl mb-20">
        <div class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
          <lucide-icon name="users" [size]="16" [strokeWidth]="2"></lucide-icon>
          Кому помогаем
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Консультации по всем направлениям
        </h2>
        <p class="text-xl text-slate-500 leading-relaxed">
          Работаем со специалистами строительной отрасли, проектирования, пожарной безопасности, ЖКХ и аварийно-спасательных служб.
        </p>
      </div>

      <!-- Direction cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 consult-directions-grid">
        <a routerLink="/services/nok-nostroy"
           class="consult-direction-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-blue-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
            <lucide-icon name="building-2" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">НОСТРОЙ</h3>
          <p class="text-sm text-slate-500 mb-4">Строительство, капитальный ремонт, реконструкция</p>
          <div class="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
            <span>Подробнее</span>
            <lucide-icon name="arrow-right" [size]="14" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
          </div>
        </a>

        <a routerLink="/services/nok-nopriz"
           class="consult-direction-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-cyan-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
            <lucide-icon name="search" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">НОПРИЗ</h3>
          <p class="text-sm text-slate-500 mb-4">Проектирование, инженерные изыскания</p>
          <div class="flex items-center gap-1.5 text-sm font-semibold text-cyan-600">
            <span>Подробнее</span>
            <lucide-icon name="arrow-right" [size]="14" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
          </div>
        </a>

        <a routerLink="/services/nok-opb"
           class="consult-direction-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-red-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
            <lucide-icon name="siren" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">МЧС</h3>
          <p class="text-sm text-slate-500 mb-4">Пожарная безопасность и аварийно-спасательные работы</p>
          <div class="flex items-center gap-1.5 text-sm font-semibold text-red-600">
            <span>Подробнее</span>
            <lucide-icon name="arrow-right" [size]="14" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
          </div>
        </a>

        <a routerLink="/services/nok-housing"
           class="consult-direction-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:ring-teal-200 transition-all duration-500 hover:shadow-xl">
          <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
            <lucide-icon name="house" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">ЖКХ</h3>
          <p class="text-sm text-slate-500 mb-4">Жилищное хозяйство, управление МКД</p>
          <div class="flex items-center gap-1.5 text-sm font-semibold text-teal-600">
            <span>Подробнее</span>
            <lucide-icon name="arrow-right" [size]="14" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
          </div>
        </a>
      </div>
    </div>
  </section>


  <!-- ============================================ -->
  <!-- INLINE FORM — Conversion                     -->
  <!-- ============================================ -->
  <app-inline-contact-form
    title="Запишитесь на консультацию прямо сейчас"
    subtitle="Оставьте заявку, и наш эксперт свяжется с вами в течение 15 минут. Консультация бесплатна."
    [subject]="FeedbackSubject.CONSULTATION"
    [points]="[
      'Проверим ваши документы на соответствие требованиям НОК',
      'Определим квалификационный уровень',
      'Подберём ближайший ЦОК с удобным расписанием',
      'Составим персональный план подготовки к экзамену'
    ]">
  </app-inline-contact-form>


  <!-- ============================================ -->
  <!-- CTA — Final conversion block                 -->
  <!-- ============================================ -->
  <section class="py-24 lg:py-32 bg-white" id="consult-cta">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div class="consult-cta-card relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
        <!-- Decorative -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

        <div class="relative z-10 text-center max-w-3xl mx-auto">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Начните с бесплатной консультации
          </h2>
          <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
            Проверим ваши документы, определим квалификацию и расскажем,
            сколько времени займёт подготовка и сдача НОК
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              (click)="openConsultationPopup()"
              class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
              <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
              Получить консультацию
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
  styles: []
})
export class ConsultationPageComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly FeedbackSubject = FeedbackSubject;

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

  ngOnInit(): void {
    this.seoService.setConsultationPageSeo();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Floating orbs
    gsap.to('.consult-hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    // Grid lines
    tl.fromTo('.consult-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' },
      0
    );

    // Badge
    tl.fromTo('.consult-hero-badge',
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
      0.3
    );

    // Title
    tl.fromTo('.consult-hero-title',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.5
    );

    // Subtitle
    tl.fromTo('.consult-hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.8
    );

    // CTAs
    tl.fromTo('.consult-hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      1.1
    );

    // Social proof
    tl.fromTo('.consult-hero-stats',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      1.4
    );
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // ===== BENEFITS SECTION =====
    const benefitsTl = await this.animationService.sectionTimeline('#consult-benefits');
    if (benefitsTl) {
      benefitsTl.fromTo('#consult-benefits .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      benefitsTl.fromTo('#consult-benefits h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      benefitsTl.fromTo('#consult-benefits h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      benefitsTl.fromTo('.consult-benefit-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // ===== STEPS SECTION =====
    const stepsTl = await this.animationService.sectionTimeline('#consult-steps');
    if (stepsTl) {
      stepsTl.fromTo('#consult-steps .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      stepsTl.fromTo('#consult-steps h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      stepsTl.fromTo('#consult-steps h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      stepsTl.fromTo('.consult-step',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
      stepsTl.fromTo('.consult-step .w-16',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, 0.35);
    }

    // ===== DIRECTIONS SECTION =====
    const dirTl = await this.animationService.sectionTimeline('#consult-directions');
    if (dirTl) {
      dirTl.fromTo('#consult-directions .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      dirTl.fromTo('#consult-directions h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      dirTl.fromTo('#consult-directions h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      dirTl.fromTo('.consult-direction-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }, 0.3);
    }

    // ===== CTA SECTION =====
    const ctaCard = document.querySelector('.consult-cta-card');
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

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }
}
