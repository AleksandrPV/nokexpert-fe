import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-user-agreement-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
<main>

<!-- ============================================ -->
<!-- HERO — Dark, compact ~40vh                   -->
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
        <span class="text-blue-400">Пользовательское соглашение</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        <span class="hero-word inline-block">Пользовательское</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">соглашение</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl">
        <p class="text-lg sm:text-xl text-slate-400 leading-relaxed">
          Условия использования сайта и предоставления услуг
        </p>
        <p class="text-sm text-slate-500 mt-4">Последнее обновление: 1 января 2024 года</p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================ -->
<!-- CONTENT                                      -->
<!-- ============================================ -->
<section class="bg-white py-16 lg:py-24" id="content">
  <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-4xl">

      <!-- Section 1 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="file-text" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">1. Общие положения</h2>
        </div>
        <div class="text-slate-600 leading-relaxed space-y-4 pl-[52px]">
          <p>Настоящее Пользовательское соглашение (далее -- "Соглашение") регулирует отношения между {{ organizationName }} (далее -- "Компания", "мы") и пользователями сайта {{ websiteDomain }} (далее -- "Сайт", "Сервис").</p>
          <p>Используя Сайт, вы соглашаетесь с условиями настоящего Соглашения. Если вы не согласны с какими-либо условиями, не используйте Сайт.</p>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="briefcase" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">2. Описание услуг</h2>
        </div>
        <div class="pl-[52px]">
          <p class="text-slate-600 mb-6">Сайт предоставляет информацию о услугах по подготовке к независимой оценке квалификации (НОК) в строительной отрасли, включая:</p>
          <ul class="space-y-3 text-slate-600">
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              Консультации по подготовке к НОК
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              Информационные материалы и статьи
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              Форму обратной связи для связи с экспертами
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              Информацию о центрах оценки квалификации
            </li>
          </ul>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="users" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">3. Права и обязанности пользователей</h2>
        </div>
        <div class="pl-[52px]">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="rounded-xl bg-slate-50 p-6">
              <h3 class="font-semibold text-slate-900 mb-4">Пользователи имеют право</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-start gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-green-500 mt-0.5 shrink-0"></lucide-icon>
                  Получать информацию о услугах Компании
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-green-500 mt-0.5 shrink-0"></lucide-icon>
                  Использовать контактные формы для связи
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-green-500 mt-0.5 shrink-0"></lucide-icon>
                  Обращаться за консультациями
                </li>
              </ul>
            </div>
            <div class="rounded-xl bg-slate-50 p-6">
              <h3 class="font-semibold text-slate-900 mb-4">Пользователи обязуются</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-start gap-3">
                  <lucide-icon name="alert-circle" [size]="16" [strokeWidth]="2" class="text-amber-500 mt-0.5 shrink-0"></lucide-icon>
                  Не нарушать работу Сайта
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon name="alert-circle" [size]="16" [strokeWidth]="2" class="text-amber-500 mt-0.5 shrink-0"></lucide-icon>
                  Предоставлять достоверную информацию при обращении
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon name="alert-circle" [size]="16" [strokeWidth]="2" class="text-amber-500 mt-0.5 shrink-0"></lucide-icon>
                  Соблюдать законодательство РФ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 4 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="lock" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">4. Интеллектуальная собственность</h2>
        </div>
        <div class="pl-[52px] text-slate-600 leading-relaxed">
          <p>Все материалы Сайта, включая тексты, изображения, дизайн, являются собственностью Компании и защищены авторским правом. Использование материалов без разрешения запрещено.</p>
        </div>
      </div>

      <!-- Section 5 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="shield-alert" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">5. Ограничение ответственности</h2>
        </div>
        <div class="pl-[52px]">
          <p class="text-slate-600 mb-6">Компания не несет ответственности за:</p>
          <ul class="space-y-3 text-slate-600">
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              Неправильное использование информации с Сайта
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              Результаты экзаменов НОК
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              Действия третьих лиц
            </li>
            <li class="flex items-start gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              Технические сбои, не зависящие от Компании
            </li>
          </ul>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="eye-off" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">6. Конфиденциальность</h2>
        </div>
        <div class="pl-[52px] text-slate-600 leading-relaxed">
          <p>Обработка персональных данных осуществляется в соответствии с
            <a routerLink="/privacy-policy" class="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">Политикой конфиденциальности</a>.
          </p>
        </div>
      </div>

      <!-- Section 7 -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="refresh-cw" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">7. Изменения в соглашении</h2>
        </div>
        <div class="pl-[52px] text-slate-600 leading-relaxed">
          <p>Компания оставляет за собой право изменять настоящее Соглашение. Изменения вступают в силу с момента их публикации на Сайте.</p>
        </div>
      </div>

      <!-- Section 8: Contacts -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="mail" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">8. Контактная информация</h2>
        </div>
        <div class="pl-[52px]">
          <p class="text-slate-600 mb-6">По вопросам, связанным с настоящим Соглашением, обращайтесь:</p>
          <div class="rounded-xl border border-slate-200 p-6">
            <div class="space-y-3">
              <a [href]="'mailto:' + email" class="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                <lucide-icon name="mail" [size]="16" [strokeWidth]="1.8" class="shrink-0"></lucide-icon>
                {{ email }}
              </a>
              <a [href]="'tel:' + phoneHref" class="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                <lucide-icon name="phone" [size]="16" [strokeWidth]="1.8" class="shrink-0"></lucide-icon>
                {{ phoneDisplay }}
              </a>
              <div class="flex items-start gap-3 text-slate-600">
                <lucide-icon name="map-pin" [size]="16" [strokeWidth]="1.8" class="shrink-0 mt-0.5"></lucide-icon>
                {{ address }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <div class="content-block border-t border-slate-200 pt-8">
        <p class="text-sm text-slate-500 text-center">
          Используя Сайт, вы подтверждаете, что ознакомились и согласны с условиями настоящего Пользовательского соглашения.
        </p>
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
export class UserAgreementPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  get organizationName(): string {
    return this.organizationService.getName();
  }

  get websiteDomain(): string {
    return this.organizationService.getWebsiteDomain();
  }

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  get address(): string {
    return this.organizationService.getAddress();
  }

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Пользовательское соглашение - НОК Эксперт',
      description: 'Пользовательское соглашение сайта НОК Эксперт. Условия использования сайта и предоставления услуг по подготовке к НОК.',
      keywords: 'пользовательское соглашение, условия использования, НОК Эксперт',
      canonical: 'https://nok-expert.ru/user-agreement'
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

    const blocks = document.querySelectorAll('.content-block');
    blocks.forEach((block) => {
      gsap.fromTo(block,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 90%', once: true }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
