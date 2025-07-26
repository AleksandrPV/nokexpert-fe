import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { CustomerReviewsComponent } from '../../shared/components/customer-reviews/customer-reviews.component';
import { SeoService } from '../../shared/services/seo.service';
import { ReviewsService, CustomerReview } from '../../shared/services/reviews.service';
import { OrganizationService } from '../../shared/services/organization.service';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, CustomerReviewsComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <!-- Breadcrumbs -->
      <app-breadcrumbs 
        [breadcrumbs]="[
          { label: 'Главная', url: '/', active: false },
          { label: 'Отзывы клиентов', url: '/reviews', active: true }
        ]">
      </app-breadcrumbs>

      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy mb-6">
              Отзывы наших клиентов
            </h1>
            <p class="text-xl sm:text-2xl text-brand-dark/80 mb-8 leading-relaxed">
              Более {{ reviewsCount }} довольных специалистов уже прошли НОК с нашей помощью
            </p>
            
            <!-- Общий рейтинг -->
            <div class="flex items-center justify-center gap-6 mb-8">
              <div class="flex items-center gap-3">
                <div class="flex">
                  <span *ngFor="let star of [1,2,3,4,5]" class="text-3xl">
                    {{ star <= averageRating ? '⭐' : '☆' }}
                  </span>
                </div>
                <span class="text-2xl font-bold text-brand-dark">{{ averageRating }}/5</span>
              </div>
              <span class="text-brand-dark/60 text-xl">•</span>
              <span class="text-brand-dark/60 text-xl">{{ reviewsCount }} отзывов</span>
            </div>

            <!-- Фильтры -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                (click)="filterByService('')"
                [class]="selectedFilter === '' ? 'bg-brand-navy text-white' : 'bg-white/80 text-brand-dark'"
                class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                Все отзывы
              </button>
              <button 
                (click)="filterByService('НОК НОСТРОЙ')"
                [class]="selectedFilter === 'НОК НОСТРОЙ' ? 'bg-brand-navy text-white' : 'bg-white/80 text-brand-dark'"
                class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                НОК НОСТРОЙ
              </button>
              <button 
                (click)="filterByService('НОК НОПРИЗ')"
                [class]="selectedFilter === 'НОК НОПРИЗ' ? 'bg-brand-navy text-white' : 'bg-white/80 text-brand-dark'"
                class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                НОК НОПРИЗ
              </button>
              <button 
                (click)="filterByService('НОК ОПБ')"
                [class]="selectedFilter === 'НОК ОПБ' ? 'bg-brand-navy text-white' : 'bg-white/80 text-brand-dark'"
                class="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                НОК ОПБ
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Все отзывы -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div 
              *ngFor="let review of filteredReviews"
              class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-sky/20">
              
              <!-- Заголовок отзыва -->
              <div class="flex items-start justify-between mb-6">
                <h3 class="font-semibold text-brand-dark text-xl leading-tight flex-1 mr-4">
                  {{ review.reviewTitle }}
                </h3>
                <div class="flex">
                  <span *ngFor="let star of [1,2,3,4,5]" class="text-xl">
                    {{ star <= review.rating ? '⭐' : '☆' }}
                  </span>
                </div>
              </div>

              <!-- Текст отзыва -->
              <p class="text-brand-dark/70 mb-6 leading-relaxed text-lg">
                "{{ review.reviewBody }}"
              </p>

              <!-- Информация об авторе -->
              <div class="border-t border-brand-sky/20 pt-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-brand-sky to-brand-navy rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {{ review.author.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-brand-dark text-lg">{{ review.author }}</div>
                    <div class="text-brand-dark/60" *ngIf="review.position">
                      {{ review.position }}
                    </div>
                    <div class="text-brand-dark/60" *ngIf="review.company">
                      {{ review.company }}
                    </div>
                  </div>
                </div>
                
                <!-- Дополнительная информация -->
                <div class="flex items-center justify-between mt-6 text-sm text-brand-dark/50">
                  <span class="bg-brand-sky/10 text-brand-navy px-3 py-1 rounded-full font-medium">
                    {{ review.serviceType }}
                  </span>
                  <div class="flex items-center gap-4">
                    <span *ngIf="review.verified" class="flex items-center gap-1">
                      <span class="text-green-500">✓</span>
                      Проверенный
                    </span>
                    <span class="flex items-center gap-1">
                      <span>👍</span>
                      {{ review.helpful }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Пагинация -->
          <div class="text-center mt-12" *ngIf="filteredReviews.length > 6">
            <div class="flex justify-center gap-2">
              <button 
                *ngFor="let page of getPages()"
                (click)="goToPage(page)"
                [class]="currentPage === page ? 'bg-brand-navy text-white' : 'bg-white/80 text-brand-dark'"
                class="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-gradient-to-r from-brand-navy to-brand-sky text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">
            Готовы присоединиться к нашим довольным клиентам?
          </h2>
          <p class="text-xl mb-8 opacity-90">
            Получите профессиональную подготовку к НОК и гарантированно сдайте экзамен
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              (click)="openConsultationPopup()"
              class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-white bg-white/20 backdrop-blur-sm">
              📞 Бесплатная консультация
            </button>
            <a 
              href="tel:{{ organizationService.getPhoneHref() }}"
              class="glass px-8 py-4 rounded-full font-semibold text-white hover-lift border-white/30">
              📱 {{ organizationService.getPhoneDisplay() }}
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class ReviewsPageComponent implements OnInit {
  reviews: CustomerReview[] = [];
  filteredReviews: CustomerReview[] = [];
  selectedFilter: string = '';
  averageRating: number = 5.0;
  reviewsCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  
  private reviewsService = inject(ReviewsService);
  private seoService = inject(SeoService);
  public organizationService = inject(OrganizationService);

  ngOnInit(): void {
    this.loadReviews();
    this.loadStats();
    this.seoService.setSeoData({
      title: 'Отзывы клиентов - НОК Эксперт | Реальные отзывы о подготовке к НОК',
      description: 'Читайте отзывы наших клиентов о подготовке к НОК. Более 3000+ довольных специалистов уже прошли НОК с нашей помощью. Реальные отзывы с рейтингом 5/5.',
      keywords: 'отзывы НОК, отзывы о подготовке к НОК, отзывы клиентов НОК Эксперт, реальные отзывы НОК',
      canonical: 'https://нок-эксперт.рф/reviews'
    });
    
    // Добавляем Review schema
    this.seoService.addCustomerReviewsStructuredData();
  }

  private loadReviews(): void {
    this.reviewsService.getReviews().subscribe((reviews: CustomerReview[]) => {
      this.reviews = reviews;
      this.filteredReviews = reviews;
    });
  }

  private loadStats(): void {
    this.reviewsService.getAverageRating().subscribe((rating: number) => {
      this.averageRating = rating;
    });

    this.reviewsService.getReviewsCount().subscribe((count: number) => {
      this.reviewsCount = count;
    });
  }

  filterByService(serviceType: string): void {
    this.selectedFilter = serviceType;
    this.currentPage = 1;
    
    if (serviceType === '') {
      this.filteredReviews = this.reviews;
    } else {
      this.filteredReviews = this.reviews.filter(review => 
        review.serviceType === serviceType
      );
    }
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.filteredReviews.length / this.itemsPerPage);
    const pages: number[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  openConsultationPopup(): void {
    // Здесь можно добавить логику открытия popup
    console.log('Открыть popup консультации');
  }
} 