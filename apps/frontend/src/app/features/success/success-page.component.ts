import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../shared/components/icon/icon.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
<main class="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden py-20">

  <!-- Background effects -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute w-[600px] h-[600px] rounded-full bg-emerald-600/[0.07] blur-[120px] -top-40 -right-40"></div>
    <div class="absolute w-[500px] h-[500px] rounded-full bg-blue-500/[0.05] blur-[100px] -bottom-32 -left-32"></div>
    <div class="absolute w-[300px] h-[300px] rounded-full bg-cyan-600/[0.06] blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
    <div class="absolute top-0 left-[75%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="absolute left-0 top-[33%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
    <div class="absolute left-0 top-[66%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
  </div>

  <div class="relative z-10 text-center px-6 max-w-2xl mx-auto">

    <!-- Success icon -->
    <div class="success-icon flex justify-center mb-8">
      <div class="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
        <lucide-icon name="check-circle" [size]="48" [strokeWidth]="1.5" class="text-emerald-400"></lucide-icon>
      </div>
    </div>

    <!-- Heading -->
    <h1 class="success-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
      Заявка принята!
    </h1>

    <!-- Description -->
    <p class="success-text text-lg sm:text-xl text-slate-400 mb-4 leading-relaxed">
      Спасибо за обращение. Мы получили вашу заявку и свяжемся с вами в течение&nbsp;15&nbsp;минут в рабочее время.
    </p>
    <p class="success-subtext text-base text-slate-500 mb-12">
      Пока ждёте — можете ознакомиться с нашими услугами или почитать FAQ по НОК.
    </p>

    <!-- Actions -->
    <div class="success-actions flex flex-col sm:flex-row gap-4 justify-center">
      <a routerLink="/"
         class="inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
        <lucide-icon name="house" [size]="18" [strokeWidth]="2"></lucide-icon>
        На главную
      </a>
      <a routerLink="/services"
         class="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] text-white px-7 py-3.5 rounded-xl font-semibold border border-white/[0.1] hover:bg-white/[0.1] transition-colors">
        <lucide-icon name="briefcase" [size]="18" [strokeWidth]="2"></lucide-icon>
        Наши услуги
      </a>
      <a routerLink="/faq"
         class="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] text-white px-7 py-3.5 rounded-xl font-semibold border border-white/[0.1] hover:bg-white/[0.1] transition-colors">
        <lucide-icon name="circle-help" [size]="18" [strokeWidth]="2"></lucide-icon>
        FAQ по НОК
      </a>
    </div>

  </div>
</main>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SuccessPageComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Заявка принята — НОК Эксперт',
      description: 'Ваша заявка успешно принята. Мы свяжемся с вами в течение 15 минут.',
      noIndex: true
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initAnimations();
  }

  private async initAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.success-icon',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0);

    tl.fromTo('.success-title',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.4);

    tl.fromTo('.success-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.6);

    tl.fromTo('.success-subtext',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.75);

    tl.fromTo('.success-actions',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.9);
  }
}
