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
  selector: 'app-reviews-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Отзывы', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- HERO -->
<section class="relative min-h-[45vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-amber-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    <div class="hero-orb absolute w-[300px] h-[300px] rounded-full bg-orange-600/[0.06] blur-[90px] top-1/3 right-1/4"></div>
  </div>

  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[70%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
    <div class="max-w-4xl mx-auto">
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10" aria-label="Навигация">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-slate-400">Отзывы</span>
      </nav>

      <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-400 mb-8">
        <lucide-icon name="star" [size]="14" [strokeWidth]="2"></lucide-icon>
        <span>{{ reviews.length }} отзывов от клиентов</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
        <span class="hero-word inline-block">Отзывы</span>
        <span class="hero-word inline-block text-amber-400">клиентов</span>
      </h1>

      <p class="hero-subtitle text-xl text-slate-400 leading-relaxed max-w-2xl">
        Реальные истории специалистов, которые успешно прошли НОК при поддержке нашей команды.
      </p>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="py-12 bg-white border-b border-slate-100">
  <div class="max-w-4xl mx-auto px-6">
    <div class="grid grid-cols-3 gap-8 text-center">
      <div class="stat-item">
        <div class="text-4xl font-extrabold text-slate-900 mb-1">99%</div>
        <div class="text-sm text-slate-500">Успешных сдач</div>
      </div>
      <div class="stat-item">
        <div class="text-4xl font-extrabold text-slate-900 mb-1">1500+</div>
        <div class="text-sm text-slate-500">Клиентов</div>
      </div>
      <div class="stat-item">
        <div class="flex justify-center items-center gap-1 mb-1">
          <span class="text-4xl font-extrabold text-slate-900">4.9</span>
          <lucide-icon name="star" [size]="24" [strokeWidth]="0" class="text-amber-400 fill-amber-400"></lucide-icon>
        </div>
        <div class="text-sm text-slate-500">Средняя оценка</div>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS GRID -->
<section class="py-16 sm:py-20 bg-slate-50" id="reviews-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5 border border-amber-100 section-label">
        <lucide-icon name="message-square" [size]="13" [strokeWidth]="2.5"></lucide-icon>
        Отзывы
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Что говорят наши клиенты</h2>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        Отзывы специалистов, которые успешно прошли независимую оценку квалификации с нашей помощью.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let review of reviews"
           class="review-card bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow flex flex-col">

        <!-- Stars -->
        <div class="flex gap-1 mb-4">
          <lucide-icon *ngFor="let star of [1,2,3,4,5]"
                       name="star" [size]="16" [strokeWidth]="0"
                       class="text-amber-400 fill-amber-400"></lucide-icon>
        </div>

        <!-- Quote -->
        <p class="text-slate-700 leading-relaxed text-sm flex-1 mb-5">
          "{{ review.text }}"
        </p>

        <!-- Author -->
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
               [class]="'bg-' + review.color + '-600'">
            {{ review.initials }}
          </div>
          <div>
            <div class="font-semibold text-slate-900 text-sm">{{ review.name }}</div>
            <div class="text-xs text-slate-500">{{ review.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 sm:py-20 bg-white">
  <div class="max-w-5xl mx-auto px-6">
    <div class="cta-gradient-card relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Станьте следующим успешным клиентом
        </h2>
        <p class="text-xl text-amber-100/80 leading-relaxed mb-10">
          Получите бесплатную консультацию и узнайте, как быстро и с гарантией пройти НОК.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-amber-700 px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a [href]="'tel:' + phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
        <p class="text-sm text-amber-200/60 mt-6">Ответим в течение 15 минут в рабочее время</p>
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
export class ReviewsPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  reviews = [
    {
      name: 'Александр К.',
      initials: 'АК',
      role: 'ГИП, Москва — НОК НОСТРОЙ',
      color: 'blue',
      text: 'Долго откладывал НОК, думал что это сложно. Обратился в НОК Эксперт — всё оказалось намного проще. Помогли с документами, дали доступ к тренажёру. Сдал с первого раза.'
    },
    {
      name: 'Елена С.',
      initials: 'ЕС',
      role: 'Проектировщик, СПб — НОК НОПРИЗ',
      color: 'violet',
      text: 'Очень быстро записали в ЦОК, проверили все документы. Подготовка заняла 2 недели. Результат — успешная сдача. Рекомендую всем проектировщикам!'
    },
    {
      name: 'Дмитрий П.',
      initials: 'ДП',
      role: 'Специалист ОПБ, Екатеринбург',
      color: 'orange',
      text: 'Работаю инженером по пожарной безопасности. НОК сдал успешно. Особенно понравился онлайн-тренажёр — очень удобно повторять материал в любое время.'
    },
    {
      name: 'Ирина Н.',
      initials: 'ИН',
      role: 'Строительный контроль, Краснодар',
      color: 'emerald',
      text: 'Первый раз не сдала самостоятельно. Ребята помогли разобраться в ошибках, подготовили к пересдаче бесплатно. Второй раз — сдала без проблем. Спасибо!'
    },
    {
      name: 'Сергей М.',
      initials: 'СМ',
      role: 'ГАП, Новосибирск — НОК НОПРИЗ',
      color: 'cyan',
      text: 'Профессиональный подход с первого звонка. Подобрали удобный ЦОК в нашем городе, помогли оформить портфолио. Свидетельство получил через 2 недели.'
    },
    {
      name: 'Михаил В.',
      initials: 'МВ',
      role: 'Управляющий МКД, Казань — НОК ЖКХ',
      color: 'amber',
      text: 'Никогда не думал, что НОК можно сдать так быстро. За 3 недели от обращения до свидетельства. Всё чётко, без лишних звонков и бюрократии.'
    },
    {
      name: 'Анна Т.',
      initials: 'АТ',
      role: 'Инженер, Уфа — НОК НОСТРОЙ',
      color: 'rose',
      text: 'Обратилась по совету коллеги. Не пожалела. Всё объяснили, помогли собрать документы. Очень вежливые и оперативные. Сдала НОК с первого раза.'
    },
    {
      name: 'Олег Р.',
      initials: 'ОР',
      role: 'Прораб, Ростов-на-Дону',
      color: 'indigo',
      text: 'Сделали всё под ключ: от записи до получения свидетельства. Тренажёр хорошо помог при подготовке — реальные вопросы, удобный интерфейс. Результат отличный.'
    },
    {
      name: 'Наталья Б.',
      initials: 'НБ',
      role: 'Специалист ЖКХ, Самара',
      color: 'teal',
      text: 'Боялась, что не успею подготовиться к сроку — у нас требование от руководства. Ребята организовали всё буквально за 2 недели. Свидетельство получила вовремя!'
    }
  ];

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  ngOnInit(): void {
    this.seoService.setReviewsPageSeo();
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

    const statsTl = await this.animationService.sectionTimeline('#stats-section' as any);
    if (statsTl) {
      statsTl.fromTo('.stat-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, 0);
    }

    const reviewsTl = await this.animationService.sectionTimeline('#reviews-section');
    if (reviewsTl) {
      reviewsTl.fromTo('#reviews-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      reviewsTl.fromTo('#reviews-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      reviewsTl.fromTo('.review-card',
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.3);
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
