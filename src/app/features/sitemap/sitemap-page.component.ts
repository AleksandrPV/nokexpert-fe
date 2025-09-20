import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

interface SitemapSection {
  title: string;
  description: string;
  icon: string;
  links: SitemapLink[];
}

interface SitemapLink {
  title: string;
  url: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-sitemap-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Заголовок -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-brand-navy mb-4">Карта сайта НОК Эксперт</h1>
          <p class="text-lg text-brand-dark/70">
            Полный список всех страниц сайта для удобной навигации
          </p>
        </div>

        <!-- Основные разделы -->
        <div class="space-y-12">
          <div *ngFor="let section of sitemapSections" class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-brand-navy mb-4 flex items-center gap-3">
              <span class="text-2xl">{{ section.icon }}</span>
              {{ section.title }}
            </h2>
            <p class="text-brand-dark/70 mb-6">{{ section.description }}</p>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div *ngFor="let link of section.links"
                   class="group relative p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 hover:bg-gradient-to-br hover:from-brand-sky/5 hover:to-brand-navy/5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-sky/10"
                   [class]="getPriorityClass(link.priority)">
                <a [routerLink]="link.url"
                   class="block space-y-2 relative z-10">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors duration-300">
                      {{ link.title }}
                    </h3>
                    <span class="text-xs px-2 py-1 rounded-full font-medium"
                          [class]="getPriorityBadgeClass(link.priority)">
                      {{ getPriorityText(link.priority) }}
                    </span>
                  </div>
                  <p class="text-sm text-brand-dark/60 group-hover:text-brand-dark/80 transition-colors duration-300">{{ link.description }}</p>
                  <div class="text-xs text-brand-sky font-mono opacity-75 group-hover:opacity-100 transition-opacity duration-300">{{ link.url }}</div>
                </a>

                <!-- Декоративные элементы -->
                <div class="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-brand-sky/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-tr from-brand-navy/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* Анимации для полосок приоритета */
    [class*="before:bg-gradient-to-b"]:hover:before {
      animation: pulse-strip 2s ease-in-out infinite;
      filter: brightness(1.2);
    }

    @keyframes pulse-strip {
      0%, 100% { opacity: 1; transform: scaleY(1); }
      50% { opacity: 0.8; transform: scaleY(1.05); }
    }

    /* Эффекты для карточек при hover */
    .group:hover {
      transform: translateX(2px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Градиентные эффекты для полосок */
    [class*="before:bg-gradient-to-b"]:before {
      content: '';
      transition: all 0.3s ease;
    }

    /* Улучшенные стили для полосок приоритета */
    .before\\:bg-gradient-to-b:before {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }

    /* Адаптивность для мобильных устройств */
    @media (max-width: 768px) {
      .group:hover {
        transform: none;
      }

      [class*="before:bg-gradient-to-b"]:before {
        width: 2px;
      }
    }
  `]
})
export class SitemapPageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private seoService = inject(SeoService);

  sitemapSections: SitemapSection[] = [
    {
      title: 'Главные страницы',
      description: 'Основные разделы сайта с высокой приоритетностью',
      icon: '🏠',
      links: [
        {
          title: 'Главная страница',
          url: '/',
          description: 'Главная страница сайта с обзором услуг',
          priority: 'high'
        },
        {
          title: 'Услуги',
          url: '/services',
          description: 'Каталог всех услуг по подготовке к НОК',
          priority: 'high'
        },
        {
          title: 'Контакты',
          url: '/contacts',
          description: 'Контактная информация и форма обратной связи',
          priority: 'high'
        }
      ]
    },
    {
      title: 'Информация о НОК',
      description: 'Образовательные материалы и справочная информация',
      icon: '📚',
      links: [
        {
          title: 'Что такое НОК',
          url: '/info/what-is-nok',
          description: 'Основы независимой оценки квалификации',
          priority: 'high'
        },
        {
          title: 'Кому обязательно проходить НОК',
          url: '/info/who-must-pass-nok',
          description: 'Список обязательных специалистов',
          priority: 'high'
        },
        {
          title: 'Процедура прохождения НОК',
          url: '/info/nok-procedure',
          description: 'Пошаговая инструкция по прохождению',
          priority: 'medium'
        },
        {
          title: 'Подготовка к экзамену',
          url: '/info/exam-preparation',
          description: 'Методики и материалы для подготовки',
          priority: 'medium'
        },
        {
          title: 'Онлайн-тренажер',
          url: '/info/online-trainer',
          description: 'Интерактивные тесты для подготовки',
          priority: 'medium'
        }
      ]
    },
    {
      title: 'Услуги',
      description: 'Специализированные услуги по подготовке к НОК',
      icon: '🏗️',
      links: [
        {
          title: 'НОК НОСТРОЙ',
          url: '/services/nok-nostroy',
          description: 'Подготовка к НОК для строительных специальностей',
          priority: 'high'
        },
        {
          title: 'НОК НОПРИЗ',
          url: '/services/nok-nopriz',
          description: 'Подготовка к НОК для проектировщиков',
          priority: 'high'
        },
        {
          title: 'НОК ОПБ',
          url: '/services/nok-opb',
          description: 'Подготовка к НОК по пожарной безопасности',
          priority: 'high'
        }
      ]
    },
    {
      title: 'Справочники',
      description: 'Полезные справочные материалы и базы данных',
      icon: '📋',
      links: [
        {
          title: 'FAQ - Частые вопросы',
          url: '/faq',
          description: 'Ответы на часто задаваемые вопросы',
          priority: 'medium'
        },
        {
          title: 'Центры оценки',
          url: '/qa-centers',
          description: 'Список центров оценки квалификации',
          priority: 'medium'
        },
        {
          title: 'Квалификации',
          url: '/qualifications',
          description: 'Справочник квалификаций и специальностей',
          priority: 'medium'
        }
      ]
    },
  ];

  ngOnInit(): void {
    if (this.isBrowser) {
      this.seoService.setSeoData({
        title: 'Карта сайта - НОК Эксперт',
        description: 'Полная карта сайта НОК Эксперт. Навигация по всем разделам и страницам сайта.',
        keywords: 'карта сайта, навигация, НОК Эксперт, структура сайта',
        canonical: 'https://nok-expert.ru/sitemap',
        noIndex: false
      });
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-green-400 before:to-green-600 before:shadow-lg before:shadow-green-400/30';
      case 'medium': return 'relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-yellow-400 before:to-orange-500 before:shadow-lg before:shadow-yellow-400/30';
      case 'low': return 'relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-gray-400 before:to-gray-600 before:shadow-lg before:shadow-gray-400/20';
      default: return '';
    }
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm';
      case 'medium': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-yellow-200 shadow-sm';
      case 'low': return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200 shadow-sm';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200 shadow-sm';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Неизвестно';
    }
  }

} 