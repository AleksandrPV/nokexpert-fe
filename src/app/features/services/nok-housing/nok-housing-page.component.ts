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
 * Компонент страницы НОК для ЖКХ
 * Отображает детальную информацию о подготовке к НОК для специалистов ЖКХ
 */
@Component({
  selector: 'app-nok-housing-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, CtaSectionComponent, FaqWidgetComponent],
  templateUrl: './nok-housing-page.component.html',
  styleUrls: ['./nok-housing-page.component.scss']
})
export class NokHousingPageComponent implements OnInit {
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

  // Конфигурация CTA для НОК ЖКХ
  nokHousingCtaConfig: CtaSectionConfig = {
    title: 'Готовы начать подготовку к НОК ЖКХ?',
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
    title: 'НОК для ЖКХ',
    subtitle: 'Независимая оценка квалификации для специалистов жилищно-коммунального хозяйства',
    price: '26 000 ₽',
    duration: '35 дней',
    gosposhlina: '18 000 - 22 000 ₽',
    icon: '🏢',
    badge: 'ПОПУЛЯРНО',
    features: [
      '400+ актуальных вопросов для подготовки',
      'Симулятор экзамена с реальными заданиями',
      'Индивидуальные консультации экспертов ЖКХ',
      'Гарантия сдачи с первого раза',
      'Подготовка документов для подачи',
      'Сопровождение до получения свидетельства'
    ],
    levels: [
      {
        level: '5 уровень',
        title: 'Рабочие специальности',
        description: 'Слесари, электрики, сантехники, дворники',
        examples: ['Слесарь-сантехник', 'Электрик', 'Дворник', 'Уборщик']
      },
      {
        level: '6 уровень',
        title: 'Специалисты и мастера',
        description: 'Мастера, техники, диспетчеры, контролеры',
        examples: ['Мастер участка', 'Техник ЖКХ', 'Диспетчер', 'Контролер']
      },
      {
        level: '7 уровень',
        title: 'Руководители и управляющие',
        description: 'Управляющие, начальники, директора, эксперты',
        examples: ['Управляющий МКД', 'Начальник ЖЭУ', 'Директор УК', 'Эксперт ЖКХ']
      }
    ],
    requirements: [
      'Образование: среднее профессиональное или высшее',
      'Опыт работы в ЖКХ не менее 1 года',
      'Документы об образовании и трудовой книжке',
      'Знание основ жилищного права',
      'Коммуникативные навыки',
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
      { value: '95%', label: 'Успешная сдача' },
      { value: '300+', label: 'Подготовленных специалистов' },
      { value: '4.8', label: 'Средний балл экзамена' },
      { value: '35', label: 'Дней подготовки' }
    ]
  };

  ngOnInit(): void {
    this.seoService.setNokHousingPageSeo();
  }

  openConsultationPopup(): void {
    this.feedbackService.open({
      title: 'НОК для ЖКХ',
      subtitle: 'Получите консультацию по подготовке к независимой оценке квалификации для специалистов ЖКХ'
    });
  }
}
