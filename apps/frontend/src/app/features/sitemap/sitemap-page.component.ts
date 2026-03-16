import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../shared/components/icon/icon.component';
import { AnimationService } from '../../shared/services/animation.service';
import { SeoService } from '../../shared/services/seo.service';

interface SitemapSection {
  title: string;
  icon: string;
  links: { title: string; url: string }[];
}

@Component({
  selector: 'app-sitemap-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
<main>

<!-- ============================================ -->
<!-- HERO — Dark, compact                         -->
<!-- ============================================ -->
<section class="relative min-h-[40vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <!-- Floating orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
    <div class="max-w-4xl">
      <!-- Breadcrumb nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Карта сайта</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        <span class="hero-word inline-block">Карта</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">сайта</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl">
        <p class="text-lg sm:text-xl text-slate-400 leading-relaxed">
          Полный список всех страниц сайта для удобной навигации
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================ -->
<!-- LINKS GRID                                   -->
<!-- ============================================ -->
<section class="bg-white py-16 lg:py-24" id="sitemap-grid">
  <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">

      <div *ngFor="let section of sections; let i = index"
           class="sitemap-section rounded-2xl border border-slate-200 p-6 lg:p-8 hover:border-slate-300 transition-colors">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon [name]="section.icon" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-lg font-bold text-slate-900">{{ section.title }}</h2>
        </div>

        <ul class="space-y-2">
          <li *ngFor="let link of section.links">
            <a [routerLink]="link.url"
               class="group flex items-center gap-2 py-2 px-3 -mx-3 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
              <lucide-icon name="arrow-right" [size]="14" [strokeWidth]="2"
                           class="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0"></lucide-icon>
              <span class="text-sm">{{ link.title }}</span>
            </a>
          </li>
        </ul>
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
export class SitemapPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private seoService = inject(SeoService);
  private animationService = inject(AnimationService);

  sections: SitemapSection[] = [
    {
      title: 'Главные страницы',
      icon: 'home',
      links: [
        { title: 'Главная страница', url: '/' },
        { title: 'Услуги', url: '/services' },
        { title: 'Контакты', url: '/contacts' },
        { title: 'Консультация', url: '/consultation' }
      ]
    },
    {
      title: 'Услуги НОК',
      icon: 'building-2',
      links: [
        { title: 'НОК НОСТРОЙ', url: '/services/nok-nostroy' },
        { title: 'НОК НОПРИЗ', url: '/services/nok-nopriz' },
        { title: 'НОК ОПБ', url: '/services/nok-opb' },
        { title: 'НОК МЧС', url: '/services/nok-emergency' },
        { title: 'НОК ЖКХ', url: '/services/nok-housing' }
      ]
    },
    {
      title: 'Информация о НОК',
      icon: 'book-open',
      links: [
        { title: 'Что такое НОК', url: '/info/what-is-nok' },
        { title: 'Кому нужна НОК', url: '/info/who-must-pass-nok' },
        { title: 'Процедура НОК', url: '/info/nok-procedure' },
        { title: 'НОК НОСТРОЙ', url: '/info/nok-nostroy' },
        { title: 'Другие отрасли', url: '/info/nok-other-industries' },
        { title: 'Подготовка к экзамену', url: '/info/exam-preparation' },
        { title: 'Вопросы и ответы', url: '/info/nok-qa' },
        { title: 'Портфолио', url: '/info/portfolio-guide' },
        { title: 'Онлайн-тренажер', url: '/info/online-trainer' },
        { title: 'Реестр специалистов', url: '/info/specialists-registry' },
        { title: 'Законодательство', url: '/info/nok-legislation' }
      ]
    },
    {
      title: 'Справочники',
      icon: 'database',
      links: [
        { title: 'Часто задаваемые вопросы', url: '/faq' },
        { title: 'Прописка НОК', url: '/faq/propiska-nok' },
        { title: 'Центры оценки квалификации', url: '/qa-centers' },
        { title: 'Квалификации', url: '/qualifications' }
      ]
    },
    {
      title: 'О компании',
      icon: 'award',
      links: [
        { title: 'Наш центр', url: '/center' },
        { title: 'Контакты', url: '/contacts' }
      ]
    },
    {
      title: 'Правовая информация',
      icon: 'scale',
      links: [
        { title: 'Политика конфиденциальности', url: '/privacy-policy' },
        { title: 'Пользовательское соглашение', url: '/user-agreement' },
        { title: 'Карта сайта', url: '/sitemap' }
      ]
    }
  ];

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Карта сайта - НОК Эксперт',
      description: 'Полная карта сайта НОК Эксперт. Навигация по всем разделам и страницам сайта.',
      keywords: 'карта сайта, навигация, НОК Эксперт, структура сайта',
      canonical: 'https://nok-expert.ru/sitemap'
    });
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

    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' }, 1.4);
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    const cards = document.querySelectorAll('.sitemap-section');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
