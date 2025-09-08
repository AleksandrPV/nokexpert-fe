import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ServicesService } from '../services/services.service';
import { Service, ServiceCategory } from '../models/service.interface';

/**
 * Компонент страницы услуг
 * Отображает все доступные услуги по подготовке к НОК
 */
@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private servicesService = inject(ServicesService);

  selectedCategory: string = 'all';
  
  categories = [
    { key: 'all', name: 'Все услуги' },
    { key: ServiceCategory.CONSTRUCTION, name: 'Строительство' },
    { key: ServiceCategory.DESIGN, name: 'Проектирование' },
    { key: ServiceCategory.RESEARCH, name: 'Изыскания' },
    { key: ServiceCategory.SAFETY, name: 'Пром. безопасность' },
    { key: ServiceCategory.CONSULTATION, name: 'Консультации' }
  ];

  services: Service[] = [
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

  filteredServices: Service[] = [];

  ngOnInit(): void {
    // Устанавливаем SEO данные для страницы услуг
    this.seoService.setServicesPageSeo();

    // Загружаем услуги и добавляем structured data для цен
    this.servicesService.getAllServices().subscribe((services: Service[]) => {
      this.services = services;
      this.filteredServices = services;
      this.seoService.addServicesPricingStructuredData(services);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.category === category);
    }
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty) {
      case 'Начальный':
        return 'bg-green-100 text-green-700';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-700';
      case 'Продвинутый':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
} 