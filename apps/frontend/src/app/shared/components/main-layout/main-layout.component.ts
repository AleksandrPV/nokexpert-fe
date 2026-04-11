import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookiesBannerComponent } from '../../../features/cookies/cookies-banner.component';
import { ToastContainerComponent } from '../toast/toast-container.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CookiesBannerComponent, ToastContainerComponent, BackToTopComponent],
  template: `
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
  styles: []
})
export class MainLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private router: Router) {
    // Автоматическая прокрутка наверх при переходе между страницами
    if (this.isBrowser) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
  }
} 