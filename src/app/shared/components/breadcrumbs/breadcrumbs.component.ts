import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav aria-label="Хлебные крошки" class="breadcrumbs">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <a 
            routerLink="/" 
            class="hover:text-brand-navy transition-colors duration-200 flex items-center"
            aria-label="Главная страница">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </a>
        </li>
        
        <li class="flex items-center">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </li>
        
        <ng-container *ngFor="let item of breadcrumbs; let last = last; let index = index">
          <li>
            <ng-container *ngIf="!last && item.url; else currentItem">
              <a 
                [routerLink]="item.url"
                class="hover:text-brand-navy transition-colors duration-200 flex items-center"
                [attr.aria-label]="item.label">
                <span *ngIf="item.icon" class="mr-1">{{ item.icon }}</span>
                {{ item.label }}
              </a>
            </ng-container>
            <ng-template #currentItem>
              <span class="text-brand-navy font-medium flex items-center" aria-current="page">
                <span *ngIf="item.icon" class="mr-1">{{ item.icon }}</span>
                {{ item.label }}
              </span>
            </ng-template>
          </li>
          
          <li *ngIf="!last" class="flex items-center">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </li>
        </ng-container>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      @apply py-4 px-6 bg-white border-b border-gray-100;
    }
    
    .breadcrumbs ol {
      @apply max-w-7xl mx-auto;
    }
    
    .breadcrumbs a:hover {
      @apply text-blue-900;
    }
    
    .breadcrumbs span[aria-current="page"] {
      @apply text-blue-900 font-medium;
    }
  `]
}) 
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // Добавляем structured data для хлебных крошек
    if (this.breadcrumbs.length > 0) {
      const structuredBreadcrumbs = this.breadcrumbs.map(item => ({
        name: item.label,
        url: item.url || ''
      }));
      this.seoService.addBreadcrumbsStructuredData(structuredBreadcrumbs);
    }

    // Устанавливаем ARIA метки для accessibility
    this.setAriaLabels();
  }

  private setAriaLabels(): void {
    // Устанавливаем aria-current для активного элемента
    // Только в браузерной среде
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const currentElement = document.querySelector('[aria-current="page"]');
        if (currentElement) {
          currentElement.setAttribute('aria-current', 'page');
        }
      });
    }
  }
} 