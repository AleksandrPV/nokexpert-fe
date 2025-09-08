import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';
import { HeadingsService } from '../../../shared/services/headings.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-article-page',
  standalone: true,
  imports: [BreadcrumbsComponent, NgIf, NgFor],
  templateUrl: './blog-article-page.component.html',
  styleUrls: ['./blog-article-page.component.scss']
})
export class BlogArticlePageComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', icon: '🏠', url: '/' },
    { label: 'Блог', icon: '📝', url: '/blog' },
    { label: 'Новые изменения в НОК НОСТРОЙ', active: true }
  ];

  readonly article = {
    title: 'Новые изменения в НОК НОСТРОЙ: что нужно знать в 2024 году',
    subtitle: 'Рассматриваем ключевые изменения в процедуре независимой оценки квалификации НОСТРОЙ, которые вступили в силу в начале 2024 года.',
    date: '15 января 2024 г.',
    time: '8 мин',
    views: 1250,
    tags: ['#НОСТРОЙ', '#Строительство'],
    author: {
      name: 'Александр Петров',
      role: 'Ведущий эксперт',
      avatar: '',
      icon: '👨‍🏗️'
    },
    recommend: true,
    news: true
  };

  private seo = inject(SeoService);
  private headingsService = inject(HeadingsService);

  ngOnInit(): void {
    // Устанавливаем SEO данные
    this.seo.setBlogArticleSeo({
      title: this.article.title,
      description: this.article.subtitle,
      excerpt: this.article.subtitle,
      tags: this.article.tags,
      slug: 'nostroy-changes-2024',
      publishedAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: this.article.author.name,
      featuredImage: '/assets/images/og-default.jpg'
    });

    // Оптимизируем заголовки для SEO
    setTimeout(() => {
      this.headingsService.optimizeHeadings();

      // Генерируем оглавление
      this.headingsService.generateTableOfContents('.toc-container');
    }, 100);

    this.seo.addBreadcrumbsStructuredData(this.breadcrumbs.map(b => ({ name: b.label, url: b.url || '' })));
  }
} 