import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { MainLayoutComponent } from '../../../shared/components/main-layout/main-layout.component';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { OrganizationService } from '../../../shared/services/organization.service';
import { FaqService } from '../services/faq.service';
import { FaqQuestion, FaqCategory, FaqFilter } from '../models/faq.interface';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, RouterModule, BreadcrumbsComponent],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', icon: '🏠', url: '/' },
    { label: 'FAQ', icon: '❓', active: true }
  ];

  private seo: SeoService = inject(SeoService);
  private feedbackService: FeedbackPopupService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private faqService = inject(FaqService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Данные
  questions: FaqQuestion[] = [];
  categories: FaqCategory[] = [];
  categoryStats: Array<FaqCategory & { count: number }> = [];
  
  // Фильтры
  selectedCategory: string = '';
  searchQuery: string = '';
  showOnlyPopular: boolean = false;
  
  // Состояние
  openedIndex: number | null = null;
  isLoading: boolean = true;

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

  ngOnInit(): void {
    this.setupSEO();
    this.loadData();
    this.setupQueryParams();
  }

  private setupSEO(): void {
    this.seo.setSeoData({
      title: 'FAQ по независимой оценке квалификации (НОК) — Часто задаваемые вопросы',
      description: 'Ответы на самые частые вопросы о независимой оценке квалификации (НОК): сроки, стоимость, документы, последствия, подготовка и многое другое.',
      keywords: 'НОК, FAQ, часто задаваемые вопросы, независимая оценка квалификации, экзамен, документы, стоимость, последствия, подготовка',
      ogImage: '/assets/images/og-default.jpg'
    });
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
      if (params['search']) {
        this.searchQuery = params['search'];
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
    this.updateQueryParams();
  }

  onPopularToggle(): void {
    this.showOnlyPopular = !this.showOnlyPopular;
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const params: any = {};
    
    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }
    if (this.searchQuery) {
      params.search = this.searchQuery;
    }
    if (this.showOnlyPopular) {
      params.popular = 'true';
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  get filteredQuestions(): FaqQuestion[] {
    let filtered = this.questions;

    // Фильтр по категории
    if (this.selectedCategory) {
      filtered = filtered.filter(q => q.category === this.selectedCategory);
    }

    // Фильтр по популярности
    if (this.showOnlyPopular) {
      filtered = filtered.filter(q => q.isPopular);
    }

    // Поиск по тексту
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

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.showOnlyPopular = false;
    this.updateQueryParams();
  }

  get hasActiveFilters(): boolean {
    return !!this.selectedCategory || !!this.searchQuery || this.showOnlyPopular;
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'FAQ';
  }
} 