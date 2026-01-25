import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, ServiceCategory } from '../models/service.interface';

export interface HeaderService {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  popular?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private headerServices: HeaderService[] = [
    {
      id: 'nok-nostroy',
      title: 'НОК НОСТРОЙ',
      description: 'Строительные специальности',
      icon: '🏗️',
      route: '/services/nok-nostroy',
      color: 'bg-brand-coral/20',
      popular: true
    },
    {
      id: 'nok-nopriz',
      title: 'НОК НОПРИЗ',
      description: 'Проектирование и изыскания',
      icon: '📐',
      route: '/services/nok-nopriz',
      color: 'bg-brand-sky/20'
    },
    {
      id: 'nok-opb',
      title: 'НОК ОПБ',
      description: 'Пожарная безопасность',
      icon: '🔥',
      route: '/services/nok-opb',
      color: 'bg-red-500/20'
    },
    {
      id: 'nok-emergency',
      title: 'НОК МЧС',
      description: 'Пожарная безопасность и спасательные работы',
      icon: '🚨',
      route: '/services/nok-emergency',
      color: 'bg-red-600/20',
      popular: true
    },
    {
      id: 'nok-housing',
      title: 'НОК ЖКХ',
      description: 'Управление многоквартирными домами',
      icon: '🏢',
      route: '/services/nok-housing',
      color: 'bg-blue-600/20',
      popular: true
    },
    {
      id: 'consultation',
      title: 'Консультации',
      description: 'Индивидуальные консультации',
      icon: '👨‍🏫',
      route: '/consultation',
      color: 'bg-brand-navy/20'
    }
  ];

  private allServices: Service[] = [
    {
      id: 'nok-construction',
      title: 'НОК по строительству',
      description: 'Комплексная подготовка к независимой оценке квалификации для специалистов строительной отрасли. Изучение всех аспектов современного строительства.',
      icon: '🏗️',
      price: '25 000 ₽',
      duration: '30 дней',
      features: [
        'Теоретическая подготовка',
        'Практические задания',
        'Пробные экзамены',
        'Индивидуальные консультации',
        'Актуальные нормативы'
      ],
      category: ServiceCategory.CONSTRUCTION,
      difficulty: 'Средний',
      popular: true
    },
    {
      id: 'nok-design',
      title: 'НОК по проектированию',
      description: 'Специализированный курс для архитекторов и проектировщиков. Углубленное изучение проектной документации и нормативов.',
      icon: '📐',
      price: '28 000 ₽',
      duration: '35 дней',
      features: [
        'Проектная документация',
        'CAD системы',
        'Нормативная база',
        'Экспертиза проектов',
        'Авторский надзор'
      ],
      category: ServiceCategory.DESIGN,
      difficulty: 'Продвинутый'
    },
    {
      id: 'nok-research',
      title: 'НОК по изысканиям',
      description: 'Подготовка специалистов инженерных изысканий. Геология, геодезия, экология - все необходимые знания для успешной сдачи.',
      icon: '🔬',
      price: '22 000 ₽',
      duration: '25 дней',
      features: [
        'Инженерная геология',
        'Геодезические работы',
        'Экологические изыскания',
        'Полевые работы',
        'Лабораторные исследования'
      ],
      category: ServiceCategory.RESEARCH,
      difficulty: 'Средний'
    },
    {
      id: 'nok-safety',
      title: 'НОК по пром. безопасности',
      description: 'Обучение специалистов промышленной безопасности опасных производственных объектов. Актуальные требования и практические кейсы.',
      icon: '⚠️',
      price: '30 000 ₽',
      duration: '40 дней',
      features: [
        'Промышленная безопасность',
        'Анализ рисков',
        'Экспертиза безопасности',
        'Надзорная деятельность',
        'Аварийные ситуации'
      ],
      category: ServiceCategory.SAFETY,
      difficulty: 'Продвинутый',
      popular: true
    },
    {
      id: 'consultation',
      title: 'Индивидуальные консультации',
      description: 'Персональные консультации с экспертами по любым вопросам НОК. Разбор сложных тем и подготовка к пересдачам.',
      icon: '👨‍🏫',
      price: '3 000 ₽',
      duration: '2 часа',
      features: [
        'Индивидуальный подход',
        'Экспертные консультации',
        'Разбор ошибок',
        'Дополнительные материалы',
        'Гибкий график'
      ],
      category: ServiceCategory.CONSULTATION,
      difficulty: 'Начальный'
    },
    {
      id: 'nok-refresher',
      title: 'Курс повышения квалификации',
      description: 'Обновление знаний для специалистов с опытом. Новые нормативы, изменения в законодательстве и практические нововведения.',
      icon: '📚',
      price: '18 000 ₽',
      duration: '20 дней',
      features: [
        'Актуальные изменения',
        'Новые нормативы',
        'Практические кейсы',
        'Обмен опытом',
        'Сертификат повышения'
      ],
      category: ServiceCategory.CONSULTATION,
      difficulty: 'Начальный'
    }
  ];

  /**
   * Получить услуги для отображения в хедере
   */
  getHeaderServices(): Observable<HeaderService[]> {
    return of([...this.headerServices]);
  }

  /**
   * Получить все услуги
   */
  getAllServices(): Observable<Service[]> {
    return of([...this.allServices]);
  }

  /**
   * Получить услугу по ID
   */
  getServiceById(id: string): Observable<Service | undefined> {
    const service = this.allServices.find(s => s.id === id);
    return of(service);
  }

  /**
   * Получить услуги по категории
   */
  getServicesByCategory(category: ServiceCategory): Observable<Service[]> {
    const services = this.allServices.filter(s => s.category === category);
    return of(services);
  }

  /**
   * Получить популярные услуги
   */
  getPopularServices(): Observable<Service[]> {
    const services = this.allServices.filter(s => s.popular);
    return of(services);
  }
} 