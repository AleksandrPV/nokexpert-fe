import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Проверка согласия пользователя на использование cookies
   */
  hasConsent(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('cookie-consent');
  }

  /**
   * Получение настроек cookies пользователя
   */
  getConsent(): CookieConsent | null {
    if (!this.isBrowser) return null;

    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        return JSON.parse(consent);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Сохранение согласия пользователя
   */
  setConsent(consent: Partial<CookieConsent>): void {
    if (!this.isBrowser) return;

    const fullConsent: CookieConsent = {
      essential: true,
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      timestamp: new Date().toISOString(),
      version: '1.0',
      ...consent
    };

    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
  }

  /**
   * Проверка, разрешены ли аналитические cookies
   */
  isAnalyticsEnabled(): boolean {
    const consent = this.getConsent();
    return consent ? consent.analytics : false;
  }

  /**
   * Проверка, разрешены ли маркетинговые cookies
   */
  isMarketingEnabled(): boolean {
    const consent = this.getConsent();
    return consent ? consent.marketing : false;
  }

  /**
   * Установка cookie
   */
  setCookie(name: string, value: string, days: number = 365): void {
    if (!this.isBrowser) return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  /**
   * Получение значения cookie
   */
  getCookie(name: string): string | null {
    if (!this.isBrowser) return null;

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Удаление cookie
   */
  deleteCookie(name: string): void {
    if (!this.isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }

  /**
   * Удаление всех не-essential cookies
   */
  deleteNonEssentialCookies(): void {
    if (!this.isBrowser) return;

    // Получаем все cookies
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();

      // Не удаляем essential cookies
      if (!this.isEssentialCookie(cookieName)) {
        this.deleteCookie(cookieName);
      }
    });
  }

  /**
   * Проверка, является ли cookie essential
   */
  private isEssentialCookie(cookieName: string): boolean {
    const essentialCookies = [
      'cookie-consent', // Наше соглашение
      'session', // Сессионные cookies
      'csrf', // Защита от CSRF
      'lang', // Язык интерфейса
      'theme' // Тема оформления
    ];

    return essentialCookies.some(essential => cookieName.includes(essential));
  }

  /**
   * Получение всех cookies для отладки
   */
  getAllCookies(): { [key: string]: string } {
    if (!this.isBrowser) return {};

    const cookies: { [key: string]: string } = {};
    const allCookies = document.cookie.split(';');

    allCookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[name.trim()] = value.trim();
      }
    });

    return cookies;
  }

  /**
   * Очистка устаревших настроек cookies
   */
  cleanOldConsent(): void {
    if (!this.isBrowser) return;

    const consent = this.getConsent();
    if (consent && consent.version !== '1.0') {
      localStorage.removeItem('cookie-consent');
    }
  }
}
