import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, ServiceCategory } from '../models/service.interface';
import { PRICING } from '../../../shared/config/pricing.config';

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
      icon: 'construction',
      route: '/services/nok-nostroy',
      color: 'bg-blue-50',
      popular: true
    },
    {
      id: 'nok-nopriz',
      title: 'НОК НОПРИЗ',
      description: 'Проектирование и изыскания',
      icon: 'design',
      route: '/services/nok-nopriz',
      color: 'bg-blue-50'
    },
    {
      id: 'nok-opb',
      title: 'НОК МЧС',
      description: 'Пожарная безопасность и МЧС',
      icon: 'safety',
      route: '/services/nok-opb',
      color: 'bg-red-50',
      popular: true
    },
    {
      id: 'nok-housing',
      title: 'НОК ЖКХ',
      description: 'Управление многоквартирными домами',
      icon: 'housing',
      route: '/services/nok-housing',
      color: 'bg-blue-50',
      popular: true
    },
    {
      id: 'consultation',
      title: 'Консультации',
      description: 'Индивидуальные консультации',
      icon: 'consultation',
      route: '/consultation',
      color: 'bg-slate-50'
    }
  ];

  private allServices: Service[] = [
    {
      id: 'nok-construction',
      title: 'НОК НОСТРОЙ — строительство',
      description: 'Подготовка и сопровождение специалистов строительной отрасли к сдаче НОК НОСТРОЙ. Помощь с документами, тренажёр с реальными вопросами, сдача экзамена и включение в НРС.',
      icon: 'construction',
      price: PRICING['nok-nostroy'].price,
      duration: PRICING['nok-nostroy'].duration,
      features: [
        'Подготовка пакета документов для ЦОК',
        'Тренажёр с реальными экзаменационными вопросами',
        'Сопровождение в день экзамена',
        'Включение в Национальный реестр специалистов',
        'Гарантия сдачи с первого раза'
      ],
      category: ServiceCategory.CONSTRUCTION,
      difficulty: 'Средний',
      popular: true,
      route: '/services/nok-nostroy'
    },
    {
      id: 'nok-design',
      title: 'НОК НОПРИЗ — проектирование',
      description: 'Полное сопровождение проектировщиков и изыскателей при прохождении НОК НОПРИЗ. Проверка документов, подготовка портфолио, подбор ЦОК и сдача экзамена.',
      icon: 'design',
      price: PRICING['nok-nopriz'].price,
      duration: PRICING['nok-nopriz'].duration,
      features: [
        'Проверка и подготовка портфолио',
        'Подбор оптимального ЦОК',
        'Тренажёр по проектным нормативам',
        'Экспертные консультации по СП и ГОСТ',
        'Сопровождение до получения свидетельства'
      ],
      category: ServiceCategory.DESIGN,
      difficulty: 'Продвинутый',
      route: '/services/nok-nopriz'
    },
    {
      id: 'nok-research',
      title: 'НОК НОПРИЗ — изыскания',
      description: 'Подготовка специалистов инженерных изысканий к НОК НОПРИЗ. Геология, геодезия, экология — разбор всех тем экзамена и помощь с документацией.',
      icon: 'research',
      price: '22 000 ₽',
      duration: '25 дней',
      features: [
        'Подготовка по инженерной геологии и геодезии',
        'Разбор нормативной базы изысканий',
        'Тренажёр с вопросами по экологическим изысканиям',
        'Помощь с оформлением портфолио',
        'Консультации действующих экспертов'
      ],
      category: ServiceCategory.RESEARCH,
      difficulty: 'Средний',
      route: '/services/nok-nopriz'
    },
    {
      id: 'nok-safety',
      title: 'НОК МЧС --- для ответственных по пожарной безопасности',
      description: 'Подготовка к НОК в области пожарной безопасности и аварийно-спасательных работ. Актуальные требования МЧС, разбор нормативов, спасательных работ и практических кейсов.',
      icon: 'safety',
      price: PRICING['nok-opb'].price,
      duration: PRICING['nok-opb'].duration,
      features: [
        'Подготовка по пожарной безопасности и аварийно-спасательным работам',
        'Актуальные требования ФЗ-123, ФЗ-69 и профстандартов МЧС',
        'Тренажёр с реальными вопросами МЧС',
        'Организация спасательных работ и гражданская оборона',
        'Подготовка документов и полное сопровождение'
      ],
      category: ServiceCategory.SAFETY,
      difficulty: 'Продвинутый',
      popular: true,
      route: '/services/nok-opb'
    },
    {
      id: 'nok-housing',
      title: 'НОК для специалистов ЖКХ',
      description: 'Подготовка к НОК для управляющих МКД и специалистов жилищно-коммунального хозяйства. Жилищное законодательство, техобслуживание, энергоэффективность.',
      icon: 'housing',
      price: PRICING['nok-housing'].price,
      duration: PRICING['nok-housing'].duration,
      features: [
        'Управление многоквартирными домами',
        'Жилищное законодательство (ЖК РФ)',
        'Техническое обслуживание и ремонт МКД',
        'Энергоэффективность зданий',
        'Тренажёр с реальными вопросами НОК ЖКХ'
      ],
      category: ServiceCategory.HOUSING,
      difficulty: 'Средний',
      popular: true,
      route: '/services/nok-housing'
    },
    {
      id: 'consultation',
      title: 'Индивидуальная консультация',
      description: 'Персональная консультация с экспертом НОК. Проверка документов, подбор ЦОК, разбор сложных вопросов и подготовка к пересдаче.',
      icon: 'consultation',
      price: '3 000 ₽',
      duration: '2 часа',
      features: [
        'Проверка пакета документов',
        'Подбор подходящего ЦОК',
        'Разбор сложных тем экзамена',
        'Рекомендации по подготовке портфолио',
        'Помощь при пересдаче'
      ],
      category: ServiceCategory.CONSULTATION,
      difficulty: 'Начальный',
      route: '/consultation'
    },
    {
      id: 'nok-refresher',
      title: 'Повышение квалификации',
      description: 'Обновление знаний для действующих специалистов. Изменения в нормативной базе, новые требования законодательства и практические нововведения отрасли.',
      icon: 'refresher',
      price: '18 000 ₽',
      duration: '20 дней',
      features: [
        'Актуальные изменения в нормативах',
        'Разбор новых требований законодательства',
        'Практические кейсы из отрасли',
        'Обмен опытом с коллегами',
        'Сертификат о повышении квалификации'
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
