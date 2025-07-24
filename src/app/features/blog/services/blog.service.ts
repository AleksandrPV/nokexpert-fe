import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  BlogArticle, 
  BlogCategory, 
  BlogTag, 
  BlogAuthor, 
  BlogFilters, 
  SortOption, 
  ArticleStatus,
  PaginationData 
} from '../models/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  // Моковые данные для демонстрации
  private mockAuthors: BlogAuthor[] = [
    {
      id: '1',
      name: 'Александр Петров',
      avatar: '👨‍🏗️',
      bio: 'Эксперт по строительному надзору с 15-летним стажем',
      role: 'Ведущий эксперт'
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      avatar: '👩‍💼',
      bio: 'Специалист по нормативной документации',
      role: 'Юрист-консультант'
    },
    {
      id: '3',
      name: 'Дмитрий Козлов',
      avatar: '👨‍💻',
      bio: 'Преподаватель курсов НОК',
      role: 'Методист'
    }
  ];

  private mockCategories: BlogCategory[] = [
    {
      id: '1',
      name: 'Новости НОК',
      slug: 'news',
      description: 'Актуальные новости и изменения в сфере НОК',
      color: 'bg-brand-coral',
      icon: '📢',
      articleCount: 12
    },
    {
      id: '2',
      name: 'Подготовка к экзамену',
      slug: 'exam-prep',
      description: 'Советы и рекомендации по подготовке',
      color: 'bg-brand-navy',
      icon: '📚',
      articleCount: 8
    },
    {
      id: '3',
      name: 'Изменения в законодательстве',
      slug: 'legislation',
      description: 'Обновления нормативной базы',
      color: 'bg-brand-sky',
      icon: '⚖️',
      articleCount: 5
    },
    {
      id: '4',
      name: 'Кейсы и практика',
      slug: 'cases',
      description: 'Реальные примеры и разборы ситуаций',
      color: 'bg-brand-cream',
      icon: '💼',
      articleCount: 10
    }
  ];

  private mockTags: BlogTag[] = [
    { id: '1', name: 'НОСТРОЙ', slug: 'nostroy', color: 'text-brand-navy' },
    { id: '2', name: 'НОПРИЗ', slug: 'nopriz', color: 'text-brand-sky' },
    { id: '3', name: 'Строительство', slug: 'construction', color: 'text-brand-coral' },
    { id: '4', name: 'Экзамен', slug: 'exam', color: 'text-brand-dark' },
    { id: '5', name: 'Документы', slug: 'documents', color: 'text-brand-cream' }
  ];

  private mockArticles: BlogArticle[] = [
    {
      id: '1',
      title: 'Новые изменения в НОК НОСТРОЙ: что нужно знать в 2024 году',
      excerpt: 'Рассматриваем ключевые изменения в процедуре независимой оценки квалификации НОСТРОЙ, которые вступили в силу в начале 2024 года.',
      content: 'Полный текст статьи...',
      slug: 'nok-nostroy-changes-2024',
      publishedAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      author: this.mockAuthors[0],
      category: this.mockCategories[0],
      tags: [this.mockTags[0], this.mockTags[2]],
      featuredImage: '🏗️',
      readTime: 8,
      views: 1250,
      featured: true,
      status: ArticleStatus.PUBLISHED
    },
    {
      id: '2',
      title: 'Топ-10 ошибок при подготовке к практической части НОК',
      excerpt: 'Анализируем самые распространенные ошибки кандидатов при прохождении практической части экзамена НОК и даем рекомендации по их избежанию.',
      content: 'Полный текст статьи...',
      slug: 'top-10-nok-mistakes',
      publishedAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      author: this.mockAuthors[2],
      category: this.mockCategories[1],
      tags: [this.mockTags[3], this.mockTags[0]],
      featuredImage: '📝',
      readTime: 12,
      views: 890,
      featured: true,
      status: ArticleStatus.PUBLISHED
    },
    {
      id: '3',
      title: 'Обновление требований к портфолио для НОК НОПРИЗ',
      excerpt: 'Детальный разбор новых требований к составлению портфолио для специалистов проектировщиков и изыскателей.',
      content: 'Полный текст статьи...',
      slug: 'nopriz-portfolio-requirements',
      publishedAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08'),
      author: this.mockAuthors[1],
      category: this.mockCategories[2],
      tags: [this.mockTags[1], this.mockTags[4]],
      featuredImage: '📐',
      readTime: 15,
      views: 567,
      featured: false,
      status: ArticleStatus.PUBLISHED
    },
    {
      id: '4',
      title: 'Как правильно подать апелляцию на результаты НОК',
      excerpt: 'Пошаговое руководство по подаче апелляции в случае несогласия с результатами независимой оценки квалификации.',
      content: 'Полный текст статьи...',
      slug: 'nok-appeal-guide',
      publishedAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      author: this.mockAuthors[1],
      category: this.mockCategories[3],
      tags: [this.mockTags[4], this.mockTags[0]],
      featuredImage: '⚖️',
      readTime: 10,
      views: 432,
      featured: false,
      status: ArticleStatus.PUBLISHED
    },
    {
      id: '5',
      title: 'Статистика успешности сдачи НОК за 2023 год',
      excerpt: 'Анализируем статистические данные по результатам независимой оценки квалификации в строительной отрасли за прошедший год.',
      content: 'Полный текст статьи...',
      slug: 'nok-statistics-2023',
      publishedAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      author: this.mockAuthors[0],
      category: this.mockCategories[0],
      tags: [this.mockTags[0], this.mockTags[1]],
      featuredImage: '📊',
      readTime: 6,
      views: 721,
      featured: false,
      status: ArticleStatus.PUBLISHED
    },
    {
      id: '6',
      title: 'Лучшие практики подготовки к теоретической части НОК',
      excerpt: 'Эффективные методы изучения материала и подготовки к теоретическому экзамену независимой оценки квалификации.',
      content: 'Полный текст статьи...',
      slug: 'nok-theory-best-practices',
      publishedAt: new Date('2023-12-28'),
      updatedAt: new Date('2023-12-28'),
      author: this.mockAuthors[2],
      category: this.mockCategories[1],
      tags: [this.mockTags[3], this.mockTags[2]],
      featuredImage: '💡',
      readTime: 9,
      views: 1050,
      featured: false,
      status: ArticleStatus.PUBLISHED
    }
  ];

  /**
   * Получить все статьи с фильтрацией и пагинацией
   */
  getArticles(filters: Partial<BlogFilters> = {}, page = 1, limit = 6): Observable<{articles: BlogArticle[], pagination: PaginationData}> {
    let filteredArticles = [...this.mockArticles];

    // Применяем фильтры
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filteredArticles = filteredArticles.filter(article => 
        article.category.slug === filters.category
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        article.tags.some(tag => filters.tags!.includes(tag.slug))
      );
    }

    // Сортировка
    switch (filters.sortBy) {
      case SortOption.OLDEST:
        filteredArticles.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
        break;
      case SortOption.MOST_VIEWED:
        filteredArticles.sort((a, b) => b.views - a.views);
        break;
      case SortOption.NEWEST:
      default:
        filteredArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
    }

    // Пагинация
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    const pagination: PaginationData = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    return of({ articles: paginatedArticles, pagination }).pipe(delay(300));
  }

  /**
   * Получить рекомендуемые статьи
   */
  getFeaturedArticles(limit = 2): Observable<BlogArticle[]> {
    const featured = this.mockArticles
      .filter(article => article.featured)
      .slice(0, limit);
    return of(featured).pipe(delay(200));
  }

  /**
   * Получить все категории
   */
  getCategories(): Observable<BlogCategory[]> {
    return of(this.mockCategories);
  }

  /**
   * Получить все теги
   */
  getTags(): Observable<BlogTag[]> {
    return of(this.mockTags);
  }

  /**
   * Получить статью по slug
   */
  getArticleBySlug(slug: string): Observable<BlogArticle | null> {
    const article = this.mockArticles.find(a => a.slug === slug);
    return of(article || null).pipe(delay(200));
  }

  /**
   * Поиск статей
   */
  searchArticles(query: string): Observable<BlogArticle[]> {
    if (!query.trim()) {
      return of([]);
    }
    
    const searchLower = query.toLowerCase();
    const results = this.mockArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
    );
    
    return of(results).pipe(delay(300));
  }
} 