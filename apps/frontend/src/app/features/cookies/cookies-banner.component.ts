import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookies-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Cookies Banner -->
    <div
      *ngIf="showBanner && isBrowser"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      role="dialog"
      aria-labelledby="cookies-title"
      aria-describedby="cookies-description">

      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <!-- Content -->
          <div class="flex-1">
            <h2 id="cookies-title" class="text-lg font-semibold text-gray-900 mb-2">
              🍪 Мы используем cookies
            </h2>
            <p id="cookies-description" class="text-gray-600 text-sm max-w-2xl">
              Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента.
              Продолжая использовать сайт, вы соглашаетесь с нашей
              <a routerLink="/privacy-policy" class="text-blue-600 hover:text-blue-700 underline">политикой конфиденциальности</a>
              и <a routerLink="/privacy-policy" class="text-blue-600 hover:text-blue-700 underline">политикой cookies</a>.
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              (click)="acceptAllCookies()"
              class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Принять все cookies">
              Принять все
            </button>

            <button
              (click)="acceptEssentialOnly()"
              class="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Принять только необходимые cookies">
              Только необходимые
            </button>

            <button
              (click)="openSettings()"
              class="px-6 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Настройки cookies">
              Настройки
            </button>
          </div>
        </div>

        <!-- Detailed Settings (expandable) -->
        <div *ngIf="showSettings" class="mt-4 pt-4 border-t border-gray-200">
          <h3 class="text-base font-semibold text-gray-900 mb-3">Настройки cookies</h3>

          <div class="space-y-4">
            <!-- Essential Cookies -->
            <div class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="essential"
                [checked]="true"
                disabled
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <div class="flex-1">
                <label for="essential" class="text-sm font-medium text-gray-900">
                  Необходимые cookies
                </label>
                <p class="text-sm text-gray-600">
                  Эти cookies необходимы для работы сайта и не могут быть отключены.
                </p>
              </div>
            </div>

            <!-- Analytics Cookies -->
            <div class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="analytics"
                [(ngModel)]="analyticsEnabled"
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <div class="flex-1">
                <label for="analytics" class="text-sm font-medium text-gray-900">
                  Аналитические cookies
                </label>
                <p class="text-sm text-gray-600">
                  Помогают нам понять, как посетители взаимодействуют с сайтом, собирая анонимную статистику.
                </p>
              </div>
            </div>

            <!-- Marketing Cookies -->
            <div class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketing"
                [(ngModel)]="marketingEnabled"
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <div class="flex-1">
                <label for="marketing" class="text-sm font-medium text-gray-900">
                  Маркетинговые cookies
                </label>
                <p class="text-sm text-gray-600">
                  Используются для показа релевантной рекламы и отслеживания эффективности маркетинговых кампаний.
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              (click)="saveSettings()"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Сохранить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CookiesBannerComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = false;

  showBanner = true;
  showSettings = false;

  analyticsEnabled = true;
  marketingEnabled = false;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.checkCookieConsent();
    }
  }

  private checkCookieConsent(): void {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      this.showBanner = false;
      const settings = JSON.parse(consent);
      this.analyticsEnabled = settings.analytics;
      this.marketingEnabled = settings.marketing;
    }
  }

  acceptAllCookies(): void {
    this.saveConsent(true, true);
    this.showBanner = false;
    this.initializeTracking();
  }

  acceptEssentialOnly(): void {
    this.saveConsent(false, false);
    this.showBanner = false;
  }

  openSettings(): void {
    this.showSettings = !this.showSettings;
  }

  saveSettings(): void {
    this.saveConsent(this.analyticsEnabled, this.marketingEnabled);
    this.showBanner = false;
    this.showSettings = false;
    this.initializeTracking();
  }

  private saveConsent(analytics: boolean, marketing: boolean): void {
    const consent = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    localStorage.setItem('cookie-consent', JSON.stringify(consent));
  }

  private initializeTracking(): void {
    // Здесь можно инициализировать аналитику
    // Google Analytics, Yandex Metrika и т.д.
    console.log('Tracking initialized with consent');
  }
}
