import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { MainLayoutComponent } from '../../../shared/components/main-layout/main-layout.component';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { OrganizationService } from '../../../shared/services/organization.service';
import { FaqService } from '../services/faq.service';
import { FaqQuestion, FaqCategory } from '../models/faq.interface';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-faq-detail-page',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, RouterModule, BreadcrumbsComponent],
  template: `
    <div *ngIf="question; else loading">
      <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

      <!-- Hero Section -->
      <section class="relative py-16 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-brand-sky/10 to-brand-coral/5"></div>
        <div class="container mx-auto px-6 relative z-10">
          <div class="max-w-4xl mx-auto">
            <!-- Category Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                 [ngClass]="category?.color || 'bg-gray-100 text-gray-800'">
              <span class="text-sm font-medium">{{ category?.name || 'FAQ' }}</span>
            </div>

            <!-- Question -->
            <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight" data-speakable>
              {{ question.question }}
            </h1>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span *ngFor="let tag of question.tags" 
                    class="px-3 py-1 bg-brand-coral/10 text-brand-coral rounded-full text-sm font-medium">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Answer Section -->
      <section class="mb-16">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div class="prose prose-lg max-w-none">
                <div class="text-xl text-brand-dark leading-relaxed mb-8" data-speakable>
                  {{ question.fullAnswer }}
                </div>

                <!-- Question Meta -->
                <div class="border-t border-gray-200 pt-6 mt-8">
                  <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div class="flex items-center gap-2">
                      <span>📅</span>
                      <span>Обновлено: {{ question.updatedAt | date:'dd.MM.yyyy' }}</span>
                    </div>
                    <div class="flex items-center gap-2" *ngIf="question.isPopular">
                      <span>⭐</span>
                      <span>Популярный вопрос</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span>🏷️</span>
                      <span>Категория: {{ category?.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Questions -->
      <section class="mb-16" *ngIf="relatedQuestions.length > 0">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-brand-dark mb-8 text-center">
              Похожие вопросы
            </h2>
            
            <div class="grid gap-6 md:grid-cols-2">
              <div *ngFor="let related of relatedQuestions" 
                   class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 class="text-lg font-semibold text-brand-dark mb-3 line-clamp-2">
                  {{ related.question }}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {{ related.shortAnswer }}
                </p>
                <a [routerLink]="['/faq', related.slug]" 
                   class="inline-flex items-center gap-2 text-brand-coral font-medium hover:underline">
                  Читать ответ
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="mb-16">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto text-center">
            <div class="bg-gradient-to-r from-brand-coral to-brand-navy rounded-2xl p-8 text-white">
              <h2 class="text-2xl font-bold mb-4">Не нашли ответа на свой вопрос?</h2>
              <p class="text-lg mb-6 opacity-90">
                Задайте его нашим специалистам — мы ответим в течение 24 часов
              </p>
              <button (click)="openConsultationPopup()"
                      class="bg-white text-brand-coral px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-50 transition-colors">
                ✉️ Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <section class="mb-16">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="flex flex-col sm:flex-row gap-4 justify-between">
              <a [routerLink]="['/faq']" 
                 class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Все вопросы
              </a>
              
              <a [routerLink]="['/faq']" 
                 [queryParams]="{category: category?.id}"
                 class="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white rounded-full hover:bg-brand-coral/90 transition-colors">
                Больше вопросов по теме
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <ng-template #loading>
      <div class="container mx-auto px-6 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-coral mx-auto mb-4"></div>
          <p class="text-gray-600">Загрузка вопроса...</p>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .prose {
      color: #374151;
    }

    .prose p {
      margin-bottom: 1rem;
    }

    .prose p:last-child {
      margin-bottom: 0;
    }
  `]
})
export class FaqDetailPageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private faqService = inject(FaqService);

  question: FaqQuestion | null = null;
  category: FaqCategory | null = null;
  relatedQuestions: FaqQuestion[] = [];
  breadcrumbs: BreadcrumbItem[] = [];

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const slug = params['slug'];
        return this.faqService.getQuestionBySlug(slug);
      }),
      switchMap(question => {
        if (!question) {
          this.router.navigate(['/faq']);
          return of(null);
        }
        
        this.question = question;
        this.setupBreadcrumbs();
        
        // Загружаем категорию и связанные вопросы
        return this.faqService.getCategoryById(question.category).pipe(
          switchMap(category => {
            this.category = category;
            // Настраиваем SEO после загрузки категории
            this.setupSEO();
            return this.faqService.getRelatedQuestions(question.id);
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/faq']);
        return of(null);
      })
    ).subscribe(related => {
      if (related) {
        this.relatedQuestions = related;
      }
    });
  }

  private setupBreadcrumbs(): void {
    if (!this.question) return;

    this.breadcrumbs = [
      { label: 'Главная', icon: '🏠', url: '/' },
      { label: 'FAQ', icon: '❓', url: '/faq' },
      { label: this.question.question, icon: '📝', active: true }
    ];
  }

  private setupSEO(): void {
    if (!this.question) return;

    // Формируем SEO-оптимизированный заголовок
    const seoTitle = `${this.question.question} — FAQ по НОК | ${this.organizationService.getName()}`;
    
    // Формируем SEO-оптимизированное описание
    const seoDescription = this.question.shortAnswer.length > 160 
      ? this.question.shortAnswer.substring(0, 157) + '...'
      : this.question.shortAnswer;
    
    // Формируем ключевые слова
    const categoryKeywords = this.category ? `${this.category.name}, ` : '';
    const tagKeywords = this.question.tags.join(', ');
    const seoKeywords = `НОК, независимая оценка квалификации, FAQ, ${categoryKeywords}${tagKeywords}, ${this.question.question}`;

    // Устанавливаем SEO-метаданные
    this.seo.setSeoData({
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
      ogImage: '/assets/images/og-default.jpg',
      ogTitle: seoTitle,
      ogDescription: seoDescription,
      canonical: this.isBrowser ? `${window.location.origin}/faq/${this.question.slug}` : `/faq/${this.question.slug}`
    });

    // Добавляем структурированные данные для отдельной FAQ страницы
    this.seo.addFaqPageStructuredData({
      question: this.question.question,
      shortAnswer: this.question.shortAnswer,
      fullAnswer: this.question.fullAnswer,
      category: this.question.category,
      tags: this.question.tags,
      isPopular: this.question.isPopular
    }, `/faq/${this.question.slug}`);

    // Добавляем breadcrumb структурированные данные
    if (this.isBrowser) {
      this.seo.addBreadcrumbsStructuredData([
        { name: 'Главная', url: window.location.origin },
        { name: 'FAQ', url: `${window.location.origin}/faq` },
        { name: this.question.question, url: `${window.location.origin}/faq/${this.question.slug}` }
      ]);
    }
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  // Геттеры для данных организации
  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }
} 