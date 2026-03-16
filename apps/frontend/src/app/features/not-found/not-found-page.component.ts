import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../shared/components/icon/icon.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
<div class="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">

  <!-- Background effects -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="nf-orb absolute w-[600px] h-[600px] rounded-full bg-blue-600/[0.06] blur-[120px] -top-40 -right-40"></div>
    <div class="nf-orb absolute w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[100px] -bottom-32 -left-32"></div>
    <div class="nf-orb absolute w-[300px] h-[300px] rounded-full bg-violet-600/[0.05] blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
    <div class="absolute top-0 left-[75%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="absolute left-0 top-[33%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
    <div class="absolute left-0 top-[66%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
  </div>

  <div class="relative z-10 text-center px-6">

    <!-- 404 number -->
    <div class="nf-number mb-8">
      <span class="text-[10rem] sm:text-[14rem] md:text-[18rem] font-extrabold leading-none bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent select-none">
        404
      </span>
    </div>

    <!-- Icon -->
    <div class="nf-icon flex justify-center mb-8">
      <div class="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center backdrop-blur-sm">
        <lucide-icon name="search-x" [size]="32" [strokeWidth]="1.5" class="text-slate-400"></lucide-icon>
      </div>
    </div>

    <!-- Message -->
    <h1 class="nf-title text-3xl sm:text-4xl font-bold text-white mb-4">
      Страница не найдена
    </h1>
    <p class="nf-text text-lg text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
      Запрашиваемая страница не существует или была перемещена. Проверьте правильность адреса.
    </p>

    <!-- Actions -->
    <div class="nf-actions flex flex-col sm:flex-row gap-4 justify-center">
      <a routerLink="/"
         class="inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
        <lucide-icon name="house" [size]="18" [strokeWidth]="2"></lucide-icon>
        На главную
      </a>
      <a routerLink="/services"
         class="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] text-white px-7 py-3.5 rounded-xl font-semibold border border-white/[0.1] hover:bg-white/[0.1] transition-colors">
        <lucide-icon name="arrow-right" [size]="18" [strokeWidth]="2"></lucide-icon>
        Наши услуги
      </a>
    </div>

  </div>
</div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NotFoundPageComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Страница не найдена (404) - НОК Эксперт',
      description: 'Запрашиваемая страница не найдена. Перейдите на главную или воспользуйтесь навигацией сайта НОК Эксперт.',
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

    gsap.to('.nf-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.nf-number',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }, 0);

    tl.fromTo('.nf-icon',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.4);

    tl.fromTo('.nf-title',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.6);

    tl.fromTo('.nf-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.75);

    tl.fromTo('.nf-actions',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.9);
  }
}
