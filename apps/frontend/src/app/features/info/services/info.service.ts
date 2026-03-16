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
      name: 'Основы НОК',
      description: 'Базовая информация о независимой оценке квалификации',
      lucideIcon: 'book-open',
      colorClass: 'bg-blue-600',
      iconBgClass: 'bg-blue-50',
      iconTextClass: 'text-blue-600',
      slug: 'basic',
      pages: []
    },
    {
      id: '2',
      name: 'Направления НОК',
      description: 'Специфика НОК для разных отраслей',
      lucideIcon: 'compass',
      colorClass: 'bg-cyan-600',
      iconBgClass: 'bg-cyan-50',
      iconTextClass: 'text-cyan-600',
      slug: 'directions',
      pages: []
    },
    {
      id: '3',
      name: 'Подготовка к экзамену',
      description: 'Материалы для успешной сдачи',
      lucideIcon: 'graduation-cap',
      colorClass: 'bg-violet-600',
      iconBgClass: 'bg-violet-50',
      iconTextClass: 'text-violet-600',
      slug: 'preparation',
      pages: []
    },
    {
      id: '4',
      name: 'Справочные материалы',
      description: 'Реестры, законодательство, нормативы',
      lucideIcon: 'scale',
      colorClass: 'bg-amber-600',
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      slug: 'reference',
      pages: []
    },
    {
      id: '5',
      name: 'Обучение',
      description: 'Курсы, тренажёры и обучающие материалы',
      lucideIcon: 'monitor',
      colorClass: 'bg-emerald-600',
      iconBgClass: 'bg-emerald-50',
      iconTextClass: 'text-emerald-600',
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
      lucideIcon: 'circle-help',
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
      lucideIcon: 'users',
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
      lucideIcon: 'clipboard-list',
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
      lucideIcon: 'building-2',
      category: this.mockCategories[1],
      priority: 1,
      featured: true,
      readTime: 15,
      lastUpdated: new Date('2024-01-12'),
      tags: ['НОСТРОЙ', 'строительство', 'квалификации']
    },
    {
      id: '7',
      title: 'НОК для других отраслей',
      description: 'Лифтовая отрасль, ЧС и др. Машиностроение. Энергетика. Перспективные направления.',
      slug: 'nok-other-industries',
      lucideIcon: 'settings',
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
      lucideIcon: 'book-open',
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
      lucideIcon: 'circle-help',
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
      lucideIcon: 'file-check',
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
      lucideIcon: 'monitor',
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
      title: 'Реестр специалистов НРС',
      description: 'Как проверить статус специалиста. Сроки действия свидетельств. Процедура продления.',
      slug: 'specialists-registry',
      lucideIcon: 'list-checks',
      category: this.mockCategories[3],
      priority: 1,
      featured: false,
      readTime: 8,
      lastUpdated: new Date('2024-01-05'),
      tags: ['НРС', 'реестр', 'проверка']
    },
    {
      id: '13',
      title: 'Законодательство НОК',
      description: 'Актуальные нормативные акты. Изменения в законодательстве. Разъяснения Минтруда.',
      slug: 'nok-legislation',
      lucideIcon: 'scale',
      category: this.mockCategories[3],
      priority: 2,
      featured: false,
      readTime: 15,
      lastUpdated: new Date('2024-01-04'),
      tags: ['законодательство', 'нормативы', 'Минтруд']
    }
  ];

  constructor() {
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
