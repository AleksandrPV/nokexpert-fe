import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../shared/components/icon/icon.component';
import { AnimationService } from '../../shared/services/animation.service';
import { SeoService } from '../../shared/services/seo.service';
import { FeedbackPopupService } from '../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../shared/services/organization.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'О компании', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- HERO -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    <div class="hero-orb absolute w-[300px] h-[300px] rounded-full bg-violet-600/[0.06] blur-[90px] top-1/3 right-1/4"></div>
  </div>

  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[70%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"></div>
  </div>

  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-400/40 top-[15%] left-[10%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 top-[25%] left-[75%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-300/40 top-[65%] left-[85%]"></div>
    <div class="hero-particle absolute w-2 h-2 rounded-full bg-violet-400/20 top-[45%] left-[5%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-cyan-300/30 top-[80%] left-[40%]"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-24 lg:py-32">
    <div class="max-w-4xl mx-auto">
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10" aria-label="Навигация">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-slate-400">О компании</span>
      </nav>

      <div class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-8">
        <lucide-icon name="building-2" [size]="14" [strokeWidth]="2"></lucide-icon>
        <span>С 2018 года на рынке</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
        <span class="hero-word inline-block">НОК</span>
        <span class="hero-word inline-block text-blue-400">Эксперт</span>
      </h1>

      <p class="hero-subtitle text-xl text-slate-400 leading-relaxed max-w-2xl">
        Лидер в подготовке специалистов к независимой оценке квалификации в строительстве, пожарной безопасности и ЖКХ. Более 1500 специалистов прошли НОК при нашей поддержке.
      </p>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="py-16 sm:py-20 bg-white" id="stats-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
      <div *ngFor="let stat of stats" class="stat-card text-center">
        <div class="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-2">{{ stat.value }}</div>
        <div class="text-sm sm:text-base text-slate-600 font-medium">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</section>

<!-- MISSION -->
<section class="py-16 sm:py-20 bg-slate-50" id="mission-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5 border border-blue-100 section-label">
        <lucide-icon name="target" [size]="13" [strokeWidth]="2.5"></lucide-icon>
        Наша миссия
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Зачем мы работаем</h2>
      <p class="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Мы делаем так, чтобы прохождение НОК перестало быть стрессом. Наша задача — сопроводить каждого специалиста от первого вопроса до получения свидетельства о квалификации.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div *ngFor="let value of values" class="value-card bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
             [class]="'bg-' + value.color + '-50 border border-' + value.color + '-100'">
          <lucide-icon [name]="value.icon" [size]="22" [strokeWidth]="1.5"
                       [class]="'text-' + value.color + '-600'"></lucide-icon>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-3">{{ value.title }}</h3>
        <p class="text-slate-600 leading-relaxed text-sm">{{ value.description }}</p>
      </div>
    </div>
  </div>
</section>

<!-- ADVANTAGES -->
<section class="py-16 sm:py-20 bg-white" id="advantages-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5 border border-blue-100 section-label">
        <lucide-icon name="star" [size]="13" [strokeWidth]="2.5"></lucide-icon>
        Почему мы
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Наши преимущества</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div *ngFor="let adv of advantages" class="advantage-card flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
        <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <lucide-icon [name]="adv.icon" [size]="18" [strokeWidth]="2" class="text-white"></lucide-icon>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 mb-1">{{ adv.title }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ adv.description }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES WE COVER -->
<section class="py-16 sm:py-20 bg-slate-50" id="services-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5 border border-blue-100 section-label">
        <lucide-icon name="layers" [size]="13" [strokeWidth]="2.5"></lucide-icon>
        Направления
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Виды НОК, которые мы сопровождаем</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a *ngFor="let service of services"
         [routerLink]="service.link"
         class="service-card group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
             [class]="'bg-' + service.color + '-50 border border-' + service.color + '-100 group-hover:bg-' + service.color + '-100 transition-colors'">
          <lucide-icon [name]="service.icon" [size]="22" [strokeWidth]="1.5"
                       [class]="'text-' + service.color + '-600'"></lucide-icon>
        </div>
        <h3 class="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{{ service.name }}</h3>
        <p class="text-sm text-slate-500 leading-relaxed">{{ service.description }}</p>
      </a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 sm:py-20 bg-white">
  <div class="max-w-5xl mx-auto px-6">
    <div class="cta-gradient-card relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Готовы пройти НОК?
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
          Получите бесплатную консультацию. Определим квалификацию, проверим документы и составим план подготовки.
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
  styles: [`
    :host { display: block; }
  `]
})
export class AboutPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  stats = [
    { value: '99%', label: 'Успешных сдач НОК' },
    { value: '1500+', label: 'Специалистов в НРС' },
    { value: '6', label: 'Лет на рынке' },
    { value: '0', label: 'Скрытых платежей' },
  ];

  values = [
    {
      icon: 'shield-check',
      title: 'Гарантия результата',
      description: 'Берём ответственность за результат. При несдаче после нашей подготовки — бесплатная повторная программа.',
      color: 'blue'
    },
    {
      icon: 'users',
      title: 'Индивидуальный подход',
      description: 'Анализируем ваш опыт, документы и квалификацию. Составляем персональный план подготовки.',
      color: 'emerald'
    },
    {
      icon: 'zap',
      title: 'Максимальная скорость',
      description: 'Оперативная запись в ЦОК, быстрая проверка документов. Сдача в сжатые сроки.',
      color: 'amber'
    }
  ];

  advantages = [
    {
      icon: 'badge-check',
      title: 'Аккредитованные партнёры',
      description: 'Работаем только с официально аккредитованными Центрами оценки квалификаций (ЦОК) по всей России.'
    },
    {
      icon: 'file-text',
      title: 'Полное документальное сопровождение',
      description: 'Проверяем, оформляем и подаём полный пакет документов. Исключаем отказы из-за ошибок в документах.'
    },
    {
      icon: 'graduation-cap',
      title: 'Онлайн-тренажёр',
      description: 'Доступ к базе реальных вопросов НОК для самостоятельной подготовки в любое время.'
    },
    {
      icon: 'headphones',
      title: 'Поддержка на всех этапах',
      description: 'Отвечаем на вопросы до, во время и после сдачи. На связи в мессенджерах и по телефону.'
    },
    {
      icon: 'map-pin',
      title: 'Запись в ЦОК по всей России',
      description: 'Организуем сдачу в удобном для вас городе. Работаем с ЦОК в более чем 50 регионах.'
    },
    {
      icon: 'rotate-ccw',
      title: 'Гарантия пересдачи',
      description: 'Если с первого раза не сдали — готовим к пересдаче бесплатно. Не бросаем на полпути.'
    }
  ];

  services = [
    {
      name: 'НОК НОСТРОЙ',
      description: 'Строительная отрасль: ГИП, прорабы, инженеры строительного контроля',
      icon: 'building-2',
      color: 'blue',
      link: '/services/nok-nostroy'
    },
    {
      name: 'НОК НОПРИЗ',
      description: 'Проектирование и инженерные изыскания: проектировщики, изыскатели',
      icon: 'pencil-ruler',
      color: 'cyan',
      link: '/services/nok-nopriz'
    },
    {
      name: 'НОК ОПБ',
      description: 'Пожарная безопасность: специалисты ОПБ и ответственные за противопожарную защиту',
      icon: 'flame',
      color: 'orange',
      link: '/services/nok-opb'
    },
    {
      name: 'НОК ЖКХ',
      description: 'Жилищно-коммунальное хозяйство: управляющие МКД, специалисты ЖКХ',
      icon: 'house',
      color: 'teal',
      link: '/services/nok-housing'
    },
    {
      name: 'Онлайн-тренажёр',
      description: 'Подготовка по реальным вопросам НОК в интерактивном формате',
      icon: 'monitor',
      color: 'violet',
      link: '/services/trainer'
    },
    {
      name: 'Консультация',
      description: 'Бесплатная консультация по всем вопросам прохождения НОК',
      icon: 'message-circle',
      color: 'slate',
      link: '/consultation'
    }
  ];

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  ngOnInit(): void {
    this.seoService.setAboutPageSeo();
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

    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    masterTl.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' }, 0);
    masterTl.fromTo('.hero-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' }, 0.3);

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

    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.3);

    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.5);

    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }, 1.1);
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    const statsTl = await this.animationService.sectionTimeline('#stats-section');
    if (statsTl) {
      statsTl.fromTo('.stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.2)' }, 0);
    }

    const missionTl = await this.animationService.sectionTimeline('#mission-section');
    if (missionTl) {
      missionTl.fromTo('#mission-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      missionTl.fromTo('#mission-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      missionTl.fromTo('.value-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.3);
    }

    const advTl = await this.animationService.sectionTimeline('#advantages-section');
    if (advTl) {
      advTl.fromTo('#advantages-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      advTl.fromTo('#advantages-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      advTl.fromTo('.advantage-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.3);
    }

    const servicesTl = await this.animationService.sectionTimeline('#services-section');
    if (servicesTl) {
      servicesTl.fromTo('#services-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      servicesTl.fromTo('#services-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      servicesTl.fromTo('.service-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }, 0.3);
    }

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
