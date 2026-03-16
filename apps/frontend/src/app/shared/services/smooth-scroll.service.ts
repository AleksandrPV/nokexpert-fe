import { Injectable, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private ngZone = inject(NgZone);
  private lenis: any = null;
  private rafId: number | null = null;

  async init(): Promise<void> {
    if (!this.isBrowser || this.lenis) return;

    try {
      const { default: Lenis } = await import('lenis');

      this.ngZone.runOutsideAngular(() => {
        this.lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        // Connect Lenis to GSAP ScrollTrigger if available
        this.connectToScrollTrigger();

        // Start the animation loop
        const raf = (time: number) => {
          this.lenis.raf(time);
          this.rafId = requestAnimationFrame(raf);
        };
        this.rafId = requestAnimationFrame(raf);
      });
    } catch (e) {
      console.warn('[SmoothScroll] Failed to initialize:', e);
    }
  }

  private async connectToScrollTrigger(): Promise<void> {
    try {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      // Sync Lenis scroll position with ScrollTrigger
      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Use GSAP ticker for smoother sync
      gsap.ticker.add((time: number) => {
        this.lenis?.raf(time * 1000);
      });

      // Cancel the separate RAF loop since GSAP ticker handles it
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }

      gsap.ticker.lagSmoothing(0);
    } catch {
      // GSAP not available, Lenis works standalone
    }
  }

  scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number }): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.2,
      });
    }
  }

  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.lenis?.destroy();
    this.lenis = null;
  }
}
