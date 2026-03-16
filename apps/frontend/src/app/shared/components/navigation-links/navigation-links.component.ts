import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface NavigationLink {
  title: string;
  route: string;
  icon: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-navigation-links',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-12 bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-brand-dark mb-2">Навигация по сайту</h3>
          <p class="text-brand-dark/60">Быстрый доступ к основным разделам</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <!-- Основные разделы -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
              <span>📚</span>
              Информация о НОК
            </h4>
            <div class="space-y-2">
              <a 
                *ngFor="let link of infoLinks"
                [routerLink]="link.route"
                class="group flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-sky/30">
                <span class="text-lg">{{ link.icon }}</span>
                <div class="flex-1">
                  <div class="font-medium text-brand-dark group-hover:text-brand-navy transition-colors">
                    {{ link.title }}
                  </div>
                  <div class="text-sm text-brand-dark/60">
                    {{ link.description }}
                  </div>
                </div>
                <span class="text-brand-coral opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>

          <!-- Услуги -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
              <span>🏗️</span>
              Услуги
            </h4>
            <div class="space-y-2">
              <a 
                *ngFor="let link of serviceLinks"
                [routerLink]="link.route"
                class="group flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-sky/30">
                <span class="text-lg">{{ link.icon }}</span>
                <div class="flex-1">
                  <div class="font-medium text-brand-dark group-hover:text-brand-navy transition-colors">
                    {{ link.title }}
                  </div>
                  <div class="text-sm text-brand-dark/60">
                    {{ link.description }}
                  </div>
                </div>
                <span class="text-brand-coral opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>

          <!-- Справочники -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
              <span>📋</span>
              Справочники
            </h4>
            <div class="space-y-2">
              <a 
                *ngFor="let link of referenceLinks"
                [routerLink]="link.route"
                class="group flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-sky/30">
                <span class="text-lg">{{ link.icon }}</span>
                <div class="flex-1">
                  <div class="font-medium text-brand-dark group-hover:text-brand-navy transition-colors">
                    {{ link.title }}
                  </div>
                  <div class="text-sm text-brand-dark/60">
                    {{ link.description }}
                  </div>
                </div>
                <span class="text-brand-coral opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class NavigationLinksComponent implements OnInit {
  @Input() currentPage: string = '';
  
  infoLinks: NavigationLink[] = [];
  serviceLinks: NavigationLink[] = [];
  referenceLinks: NavigationLink[] = [];

  ngOnInit(): void {
    this.loadNavigationLinks();
  }

  private loadNavigationLinks(): void {
    // Ссылки на информацию о НОК
    this.infoLinks = [
      {
        title: 'Что такое НОК',
        route: '/info/what-is-nok',
        icon: '❓',
        description: 'Основы независимой оценки квалификации',
        category: 'info'
      },
      {
        title: 'Кому обязательно проходить НОК',
        route: '/info/who-must-pass-nok',
        icon: '👥',
        description: 'Список обязательных специалистов',
        category: 'info'
      },
      {
        title: 'Процедура прохождения НОК',
        route: '/info/nok-procedure',
        icon: '📋',
        description: 'Пошаговая инструкция',
        category: 'info'
      },
      {
        title: 'Подготовка к экзамену',
        route: '/info/exam-preparation',
        icon: '📖',
        description: 'Методики и литература',
        category: 'info'
      }
    ];

    // Ссылки на услуги
    this.serviceLinks = [
      {
        title: 'НОК НОСТРОЙ',
        route: '/services/nok-nostroy',
        icon: '🏗️',
        description: 'Строительные специальности',
        category: 'services'
      },
      {
        title: 'НОК НОПРИЗ',
        route: '/services/nok-nopriz',
        icon: '📐',
        description: 'Проектирование и изыскания',
        category: 'services'
      },
      {
        title: 'НОК ОПБ',
        route: '/services/nok-opb',
        icon: '🔥',
        description: 'Пожарная безопасность',
        category: 'services'
      },
      {
        title: 'Все услуги',
        route: '/services',
        icon: '📋',
        description: 'Полный каталог услуг',
        category: 'services'
      }
    ];

    // Справочные ссылки
    this.referenceLinks = [
      {
        title: 'Центры оценки квалификации',
        route: '/qa-centers',
        icon: '🏢',
        description: 'Официальные ЦОК',
        category: 'reference'
      },
      {
        title: 'Реестр специалистов НРС',
        route: '/info/specialists-registry',
        icon: '📜',
        description: 'Проверка статуса',
        category: 'reference'
      },
      {
        title: 'Законодательство НОК',
        route: '/info/nok-legislation',
        icon: '⚖️',
        description: 'Нормативные акты',
        category: 'reference'
      },
      {
        title: 'FAQ',
        route: '/faq',
        icon: '❔',
        description: 'Частые вопросы',
        category: 'reference'
      }
    ];

    // Убираем текущую страницу из списка
    this.removeCurrentPageFromLinks();
  }

  private removeCurrentPageFromLinks(): void {
    const currentRoute = this.getCurrentRoute();
    
    this.infoLinks = this.infoLinks.filter(link => link.route !== currentRoute);
    this.serviceLinks = this.serviceLinks.filter(link => link.route !== currentRoute);
    this.referenceLinks = this.referenceLinks.filter(link => link.route !== currentRoute);
  }

  private getCurrentRoute(): string {
    // Определяем текущий маршрут на основе currentPage
    const routeMap: { [key: string]: string } = {
      'what-is-nok': '/info/what-is-nok',
      'who-must-pass-nok': '/info/who-must-pass-nok',
      'nok-procedure': '/info/nok-procedure',
      'exam-preparation': '/info/exam-preparation',
      'portfolio-guide': '/info/portfolio-guide',
      'online-trainer': '/info/online-trainer',
      'nok-qa': '/info/nok-qa',
      'specialists-registry': '/info/specialists-registry',
      'nok-legislation': '/info/nok-legislation',
      'nok-nostroy': '/services/nok-nostroy',
      'nok-nopriz': '/services/nok-nopriz',
      'nok-opb': '/services/nok-opb',
      'qa-centers': '/qa-centers',
      'faq': '/faq',
      'home': '/'
    };

    return routeMap[this.currentPage] || '';
  }
} 