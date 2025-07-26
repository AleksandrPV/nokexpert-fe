import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InfoPage, InfoCategory, InfoSection, InfoCategoryType } from '../models/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private mockCategories: InfoCategory[] = [
    {
      id: '1',
      name: 'Основные информационные страницы',
      description: 'Базовая информация о НОК для новичков',
      icon: '🏗️',
      color: 'bg-brand-navy',
      slug: 'basic',
      pages: []
    },
    {
      id: '2', 
      name: 'Страницы по направлениям',
      description: 'Специфика НОК для разных отраслей',
      icon: '🎯',
      color: 'bg-brand-coral',
      slug: 'directions',
      pages: []
    },
    {
      id: '3',
      name: 'Подготовительные страницы', 
      description: 'Материалы для подготовки к экзамену',
      icon: '📚',
      color: 'bg-brand-sky',
      slug: 'preparation',
      pages: []
    },
    {
      id: '4',
      name: 'Справочные страницы',
      description: 'Справочная информация и реестры',
      icon: '🏢',
      color: 'bg-brand-cream',
      slug: 'reference', 
      pages: []
    },
    {
      id: '5',
      name: 'Образовательные страницы',
      description: 'Курсы, вебинары и обучающие материалы',
      icon: '🎓',
      color: 'bg-green-500',
      slug: 'education',
      pages: []
    }
  ];

  private mockPages: InfoPage[] = [
    // Основные информационные страницы
    {
      id: '1',
      title: 'Что такое НОК',
      description: 'Определение и суть процедуры. Законодательная база (ФЗ №238). История внедрения НОК в России.',
      slug: 'what-is-nok',
      icon: '❓',
      category: this.mockCategories[0],
      priority: 1,
      featured: true,
      readTime: 8,
      lastUpdated: new Date('2024-01-15'),
      tags: ['основы', 'законодательство', 'ФЗ-238']
    },
    {
      id: '2', 
      title: 'Кому обязательно проходить НОК',
      description: 'Специалисты, включенные в НРС. Новые требования с 2022-2023 года. Сроки прохождения по категориям.',
      slug: 'who-must-pass-nok',
      icon: '👥',
      category: this.mockCategories[0],
      priority: 2,
      featured: true,
      readTime: 6,
      lastUpdated: new Date('2024-01-10'),
      tags: ['НРС', 'требования', 'сроки']
    },
    {
      id: '3',
      title: 'Процедура прохождения НОК',
      description: 'Пошаговая инструкция. Этапы экзамена (теория + практика). Требования к документам.',
      slug: 'nok-procedure',
      icon: '📋',
      category: this.mockCategories[0],
      priority: 3,
      featured: true,
      readTime: 12,
      lastUpdated: new Date('2024-01-08'),
      tags: ['процедура', 'экзамен', 'документы']
    },

    // Страницы по направлениям
    {
      id: '4',
      title: 'НОК для НОСТРОЙ',
      description: 'Специфика для строителей. Квалификации и уровни (5-7 уровень). Особенности экзамена.',
      slug: 'nok-nostroy',
      icon: '🏗️',
      category: this.mockCategories[1],
      priority: 1,
      featured: true,
      readTime: 15,
      lastUpdated: new Date('2024-01-12'),
      tags: ['НОСТРОЙ', 'строительство', 'квалификации']
    },
    {
      id: '5',
      title: 'НОК для НОПРИЗ',
      description: 'Для проектировщиков и изыскателей. Требования к портфолио. Защита проектов.',
      slug: 'nok-nopriz',
      icon: '📐',
      category: this.mockCategories[1],
      priority: 2,
      featured: true,
      readTime: 13,
      lastUpdated: new Date('2024-01-11'),
      tags: ['НОПРИЗ', 'проектирование', 'портфолио']
    },
    {
      id: '6',
      title: 'НОК для ответственных по пожарной безопасности',
      description: 'Независимая оценка квалификации специалистов по пожарной безопасности. Актуальная информация о добровольном характере НОК ОПБ.',
      slug: 'nok-opb',
      icon: '🔥',
      category: this.mockCategories[1],
      priority: 4,
      featured: true,
      readTime: 15,
      lastUpdated: new Date('2024-01-17'),
      tags: ['пожарная безопасность', 'ОПБ', 'СПК ЧС', 'добровольная НОК']
    },
    {
      id: '7',
      title: 'НОК для других отраслей',
      description: 'Лифтовая отрасль, ЧС и др. Машиностроение. Энергетика. Перспективные направления.',
      slug: 'nok-other-industries',
      icon: '⚙️',
      category: this.mockCategories[1],
      priority: 3,
      featured: false,
      readTime: 10,
      lastUpdated: new Date('2024-01-09'),
      tags: ['отрасли', 'лифты', 'энергетика']
    },

    // Подготовительные страницы
    {
      id: '8',
      title: 'Подготовка к экзамену НОК',
      description: 'Методики подготовки. Рекомендуемая литература. Типичные ошибки при подготовке.',
      slug: 'exam-preparation',
      icon: '📖',
      category: this.mockCategories[2],
      priority: 1,
      featured: true,
      readTime: 20,
      lastUpdated: new Date('2024-01-14'),
      tags: ['подготовка', 'методики', 'литература']
    },
    {
      id: '9',
      title: 'Вопросы и ответы НОК',
      description: 'База знаний по темам. Разбор сложных вопросов. Примеры заданий.',
      slug: 'nok-qa',
      icon: '❔',
      category: this.mockCategories[2],
      priority: 2,
      featured: true,
      readTime: 25,
      lastUpdated: new Date('2024-01-13'),
      tags: ['вопросы', 'ответы', 'база знаний']
    },
    {
      id: '10',
      title: 'Составление портфолио',
      description: 'Требования к оформлению. Примеры успешных портфолио. Типичные ошибки.',
      slug: 'portfolio-guide',
      icon: '📁',
      category: this.mockCategories[2],
      priority: 3,
      featured: false,
      readTime: 18,
      lastUpdated: new Date('2024-01-07'),
      tags: ['портфолио', 'оформление', 'примеры']
    },
    {
      id: '11',
      title: 'Тренажер НОК онлайн',
      description: 'Демо-версия тренажера. Статистика прохождения. Рейтинг сложности вопросов.',
      slug: 'online-trainer',
      icon: '💻',
      category: this.mockCategories[2],
      priority: 4,
      featured: true,
      readTime: 5,
      lastUpdated: new Date('2024-01-16'),
      tags: ['тренажер', 'онлайн', 'практика']
    },

    // Справочные страницы
    {
      id: '12',
      title: 'Центры оценки квалификации',
      description: 'Реестр аккредитованных ЦОК. Карта расположения. Контакты и адреса.',
      slug: 'assessment-centers',
      icon: '🏢',
      category: this.mockCategories[3],
      priority: 1,
      featured: true,
      readTime: 10,
      lastUpdated: new Date('2024-01-06'),
      tags: ['ЦОК', 'реестр', 'адреса']
    },
    {
      id: '13',
      title: 'Реестр специалистов НРС',
      description: 'Как проверить статус специалиста. Сроки действия свидетельств. Процедура продления.',
      slug: 'specialists-registry',
      icon: '📜',
      category: this.mockCategories[3],
      priority: 2,
      featured: false,
      readTime: 8,
      lastUpdated: new Date('2024-01-05'),
      tags: ['НРС', 'реестр', 'проверка']
    },
    {
      id: '14',
      title: 'Законодательство НОК',
      description: 'Актуальные нормативные акты. Изменения в законодательстве. Разъяснения Минтруда.',
      slug: 'nok-legislation',
      icon: '⚖️',
      category: this.mockCategories[3],
      priority: 3,
      featured: false,
      readTime: 15,
      lastUpdated: new Date('2024-01-04'),
      tags: ['законодательство', 'нормативы', 'Минтруд']
    }
  ];

  constructor() {
    // Привязываем страницы к категориям
    this.assignPagesToCategories();
  }

  private assignPagesToCategories(): void {
    this.mockCategories.forEach(category => {
      category.pages = this.mockPages.filter(page => page.category.id === category.id);
    });
  }

  /**
   * Получить все категории с их страницами
   */
  getInfoSections(): Observable<InfoSection[]> {
    const sections: InfoSection[] = this.mockCategories.map(category => ({
      category,
      pages: category.pages.sort((a, b) => a.priority - b.priority)
    }));
    
    return of(sections);
  }

  /**
   * Получить все страницы
   */
  getAllPages(): Observable<InfoPage[]> {
    return of([...this.mockPages]);
  }

  /**
   * Получить рекомендуемые страницы
   */
  getFeaturedPages(): Observable<InfoPage[]> {
    const featured = this.mockPages
      .filter(page => page.featured)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 6);
    
    return of(featured);
  }

  /**
   * Получить страницы по категории
   */
  getPagesByCategory(categorySlug: string): Observable<InfoPage[]> {
    const pages = this.mockPages
      .filter(page => page.category.slug === categorySlug)
      .sort((a, b) => a.priority - b.priority);
    
    return of(pages);
  }

  /**
   * Получить страницу по slug
   */
  getPageBySlug(slug: string): Observable<InfoPage | null> {
    const page = this.mockPages.find(p => p.slug === slug);
    return of(page || null);
  }

  /**
   * Поиск страниц
   */
  searchPages(query: string): Observable<InfoPage[]> {
    if (!query.trim()) {
      return of([]);
    }
    
    const searchLower = query.toLowerCase();
    const results = this.mockPages.filter(page => 
      page.title.toLowerCase().includes(searchLower) ||
      page.description.toLowerCase().includes(searchLower) ||
      page.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    
    return of(results);
  }

  /**
   * Получить категории для мега-меню
   */
  getMenuCategories(): Observable<InfoCategory[]> {
    return of([...this.mockCategories]);
  }
} 