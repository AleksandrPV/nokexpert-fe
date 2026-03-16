import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { FaqService } from '../services/faq.service';
import { FaqQuestion, FaqCategory } from '../models/faq.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbsComponent, IconModule],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private faqService = inject(FaqService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private destroy$ = new Subject<void>();

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  // Data
  questions: FaqQuestion[] = [];
  categories: FaqCategory[] = [];
  categoryStats: Array<FaqCategory & { count: number }> = [];

  // Filters
  selectedCategory = '';
  searchQuery = '';
  showOnlyPopular = false;

  // State
  openedIndex: number | null = null;
  isLoading = true;

  get filteredQuestions(): FaqQuestion[] {
    let filtered = this.questions;

    if (this.selectedCategory) {
      filtered = filtered.filter(q => q.category === this.selectedCategory);
    }

    if (this.showOnlyPopular) {
      filtered = filtered.filter(q => q.isPopular);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(query) ||
        q.shortAnswer.toLowerCase().includes(query) ||
        q.fullAnswer.toLowerCase().includes(query) ||
        q.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  get selectedCategoryData(): FaqCategory | null {
    return this.categories.find(c => c.id === this.selectedCategory) || null;
  }

  get hasActiveFilters(): boolean {
    return !!this.selectedCategory || !!this.searchQuery || this.showOnlyPopular;
  }

  ngOnInit(): void {
    this.setupSEO();
    this.loadData();
    this.setupQueryParams();
  }

  private setupSEO(): void {
    this.seoService.setSeoData({
      title: 'FAQ по НОК --- Часто задаваемые вопросы о независимой оценке квалификации',
      description: 'Полные ответы на 80+ вопросов о НОК: сроки, стоимость, документы, подготовка, НОСТРОЙ, НОПРИЗ, пожарная безопасность. Экспертные консультации.',
      keywords: 'НОК, FAQ, часто задаваемые вопросы, независимая оценка квалификации, НОСТРОЙ, НОПРИЗ, пожарная безопасность',
      ogImage: '/assets/images/og-default.jpg',
      canonical: this.isBrowser ? `${window.location.origin}/faq` : '/faq'
    });

    import('../data/faq-questions').then(({ FAQ_QUESTIONS }) => {
      this.seoService.addCompleteFaqStructuredData(FAQ_QUESTIONS);
    });

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'FAQ', url: `${this.seoService.getBaseUrl()}/faq` }
    ]);
  }

  private loadData(): void {
    combineLatest([
      this.faqService.getAllQuestions(),
      this.faqService.getAllCategories(),
      this.faqService.getCategoryStats()
    ]).subscribe(([questions, categories, stats]) => {
      this.questions = questions;
      this.categories = categories;
      this.categoryStats = stats;
      this.isLoading = false;
    });
  }

  private setupQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['popular']) {
        this.showOnlyPopular = params['popular'] === 'true';
      }
    });
  }

  toggle(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategory = this.selectedCategory === categoryId ? '' : categoryId;
    this.updateQueryParams();
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
  }

  onPopularToggle(): void {
    this.showOnlyPopular = !this.showOnlyPopular;
    this.updateQueryParams();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.showOnlyPopular = false;
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const params: Record<string, string> = {};
    if (this.selectedCategory) {
      params['category'] = this.selectedCategory;
    }
    if (this.showOnlyPopular) {
      params['popular'] = 'true';
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'FAQ';
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    masterTl.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' },
      0
    );
    masterTl.fromTo('.hero-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' },
      0.3
    );

    gsap.to('.hero-particle', {
      y: 'random(-60, 60)',
      x: 'random(-40, 40)',
      opacity: 'random(0.2, 0.6)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 3, from: 'random' }
    });

    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      0.3
    );

    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' },
      0.5
    );

    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );

    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' },
      1.4
    );

    masterTl.fromTo('.hero-scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.8
    );

    gsap.to('.hero-scroll-dot', {
      y: 16,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // SEARCH / FILTER section
    const filterTl = await this.animationService.sectionTimeline('#filter-section');
    if (filterTl) {
      filterTl.fromTo('#filter-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      filterTl.fromTo('#filter-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      filterTl.fromTo('.search-bar',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      filterTl.fromTo('.category-btn',
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.2)' }, 0.35);
    }

    // QUESTIONS section
    const questionsTl = await this.animationService.sectionTimeline('#questions-section');
    if (questionsTl) {
      questionsTl.fromTo('#questions-section .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      questionsTl.fromTo('#questions-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      questionsTl.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, 0.3);
    }

    // CTA
    const ctaCard = document.querySelector('.cta-gradient-card');
    if (ctaCard) {
      const ctaSection = ctaCard.closest('section');
      if (ctaSection) {
        gsap.fromTo(ctaCard,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.1)',
            scrollTrigger: { trigger: ctaSection, start: 'top 92%', once: true }
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.animationService.cleanup();
  }
}
