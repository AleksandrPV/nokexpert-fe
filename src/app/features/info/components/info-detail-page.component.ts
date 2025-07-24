import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage, InfoCategory } from '../models/info-page.interface';

/**
 * Компонент детальной страницы информации о НОК
 * Отображает подробную информацию по конкретной теме
 */
@Component({
  selector: 'app-info-detail-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  template: `
    <!-- Хлебные крошки -->
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <!-- Page Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-6">
            {{ page?.title }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {{ page?.description }}
          </p>
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              {{ page?.readTime }} мин чтения
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
              Обновлено {{ page?.lastUpdated | date:'dd.MM.yyyy' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed">
              Здесь будет содержимое страницы "{{ page?.title }}". 
              Подробная информация в контексте независимой оценки квалификации.
            </p>
            
            <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">
              Основные моменты
            </h2>
            
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Важный аспект 1</li>
              <li>Важный аспект 2</li>
              <li>Важный аспект 3</li>
            </ul>
            
            <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">
              Дополнительная информация
            </h2>
            
            <p class="text-gray-700 leading-relaxed">
              Дополнительные детали и пояснения по теме "{{ page?.title }}".
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .prose {
      @apply text-gray-700;
    }
    
    .prose h2 {
      @apply text-blue-900 font-bold;
    }
    
    .prose ul {
      @apply list-disc list-inside;
    }
  `]
})
export class InfoDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private infoService = inject(InfoService);

  page: InfoPage | null = null;
  category: InfoCategory | null = null;
  breadcrumbs: BreadcrumbItem[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadPage(slug);
    });
  }

  private loadPage(slug: string): void {
    this.infoService.getPageBySlug(slug).subscribe(page => {
      if (page) {
        this.page = page;
        this.category = page.category || null;
        this.setupBreadcrumbs();
        this.setupSEO();
      }
    });
  }

  private setupBreadcrumbs(): void {
    this.breadcrumbs = [
      { label: 'Информация о НОК', url: '/info', icon: '📋' }
    ];

    if (this.category && this.category.name && this.category.slug) {
      this.breadcrumbs.push({
        label: this.category.name,
        url: `/info/category/${this.category.slug}`,
        icon: this.category.icon || '📁'
      });
    }

    if (this.page && this.page.title) {
      this.breadcrumbs.push({
        label: this.page.title,
        active: true,
        icon: this.page.icon || '📄'
      });
    }
  }

  private setupSEO(): void {
    if (this.page) {
      this.seoService.setInfoSubPageSeo(this.page, this.category);
    }
  }
} 