import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../feedback-popup/services/feedback-popup.service';
import { SeoService } from '../../shared/services/seo.service';
import { OrganizationService } from '../../shared/services/organization.service';
import { IconModule } from '../../shared/components/icon/icon.component';
import { AnimationService } from '../../shared/services/animation.service';
import { PRICING } from '../../shared/config/pricing.config';

/**
 * Компонент главной страницы
 * Содержит hero секцию, информацию о преимуществах, услугах и призывы к действию
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private feedbackService = inject(FeedbackPopupService);
  private seoService = inject(SeoService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Геттеры для данных организации
  get organizationName(): string {
    return this.organizationService.getName();
  }

  get licenseDescription(): string {
    return this.organizationService.getLicenseDescription();
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

  get hasLicense(): boolean {
    return this.organizationService.hasLicense();
  }

  readonly pricing = PRICING;


  ngOnInit(): void {
    // Устанавливаем SEO данные для главной страницы
    // Включает Organization, WebSite, LocalBusiness и BreadcrumbList в одном @graph
    this.seoService.setHomePageSeo();
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

    // 1. Floating orbs — gentle continuous movement
    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    // 2. Grid lines — fade in with stagger
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

    // 3. Floating particles — continuous float
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

    // 4. Badge entrance
    masterTl.fromTo('.hero-badge',
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
      0.3
    );

    // 5. Title words — stagger in one by one
    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' },
      0.5
    );

    // 6. Subtitle + animated underline
    masterTl.fromTo('.hero-subtitle p',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );
    masterTl.to('.hero-underline',
      { width: '120px', duration: 0.8, ease: 'power2.inOut' },
      1.4
    );

    // 7. CTA buttons — slide up with spring
    masterTl.fromTo('.hero-btn-primary',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      1.5
    );
    masterTl.fromTo('.hero-btn-secondary',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      1.65
    );

    // 8. Button shine sweep (repeating)
    gsap.to('.hero-btn-shine', {
      x: '200%',
      duration: 1.5,
      repeat: -1,
      repeatDelay: 4,
      ease: 'power2.inOut',
      delay: 3
    });

    // 9. Social proof
    masterTl.fromTo('.hero-stats',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      1.8
    );

    // 10. Stat cards — stagger from right with scale
    masterTl.fromTo('.stat-card',
      { x: 60, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)' },
      1.0
    );

    // 11. Stat cards — continuous gentle float
    gsap.to('.stat-card', {
      y: 'random(-8, 8)',
      duration: 'random(2.5, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 1.5, from: 'random' },
      delay: 2.5
    });

    // 12. Counter animation for stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { value: 0 };
      masterTl.to(obj, {
        value: target,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toLocaleString('ru-RU') + suffix;
        }
      }, 1.5);
    });

    // 14. Parallax on scroll
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-parallax-img', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      }
    });
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // ===== SERVICES SECTION =====
    const servicesTl = await this.animationService.sectionTimeline('#services');
    if (servicesTl) {
      // Section label slides from left
      servicesTl.fromTo('#services .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      // Heading reveal
      servicesTl.fromTo('#services h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      // Subtitle
      servicesTl.fromTo('#services h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      // Cards stagger with scale
      servicesTl.fromTo('.service-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
    }

    // Directions — separate trigger since they're below cards
    const dirTl = await this.animationService.sectionTimeline('.directions-grid');
    if (dirTl) {
      dirTl.fromTo('.direction-card',
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 0);
    }

    // ===== PROCESS SECTION =====
    const processTl = await this.animationService.sectionTimeline('#process');
    if (processTl) {
      // Label
      processTl.fromTo('#process .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      // Heading
      processTl.fromTo('#process h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      // Subtitle
      processTl.fromTo('#process h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      // Process steps — cascade from left with rotation
      processTl.fromTo('.process-step',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
      // Step number boxes — scale pop
      processTl.fromTo('.process-step .w-16',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, 0.35);
    }

    // ===== TRUST SECTION =====
    const trustTl = await this.animationService.sectionTimeline('#trust ~ section, section:has(.trust-items)', { start: 'top 92%' });
    // Use simpler selector
    const trustSection = document.querySelector('.trust-items')?.closest('section');
    if (trustSection) {
      const tl2 = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: trustSection, start: 'top 92%', once: true }
      });

      // Label
      tl2.fromTo(trustSection.querySelector('.uppercase'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      // Heading
      tl2.fromTo(trustSection.querySelector('h2'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      // Subtitle
      tl2.fromTo(trustSection.querySelector('h2 + p'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      // Trust items slide from left with stagger
      tl2.fromTo('.trust-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, 0.3);
      // Trust visual — scale up from center
      tl2.fromTo('.trust-visual',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.1)' }, 0.4);
    }

    // ===== CTA SECTION =====
    const ctaCard = document.querySelector('.bg-gradient-to-br.from-blue-600');
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

  /**
   * Открыть popup для консультации
   */
  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  /**
   * Открыть popup для НОК НОСТРОЙ
   */
  openNokNostroyPopup(): void {
    this.feedbackService.openForNokNostroy();
  }

  /**
   * Открыть popup для НОК НОПРИЗ
   */
  openNokNoprizPopup(): void {
    this.feedbackService.openForNokNopriz();
  }

  /**
   * Открыть popup для премиум пакета
   */
  openPremiumPopup(): void {
    this.feedbackService.openForPremium();
  }
} 