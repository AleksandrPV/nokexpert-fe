import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewsService, CustomerReview } from '../../services/reviews.service';

@Component({
  selector: 'app-customer-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-16 bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-brand-dark mb-4">Отзывы наших клиентов</h2>
          <p class="text-lg text-brand-dark/60 mb-6">Более {{ reviewsCount }} довольных специалистов уже прошли НОК с нашей помощью</p>
          
          <!-- Общий рейтинг -->
          <div class="flex items-center justify-center gap-4 mb-8">
            <div class="flex items-center gap-2">
              <div class="flex">
                <span *ngFor="let star of [1,2,3,4,5]" class="text-2xl">
                  {{ star <= averageRating ? '⭐' : '☆' }}
                </span>
              </div>
              <span class="text-xl font-bold text-brand-dark">{{ averageRating }}/5</span>
            </div>
            <span class="text-brand-dark/60">•</span>
            <span class="text-brand-dark/60">{{ reviewsCount }} отзывов</span>
          </div>
        </div>

        <!-- Отзывы -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div 
            *ngFor="let review of reviews"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-sky/20">
            
            <!-- Заголовок отзыва -->
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-semibold text-brand-dark text-lg leading-tight">
                {{ review.reviewTitle }}
              </h3>
              <div class="flex">
                <span *ngFor="let star of [1,2,3,4,5]" class="text-lg">
                  {{ star <= review.rating ? '⭐' : '☆' }}
                </span>
              </div>
            </div>

            <!-- Текст отзыва -->
            <p class="text-brand-dark/70 mb-4 leading-relaxed">
              "{{ review.reviewBody }}"
            </p>

            <!-- Информация об авторе -->
            <div class="border-t border-brand-sky/20 pt-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-brand-sky to-brand-navy rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ review.author.charAt(0) }}
                </div>
                <div class="flex-1">
                  <div class="font-medium text-brand-dark">{{ review.author }}</div>
                  <div class="text-sm text-brand-dark/60" *ngIf="review.position">
                    {{ review.position }}
                  </div>
                  <div class="text-sm text-brand-dark/60" *ngIf="review.company">
                    {{ review.company }}
                  </div>
                </div>
              </div>
              
              <!-- Дополнительная информация -->
              <div class="flex items-center justify-between mt-4 text-sm text-brand-dark/50">
                <span>{{ review.serviceType }}</span>
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

        <!-- Кнопка "Показать все отзывы" -->
        <div class="text-center mt-12">
          <a 
            routerLink="/reviews"
            class="inline-block bg-brand-navy text-white px-8 py-3 rounded-lg hover:bg-brand-navy/90 transition-colors font-medium">
            Показать все отзывы
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CustomerReviewsComponent implements OnInit {
  @Input() serviceType?: string;
  @Input() maxReviews: number = 6;
  
  reviews: CustomerReview[] = [];
  averageRating: number = 5.0;
  reviewsCount: number = 0;
  
  private reviewsService = inject(ReviewsService);

  ngOnInit(): void {
    this.loadReviews();
    this.loadStats();
  }

  private loadReviews(): void {
    this.reviewsService.getReviews(this.serviceType, this.maxReviews)
      .subscribe((reviews: CustomerReview[]) => {
        this.reviews = reviews;
      });
  }

  private loadStats(): void {
    this.reviewsService.getAverageRating()
      .subscribe((rating: number) => {
        this.averageRating = rating;
      });

    this.reviewsService.getReviewsCount()
      .subscribe((count: number) => {
        this.reviewsCount = count;
      });
  }
} 