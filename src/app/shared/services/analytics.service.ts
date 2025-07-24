import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Глобальные типы для аналитики
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    ym: (id: string, action: string, target: string, params?: any) => void;
  }
}

const gtag = typeof window !== 'undefined' ? window.gtag : undefined;
const ym = typeof window !== 'undefined' ? window.ym : undefined;

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PageView {
  page: string;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private router = inject(Router);

  constructor() {
    // Отслеживаем навигацию по страницам
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView({
          page: event.url,
          title: document.title,
          url: event.url
        });
      });
  }

  /**
   * Отслеживание просмотра страницы
   */
  trackPageView(pageView: PageView): void {
    // Google Analytics 4
    if (gtag) {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageView.title,
        page_location: window.location.href,
        page_path: pageView.url
      });
    }

    // Yandex Metrika
    if (ym) {
      ym('YM_ID', 'hit', pageView.url, {
        title: pageView.title
      });
    }

    console.log('Page View:', pageView);
  }

  /**
   * Отслеживание события
   */
  trackEvent(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (gtag) {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    // Yandex Metrika
    if (ym) {
      ym('YM_ID', 'reachGoal', event.action, {
        category: event.category,
        label: event.label,
        value: event.value
      });
    }

    console.log('Event:', event);
  }

  /**
   * Отслеживание клика по кнопке
   */
  trackButtonClick(buttonName: string, page: string = ''): void {
    this.trackEvent({
      action: 'button_click',
      category: 'engagement',
      label: `${buttonName} - ${page || window.location.pathname}`
    });
  }

  /**
   * Отслеживание отправки формы
   */
  trackFormSubmit(formName: string, page: string = ''): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'lead_generation',
      label: `${formName} - ${page || window.location.pathname}`
    });
  }

  /**
   * Отслеживание звонка
   */
  trackPhoneCall(phoneNumber: string): void {
    this.trackEvent({
      action: 'phone_call',
      category: 'contact',
      label: phoneNumber
    });
  }

  /**
   * Отслеживание перехода по внешней ссылке
   */
  trackExternalLink(url: string, linkText: string): void {
    this.trackEvent({
      action: 'external_link',
      category: 'navigation',
      label: `${linkText} - ${url}`
    });
  }

  /**
   * Отслеживание времени на странице
   */
  trackTimeOnPage(page: string, timeSpent: number): void {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: page,
      value: Math.round(timeSpent / 1000) // в секундах
    });
  }

  /**
   * Отслеживание прокрутки страницы
   */
  trackScrollDepth(depth: number): void {
    this.trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth
    });
  }

  /**
   * Отслеживание поиска
   */
  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount
    });
  }

  /**
   * Отслеживание фильтрации
   */
  trackFilter(filterType: string, filterValue: string): void {
    this.trackEvent({
      action: 'filter',
      category: 'engagement',
      label: `${filterType}: ${filterValue}`
    });
  }

  /**
   * Отслеживание ошибки
   */
  trackError(error: string, page: string = ''): void {
    this.trackEvent({
      action: 'error',
      category: 'error',
      label: `${error} - ${page || window.location.pathname}`
    });
  }

  /**
   * Отслеживание конверсии
   */
  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent({
      action: 'conversion',
      category: 'conversion',
      label: conversionType,
      value: value
    });
  }
} 