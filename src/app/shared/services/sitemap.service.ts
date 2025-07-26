import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SitemapData {
  urls: SitemapUrl[];
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private readonly baseUrl = 'https://нок-эксперт.рф';

  constructor(private http: HttpClient) {}

  /**
   * Получить основной sitemap
   */
  getMainSitemap(): Observable<SitemapData> {
    return this.http.get<SitemapData>(`${this.baseUrl}/sitemap.xml`);
  }

  /**
   * Получить sitemap блога
   */
  getBlogSitemap(): Observable<SitemapData> {
    return this.http.get<SitemapData>(`${this.baseUrl}/sitemap-blog.xml`);
  }

  /**
   * Получить sitemap услуг
   */
  getServicesSitemap(): Observable<SitemapData> {
    return this.http.get<SitemapData>(`${this.baseUrl}/sitemap-services.xml`);
  }

  /**
   * Генерировать sitemap на основе данных приложения
   * ВРЕМЕННО ОТКЛЮЧЕНО - сайт закрыт для индексации
   */
  generateSitemap(): Observable<SitemapData> {
    const today = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
      // Главная страница
      {
        loc: `${this.baseUrl}/`,
        lastmod: today,
        changefreq: 'daily',
        priority: 1.0
      },
      
      // Основные страницы
      {
        loc: `${this.baseUrl}/services`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/info`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/blog`,
        lastmod: today,
        changefreq: 'daily',
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/contacts`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${this.baseUrl}/faq`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: `${this.baseUrl}/qualifications`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6
      }
    ];

    return of({ urls });
  }

  /**
   * Генерировать sitemap для блога
   */
  generateBlogSitemap(articles: any[]): Observable<SitemapData> {
    const today = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
      // Главная страница блога
      {
        loc: `${this.baseUrl}/blog`,
        lastmod: today,
        changefreq: 'daily',
        priority: 0.9
      }
    ];

    // Добавляем статьи блога
    articles.forEach(article => {
      urls.push({
        loc: `${this.baseUrl}/blog/${article.slug}`,
        lastmod: article.lastUpdated ? new Date(article.lastUpdated).toISOString().split('T')[0] : today,
        changefreq: 'monthly',
        priority: 0.8
      });
    });

    return of({ urls });
  }

  /**
   * Генерировать sitemap для услуг
   */
  generateServicesSitemap(services: any[]): Observable<SitemapData> {
    const today = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
      // Главная страница услуг
      {
        loc: `${this.baseUrl}/services`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9
      }
    ];

    // Добавляем услуги
    services.forEach(service => {
      urls.push({
        loc: `${this.baseUrl}/services/${service.slug}`,
        lastmod: service.lastUpdated ? new Date(service.lastUpdated).toISOString().split('T')[0] : today,
        changefreq: 'monthly',
        priority: 0.8
      });
    });

    return of({ urls });
  }

  /**
   * Проверить доступность sitemap
   */
  checkSitemapAvailability(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/sitemap.xml`, { observe: 'response' })
      .pipe(
        map(response => response.status === 200)
      );
  }

  /**
   * Получить статистику sitemap
   */
  getSitemapStats(): Observable<{ totalUrls: number; lastUpdated: string }> {
    return this.generateSitemap().pipe(
      map(sitemap => ({
        totalUrls: sitemap.urls.length,
        lastUpdated: new Date().toISOString()
      }))
    );
  }
} 