import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { SeoService } from '../../../shared/services/seo.service';
// import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

interface PopularPage {
  title: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">

          <!-- 404 Illustration -->
          <div class="mb-8">
            <div class="text-9xl font-bold text-blue-600 mb-4">404</div>
            <div class="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>

          <!-- Error Message -->
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Страница не найдена
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Извините, но страница, которую вы ищете, не существует или была перемещена.
            Возможно, вы ошиблись в адресе или ссылка устарела.
          </p>

          <!-- Search Form -->
          <div class="max-w-md mx-auto mb-12">
            <div class="relative">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (keyup.enter)="search()"
                placeholder="Поиск по сайту..."
                class="w-full px-4 py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                aria-label="Поиск по сайту">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                (click)="search()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Популярные разделы</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                *ngFor="let link of quickLinks"
                [routerLink]="link.url"
                class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span class="text-2xl">{{ link.icon }}</span>
                  </div>
                  <div class="flex-1 text-left">
                    <h3 class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {{ link.title }}
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">{{ link.description }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Popular Pages -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Часто посещаемые страницы</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <a
                *ngFor="let page of popularPages"
                [routerLink]="page.url"
                class="text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <h3 class="font-medium text-gray-900 hover:text-blue-700 transition-colors">
                  {{ page.title }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">{{ page.description }}</p>
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Нужна помощь?</h2>
            <p class="text-gray-600 mb-6">
              Свяжитесь с нами, и мы поможем найти нужную информацию или ответим на ваши вопросы.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                routerLink="/contacts"
                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Написать нам
              </a>
              <a
                routerLink="/"
                class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                На главную
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .group:hover .group-hover\\:bg-blue-200 {
      background-color: rgb(191 219 254);
    }
  `]
})
export class NotFoundPageComponent implements OnInit {
  private router: Router = inject(Router);

  searchQuery = '';

  quickLinks: QuickLink[] = [
    {
      title: 'Услуги по подготовке к НОК',
      description: 'Полный каталог услуг для подготовки к независимой оценке квалификации',
      url: '/services',
      icon: '📚',
      category: 'services'
    },
    {
      title: 'Часто задаваемые вопросы',
      description: 'Ответы на самые популярные вопросы о НОК',
      url: '/faq',
      icon: '❓',
      category: 'faq'
    },
    {
      title: 'Блог и новости',
      description: 'Актуальные статьи и новости о НОК и строительстве',
      url: '/blog',
      icon: '📰',
      category: 'blog'
    },
    {
      title: 'Что такое НОК',
      description: 'Подробная информация о независимой оценке квалификации',
      url: '/info/what-is-nok',
      icon: 'ℹ️',
      category: 'info'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Специализированная подготовка для строителей',
      url: '/services/nok-nostroy',
      icon: '🏗️',
      category: 'services'
    },
    {
      title: 'Контакты',
      description: 'Свяжитесь с нами для консультации',
      url: '/contacts',
      icon: '📞',
      category: 'contacts'
    }
  ];

  popularPages: PopularPage[] = [
    {
      title: 'Подготовка к НОК НОСТРОЙ',
      url: '/services/nok-nostroy',
      description: 'Программа подготовки для строителей'
    },
    {
      title: 'Требования к НОК',
      url: '/info/what-is-nok',
      description: 'Что нужно для прохождения НОК'
    },
    {
      title: 'Документы для НОК',
      url: '/faq',
      description: 'Какие документы нужны'
    },
    {
      title: 'Стоимость подготовки',
      url: '/services',
      description: 'Цены на услуги подготовки'
    }
  ];

  ngOnInit(): void {
    // SEO настройки временно отключены
    console.log('404 page loaded');
  }

  search(): void {
    if (this.searchQuery.trim()) {
      // Перенаправляем на FAQ с поиском
      this.router.navigate(['/faq'], {
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }
}
