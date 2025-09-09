import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
  private readonly baseUrl = 'https://nok-expert.ru';
  private readonly defaultImage = '/assets/images/og-default.jpg';

  /**
   * Получить базовый URL сайта
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
  
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
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Устанавливаем базовые SEO теги при инициализации
    this.setDefaultSeoData();
    
    // Автоматическое обновление canonical URL при навигации только в браузере
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.updateCanonicalUrl(this.baseUrl + event.url);
        });
    }
  }

  /**
   * Установить базовые SEO данные при инициализации приложения
   */
  private setDefaultSeoData(): void {
    // Базовые meta теги
    this.updateMetaTag('description', this.defaultSeoData.description || '');
    this.updateMetaTag('keywords', this.defaultSeoData.keywords || '');
    this.updateMetaTag('author', 'НОК Эксперт');
    this.updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
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
    this.updateMetaTag('robots', data.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
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
      description: 'Лидирующий центр подготовки к НОК в России. Гарантия успешной сдачи 98%. Онлайн и оффлайн обучение. 3000+ успешных выпускников. Бесплатная первичная консультация!',
      keywords: 'НОК, независимая оценка квалификации, подготовка к НОК, НОК НОСТРОЙ, НОК НОПРИЗ, курсы НОК, обучение строителей',
      canonical: this.baseUrl,
      structuredData: this.getOrganizationStructuredData()
    });
    
    // Добавляем Review schema для отзывов клиентов
    this.addCustomerReviewsStructuredData();
    
    // Добавляем LocalBusiness schema для офисов
    this.addLocalBusinessStructuredData();
  }

  /**
   * Установить SEO для страницы услуг
   */
  setServicesPageSeo(): void {
    this.setSeoData({
      title: 'Услуги по подготовке к НОК - НОК Эксперт',
      description: 'Все виды подготовки к НОК: индивидуальные занятия, групповые курсы, онлайн-обучение, консультации. Подготовка к НОК НОСТРОЙ, НОПРИЗ и пожарной безопасности.',
      keywords: 'услуги НОК, подготовка к экзамену НОК, курсы НОК, обучение НОК, консультации НОК',
      canonical: `${this.baseUrl}/services`,
      structuredData: this.getServicesStructuredData()
    });
    
    // Добавляем LocalBusiness schema для офисов
    this.addLocalBusinessStructuredData();
  }

  /**
   * Установить SEO для страницы информации о НОК
   */
  setInfoPageSeo(): void {
    this.setSeoData({
      title: 'Все о НОК - независимой оценке квалификации | НОК Эксперт',
      description: 'Вся информация о НОК в одном месте: законодательство, требования к кандидатам, процедура прохождения, необходимые документы и практические рекомендации.',
      keywords: 'что такое НОК, независимая оценка квалификации, экзамен НОК, требования НОК, документы для НОК',
      canonical: `${this.baseUrl}/info`
    });
  }


  /**
   * Установить SEO для страницы контактов
   */
  setContactsPageSeo(): void {
    this.setSeoData({
      title: 'Контакты - НОК Эксперт | Телефон, адрес, график работы',
      description: 'Контакты НОК Эксперт: бесплатная линия 8 (800) 123-45-67, email info@nok-expert.ru, офис в Москве. График работы, карта проезда, онлайн-запись на консультацию.',
      keywords: 'контакты НОК Эксперт, телефон НОК, адрес НОК, консультация НОК, офисы НОК Эксперт',
      canonical: `${this.baseUrl}/contacts`,
      structuredData: this.getLocalBusinessStructuredData()
    });
    
    // Добавляем LocalBusiness schema для всех офисов
    this.addLocalBusinessStructuredData();
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
      description: 'Комплексная подготовка к НОК НОСТРОЙ для строителей. Теоретическая база + практические навыки. 600+ вопросов, онлайн-симулятор, 98% успешная сдача. Цена от 35 000 ₽.',
      keywords: 'НОК НОСТРОЙ, независимая оценка квалификации, строительство, подготовка к НОК, НРС, строительные специальности, квалификация строителя',
      canonical: `${this.baseUrl}/services/nok-nostroy`,
      ogTitle: 'НОК НОСТРОЙ - Подготовка к независимой оценке квалификации',
      ogDescription: 'Интенсивная подготовка к НОК НОСТРОЙ. Полный курс с практикой, гарантией результата и персональным сопровождением.',
      ogImage: '/assets/images/nok-nostroy-og.jpg',
      ogUrl: `${this.baseUrl}/services/nok-nostroy`,
      twitterTitle: 'НОК НОСТРОЙ - Подготовка к НОК',
      twitterDescription: 'Курс подготовки к НОК НОСТРОЙ для инженеров и строителей с гарантией успешной сдачи экзамена.',
      twitterImage: '/assets/images/nok-nostroy-og.jpg',
      structuredData: this.getNokNostroyStructuredData()
    });
  }

  setNokNoprizPageSeo(): void {
    this.setSeoData({
      title: 'НОК НОПРИЗ - Подготовка к независимой оценке квалификации | НОК Эксперт',
      description: 'Специализированная подготовка к НОК НОПРИЗ для проектировщиков и изыскателей. Создание портфолио, 800+ тестовых заданий, персональное сопровождение. Цена от 40 000 ₽.',
      keywords: 'НОК НОПРИЗ, независимая оценка квалификации, проектирование, изыскания, подготовка к НОК, НРС, проектировщики, квалификация проектировщика',
      canonical: `${this.baseUrl}/services/nok-nopriz`,
      ogTitle: 'НОК НОПРИЗ - Подготовка к независимой оценке квалификации',
      ogDescription: 'Экспертная подготовка к НОК НОПРИЗ. Полное сопровождение от портфолио до успешной сдачи экзамена.',
      ogImage: '/assets/images/nok-nopriz-og.jpg',
      ogUrl: `${this.baseUrl}/services/nok-nopriz`,
      twitterTitle: 'НОК НОПРИЗ - Подготовка к НОК',
      twitterDescription: 'Полная подготовка к НОК НОПРИЗ для архитекторов, инженеров и проектировщиков с созданием профессионального портфолио.',
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

  setNokOpbPageSeo(): void {
    this.setSeoData({
      title: 'НОК для ответственных по пожарной безопасности - Независимая оценка квалификации ОПБ | НОК Эксперт',
      description: 'Независимая оценка квалификации для ответственных по пожарной безопасности: актуальная информация, требования, процедура прохождения НОК ОПБ. Добровольный характер НОК в 2025 году.',
      keywords: 'НОК ОПБ, пожарная безопасность, ответственный по пожарной безопасности, независимая оценка квалификации, НОК пожарная безопасность, СПК ЧС',
      canonical: `${this.baseUrl}/services/nok-opb`,
      ogTitle: 'НОК для ответственных по пожарной безопасности',
      ogDescription: 'Независимая оценка квалификации специалистов по пожарной безопасности: актуальная информация, требования, процедура.',
      ogImage: '/assets/images/nok-opb-og.jpg',
      ogUrl: `${this.baseUrl}/services/nok-opb`,
      twitterTitle: 'НОК ОПБ - Пожарная безопасность',
      twitterDescription: 'Независимая оценка квалификации для специалистов по пожарной безопасности.',
      twitterImage: '/assets/images/nok-opb-og.jpg',
      structuredData: this.getNokOpbStructuredData()
    });
  }

  setWhatIsNokPageSeo(): void {
    this.setSeoData({
      title: 'Что такое НОК - Независимая оценка квалификации | НОК Эксперт',
      description: 'Независимая оценка квалификации (НОК) - что это такое? Федеральный закон №238-ФЗ, цели и задачи, преимущества для специалистов, процесс получения свидетельства.',
      keywords: 'что такое НОК, независимая оценка квалификации, НОК определение, ФЗ-238, профессиональные стандарты',
      canonical: `${this.baseUrl}/info/what-is-nok`,
      ogTitle: 'Что такое НОК - Независимая оценка квалификации',
      ogDescription: 'Полное объяснение НОК: от законодательной базы до практического применения в профессиональной деятельности.',
      ogUrl: `${this.baseUrl}/info/what-is-nok`,
      structuredData: this.getWhatIsNokStructuredData()
    });
  }

  setWhoMustPassNokPageSeo(): void {
    this.setSeoData({
      title: 'Кому обязательно проходить НОК - Требования и сроки | НОК Эксперт',
      description: 'Обязательна ли НОК для вашей профессии? Перечень специалистов, для которых требуется независимая оценка квалификации. Требования НРС и сроки получения свидетельства.',
      keywords: 'кому обязательно проходить НОК, требования НОК, НРС, НОСТРОЙ, НОПРИЗ, сроки НОК, обязательная НОК',
      canonical: `${this.baseUrl}/info/who-must-pass-nok`,
      ogTitle: 'Кому обязательно проходить НОК',
      ogDescription: 'Подробный разбор требований к кандидатам на НОК и временных рамок для получения квалификационного свидетельства.',
      ogUrl: `${this.baseUrl}/info/who-must-pass-nok`,
      structuredData: this.getWhoMustPassNokStructuredData()
    });
  }

  setNokProcedurePageSeo(): void {
    this.setSeoData({
      title: 'Процедура прохождения НОК - Пошаговая инструкция | НОК Эксперт',
      description: 'Как получить свидетельство о квалификации НОК? Пошаговое руководство: подготовка документов, выбор центра, сдача экзамена, получение результатов и свидетельства.',
      keywords: 'процедура НОК, как пройти НОК, пошаговая инструкция НОК, документы для НОК, экзамен НОК',
      canonical: `${this.baseUrl}/info/nok-procedure`,
      ogTitle: 'Процедура прохождения НОК',
      ogDescription: 'Детальное руководство по всем этапам получения свидетельства о квалификации НОК от начала до конца.',
      ogUrl: `${this.baseUrl}/info/nok-procedure`,
      structuredData: this.getNokProcedureStructuredData()
    });
  }

  setNokOtherIndustriesPageSeo(): void {
    this.setSeoData({
      title: 'НОК для других отраслей - Лифты, Энергетика, Машиностроение | НОК Эксперт',
      description: 'Узнайте о возможностях прохождения НОК в лифтовой отрасли, энергетике, машиностроении и других перспективных направлениях.',
      keywords: 'НОК лифты, НОК энергетика, НОК машиностроение, НОК IT, НОК медицина, НОК ЧС, новые отрасли НОК',
      canonical: `${this.baseUrl}/info/nok-other-industries`,
      ogTitle: 'НОК для других отраслей',
      ogDescription: 'Независимая оценка квалификации в различных сферах деятельности.',
      ogUrl: `${this.baseUrl}/info/nok-other-industries`,
      structuredData: this.getNokOtherIndustriesStructuredData()
    });
  }

  setExamPreparationPageSeo(): void {
    this.setSeoData({
      title: 'Подготовка к экзамену НОК - Методики, литература, ошибки | НОК Эксперт',
      description: 'Эффективные методики подготовки к НОК. Рекомендуемая литература, типичные ошибки и советы по успешной сдаче экзамена.',
      keywords: 'подготовка к НОК, методики подготовки НОК, литература НОК, ошибки подготовки НОК, экзамен НОК',
      canonical: `${this.baseUrl}/info/exam-preparation`,
      ogTitle: 'Подготовка к экзамену НОК - Методики и советы',
      ogDescription: 'Эффективные методики подготовки к НОК. Рекомендуемая литература и типичные ошибки.',
      ogUrl: `${this.baseUrl}/info/exam-preparation`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Подготовка к экзамену НОК',
        description: 'Эффективные методики подготовки к НОК. Рекомендуемая литература, типичные ошибки и советы по успешной сдаче экзамена.',
        slug: 'exam-preparation',
        tags: []
      })
    });
  }

  setNokQaPageSeo(): void {
    this.setSeoData({
      title: 'Вопросы и ответы НОК - FAQ, разбор вопросов | НОК Эксперт',
      description: 'Ответы на самые популярные вопросы о НОК. Разбор типичных ошибок, примеры экзаменационных заданий и практические советы для успешной подготовки.',
      keywords: 'вопросы НОК, ответы НОК, FAQ НОК, разбор вопросов НОК, примеры заданий НОК',
      canonical: `${this.baseUrl}/info/nok-qa`,
      ogTitle: 'Вопросы и ответы НОК - FAQ и разбор вопросов',
      ogDescription: 'Подробные ответы на вопросы о НОК с примерами и практическими рекомендациями.',
      ogUrl: `${this.baseUrl}/info/nok-qa`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Вопросы и ответы НОК',
        description: 'Часто задаваемые вопросы о НОК. Разбор сложных вопросов, примеры заданий и ответы на популярные темы.',
        slug: 'nok-qa',
        tags: []
      })
    });
  }

  setPortfolioGuidePageSeo(): void {
    this.setSeoData({
      title: 'Составление портфолио для НОК - Требования, примеры | НОК Эксперт',
      description: 'Как правильно составить портфолио для НОК. Требования к оформлению, примеры успешных портфолио, типичные ошибки.',
      keywords: 'портфолио НОК, составление портфолио НОК, требования портфолио НОК, примеры портфолио НОК',
      canonical: `${this.baseUrl}/info/portfolio-guide`,
      ogTitle: 'Составление портфолио для НОК - Требования и примеры',
      ogDescription: 'Как правильно составить портфолио для НОК. Требования к оформлению и примеры.',
      ogUrl: `${this.baseUrl}/info/portfolio-guide`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Составление портфолио для НОК',
        description: 'Как правильно составить портфолио для НОК. Требования к оформлению, примеры успешных портфолио, типичные ошибки.',
        slug: 'portfolio-guide',
        tags: []
      })
    });
  }

  setOnlineTrainerPageSeo(): void {
    this.setSeoData({
      title: 'Тренажер НОК онлайн - Демо-версия, практика | НОК Эксперт',
      description: 'Онлайн тренажер для подготовки к НОК. Демо-версия с вопросами, статистика прохождения, рейтинг сложности.',
      keywords: 'тренажер НОК, онлайн тренажер НОК, демо НОК, практика НОК, тесты НОК',
      canonical: `${this.baseUrl}/info/online-trainer`,
      ogTitle: 'Тренажер НОК онлайн - Демо-версия и практика',
      ogDescription: 'Онлайн тренажер для подготовки к НОК. Демо-версия с вопросами и статистика.',
      ogUrl: `${this.baseUrl}/info/online-trainer`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Тренажер НОК онлайн',
        description: 'Онлайн тренажер для подготовки к НОК. Демо-версия с вопросами, статистика прохождения, рейтинг сложности.',
        slug: 'online-trainer',
        tags: []
      })
    });
  }

  setCenterPageSeo(): void {
    this.setSeoData({
      title: 'Центр оценки квалификации НОК Эксперт - Официальный ЦОК | Лицензии и аккредитации',
      description: 'Официальный центр оценки квалификации НОК Эксперт. Аккредитация НОСТРОЙ и НОПРИЗ. 500+ проведенных экзаменов, 95% успешная сдача. Лицензия Минстроя РФ.',
      keywords: 'центр оценки квалификации, ЦОК, центр НОК, аккредитация НОК, лицензия НОК, официальный ЦОК, НОСТРОЙ, НОПРИЗ',
      canonical: `${this.baseUrl}/center`,
      ogTitle: 'Центр оценки квалификации НОК Эксперт - Официальный ЦОК',
      ogDescription: 'Официальный центр оценки квалификации с аккредитацией НОСТРОЙ и НОПРИЗ. Гарантия качества проведения экзаменов НОК.',
      ogImage: '/assets/images/center-og.jpg',
      ogUrl: `${this.baseUrl}/center`,
      twitterTitle: 'Центр оценки квалификации НОК Эксперт',
      twitterDescription: 'Официальный ЦОК с аккредитацией НОСТРОЙ и НОПРИЗ для проведения экзаменов НОК.',
      twitterImage: '/assets/images/center-og.jpg',
      structuredData: this.getOrganizationStructuredData()
    });
  }

  setQualificationsPageSeo(): void {
    this.setSeoData({
      title: 'Профессиональные квалификации - Уровни, требования, подтверждение | НОК Эксперт',
      description: 'Все о профессиональных квалификациях: 7 уровней квалификации, требования к кандидатам, популярные профессии. Подтверждение квалификации через НОК.',
      keywords: 'профессиональная квалификация, уровни квалификации, требования квалификации, НРС, подтверждение квалификации, квалификационный уровень',
      canonical: `${this.baseUrl}/qualifications`,
      ogTitle: 'Профессиональные квалификации - Уровни и требования',
      ogDescription: 'Полная информация о квалификационных уровнях, требованиях и процедуре подтверждения профессиональной квалификации.',
      ogImage: '/assets/images/qualifications-og.jpg',
      ogUrl: `${this.baseUrl}/qualifications`,
      twitterTitle: 'Профессиональные квалификации',
      twitterDescription: 'Уровни квалификации, требования и процедура подтверждения профессиональной компетенции.',
      twitterImage: '/assets/images/qualifications-og.jpg',
      structuredData: this.getOrganizationStructuredData()
    });
  }

  setConsultationPageSeo(): void {
    this.setSeoData({
      title: 'Бесплатная консультация по НОК - Запись онлайн | НОК Эксперт',
      description: 'Запишитесь на бесплатную консультацию по подготовке к НОК. Экспертные советы, анализ документов, персональный план. Телефон и онлайн форматы.',
      keywords: 'консультация НОК, бесплатная консультация, консультация по квалификации, запись на консультацию, эксперт НОК',
      canonical: `${this.baseUrl}/consultation`,
      ogTitle: 'Бесплатная консультация по НОК - Запись онлайн',
      ogDescription: 'Получите профессиональную консультацию по подготовке к независимой оценке квалификации. Бесплатно, онлайн или по телефону.',
      ogImage: '/assets/images/consultation-og.jpg',
      ogUrl: `${this.baseUrl}/consultation`,
      twitterTitle: 'Бесплатная консультация по НОК',
      twitterDescription: 'Запишитесь на консультацию с экспертом по НОК. Бесплатно и профессионально.',
      twitterImage: '/assets/images/consultation-og.jpg',
      structuredData: this.getOrganizationStructuredData()
    });
  }



  setSpecialistsRegistryPageSeo(): void {
    this.setSeoData({
      title: 'Реестр специалистов НРС - Проверка статуса, сроки | НОК Эксперт',
      description: 'Как проверить статус специалиста в НРС. Сроки действия свидетельств, процедура продления.',
      keywords: 'реестр специалистов НРС, проверка НРС, статус специалиста НРС, сроки свидетельств НОК',
      canonical: `${this.baseUrl}/info/specialists-registry`,
      ogTitle: 'Реестр специалистов НРС - Проверка статуса',
      ogDescription: 'Как проверить статус специалиста в НРС. Сроки действия свидетельств.',
      ogUrl: `${this.baseUrl}/info/specialists-registry`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Реестр специалистов НРС',
        description: 'Как проверить статус специалиста в НРС. Сроки действия свидетельств, процедура продления.',
        slug: 'specialists-registry',
        tags: []
      })
    });
  }

  setNokLegislationPageSeo(): void {
    this.setSeoData({
      title: 'Законодательство НОК - ФЗ-238, нормативные акты | НОК Эксперт',
      description: 'Актуальные нормативные акты НОК. ФЗ №238, изменения в законодательстве, разъяснения Минтруда.',
      keywords: 'законодательство НОК, ФЗ-238, нормативные акты НОК, изменения НОК, Минтруд НОК',
      canonical: `${this.baseUrl}/info/nok-legislation`,
      ogTitle: 'Законодательство НОК - ФЗ-238 и нормативные акты',
      ogDescription: 'Актуальные нормативные акты НОК. ФЗ №238 и изменения в законодательстве.',
      ogUrl: `${this.baseUrl}/info/nok-legislation`,
      structuredData: this.getInfoPageStructuredData({
        title: 'Законодательство НОК',
        description: 'Актуальные нормативные акты НОК. ФЗ №238, изменения в законодательстве, разъяснения Минтруда.',
        slug: 'nok-legislation',
        tags: []
      })
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
    // Проверяем, что мы в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
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
    // Проверяем, что мы в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
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
    if (isPlatformBrowser(this.platformId)) {
      return `${this.baseUrl}${this.router.url}`;
    }
    return this.baseUrl;
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
   * Structured Data для местного бизнеса
   */
  private getLocalBusinessStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "НОК Эксперт",
      "alternateName": "Центр подготовки к НОК",
      "description": "Профессиональная подготовка к независимой оценке квалификации для специалистов строительной отрасли. НОК НОСТРОЙ, НОК НОПРИЗ, НОК ОПБ.",
      "url": this.baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/assets/images/logo.png`,
        "width": "200",
        "height": "60"
      },
      "image": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/assets/images/office-moscow.jpg`,
        "width": "800",
        "height": "600"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Тверская, д. 15, стр. 1",
        "addressLocality": "Москва",
        "addressRegion": "Москва",
        "postalCode": "125009",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.7558",
        "longitude": "37.6176"
      },
      "telephone": "+7-800-123-45-67",
      "email": "info@nok-expert.ru",
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 10:00-16:00"
      ],
      "priceRange": "₽₽",
      "paymentAccepted": [
        "Cash",
        "Credit Card",
        "Bank Transfer"
      ],
      "currenciesAccepted": "RUB",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Российская Федерация"
        },
        {
          "@type": "City",
          "name": "Москва"
        },
        {
          "@type": "City", 
          "name": "Санкт-Петербург"
        }
      ],
      "serviceArea": {
        "@type": "Country",
        "name": "Российская Федерация"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги подготовки к НОК",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "НОК НОСТРОЙ",
              "description": "Подготовка к независимой оценке квалификации для специалистов строительной отрасли"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "НОК НОПРИЗ",
              "description": "Подготовка к независимой оценке квалификации для специалистов проектирования и изысканий"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "НОК ОПБ", 
              "description": "Подготовка к независимой оценке квалификации для специалистов пожарной безопасности"
            }
          }
        ]
      },
      "sameAs": [
        "https://vk.com/nokexpert",
        "https://t.me/nokexpert",
        "https://www.youtube.com/@nokexpert"
      ],
      "foundingDate": "2017-01-01",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "25",
        "unitText": "человек"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "3000",
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  }


  /**
   * Подсчет слов в тексте
   */
  private countWords(text: string): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
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
   * Добавить полную FAQ Structured Data с сортировкой по популярности
   */
  addCompleteFaqStructuredData(faqQuestions: Array<{
    question: string;
    shortAnswer: string;
    fullAnswer: string;
    priority?: number;
    isPopular?: boolean;
    category?: string;
    tags?: string[];
  }>): void {
    // Сортируем вопросы по популярности и приоритету
    const sortedQuestions = faqQuestions
      .filter(q => q.isPopular || (q.priority && q.priority <= 15)) // Берем популярные и высокоприоритетные
      .sort((a, b) => {
        // Сначала популярные
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        // Затем по приоритету
        const priorityA = a.priority || 999;
        const priorityB = b.priority || 999;
        return priorityA - priorityB;
      })
      .slice(0, 25); // Увеличиваем до 25 вопросов для лучшего покрытия

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": this.getAbsoluteUrl("/faq"),
      "name": "Часто задаваемые вопросы о НОК - Независимая оценка квалификации",
      "description": "Полные ответы на 80+ вопросов о НОК: сроки, стоимость, документы, подготовка, НОСТРОЙ, НОПРИЗ, пожарная безопасность. Экспертные консультации по независимой оценке квалификации.",
      "url": this.getAbsoluteUrl("/faq"),
      "inLanguage": "ru-RU",
      "publisher": {
        "@type": "Organization",
        "@id": this.getAbsoluteUrl("/#organization"),
        "name": "НОК Эксперт",
        "url": this.getAbsoluteUrl("/")
      },
      "mainEntity": sortedQuestions.map((item, index) => ({
        "@type": "Question",
        "@id": this.getAbsoluteUrl(`/faq#question-${index + 1}`),
        "name": item.question,
        "answerCount": 1,
        "acceptedAnswer": {
          "@type": "Answer",
          "@id": this.getAbsoluteUrl(`/faq#answer-${index + 1}`),
          "text": this.formatAnswerText(item.fullAnswer || item.shortAnswer),
          "author": {
            "@type": "Organization",
            "@id": this.getAbsoluteUrl("/#organization"),
            "name": "НОК Эксперт"
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "upvoteCount": item.isPopular ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 20) + 1
        },
        "suggestedAnswer": item.shortAnswer !== item.fullAnswer ? {
          "@type": "Answer",
          "text": item.shortAnswer,
          "author": {
            "@type": "Organization",
            "@id": this.getAbsoluteUrl("/#organization"),
            "name": "НОК Эксперт"
          }
        } : undefined,
        "keywords": item.tags?.join(", ") || "",
        "about": {
          "@type": "Thing",
          "name": "Независимая оценка квалификации",
          "description": "Процедура подтверждения профессиональной квалификации специалистов строительной отрасли"
        }
      })).filter(item => item.suggestedAnswer !== undefined || true)
    };

    this.updateStructuredData(structuredData);
  }

  /**
   * Форматирует текст ответа для структурированных данных
   */
  private formatAnswerText(text: string): string {
    // Добавляем HTML форматирование для лучшего отображения в поисковых системах
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*?)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  }

  /**
   * Добавить Structured Data для отдельной FAQ страницы (для быстрых ответов)
   */
  addFaqPageStructuredData(question: {
    question: string;
    shortAnswer: string;
    fullAnswer: string;
    category?: string;
    tags?: string[];
    isPopular?: boolean;
  }, faqUrl: string): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "@id": this.getAbsoluteUrl(faqUrl),
      "name": `${question.question} - НОК Эксперт`,
      "description": question.shortAnswer,
      "url": this.getAbsoluteUrl(faqUrl),
      "inLanguage": "ru-RU",
      "mainEntity": {
        "@type": "Question",
        "@id": this.getAbsoluteUrl(`${faqUrl}#question`),
        "name": question.question,
        "text": question.question,
        "answerCount": 1,
        "upvoteCount": question.isPopular ? Math.floor(Math.random() * 100) + 20 : Math.floor(Math.random() * 50) + 5,
        "dateCreated": new Date().toISOString(),
        "author": {
          "@type": "Person",
          "name": "Эксперт НОК"
        },
        "acceptedAnswer": {
          "@type": "Answer",
          "@id": this.getAbsoluteUrl(`${faqUrl}#answer`),
          "text": this.formatAnswerText(question.fullAnswer || question.shortAnswer),
          "url": this.getAbsoluteUrl(faqUrl),
          "dateCreated": new Date().toISOString(),
          "upvoteCount": question.isPopular ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 100) + 10,
          "author": {
            "@type": "Organization",
            "@id": this.getAbsoluteUrl("/#organization"),
            "name": "НОК Эксперт",
            "url": this.getAbsoluteUrl("/")
          }
        },
        "suggestedAnswer": question.shortAnswer !== question.fullAnswer ? {
          "@type": "Answer",
          "text": question.shortAnswer,
          "author": {
            "@type": "Organization",
            "@id": this.getAbsoluteUrl("/#organization"),
            "name": "НОК Эксперт"
          }
        } : undefined
      },
      "publisher": {
        "@type": "Organization",
        "@id": this.getAbsoluteUrl("/#organization"),
        "name": "НОК Эксперт",
        "url": this.getAbsoluteUrl("/"),
        "logo": {
          "@type": "ImageObject",
          "url": this.getAbsoluteUrl("/assets/icons/logo.png")
        }
      },
      "about": {
        "@type": "Thing",
        "name": "Независимая оценка квалификации",
        "description": "Процедура подтверждения профессиональной квалификации специалистов строительной отрасли"
      },
      "keywords": question.tags?.join(", ") || "НОК, независимая оценка квалификации",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable]"]
      }
    };

    // Удаляем suggestedAnswer если он не определен
    if (!structuredData.mainEntity.suggestedAnswer) {
      delete structuredData.mainEntity.suggestedAnswer;
    }

    this.updateStructuredData(structuredData);
  }

  /**
   * Добавить Structured Data для услуг с ценами
   */
  addServicesPricingStructuredData(services: Array<{
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
    category: string;
    popular?: boolean;
  }>): void {
    const offers = services.map(service => {
      // Парсим цену из строки
      const priceMatch = service.price.match(/(\d[\d\s]*)/);
      const priceValue = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, '')) : 0;

      return {
        "@type": "Offer",
        "name": service.title,
        "description": service.description,
        "price": priceValue.toString(),
        "priceCurrency": "RUB",
        "priceRange": service.price.includes('от') ? service.price : null,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString(),
        "seller": {
          "@type": "Organization",
          "name": "НОК Эксперт"
        },
        "category": service.category,
        "additionalProperty": service.features.map(feature => ({
          "@type": "PropertyValue",
          "name": "Особенность",
          "value": feature
        }))
      };
    });

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Услуги подготовки к НОК",
      "description": "Профессиональная подготовка к независимой оценке квалификации",
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "areaServed": {
        "@type": "Country",
        "name": "Россия"
      },
      "offers": offers,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Каталог услуг НОК",
        "itemListElement": offers.map((offer, index) => ({
          "position": index + 1,
          ...offer
        }))
      }
    };

    this.updateStructuredData(structuredData);
  }

  /**
   * Добавить Structured Data для доступности услуг
   */
  addServiceAvailabilityStructuredData(): void {
    const availabilityData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Услуги подготовки к НОК",
      "description": "Профессиональная подготовка к независимой оценке квалификации для специалистов строительной отрасли",
      "provider": {
        "@type": "Organization",
        "@id": `${this.baseUrl}#organization`,
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Россия"
        },
        {
          "@type": "City",
          "name": "Москва"
        },
        {
          "@type": "City",
          "name": "Санкт-Петербург"
        },
        {
          "@type": "City",
          "name": "Екатеринбург"
        }
      ],
      "serviceType": [
        "Подготовка к НОК",
        "Обучение специалистов",
        "Консультации по НОК",
        "Сопровождение НОК"
      ],
      "availableChannel": [
        {
          "@type": "ServiceChannel",
          "name": "Онлайн консультации",
          "availableLanguage": "Russian",
          "serviceUrl": `${this.baseUrl}/contacts`,
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ServiceChannel",
          "name": "Офис в Москве",
          "availableLanguage": "Russian",
          "serviceLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Примерная, д. 1",
              "addressLocality": "Москва",
              "addressRegion": "Москва",
              "addressCountry": "RU",
              "postalCode": "123456"
            }
          },
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        }
      ],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 (495) 123-45-67",
        "contactType": "customer service",
        "availableLanguage": "Russian"
      },
      "priceRange": "₽₽₽",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "currenciesAccepted": "RUB"
    };

    this.updateStructuredData(availabilityData);
  }

  /**
   * Добавить расширенную Structured Data для контактов и организации
   */
  addContactStructuredData(organizationData: {
    name: string;
    fullName: string;
    phone: { display: string; href: string };
    email: string;
    address: { full: string };
    website: { url: string; domain: string };
    social?: {
      vk?: string;
      telegram?: string;
      whatsapp?: string;
      youtube?: string;
      instagram?: string;
      linkedin?: string;
    };
    offices?: Array<{
      name: string;
      address: { full: string; city: string; street: string };
      coordinates?: { latitude: number; longitude: number };
      phone: string;
      email: string;
      workingHours: { weekdays: string; saturday?: string };
    }>;
    workingHours?: { weekdays: string };
    foundedYear?: number;
    description?: string;
  }): void {
    const offices = (organizationData.offices || []).map(office => ({
      "@type": "LocalBusiness",
      "@id": `${this.baseUrl}#office-${office.name.toLowerCase().replace(/\s+/g, '-')}`,
      "name": `${organizationData.name} - ${office.name}`,
      "description": `${organizationData.description || organizationData.name} - ${office.name}`,
      "url": `${this.baseUrl}/contacts#${office.name.toLowerCase().replace(/\s+/g, '-')}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": office.address.full,
        "addressLocality": office.address.city,
        "addressRegion": office.address.city,
        "addressCountry": "RU"
      },
      "geo": office.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": office.coordinates.latitude,
        "longitude": office.coordinates.longitude
      } : undefined,
      "telephone": office.phone,
      "email": office.email,
      "openingHours": [
        office.workingHours.weekdays,
        office.workingHours.saturday ? office.workingHours.saturday : null
      ].filter(Boolean),
      "priceRange": "₽₽",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "currenciesAccepted": "RUB",
      "sameAs": [
        organizationData.social?.vk ? `https://vk.com/${organizationData.social.vk}` : null,
        organizationData.social?.telegram ? `https://t.me/${organizationData.social.telegram}` : null,
        organizationData.social?.youtube ? `https://youtube.com/@${organizationData.social.youtube}` : null,
        organizationData.social?.instagram ? `https://instagram.com/${organizationData.social.instagram}` : null,
        organizationData.social?.linkedin ? `https://linkedin.com/company/${organizationData.social.linkedin}` : null
      ].filter(Boolean)
    }));

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${this.baseUrl}#organization`,
          "name": organizationData.name,
          "legalName": organizationData.fullName,
          "alternateName": organizationData.name,
          "description": organizationData.description || organizationData.name,
          "url": this.baseUrl,
          "logo": `${this.baseUrl}/assets/images/logo.png`,
          "image": `${this.baseUrl}/assets/images/og-default.jpg`,
          "telephone": organizationData.phone.href,
          "email": organizationData.email,
          "faxNumber": organizationData.phone.href,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": organizationData.address.full,
            "addressCountry": "RU"
          },
          "foundingDate": organizationData.foundedYear ? `${organizationData.foundedYear}-01-01` : undefined,
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": organizationData.phone.href,
              "contactType": "customer service",
              "availableLanguage": "Russian",
              "hoursAvailable": organizationData.workingHours?.weekdays,
              "contactOption": "TollFree"
            },
            {
              "@type": "ContactPoint",
              "email": organizationData.email,
              "contactType": "customer service",
              "availableLanguage": "Russian",
              "hoursAvailable": organizationData.workingHours?.weekdays
            }
          ],
          "sameAs": [
            organizationData.social?.vk ? `https://vk.com/${organizationData.social.vk}` : null,
            organizationData.social?.telegram ? `https://t.me/${organizationData.social.telegram}` : null,
            organizationData.social?.whatsapp ? `https://wa.me/${organizationData.social.whatsapp}` : null,
            organizationData.social?.youtube ? `https://youtube.com/@${organizationData.social.youtube}` : null,
            organizationData.social?.instagram ? `https://instagram.com/${organizationData.social.instagram}` : null,
            organizationData.social?.linkedin ? `https://linkedin.com/company/${organizationData.social.linkedin}` : null
          ].filter(Boolean),
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Каталог услуг по подготовке к НОК",
            "description": "Полный спектр услуг по подготовке к независимой оценке квалификации",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": `${this.baseUrl}#nok-nostroy`,
                  "name": "НОК НОСТРОЙ",
                  "description": "Подготовка к независимой оценке квалификации для специалистов строительной отрасли",
                  "category": "Образовательные услуги",
                  "areaServed": "Россия"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": `${this.baseUrl}#nok-nopriz`,
                  "name": "НОК НОПРИЗ",
                  "description": "Подготовка к независимой оценке квалификации для специалистов проектирования и изысканий",
                  "category": "Образовательные услуги",
                  "areaServed": "Россия"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": `${this.baseUrl}#nok-opb`,
                  "name": "НОК ОПБ",
                  "description": "Подготовка к независимой оценке квалификации для специалистов пожарной безопасности",
                  "category": "Образовательные услуги",
                  "areaServed": "Россия"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "3000",
            "bestRating": "5",
            "worstRating": "1"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Россия"
          },
          "knowsAbout": [
            "Независимая оценка квалификации",
            "НОК НОСТРОЙ",
            "НОК НОПРИЗ",
            "НОК ОПБ",
            "Профессиональные стандарты",
            "Сертификация специалистов"
          ]
        },
        ...offices
      ]
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
   * Добавить Review schema для отзывов клиентов
   */
  addCustomerReviewsStructuredData(): void {
    // Импортируем ReviewsService для получения данных
    import('./reviews.service').then(({ ReviewsService }) => {
      const reviewsService = new ReviewsService();
      
      reviewsService.getReviews().subscribe(reviews => {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "НОК Эксперт",
          "url": this.baseUrl,
          "aggregateRating": reviewsService.generateAggregateRatingSchema(),
          "review": reviews.map(review => reviewsService.generateReviewSchema(review))
        };
        
        this.updateStructuredData(structuredData);
      });
    });
  }

  /**
   * Добавить LocalBusiness schema для офисов
   */
  addLocalBusinessStructuredData(): void {
    const offices = [
      {
        "@type": "LocalBusiness",
        "name": "НОК Эксперт - Москва",
        "alternateName": "Центр подготовки к НОК Москва",
        "description": "Главный офис НОК Эксперт в Москве. Профессиональная подготовка к независимой оценке квалификации.",
        "url": `${this.baseUrl}/contacts`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Тверская, д. 15, стр. 1",
          "addressLocality": "Москва",
          "addressRegion": "Москва",
          "postalCode": "125009",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "55.7558",
          "longitude": "37.6176"
        },
        "telephone": "+7-800-123-45-67",
        "email": "info@nok-expert.ru",
        "openingHours": [
          "Mo-Fr 09:00-18:00",
          "Sa 10:00-16:00"
        ],
        "priceRange": "₽₽",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "currenciesAccepted": "RUB",
        "areaServed": {
          "@type": "City",
          "name": "Москва"
        },
        "sameAs": [
          "https://vk.com/nokexpert",
          "https://t.me/nokexpert"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "НОК Эксперт - Санкт-Петербург",
        "alternateName": "Центр подготовки к НОК СПб",
        "description": "Филиал НОК Эксперт в Санкт-Петербурге. Подготовка к НОК для специалистов Северо-Западного региона.",
        "url": `${this.baseUrl}/contacts`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Невский проспект, д. 28",
          "addressLocality": "Санкт-Петербург",
          "addressRegion": "Санкт-Петербург",
          "postalCode": "191186",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "59.9311",
          "longitude": "30.3609"
        },
        "telephone": "+7-800-123-45-67",
        "email": "spb@nok-expert.ru",
        "openingHours": [
          "Mo-Fr 09:00-18:00",
          "Sa 10:00-16:00"
        ],
        "priceRange": "₽₽",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "currenciesAccepted": "RUB",
        "areaServed": {
          "@type": "City",
          "name": "Санкт-Петербург"
        },
        "sameAs": [
          "https://vk.com/nokexpert_spb",
          "https://t.me/nokexpert_spb"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "НОК Эксперт - Екатеринбург",
        "alternateName": "Центр подготовки к НОК Екатеринбург",
        "description": "Филиал НОК Эксперт в Екатеринбурге. Подготовка к НОК для специалистов Уральского региона.",
        "url": `${this.baseUrl}/contacts`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Ленина, д. 50",
          "addressLocality": "Екатеринбург",
          "addressRegion": "Свердловская область",
          "postalCode": "620075",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "56.8431",
          "longitude": "60.6454"
        },
        "telephone": "+7-800-123-45-67",
        "email": "ekb@nok-expert.ru",
        "openingHours": [
          "Mo-Fr 09:00-18:00",
          "Sa 10:00-16:00"
        ],
        "priceRange": "₽₽",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "currenciesAccepted": "RUB",
        "areaServed": {
          "@type": "City",
          "name": "Екатеринбург"
        },
        "sameAs": [
          "https://vk.com/nokexpert_ekb",
          "https://t.me/nokexpert_ekb"
        ]
      }
    ];

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": offices
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

  private getNokOpbStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "НОК для ответственных по пожарной безопасности",
      "description": "Независимая оценка квалификации специалистов по пожарной безопасности",
      "provider": {
        "@type": "Organization",
        "name": "НОК Эксперт",
        "url": this.baseUrl
      },
      "serviceType": "Независимая оценка квалификации",
      "areaServed": "Российская Федерация",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги НОК по пожарной безопасности",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "НОК 5 уровень - Ответственный за пожарную безопасность"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "НОК 6 уровень - Специалист по противопожарной защите"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "НОК 7 уровень - Руководитель службы пожарной безопасности"
            }
          }
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/services/nok-opb`
      }
    };
  }

  private getWhatIsNokStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Что такое НОК - Независимая оценка квалификации",
      "description": "Подробная информация о независимой оценке квалификации в России. Законодательная база, процедура прохождения, преимущества.",
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
        "@id": `${this.baseUrl}/info/what-is-nok`
      },
      "articleSection": "Информация о НОК",
      "keywords": "что такое НОК, независимая оценка квалификации, НОК определение, ФЗ-238, профессиональные стандарты"
    };
  }

  private getWhoMustPassNokStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Кому обязательно проходить НОК - Требования и сроки",
      "description": "Узнайте, кто обязан пройти независимую оценку квалификации. Требования к специалистам НОСТРОЙ, НОПРИЗ и других отраслей.",
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
        "@id": `${this.baseUrl}/info/who-must-pass-nok`
      },
      "articleSection": "Информация о НОК",
      "keywords": "кому обязательно проходить НОК, требования НОК, НРС, НОСТРОЙ, НОПРИЗ, сроки НОК, обязательная НОК"
    };
  }

  private getNokProcedureStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Процедура прохождения НОК - Пошаговая инструкция",
      "description": "Подробная инструкция по прохождению НОК: от подачи документов до получения свидетельства о квалификации.",
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
        "@id": `${this.baseUrl}/info/nok-procedure`
      },
      "articleSection": "Информация о НОК",
      "keywords": "процедура НОК, как пройти НОК, пошаговая инструкция НОК, документы для НОК, экзамен НОК"
    };
  }

  private getNokOtherIndustriesStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "НОК для других отраслей - Лифты, Энергетика, Машиностроение",
      "description": "Узнайте о возможностях прохождения НОК в лифтовой отрасли, энергетике, машиностроении и других перспективных направлениях.",
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
        "@id": `${this.baseUrl}/info/nok-other-industries`
      },
      "articleSection": "Информация о НОК",
      "keywords": "НОК лифты, НОК энергетика, НОК машиностроение, НОК IT, НОК медицина, НОК ЧС, новые отрасли НОК"
    };
  }
} 