import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RelatedMaterial } from '../components/related-materials/related-materials.component';

@Injectable({
  providedIn: 'root'
})
export class RelatedMaterialsService {

  // База данных связанных материалов
  private readonly relatedMaterialsMap: { [key: string]: RelatedMaterial[] } = {
    // Главная страница
    'home': [
      {
        id: 'what-is-nok',
        title: 'Что такое НОК',
        description: 'Подробная информация о независимой оценке квалификации',
        route: '/info/what-is-nok',
        icon: '❓',
        category: 'Основы',
        readTime: 10,
        featured: true
      },
      {
        id: 'nok-nostroy',
        title: 'НОК НОСТРОЙ',
        description: 'Подготовка к НОК для строительных специальностей',
        route: '/services/nok-nostroy',
        icon: '🏗️',
        category: 'Услуги',
        readTime: 15,
        featured: true
      },
      {
        id: 'qa-centers',
        title: 'Центры оценки квалификации',
        description: 'Официальные центры для прохождения НОК',
        route: '/qa-centers',
        icon: '🏢',
        category: 'Справочник',
        readTime: 12
      }
    ],

    // Страницы информации о НОК
    'what-is-nok': [
      {
        id: 'who-must-pass-nok',
        title: 'Кому обязательно проходить НОК',
        description: 'Список специалистов, обязанных проходить НОК',
        route: '/info/who-must-pass-nok',
        icon: '👥',
        category: 'Обязанности',
        readTime: 8
      },
      {
        id: 'nok-procedure',
        title: 'Процедура прохождения НОК',
        description: 'Пошаговая инструкция по прохождению экзамена',
        route: '/info/nok-procedure',
        icon: '📋',
        category: 'Процедура',
        readTime: 12,
        featured: true
      },
      {
        id: 'nok-legislation',
        title: 'Законодательство НОК',
        description: 'Актуальные нормативные акты и изменения',
        route: '/info/nok-legislation',
        icon: '⚖️',
        category: 'Законодательство',
        readTime: 15
      }
    ],

    'who-must-pass-nok': [
      {
        id: 'what-is-nok',
        title: 'Что такое НОК',
        description: 'Подробная информация о независимой оценке квалификации',
        route: '/info/what-is-nok',
        icon: '❓',
        category: 'Основы',
        readTime: 10
      },
      {
        id: 'nok-procedure',
        title: 'Процедура прохождения НОК',
        description: 'Пошаговая инструкция по прохождению экзамена',
        route: '/info/nok-procedure',
        icon: '📋',
        category: 'Процедура',
        readTime: 12,
        featured: true
      },
      {
        id: 'nok-nostroy',
        title: 'НОК НОСТРОЙ',
        description: 'Подготовка к НОК для строительных специальностей',
        route: '/services/nok-nostroy',
        icon: '🏗️',
        category: 'Услуги',
        readTime: 15
      }
    ],

    'nok-procedure': [
      {
        id: 'what-is-nok',
        title: 'Что такое НОК',
        description: 'Подробная информация о независимой оценке квалификации',
        route: '/info/what-is-nok',
        icon: '❓',
        category: 'Основы',
        readTime: 10
      },
      {
        id: 'exam-preparation',
        title: 'Подготовка к экзамену НОК',
        description: 'Методики подготовки и рекомендуемая литература',
        route: '/info/exam-preparation',
        icon: '📖',
        category: 'Подготовка',
        readTime: 20,
        featured: true
      },
      {
        id: 'portfolio-guide',
        title: 'Составление портфолио',
        description: 'Требования к оформлению и примеры успешных портфолио',
        route: '/info/portfolio-guide',
        icon: '📁',
        category: 'Подготовка',
        readTime: 18
      }
    ],

    // Подготовительные страницы
    'exam-preparation': [
      {
        id: 'portfolio-guide',
        title: 'Составление портфолио',
        description: 'Требования к оформлению и примеры успешных портфолио',
        route: '/info/portfolio-guide',
        icon: '📁',
        category: 'Подготовка',
        readTime: 18,
        featured: true
      },
      {
        id: 'online-trainer',
        title: 'Тренажер НОК онлайн',
        description: 'Демо-версия тренажера с вопросами и статистикой',
        route: '/info/online-trainer',
        icon: '💻',
        category: 'Практика',
        readTime: 5
      },
      {
        id: 'nok-qa',
        title: 'Вопросы и ответы НОК',
        description: 'База знаний по темам и разбор сложных вопросов',
        route: '/info/nok-qa',
        icon: '❔',
        category: 'Справочник',
        readTime: 25
      }
    ],

    'portfolio-guide': [
      {
        id: 'exam-preparation',
        title: 'Подготовка к экзамену НОК',
        description: 'Методики подготовки и рекомендуемая литература',
        route: '/info/exam-preparation',
        icon: '📖',
        category: 'Подготовка',
        readTime: 20
      },
      {
        id: 'online-trainer',
        title: 'Тренажер НОК онлайн',
        description: 'Демо-версия тренажера с вопросами и статистикой',
        route: '/info/online-trainer',
        icon: '💻',
        category: 'Практика',
        readTime: 5,
        featured: true
      },
      {
        id: 'nok-qa',
        title: 'Вопросы и ответы НОК',
        description: 'База знаний по темам и разбор сложных вопросов',
        route: '/info/nok-qa',
        icon: '❔',
        category: 'Справочник',
        readTime: 25
      }
    ],

    'online-trainer': [
      {
        id: 'exam-preparation',
        title: 'Подготовка к экзамену НОК',
        description: 'Методики подготовки и рекомендуемая литература',
        route: '/info/exam-preparation',
        icon: '📖',
        category: 'Подготовка',
        readTime: 20,
        featured: true
      },
      {
        id: 'portfolio-guide',
        title: 'Составление портфолио',
        description: 'Требования к оформлению и примеры успешных портфолио',
        route: '/info/portfolio-guide',
        icon: '📁',
        category: 'Подготовка',
        readTime: 18
      },
      {
        id: 'nok-qa',
        title: 'Вопросы и ответы НОК',
        description: 'База знаний по темам и разбор сложных вопросов',
        route: '/info/nok-qa',
        icon: '❔',
        category: 'Справочник',
        readTime: 25
      }
    ],

    'nok-qa': [
      {
        id: 'exam-preparation',
        title: 'Подготовка к экзамену НОК',
        description: 'Методики подготовки и рекомендуемая литература',
        route: '/info/exam-preparation',
        icon: '📖',
        category: 'Подготовка',
        readTime: 20,
        featured: true
      },
      {
        id: 'portfolio-guide',
        title: 'Составление портфолио',
        description: 'Требования к оформлению и примеры успешных портфолио',
        route: '/info/portfolio-guide',
        icon: '📁',
        category: 'Подготовка',
        readTime: 18
      },
      {
        id: 'online-trainer',
        title: 'Тренажер НОК онлайн',
        description: 'Демо-версия тренажера с вопросами и статистикой',
        route: '/info/online-trainer',
        icon: '💻',
        category: 'Практика',
        readTime: 5
      }
    ],

    // Справочные страницы
    'specialists-registry': [
      {
        id: 'qa-centers',
        title: 'Центры оценки квалификации',
        description: 'Официальные центры для прохождения НОК',
        route: '/qa-centers',
        icon: '🏢',
        category: 'Справочник',
        readTime: 12,
        featured: true
      },
      {
        id: 'nok-legislation',
        title: 'Законодательство НОК',
        description: 'Актуальные нормативные акты и изменения',
        route: '/info/nok-legislation',
        icon: '⚖️',
        category: 'Законодательство',
        readTime: 15
      },
      {
        id: 'nok-procedure',
        title: 'Процедура прохождения НОК',
        description: 'Пошаговая инструкция по прохождению экзамена',
        route: '/info/nok-procedure',
        icon: '📋',
        category: 'Процедура',
        readTime: 12
      }
    ],

    'nok-legislation': [
      {
        id: 'what-is-nok',
        title: 'Что такое НОК',
        description: 'Подробная информация о независимой оценке квалификации',
        route: '/info/what-is-nok',
        icon: '❓',
        category: 'Основы',
        readTime: 10
      },
      {
        id: 'specialists-registry',
        title: 'Реестр специалистов НРС',
        description: 'Как проверить статус специалиста в НРС',
        route: '/info/specialists-registry',
        icon: '📜',
        category: 'Справочник',
        readTime: 8,
        featured: true
      },
      {
        id: 'qa-centers',
        title: 'Центры оценки квалификации',
        description: 'Официальные центры для прохождения НОК',
        route: '/qa-centers',
        icon: '🏢',
        category: 'Справочник',
        readTime: 12
      }
    ],

    // Страницы услуг
    'nok-nostroy': [
      {
        id: 'nok-nopriz',
        title: 'НОК НОПРИЗ',
        description: 'Подготовка к НОК для проектировщиков и изыскателей',
        route: '/services/nok-nopriz',
        icon: '📐',
        category: 'Услуги',
        readTime: 15
      },
      {
        id: 'nok-opb',
        title: 'НОК ОПБ',
        description: 'Независимая оценка квалификации пожарной безопасности',
        route: '/services/nok-opb',
        icon: '🔥',
        category: 'Услуги',
        readTime: 12
      },
      {
        id: 'exam-preparation',
        title: 'Подготовка к экзамену НОК',
        description: 'Методики подготовки и рекомендуемая литература',
        route: '/info/exam-preparation',
        icon: '📖',
        category: 'Подготовка',
        readTime: 20,
        featured: true
      }
    ],

    'nok-nopriz': [
      {
        id: 'nok-nostroy',
        title: 'НОК НОСТРОЙ',
        description: 'Подготовка к НОК для строительных специальностей',
        route: '/services/nok-nostroy',
        icon: '🏗️',
        category: 'Услуги',
        readTime: 15
      },
      {
        id: 'nok-opb',
        title: 'НОК ОПБ',
        description: 'Независимая оценка квалификации пожарной безопасности',
        route: '/services/nok-opb',
        icon: '🔥',
        category: 'Услуги',
        readTime: 12
      },
      {
        id: 'portfolio-guide',
        title: 'Составление портфолио',
        description: 'Требования к оформлению и примеры успешных портфолио',
        route: '/info/portfolio-guide',
        icon: '📁',
        category: 'Подготовка',
        readTime: 18,
        featured: true
      }
    ],

    'nok-opb': [
      {
        id: 'nok-nostroy',
        title: 'НОК НОСТРОЙ',
        description: 'Подготовка к НОК для строительных специальностей',
        route: '/services/nok-nostroy',
        icon: '🏗️',
        category: 'Услуги',
        readTime: 15
      },
      {
        id: 'nok-nopriz',
        title: 'НОК НОПРИЗ',
        description: 'Подготовка к НОК для проектировщиков и изыскателей',
        route: '/services/nok-nopriz',
        icon: '📐',
        category: 'Услуги',
        readTime: 15
      },
      {
        id: 'nok-qa',
        title: 'Вопросы и ответы НОК',
        description: 'База знаний по темам и разбор сложных вопросов',
        route: '/info/nok-qa',
        icon: '❔',
        category: 'Справочник',
        readTime: 25,
        featured: true
      }
    ],

    // Центры оценки квалификации
    'qa-centers': [
      {
        id: 'specialists-registry',
        title: 'Реестр специалистов НРС',
        description: 'Как проверить статус специалиста в НРС',
        route: '/info/specialists-registry',
        icon: '📜',
        category: 'Справочник',
        readTime: 8,
        featured: true
      },
      {
        id: 'nok-legislation',
        title: 'Законодательство НОК',
        description: 'Актуальные нормативные акты и изменения',
        route: '/info/nok-legislation',
        icon: '⚖️',
        category: 'Законодательство',
        readTime: 15
      },
      {
        id: 'nok-procedure',
        title: 'Процедура прохождения НОК',
        description: 'Пошаговая инструкция по прохождению экзамена',
        route: '/info/nok-procedure',
        icon: '📋',
        category: 'Процедура',
        readTime: 12
      }
    ]
  };

