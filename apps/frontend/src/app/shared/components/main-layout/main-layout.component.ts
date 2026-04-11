import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookiesBannerComponent } from '../../../features/cookies/cookies-banner.component';
import { ToastContainerComponent } from '../toast/toast-container.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CookiesBannerComponent, ToastContainerComponent, BackToTopComponent, NgIf],
  template: `
    <!-- Route loading progress bar -->
    <div *ngIf="isNavigating()"
         class="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-blue-600 route-progress-bar"
         role="progressbar" aria-label="Загрузка страницы" aria-valuetext="Загрузка...">
    </div>

    <!-- Skip to main content (accessibility) -->
    <a href="#main-content"
       class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg">
      Перейти к содержимому
    </a>
    <app-header />
    <main id="main-content" class="min-h-[70vh]">
      <router-outlet />
    </main>
    <app-footer />

    <!-- Cookies Banner -->
    <app-cookies-banner />
    <app-toast-container />
    <app-back-to-top />
  `,
  styles: [`
    .route-progress-bar {
      animation: progress-indeterminate 1.2s ease-in-out infinite;
      transform-origin: left;
    }
    @keyframes progress-indeterminate {
      0%   { transform: scaleX(0); margin-left: 0%; }
      50%  { transform: scaleX(0.6); margin-left: 20%; }
      100% { transform: scaleX(0); margin-left: 100%; }
    }
  `]
})
export class MainLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isNavigating = signal(false);

  constructor(private router: Router) {
    if (this.isBrowser) {
      this.router.events.pipe(
        filter(e => e instanceof NavigationStart || e instanceof NavigationEnd)
      ).subscribe(event => {
        this.isNavigating.set(event instanceof NavigationStart);
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }
  }
} 