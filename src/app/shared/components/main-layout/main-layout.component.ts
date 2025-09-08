import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookiesBannerComponent } from '../../../features/cookies/cookies-banner.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CookiesBannerComponent],
  template: `
    <app-header />
    <main class="min-h-[70vh] container mx-auto p-4">
      <router-outlet />
    </main>
    <app-footer />

    <!-- Cookies Banner -->
    <app-cookies-banner />
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