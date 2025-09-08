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
                   class="group p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 hover:bg-brand-sky/5 transition-all duration-300">
                <a [routerLink]="link.url" 
                   class="block space-y-2"
                   [class]="getPriorityClass(link.priority)">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">
                      {{ link.title }}
                    </h3>
                    <span class="text-xs px-2 py-1 rounded-full" 
                          [class]="getPriorityBadgeClass(link.priority)">
                      {{ getPriorityText(link.priority) }}
                    </span>
                  </div>
                  <p class="text-sm text-brand-dark/60">{{ link.description }}</p>
                  <div class="text-xs text-brand-sky font-mono">{{ link.url }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Дополнительная информация -->
        <div class="mt-12 bg-gradient-to-r from-brand-sky/10 to-brand-navy/10 rounded-xl p-8">
          <h3 class="text-xl font-bold text-brand-navy mb-4">Информация о сайте</h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 class="font-semibold text-brand-dark mb-2">Техническая информация</h4>
              <ul class="space-y-1 text-brand-dark/70">
                <li>• Всего страниц: {{ getTotalPages() }}</li>
                <li>• Последнее обновление: 27.01.2025</li>
                <li>• Технология: Angular SSR</li>
                <li>• Индексация: Разрешена</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-brand-dark mb-2">Поисковая оптимизация</h4>
              <ul class="space-y-1 text-brand-dark/70">
                <li>• Sitemap XML: <a href="/sitemap.xml" class="text-brand-sky hover:underline">Просмотреть</a></li>
                <li>• Robots.txt: <a href="/robots.txt" class="text-brand-sky hover:underline">Просмотреть</a></li>
                <li>• Структурированные данные: Подключены</li>
                <li>• SSL сертификат: Активен</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
        },
        {
          title: 'Отзывы клиентов',
          url: '/reviews',
          description: 'Отзывы о наших услугах',
          priority: 'low'
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
      case 'high': return 'border-l-4 border-l-green-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-gray-400';
      default: return '';
    }
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  getTotalPages(): number {
    return this.sitemapSections.reduce((total, section) => total + section.links.length, 0);
  }
} 