  /**
   * Получить связанные материалы для страницы
   */
  getRelatedMaterials(pageId: string, category: string = '', maxItems: number = 6): Observable<RelatedMaterial[]> {
    const materials = this.relatedMaterialsMap[pageId] || [];
    
    // Фильтруем по категории, если указана
    let filteredMaterials = materials;
    if (category) {
      filteredMaterials = materials.filter(material => 
        material.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Возвращаем ограниченное количество материалов
    return of(filteredMaterials.slice(0, maxItems));
  }

  /**
   * Получить популярные материалы
   */
  getPopularMaterials(maxItems: number = 6): Observable<RelatedMaterial[]> {
    const allMaterials: RelatedMaterial[] = [];
    
    // Собираем все материалы из всех страниц
    Object.values(this.relatedMaterialsMap).forEach(materials => {
      allMaterials.push(...materials);
    });
    
    // Фильтруем только рекомендуемые материалы
    const featuredMaterials = allMaterials.filter(material => material.featured);
    
    // Убираем дубликаты по ID
    const uniqueMaterials = featuredMaterials.filter((material, index, self) => 
      index === self.findIndex(m => m.id === material.id)
    );
    
    return of(uniqueMaterials.slice(0, maxItems));
  }

  /**
   * Получить материалы по категории
   */
  getMaterialsByCategory(category: string, maxItems: number = 6): Observable<RelatedMaterial[]> {
    const allMaterials: RelatedMaterial[] = [];
    
    // Собираем все материалы из всех страниц
    Object.values(this.relatedMaterialsMap).forEach(materials => {
      allMaterials.push(...materials);
    });
    
    // Фильтруем по категории
    const categoryMaterials = allMaterials.filter(material => 
      material.category.toLowerCase().includes(category.toLowerCase())
    );
    
    // Убираем дубликаты по ID
    const uniqueMaterials = categoryMaterials.filter((material, index, self) => 
      index === self.findIndex(m => m.id === material.id)
    );
    
    return of(uniqueMaterials.slice(0, maxItems));
  }
} 