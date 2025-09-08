import { Injectable, inject, PLATFORM_ID, ErrorHandler } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'navigation' | 'paint' | 'interaction' | 'resource';
}

export interface ErrorEvent {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: number;
  type: 'javascript' | 'promise' | 'resource' | 'network';
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringService implements ErrorHandler {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(this.platformId);

  private metrics: PerformanceMetric[] = [];
  private errors: ErrorEvent[] = [];
  private sessionId = this.generateSessionId();

  constructor() {
    if (this.isBrowser) {
      this.initializePerformanceMonitoring();
      this.initializeErrorMonitoring();
      this.initializeNavigationMonitoring();
    }
  }

  /**
   * Обработка ошибок приложения
   */
  handleError(error: any): void {
    const errorEvent: ErrorEvent = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: this.isBrowser ? window.location.href : '',
      userAgent: this.isBrowser ? navigator.userAgent : '',
      timestamp: Date.now(),
      type: 'javascript'
    };

    this.errors.push(errorEvent);
    console.error('Application Error:', error);

    // Отправка ошибки в аналитику (если разрешено)
    this.reportError(errorEvent);

    // В production режиме не выбрасываем ошибку повторно
    if (!this.isDevelopment()) {
      // Можно показать пользователю уведомление об ошибке
      this.showErrorNotification(errorEvent.message);
    }
  }

  /**
   * Инициализация мониторинга производительности
   */
  private initializePerformanceMonitoring(): void {
    // Web Vitals
    this.observeWebVitals();

    // Navigation Timing
    this.observeNavigationTiming();

    // Resource Loading
    this.observeResourceTiming();

    // User Interactions
    this.observeUserInteractions();
  }

  /**
   * Мониторинг Web Vitals
   */
  private observeWebVitals(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.recordMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            category: 'paint',
            timestamp: Date.now()
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.recordMetric({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              category: 'interaction',
              timestamp: Date.now()
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });

          this.recordMetric({
            name: 'CLS',
            value: clsValue,
            category: 'paint',
            timestamp: Date.now()
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    }
  }

  /**
   * Мониторинг навигации
   */
  private observeNavigationTiming(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation) {
          this.recordMetric({
            name: 'Navigation Timing',
            value: navigation.loadEventEnd - navigation.fetchStart,
            category: 'navigation',
            timestamp: Date.now()
          });

          // Отдельные метрики
          this.recordMetric({
            name: 'DNS Lookup',
            value: navigation.domainLookupEnd - navigation.domainLookupStart,
            category: 'navigation',
            timestamp: Date.now()
          });

          this.recordMetric({
            name: 'TCP Connect',
            value: navigation.connectEnd - navigation.connectStart,
            category: 'navigation',
            timestamp: Date.now()
          });

          this.recordMetric({
            name: 'Server Response',
            value: navigation.responseEnd - navigation.requestStart,
            category: 'navigation',
            timestamp: Date.now()
          });
        }
      }, 0);
    });
  }

  /**
   * Мониторинг загрузки ресурсов
   */
  private observeResourceTiming(): void {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Проверяем, что это ресурсная запись
            if (entry.entryType === 'resource' && 'duration' in entry) {
              const resourceEntry = entry as PerformanceResourceTiming;
              // Мониторим только крупные ресурсы
              if (resourceEntry.duration > 1000) {
              this.recordMetric({
                name: `Resource: ${resourceEntry.name.split('/').pop()}`,
                value: resourceEntry.duration,
                category: 'resource',
                timestamp: Date.now()
              });
            }
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Resource monitoring not supported:', error);
      }
    }
  }

  /**
   * Мониторинг пользовательских взаимодействий
   */
  private observeUserInteractions(): void {
    let interactionCount = 0;
    const maxInteractions = 10;

    const observeInteraction = (event: Event) => {
      if (interactionCount < maxInteractions) {
        interactionCount++;
        this.recordMetric({
          name: `User Interaction: ${event.type}`,
          value: performance.now(),
          category: 'interaction',
          timestamp: Date.now()
        });
      }
    };

    // Слушаем основные взаимодействия
    document.addEventListener('click', observeInteraction, { passive: true });
    document.addEventListener('scroll', observeInteraction, { passive: true });
    document.addEventListener('keydown', observeInteraction, { passive: true });
  }

  /**
   * Мониторинг навигации по страницам
   */
  private initializeNavigationMonitoring(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Отправляем информацию о просмотре страницы
        this.trackPageView(event.url);
      });
  }

  /**
   * Мониторинг ошибок
   */
  private initializeErrorMonitoring(): void {
    // Обработка необработанных promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      const errorEvent: ErrorEvent = {
        message: `Unhandled Promise Rejection: ${event.reason}`,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        type: 'promise'
      };

      this.errors.push(errorEvent);
      this.reportError(errorEvent);
    });

    // Мониторинг загрузки ресурсов
    window.addEventListener('error', (event) => {
      if (event.target instanceof HTMLElement) {
        const errorEvent: ErrorEvent = {
          message: `Resource failed to load: ${event.target.tagName}`,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
          type: 'resource'
        };

        this.errors.push(errorEvent);
        this.reportError(errorEvent);
      }
    }, true);
  }

  /**
   * Запись метрики производительности
   */
  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Храним только последние 100 метрик
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Отправляем метрику в аналитику
    this.reportMetric(metric);
  }

  /**
   * Отправка метрики в аналитику
   */
  private reportMetric(metric: PerformanceMetric): void {
    // Отправляем в Yandex Metrika или Google Analytics
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104076182, 'reachGoal', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_category: metric.category
      });
    }

    console.log('Performance Metric:', metric);
  }

  /**
   * Отправка ошибки в аналитику
   */
  private reportError(error: ErrorEvent): void {
    // Отправляем в Yandex Metrika
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104076182, 'reachGoal', 'javascript_error', {
        error_message: error.message,
        error_url: error.url,
        error_type: error.type
      });
    }

    console.error('Reported Error:', error);
  }

  /**
   * Отслеживание просмотра страницы
   */
  private trackPageView(url: string): void {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104076182, 'hit', url);
    }
  }

  /**
   * Показ уведомления об ошибке пользователю
   */
  private showErrorNotification(message: string): void {
    // Создаем простое уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      max-width: 400px;
      font-size: 14px;
      cursor: pointer;
    `;
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 8px;">Произошла ошибка</div>
      <div style="opacity: 0.9;">${message}</div>
      <div style="margin-top: 12px; font-size: 12px; opacity: 0.7;">Нажмите, чтобы скрыть</div>
    `;

    notification.onclick = () => {
      notification.remove();
    };

    document.body.appendChild(notification);

    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  /**
   * Генерация уникального ID сессии
   */
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Проверка режима разработки
   */
  private isDevelopment(): boolean {
    return typeof window !== 'undefined' && window.location.hostname === 'localhost';
  }

  /**
   * Получение метрик производительности
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Получение ошибок
   */
  getErrors(): ErrorEvent[] {
    return [...this.errors];
  }

  /**
   * Очистка метрик (для тестирования)
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Очистка ошибок (для тестирования)
   */
  clearErrors(): void {
    this.errors = [];
  }
}
