import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BlogArticle, 
  BlogCategory, 
  BlogTag, 
  BlogFilters, 
  SortOption,
  PaginationData 
} from '../models/blog.interface';
import { BlogService } from '../services/blog.service';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

/**
 * Компонент страницы блога и новостей
 * Отображает актуальные статьи и новости о НОК
 */
@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbsComponent],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private blogService = inject(BlogService);

  articles: BlogArticle[] = [];
  categories: BlogCategory[] = [];
  tags: BlogTag[] = [];
  activeTags: BlogTag[] = [];
  pagination: PaginationData | null = null;
  loading = false;
  
  SortOption = SortOption;
  
  filters: BlogFilters = {
    search: '',
    category: '',
    tags: [],
    author: '',
    sortBy: SortOption.NEWEST,
    dateRange: { from: null, to: null }
  };

  private searchTimeout: any;

  ngOnInit(): void {
    // Устанавливаем SEO данные для страницы блога
    this.seoService.setBlogPageSeo();

    // Добавляем breadcrumbs structured data для блога
    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Блог', url: `${this.seoService.getBaseUrl()}/blog` }
    ]);

    this.loadCategories();
    this.loadTags();
    this.loadArticles();
  }

  loadArticles(page = 1): void {
    this.loading = true;
    this.blogService.getArticles(this.filters, page).subscribe({
      next: (result) => {
        this.articles = result.articles;
        this.pagination = result.pagination;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTags(): void {
    this.blogService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onSearchChange(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      this.loadArticles(1);
    }, 500);
  }

  clearSearch(): void {
    this.filters.search = '';
    this.loadArticles(1);
  }

  selectCategory(categorySlug: string): void {
    this.filters.category = categorySlug;
    this.loadArticles(1);
  }

  addTag(tagSlug: string): void {
    if (!this.filters.tags.includes(tagSlug)) {
      this.filters.tags.push(tagSlug);
      this.updateActiveTags();
      this.loadArticles(1);
    }
  }

  removeTag(tagSlug: string): void {
    this.filters.tags = this.filters.tags.filter(tag => tag !== tagSlug);
    this.updateActiveTags();
    this.loadArticles(1);
  }

  updateActiveTags(): void {
    this.activeTags = this.tags.filter(tag => 
      this.filters.tags.includes(tag.slug)
    );
  }

  onFiltersChange(): void {
    this.loadArticles(1);
  }

  changePage(page: number): void {
    if (page >= 1 && this.pagination && page <= this.pagination.totalPages) {
      this.loadArticles(page);
      // Прокрутка к началу статей
      document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }

  getPageNumbers(): number[] {
    if (!this.pagination) return [];
    
    const pages: number[] = [];
    const current = this.pagination.currentPage;
    const total = this.pagination.totalPages;
    
    // Показываем максимум 5 страниц
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  trackByArticleId(index: number, article: BlogArticle): string {
    return article.id;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
} 