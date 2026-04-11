import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private gsapInstance: any;
  private ScrollTriggerInstance: any;
  private initialized = false;

  async init(): Promise<{ gsap: any; ScrollTrigger: any } | null> {
    if (!this.isBrowser) return null;
    if (this.initialized) return { gsap: this.gsapInstance, ScrollTrigger: this.ScrollTriggerInstance };

    // Не запускаем анимации если пользователь предпочитает меньше движения
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return null;
    }

    try {
      // Таймаут 5 сек — если GSAP не загрузился, возвращаем null (контент остаётся видимым)
      const withTimeout = <T>(p: Promise<T>): Promise<T | null> =>
        Promise.race([p, new Promise<null>(r => setTimeout(() => r(null), 5000))]);

      const result = await withTimeout(
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      );

      if (!result) return null; // таймаут — показываем контент как есть

      const [gsapModule, scrollTriggerModule] = result;
      this.gsapInstance = gsapModule.gsap || gsapModule.default;
      this.ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
      this.gsapInstance.registerPlugin(this.ScrollTriggerInstance);
      this.initialized = true;
      return { gsap: this.gsapInstance, ScrollTrigger: this.ScrollTriggerInstance };
    } catch {
      return null;
    }
  }

  /**
   * Create a scroll-triggered timeline for a section.
   * Triggers very early (top 98% = as soon as even 2% of section is visible).
   */
  async sectionTimeline(
    triggerSelector: string,
    options?: { start?: string }
  ): Promise<any | null> {
    const lib = await this.init();
    if (!lib) return null;

    return lib.gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: triggerSelector,
        start: options?.start || 'top 95%',
        once: true,
      }
    });
  }

  async fadeInOnScroll(
    elements: string | Element | Element[],
    options?: { y?: number; duration?: number; stagger?: number; delay?: number }
  ): Promise<void> {
    const lib = await this.init();
    if (!lib) return;

    const { y = 30, duration = 0.7, stagger = 0.1, delay = 0 } = options || {};
    const trigger = typeof elements === 'string' ? elements : (Array.isArray(elements) ? elements[0] : elements);

    lib.gsap.fromTo(elements,
      { y, opacity: 0 },
      { y: 0, opacity: 1, duration, stagger, delay, ease: 'power2.out',
        scrollTrigger: { trigger, start: 'top 95%', once: true } }
    );
  }

  async slideInOnScroll(
    elements: string | Element | Element[],
    direction: 'left' | 'right',
    options?: { x?: number; duration?: number; stagger?: number }
  ): Promise<void> {
    const lib = await this.init();
    if (!lib) return;

    const { x = 50, duration = 0.7, stagger = 0.1 } = options || {};
    lib.gsap.fromTo(elements,
      { x: direction === 'left' ? -x : x, opacity: 0 },
      { x: 0, opacity: 1, duration, stagger, ease: 'power2.out',
        scrollTrigger: { trigger: typeof elements === 'string' ? elements : (Array.isArray(elements) ? elements[0] : elements), start: 'top 95%', once: true } }
    );
  }

  async revealCards(
    containerSelector: string,
    cardSelector: string,
    options?: { y?: number; stagger?: number; duration?: number }
  ): Promise<void> {
    const lib = await this.init();
    if (!lib) return;

    const { y = 30, stagger = 0.12, duration = 0.6 } = options || {};
    lib.gsap.fromTo(`${containerSelector} ${cardSelector}`,
      { y, opacity: 0 },
      { y: 0, opacity: 1, duration, stagger, ease: 'power2.out',
        scrollTrigger: { trigger: containerSelector, start: 'top 95%', once: true } }
    );
  }

  async heroEntrance(elements: {
    title?: string; subtitle?: string; cta?: string; badge?: string;
  }): Promise<void> {
    const lib = await this.init();
    if (!lib) return;
    const tl = lib.gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (elements.badge) tl.fromTo(elements.badge, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    if (elements.title) tl.fromTo(elements.title, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, elements.badge ? '-=0.2' : 0);
    if (elements.subtitle) tl.fromTo(elements.subtitle, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
    if (elements.cta) tl.fromTo(elements.cta, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2');
  }

  cleanup(): void {
    if (!this.isBrowser || !this.ScrollTriggerInstance) return;
    this.ScrollTriggerInstance.getAll().forEach((trigger: any) => trigger.kill());
  }
}
