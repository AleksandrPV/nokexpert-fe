import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseUrl = 'https://нок-эксперт.рф';
  private readonly defaultImage = '/assets/images/og-default.jpg';
  
  private readonly defaultSeoData: SeoData = {
    title: 'НОК Эксперт - Профессиональная подготовка к независимой оценке квалификации',
    description: 'НОК Эксперт - профессиональная подготовка к независимой оценке квалификации. Гарантированный успех, опытные преподаватели, индивидуальный подход.',
    keywords: 'НОК, независимая оценка квалификации, подготовка к НОК, НОК НОСТРОЙ, НОК НОПРИЗ',
    ogImage: '/assets/images/og-default.jpg',
    twitterImage: '/assets/images/og-default.jpg'
  };

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Устанавливаем базовые SEO теги при инициализации
    this.setDefaultSeoData();
    
    // Автоматическое обновление canonical URL при навигации
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateCanonicalUrl(this.baseUrl + event.url);
      });
  }

  /**
   * Установить базовые SEO данные при инициализации приложения
   */
  private setDefaultSeoData(): void {
    // Базовые meta теги
    this.updateMetaTag('description', this.defaultSeoData.description || '');
    this.updateMetaTag('keywords', this.defaultSeoData.keywords || '');
    this.updateMetaTag('author', 'НОК Эксперт');
    this.updateMetaTag('robots', 'index, follow');
    
    // Open Graph
    this.updateMetaProperty('og:type', 'website');
    this.updateMetaProperty('og:title', this.defaultSeoData.title || '');
    this.updateMetaProperty('og:description', this.defaultSeoData.description || '');
    this.updateMetaProperty('og:image', this.getAbsoluteUrl(this.defaultSeoData.ogImage || ''));
    this.updateMetaProperty('og:url', this.baseUrl);
    this.updateMetaProperty('og:site_name', 'НОК Эксперт');
    this.updateMetaProperty('og:locale', 'ru_RU');
    
    // Twitter Card
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', this.defaultSeoData.title || '');
    this.updateMetaTag('twitter:description', this.defaultSeoData.description || '');
    this.updateMetaTag('twitter:image', this.getAbsoluteUrl(this.defaultSeoData.twitterImage || ''));
    
    // Canonical URL
    this.updateCanonicalUrl(this.baseUrl);
    
    // Базовые структурированные данные
    this.updateStructuredData(this.getOrganizationStructuredData());
  }

  /**
   * Установить SEO данные для страницы
   */
  setSeoData(seoData: Partial<SeoData>): void {
    const data = { ...this.defaultSeoData, ...seoData };
    
    // Title
    if (data.title) {
      this.title.setTitle(data.title);
    }
    
    // Basic Meta Tags
    this.updateMetaTag('description', data.description!);
    this.updateMetaTag('keywords', data.keywords!);
    this.updateMetaTag('robots', data.noIndex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph
    this.updateMetaProperty('og:title', data.ogTitle || data.title!);
    this.updateMetaProperty('og:description', data.ogDescription || data.description!);
    this.updateMetaProperty('og:image', this.getAbsoluteUrl(data.ogImage!));
    this.updateMetaProperty('og:url', data.ogUrl || this.getCurrentUrl());
    
    // Twitter Card
    this.updateMetaTag('twitter:title', data.twitterTitle || data.title!);
    this.updateMetaTag('twitter:description', data.twitterDescription || data.description!);
    this.updateMetaTag('twitter:image', this.getAbsoluteUrl(data.twitterImage!));
    
    // Canonical URL
    if (data.canonical) {
      this.updateCanonicalUrl(data.canonical);
    }
    
    // Structured Data
    if (data.structuredData) {
      this.updateStructuredData(data.structuredData);
    }
  }

  /**
   * Установить SEO для главной страницы
   */
  setHomePageSeo(): void {
    this.setSeoData({
      title: 'НОК Эксперт - Профессиональная подготовка к независимой оценке квалификации',
      description: 'Центр подготовки к НОК с гарантированным результатом. ✅ Опытные преподаватели ✅ Индивидуальный подход ✅ 95% успешной сдачи. Запишитесь на бесплатную консультацию!',
      keywords: 'НОК, независимая оценка квалификации, подготовка к НОК, НОК НОСТРОЙ, НОК НОПРИЗ, курсы НОК, обучение строителей',
      canonical: this.baseUrl,
      structuredData: this.getOrganizationStructuredData()
    });
  }

  /**
   * Установить SEO для страницы услуг
   */
  setServicesPageSeo(): void {
    this.setSeoData({
      title: 'Услуги по подготовке к НОК - НОК Эксперт',
      description: 'Полный спектр услуг по подготовке к независимой оценке квалификации: индивидуальные и групповые занятия, онлайн-курсы, консультации экспертов.',
      keywords: 'услуги НОК, подготовка к экзамену НОК, курсы НОК, обучение НОК, консультации НОК',
      canonical: `${this.baseUrl}/services`,
      structuredData: this.getServicesStructuredData()
    });
  }

  /**
   * Установить SEO для страницы информации о НОК
   */
  setInfoPageSeo(): void {
    this.setSeoData({
      title: 'Все о НОК - независимой оценке квалификации | НОК Эксперт',
      description: 'Полная информация о независимой оценке квалификации: что такое НОК, как проходит экзамен, требования, документы, советы по подготовке.',
      keywords: 'что такое НОК, независимая оценка квалификации, экзамен НОК, требования НОК, документы для НОК',
      canonical: `${this.baseUrl}/info`
    });
  }

  /**
   * Установить SEO для страницы блога
   */
  setBlogPageSeo(): void {
    this.setSeoData({
      title: 'Блог и новости о НОК | НОК Эксперт',
      description: 'Актуальные новости и статьи о независимой оценке квалификации, изменения в законодательстве, советы экспертов, опыт студентов.',
      keywords: 'новости НОК, блог НОК, статьи о НОК, изменения в НОК, советы по НОК',
      canonical: `${this.baseUrl}/blog`,
      structuredData: this.getBlogStructuredData()
    });
  }

  /**
   * Установить SEO для страницы контактов
   */
  setContactsPageSeo(): void {
    this.setSeoData({
      title: 'Контакты - НОК Эксперт | Телефон, адрес, график работы',
      description: 'Свяжитесь с НОК Эксперт: ☎️ 8 (800) 123-45-67, 📧 info@nok-expert.ru, 📍 Москва, ул. Примерная, д. 1. Бесплатная консультация!',
      keywords: 'контакты НОК Эксперт, телефон НОК, адрес НОК, консультация НОК',
      canonical: `${this.baseUrl}/contacts`,
      structuredData: this.getLocalBusinessStructuredData()
    });
  }

  /**
   * Установить SEO для страницы политики конфиденциальности
   */
  setPrivacyPageSeo(): void {
    this.setSeoData({
      title: 'Политика конфиденциальности - НОК Эксперт',
      description: 'Политика конфиденциальности НОК Эксперт. Информация об обработке персональных данных в соответствии с ФЗ-152.',
      canonical: `${this.baseUrl}/privacy-policy`,
      noIndex: true // Не индексируем служебные страницы
    });
  }

  /**
   * Установить SEO для отдельной статьи блога
   */
  setBlogArticleSeo(article: any): void {
    this.setSeoData({
      title: `${article.title} | Блог НОК Эксперт`,
      description: article.excerpt || article.description || `Читайте статью "${article.title}" на сайте НОК Эксперт. Актуальная информация о независимой оценке квалификации.`,
      keywords: `${article.tags?.join(', ') || ''}, НОК, независимая оценка квалификации, блог НОК`,
      canonical: `${this.baseUrl}/blog/${article.slug}`,
      ogTitle: article.title,
      ogDescription: article.excerpt || article.description,
      ogImage: article.featuredImage || this.defaultImage,
      structuredData: this.getArticleStructuredData(article)
    });
  }

  /**
   * Установить SEO для отдельной услуги
   */
  setServiceSeo(service: any): void {
    this.setSeoData({
      title: `${service.title} - Подготовка к НОК | НОК Эксперт`,
      description: service.description || `Профессиональная подготовка к ${service.title}. Индивидуальный подход, опытные преподаватели, гарантированный результат.`,
      keywords: `${service.title}, подготовка к НОК, курсы НОК, ${service.category}, НОК Эксперт`,
      canonical: `${this.baseUrl}/services/${service.slug}`,
      ogTitle: service.title,
      ogDescription: service.description,
      ogImage: service.image || this.defaultImage,
      structuredData: this.getServiceStructuredData(service)
    });
  }

  setNokNostroyPageSeo(): void {
    this.setSeoData({
      title: 'НОК НОСТРОЙ - Подготовка к независимой оценке квалификации | НОК Эксперт',
      description: 'Профессиональная подготовка к НОК НОСТРОЙ для специалистов строительной отрасли. 600+ вопросов, симулятор экзамена, гарантия сдачи. Стоимость от 35 000 ₽.',
      keywords: 'НОК НОСТРОЙ, независимая оценка квалификации, строительство, подготовка к НОК, НРС, строительные специальности, квалификация строителя',
      canonical: `${this.baseUrl}/services/nok-nostroy`,
      ogTitle: 'НОК НОСТРОЙ - Подготовка к независимой оценке квалификации',
      ogDescription: 'Профессиональная подготовка к НОК НОСТРОЙ. Гарантированный успех, опытные преподаватели, индивидуальный подход.',
      ogImage: '/assets/images/nok-nostroy-og.jpg',
      ogUrl: `${this.baseUrl}/services/nok-nostroy`,
      twitterTitle: 'НОК НОСТРОЙ - Подготовка к НОК',
      twitterDescription: 'Профессиональная подготовка к НОК НОСТРОЙ для строительных специалистов.',
      twitterImage: '/assets/images/nok-nostroy-og.jpg',
      structuredData: this.getNokNostroyStructuredData()
    });
  }

  setNokNoprizPageSeo(): void {
    this.setSeoData({
      title: 'НОК НОПРИЗ - Подготовка к независимой оценке квалификации | НОК Эксперт',
      description: 'Профессиональная подготовка к НОК НОПРИЗ для специалистов проектирования и изысканий. 800+ вопросов, помощь с портфолио, гарантия сдачи. Стоимость от 40 000 ₽.',
      keywords: 'НОК НОПРИЗ, независимая оценка квалификации, проектирование, изыскания, подготовка к НОК, НРС, проектировщики, квалификация проектировщика',
      canonical: `${this.baseUrl}/services/nok-nopriz`,
      ogTitle: 'НОК НОПРИЗ - Подготовка к независимой оценке квалификации',
      ogDescription: 'Профессиональная подготовка к НОК НОПРИЗ. Помощь с портфолио, гарантированный успех, опытные эксперты.',
      ogImage: '/assets/images/nok-nopriz-og.jpg',
      ogUrl: `${this.baseUrl}/services/nok-nopriz`,
      twitterTitle: 'НОК НОПРИЗ - Подготовка к НОК',
      twitterDescription: 'Профессиональная подготовка к НОК НОПРИЗ для специалистов проектирования и изысканий.',
      twitterImage: '/assets/images/nok-nopriz-og.jpg',
      structuredData: this.getNokNoprizStructuredData()
    });
  }

  setNokNostroyInfoPageSeo(): void {
    this.setSeoData({
      title: 'НОК НОСТРОЙ - Информация о вступлении в реестр НОСТРОЙ | НОК Эксперт',
      description: 'Полная информация о НОК НОСТРОЙ: как вступить в реестр НОСТРОЙ, требования к кандидатам, документы, стоимость и сроки. Независимая оценка квалификации для строительных специалистов.',
      keywords: 'НОК НОСТРОЙ, вступление в реестр НОСТРОЙ, Национальный реестр специалистов, НРС, строительные специальности, квалификация строителя, документы для НОК, требования НОСТРОЙ',
      canonical: `${this.baseUrl}/info/nok-nostroy`,
      ogTitle: 'НОК НОСТРОЙ - Информация о вступлении в реестр НОСТРОЙ',
      ogDescription: 'Полная информация о НОК НОСТРОЙ и процессе вступления в Национальный реестр специалистов.',
      ogImage: '/assets/images/nok-nostroy-info-og.jpg',
      ogUrl: `${this.baseUrl}/info/nok-nostroy`,
      twitterTitle: 'НОК НОСТРОЙ - Информация',
      twitterDescription: 'Информация о НОК НОСТРОЙ и вступлении в реестр НОСТРОЙ для строительных специалистов.',
      twitterImage: '/assets/images/nok-nostroy-info-og.jpg',
      structuredData: this.getNokNostroyInfoStructuredData()
    });
  }

  setQaCentersPageSeo(): void {
    this.setSeoData({
      title: 'Центры независимой оценки квалификации (ЦОК) - Официальные центры НОК | НОК Эксперт',
      description: 'Полная информация о центрах оценки квалификации (ЦОК): официальные центры НОК НОСТРОЙ, НОПРИЗ, пожарной безопасности. Как выбрать ЦОК, процесс прохождения экзамена, список центров.',
      keywords: 'ЦОК, центры оценки квалификации, НОК НОСТРОЙ, НОК НОПРИЗ, центры НОК, официальные ЦОК, экзамен НОК, независимая оценка квалификации',
      canonical: `${this.baseUrl}/qa-centers`,
      ogTitle: 'Центры независимой оценки квалификации (ЦОК)',
      ogDescription: 'Официальные центры для прохождения НОК в строительстве, проектировании, изысканиях и пожарной безопасности.',
      ogImage: '/assets/images/centers-og.jpg',
      ogUrl: `${this.baseUrl}/qa-centers`,
      twitterTitle: 'Центры оценки квалификации (ЦОК)',
      twitterDescription: 'Официальные центры НОК для строительных специалистов и проектировщиков.',
      twitterImage: '/assets/images/centers-og.jpg',
      structuredData: this.getQaCentersStructuredData()
    });
  }

  /**
   * Установить SEO для страницы информации о конкретной категории НОК
   */
  setNokCategorySeo(category: string, title: string, description: string): void {
    this.setSeoData({
      title: `${title} - Информация о НОК | НОК Эксперт`,
      description: description,
      keywords: `${category}, НОК ${category}, независимая оценка квалификации ${category}, подготовка к НОК ${category}`,
      canonical: `${this.baseUrl}/info/${category.toLowerCase().replace(/\s+/g, '-')}`,
      structuredData: this.getNokCategoryStructuredData(category, title)
    });
  }

  /**
   * Установить SEO для подстраницы информации о НОК
   */
  setInfoSubPageSeo(page: any, category?: any): void {
    const breadcrumbs = [
      { name: 'Информация о НОК', url: '/info' }
    ];
    
    if (category) {
      breadcrumbs.push({ name: category.name, url: `/info/category/${category.slug}` });
    }
    
    breadcrumbs.push({ name: page.title, url: `/info/${page.slug}` });

    this.setSeoData({
      title: `${page.title} - Информация о НОК | НОК Эксперт`,
      description: page.description || `Подробная информация о ${page.title.toLowerCase()}. Актуальные данные о независимой оценке квалификации.`,
      keywords: `${page.title}, НОК, независимая оценка квалификации, ${page.tags?.join(', ') || ''}`,
      canonical: `${this.baseUrl}/info/${page.slug}`,
      ogTitle: page.title,
      ogDescription: page.description,
      structuredData: this.getInfoPageStructuredData(page, category)
    });

    // Добавляем хлебные крошки structured data
    this.addBreadcrumbsStructuredData(breadcrumbs);
  }

  /**
   * Установить SEO для категории информации о НОК
   */
  setInfoCategorySeo(category: any): void {
    const breadcrumbs = [
      { name: 'Информация о НОК', url: '/info' },
      { name: category.name, url: `/info/category/${category.slug}` }
    ];

    this.setSeoData({
      title: `${category.name} - Информация о НОК | НОК Эксперт`,
      description: category.description || `Информация о ${category.name.toLowerCase()}. Подробные материалы о независимой оценке квалификации.`,
      keywords: `${category.name}, НОК, независимая оценка квалификации, ${category.slug}`,
      canonical: `${this.baseUrl}/info/category/${category.slug}`,
      structuredData: this.getInfoCategoryStructuredData(category)
    });

    // Добавляем хлебные крошки structured data
    this.addBreadcrumbsStructuredData(breadcrumbs);
  }

  /**
   * Обновить meta тег
   */
  private updateMetaTag(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  /**
   * Обновить meta property
   */
  private updateMetaProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  /**
   * Обновить canonical URL
   */
  private updateCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  /**
   * Обновить структурированные данные
   */
  private updateStructuredData(data: any): void {
    // Удаляем существующие structured data скрипты с нашим ID
    const existingScript = this.document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Добавляем новые structured data
    const script = this.document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Получить абсолютный URL
   */
  private getAbsoluteUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.baseUrl}${url}`;
  }

  /**
   * Получить текущий URL
   */
  private getCurrentUrl(): string {
    return `${this.baseUrl}${this.router.url}`;
  }

  /**
   * Structured Data для организации
   */
  private getOrganizationStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "НОК Эксперт",
      "alternateName": "NOK Expert",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/assets/images/logo.png`,
      "description": "Профессиональная подготовка к независимой оценке квалификации",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Примерная, д. 1",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-800-123-45-67",
        "contactType": "customer service",
        "availableLanguage": "Russian"
      }
    };
  }

  /**
   * Structured Data для услуг
   */
  private getServicesStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Подготовка к НОК",
      "description": "Профессиональная подготовка к независимой оценке квалификации",
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт"
      },
      "areaServed": "RU",
      "offers": {
        "@type": "Offer",
        "priceRange": "от 15000 рублей",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  /**
   * Structured Data для блога
   */
  private getBlogStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Блог НОК Эксперт",
      "description": "Актуальные новости и статьи о независимой оценке квалификации",
      "url": `${this.baseUrl}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "НОК Эксперт"
      }
    };
  }

  /**
   * Structured Data для местного бизнеса
   */
  private getLocalBusinessStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "НОК Эксперт",
      "description": "Центр подготовки к независимой оценке квалификации",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Примерная, д. 1",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.7558",
        "longitude": "37.6176"
      },
      "telephone": "+7-800-123-45-67",
      "email": "info@nok-expert.ru",
      "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
      "url": this.baseUrl
    };
  }

  /**
   * Structured Data для статьи блога
   */
  private getArticleStructuredData(article: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt || article.description,
      "image": this.getAbsoluteUrl(article.featuredImage || this.defaultImage),
      "author": {
        "@type": "Organization",
        "name": "НОК Эксперт"
      },
      "publisher": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/assets/images/logo.png`
        }
      },
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt || article.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/blog/${article.slug}`
      },
      "keywords": article.tags?.join(', ') || "НОК, независимая оценка квалификации"
    };
  }

  /**
   * Structured Data для услуги
   */
  private getServiceStructuredData(service: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт"
      },
      "areaServed": "RU",
      "category": service.category,
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    };
  }

  /**
   * Structured Data для категории НОК
   */
  private getNokCategoryStructuredData(category: string, title: string): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": `Информация о ${category} - независимой оценке квалификации`,
      "url": `${this.baseUrl}/info/${category.toLowerCase().replace(/\s+/g, '-')}`,
      "mainEntity": {
        "@type": "Thing",
        "name": category,
        "description": `Независимая оценка квалификации в сфере ${category}`
      }
    };
  }

  /**
   * Structured Data для информационной страницы
   */
  private getInfoPageStructuredData(page: any, category?: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": page.title,
      "description": page.description,
      "author": {
        "@type": "Organization",
        "name": "НОК Эксперт"
      },
      "publisher": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/assets/images/logo.png`
        }
      },
      "datePublished": page.lastUpdated?.toISOString() || new Date().toISOString(),
      "dateModified": page.lastUpdated?.toISOString() || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/info/${page.slug}`
      },
      "keywords": page.tags?.join(', ') || "НОК, независимая оценка квалификации",
      "articleSection": category?.name || "Информация о НОК"
    };
  }

  /**
   * Structured Data для категории информации
   */
  private getInfoCategoryStructuredData(category: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": category.name,
      "description": category.description,
      "url": `${this.baseUrl}/info/category/${category.slug}`,
      "mainEntity": {
        "@type": "Thing",
        "name": category.name,
        "description": category.description
      }
    };
  }

  /**
   * Добавить хлебные крошки (Breadcrumbs) Structured Data
   */
  addBreadcrumbsStructuredData(breadcrumbs: Array<{name: string, url: string}>): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${this.baseUrl}${item.url}`
      }))
    };
    
    this.updateStructuredData(structuredData);
  }

  /**
   * Добавить FAQ Structured Data
   */
  addFaqStructuredData(faqItems: Array<{question: string, answer: string}>): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    
    this.updateStructuredData(structuredData);
  }

  /**
   * Добавить отзывы Structured Data
   */
  addReviewsStructuredData(reviews: Array<{author: string, rating: number, text: string, date: string}>): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "НОК Эксперт",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
        "reviewCount": reviews.length,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": 5,
          "worstRating": 1
        },
        "reviewBody": review.text,
        "datePublished": review.date
      }))
    };
    
    this.updateStructuredData(structuredData);
  }

  /**
   * Structured Data для страницы НОК НОСТРОЙ
   */
  private getNokNostroyStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "НОК НОСТРОЙ - Подготовка к независимой оценке квалификации",
      "description": "Профессиональная подготовка к НОК НОСТРОЙ для специалистов строительной отрасли. 600+ вопросов, симулятор экзамена, гарантия сдачи.",
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "serviceType": "Подготовка к НОК",
      "category": "Образование",
      "areaServed": "Российская Федерация",
      "offers": {
        "@type": "Offer",
        "price": "35000",
        "priceCurrency": "RUB",
        "description": "Подготовка к НОК НОСТРОЙ с гарантией сдачи"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/services/nok-nostroy`
      }
    };
  }

  /**
   * Structured Data для страницы НОК НОПРИЗ
   */
  private getNokNoprizStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "НОК НОПРИЗ - Подготовка к независимой оценке квалификации",
      "description": "Профессиональная подготовка к НОК НОПРИЗ для специалистов проектирования и изысканий. 800+ вопросов, помощь с портфолио, гарантия сдачи.",
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "serviceType": "Подготовка к НОК",
      "category": "Образование",
      "areaServed": "Российская Федерация",
      "offers": {
        "@type": "Offer",
        "price": "40000",
        "priceCurrency": "RUB",
        "description": "Подготовка к НОК НОПРИЗ с гарантией сдачи"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/services/nok-nopriz`
      }
    };
  }

  /**
   * Structured Data для информационной страницы НОК НОСТРОЙ
   */
  private getNokNostroyInfoStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "НОК НОСТРОЙ - Информация о вступлении в реестр НОСТРОЙ",
      "description": "Полная информация о НОК НОСТРОЙ: как вступить в реестр НОСТРОЙ, требования к кандидатам, документы, стоимость и сроки.",
      "author": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "datePublished": "2024-01-01",
      "dateModified": "2024-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/info/nok-nostroy`
      },
      "articleSection": "Информация о НОК",
      "keywords": "НОК НОСТРОЙ, вступление в реестр НОСТРОЙ, Национальный реестр специалистов, НРС, строительные специальности"
    };
  }

  /**
   * Structured Data для страницы центров оценки квалификации
   */
  private getQaCentersStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Центры независимой оценки квалификации (ЦОК)",
      "description": "Официальные центры для прохождения НОК в строительстве, проектировании, изысканиях и пожарной безопасности.",
      "author": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "datePublished": "2024-01-01",
      "dateModified": "2024-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/qa-centers`
      },
      "articleSection": "Центры оценки квалификации",
      "keywords": "ЦОК, центры оценки квалификации, НОК НОСТРОЙ, НОК НОПРИЗ, центры НОК, официальные ЦОК"
    };
  }
} 