import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CtaSectionComponent, CtaSectionConfig } from '../../../shared/components/cta-section/cta-section.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { ServicesService } from '../services/services.service';
import { FaqWidgetComponent } from '../../faq/components/faq-widget.component';

/**
 * Компонент страницы НОК для МЧС
 * Отображает детальную информацию о подготовке к НОК для сотрудников МЧС
 */
@Component({
  selector: 'app-nok-emergency-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, CtaSectionComponent, FaqWidgetComponent],
  templateUrl: './nok-emergency-page.component.html',
  styleUrls: ['./nok-emergency-page.component.scss']
})
export class NokEmergencyPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private servicesService = inject(ServicesService);

  // Данные организации
  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  // Конфигурация CTA для НОК МЧС
  nokEmergencyCtaConfig: CtaSectionConfig = {
    title: 'Готовы начать подготовку к НОК МЧС?',
    subtitle: 'Получите персональный план подготовки и гарантированно сдайте экзамен с первого раза',
    background: 'dark',
    padding: 'medium',
    showAdditionalInfo: true,
    buttons: [
      {
        text: 'Бесплатная консультация',
        icon: '📞',
        action: 'consultation',
        variant: 'primary'
      },
      {
        text: 'Позвонить',
        icon: '📱',
        action: 'phone',
        variant: 'secondary'
      }
    ]
  };

  // Данные услуги
  serviceData = {
    title: 'НОК для МЧС',
    subtitle: 'Независимая оценка квалификации для сотрудников МЧС и специалистов по пожарной безопасности',
    price: '32 000 ₽',
    duration: '45 дней',
    gosposhlina: '22 000 - 28 000 ₽',
    icon: '🚨',
    badge: 'ПОПУЛЯРНО',
    features: [
      '500+ актуальных вопросов для подготовки',
      'Симулятор экзамена с реальными заданиями',
      'Индивидуальные консультации экспертов МЧС',
      'Гарантия сдачи с первого раза',
      'Подготовка документов для подачи',
      'Сопровождение до получения свидетельства'
    ],
    levels: [
      {
        level: '5 уровень',
        title: 'Спасатели и пожарные',
        description: 'Спасатели, пожарные, водители спецтехники',
        examples: ['Спасатель', 'Пожарный', 'Водитель пожарного автомобиля', 'Диспетчер']
      },
      {
        level: '6 уровень',
        title: 'Специалисты и техники',
        description: 'Специалисты по пожарной безопасности, техники, инспекторы',
        examples: ['Инспектор ГПН', 'Техник по пожарной безопасности', 'Специалист по ГОЧС']
      },
      {
        level: '7 уровень',
        title: 'Руководители и эксперты',
        description: 'Руководители подразделений, эксперты, начальники служб',
        examples: ['Начальник караула', 'Эксперт по пожарной безопасности', 'Руководитель службы ГОЧС']
      }
    ],
    requirements: [
      'Образование: среднее профессиональное или высшее',
      'Опыт работы в МЧС не менее 2 лет',
      'Документы об образовании и трудовой книжке',
      'Медицинская справка о годности',
      'Справка об отсутствии судимости',
      'Фотографии 3x4 см'
    ],
    process: [
      {
        step: '1',
        title: 'Консультация и анализ',
        description: 'Анализ ваших документов и выбор оптимальной программы подготовки',
        icon: '📋'
      },
      {
        step: '2',
        title: 'Подготовка к экзамену',
        description: 'Изучение материалов, прохождение тестов и консультации с экспертами',
        icon: '📚'
      },
      {
        step: '3',
        title: 'Сдача экзамена',
        description: 'Сопровождение на экзамене и поддержка до получения результатов',
        icon: '✅'
      },
      {
        step: '4',
        title: 'Получение свидетельства',
        description: 'Помощь в получении свидетельства о квалификации',
        icon: '🏆'
      }
    ],
    stats: [
      { value: '98%', label: 'Успешная сдача' },
      { value: '500+', label: 'Подготовленных специалистов' },
      { value: '4.9', label: 'Средний балл экзамена' },
      { value: '45', label: 'Дней подготовки' }
    ]
  };

  ngOnInit(): void {
    this.seoService.setNokEmergencyPageSeo();
  }

  openConsultationPopup(): void {
    this.feedbackService.open({
      title: 'НОК для МЧС',
      subtitle: 'Получите консультацию по подготовке к независимой оценке квалификации для сотрудников МЧС'
    });
  }
}
