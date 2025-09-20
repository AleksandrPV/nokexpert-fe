import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CtaSectionComponent, CtaSectionConfig } from '../../../shared/components/cta-section/cta-section.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { ServicesService } from '../services/services.service';
import { FaqWidgetComponent } from '../../faq/components/faq-widget.component';

@Component({
  selector: 'app-nok-nostroy-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, CtaSectionComponent, FaqWidgetComponent],
  templateUrl: './nok-nostroy-page.component.html',
  styleUrls: ['./nok-nostroy-page.component.scss']
})
export class NokNostroyPageComponent implements OnInit {
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

  // Конфигурация CTA для НОК НОСТРОЙ
  nokNostroyCtaConfig: CtaSectionConfig = {
    title: 'Готовы начать подготовку к НОК НОСТРОЙ?',
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
    title: 'НОК НОСТРОЙ',
    subtitle: 'Независимая оценка квалификации для специалистов строительной отрасли',
    price: '35 000 ₽',
    duration: '30 дней',
    gosposhlina: '18 000 - 24 000 ₽',
    icon: '🏗️',
    badge: 'ПОПУЛЯРНО',
    features: [
      '600+ актуальных вопросов для подготовки',
      'Симулятор экзамена с реальными заданиями',
      'Индивидуальные консультации экспертов',
      'Гарантия сдачи с первого раза',
      'Подготовка документов для подачи',
      'Сопровождение до получения свидетельства'
    ],
    levels: [
      {
        level: '5 уровень',
        title: 'Рабочие специальности',
        description: 'Каменщики, бетонщики, арматурщики, сварщики',
        examples: ['Каменщик', 'Бетонщик', 'Арматурщик', 'Сварщик']
      },
      {
        level: '6 уровень',
        title: 'Техники и мастера',
        description: 'Техники, мастера, бригадиры, прорабы',
        examples: ['Техник-строитель', 'Мастер строительных работ', 'Прораб']
      },
      {
        level: '7 уровень',
        title: 'Инженеры и специалисты',
        description: 'Инженеры, специалисты, руководители проектов',
        examples: ['Инженер-строитель', 'Специалист по строительному контролю', 'Руководитель проекта']
      }
    ],
    requirements: [
      'Образование: среднее профессиональное или высшее',
      'Опыт работы в строительной отрасли',
      'Документы об образовании и трудовой книжке',
      'Фотографии 3x4 см (2 шт.)',
      'Заявление на прохождение НОК'
    ],
    documents: [
      'Паспорт гражданина РФ',
      'Документ об образовании',
      'Трудовая книжка или справка о стаже',
      'Фотографии 3x4 см (2 шт.)',
      'Заявление на прохождение НОК',
      'Квитанция об оплате госпошлины'
    ],
    process: [
      {
        step: '01',
        title: 'Консультация и выбор квалификации',
        description: 'Определяем подходящую квалификацию и уровень',
        icon: '💬'
      },
      {
        step: '02',
        title: 'Подготовка документов',
        description: 'Помогаем собрать и оформить все необходимые документы',
        icon: '📄'
      },
      {
        step: '03',
        title: 'Обучение и подготовка',
        description: 'Проходим теоретический курс и практические задания',
        icon: '📚'
      },
      {
        step: '04',
        title: 'Пробный экзамен',
        description: 'Сдаем пробный экзамен для проверки готовности',
        icon: '✅'
      },
      {
        step: '05',
        title: 'Запись на экзамен',
        description: 'Записываемся на официальный экзамен в центре оценки',
        icon: '📅'
      },
      {
        step: '06',
        title: 'Сдача экзамена',
        description: 'Проходим независимую оценку квалификации',
        icon: '🎯'
      }
    ],
    benefits: [
      {
        icon: '📈',
        title: 'Карьерный рост',
        description: 'Возможность занимать более высокие должности и получать повышение'
      },
      {
        icon: '💰',
        title: 'Повышение зарплаты',
        description: 'Сертифицированные специалисты получают на 20-30% больше'
      },
      {
        icon: '🏗️',
        title: 'Доступ к проектам',
        description: 'Возможность участвовать в крупных и престижных проектах'
      },
      {
        icon: '🛡️',
        title: 'Правовая защита',
        description: 'Защита от штрафов и исключения из НРС'
      }
    ],
    risks: [
      {
        icon: '⚠️',
        title: 'Исключение из НРС',
        description: 'При неудачной сдаче специалист исключается из реестра на 2 года'
      },
      {
        icon: '💸',
        title: 'Финансовые потери',
        description: 'Повторная оплата госпошлины и подготовки (40-60 тыс. ₽)'
      },
      {
        icon: '🚫',
        title: 'Ограничения в работе',
        description: 'Невозможность занимать определенные должности без свидетельства'
      }
    ]
  };

  ngOnInit(): void {
    this.seoService.setNokNostroyPageSeo();

    // Добавляем structured data для услуги НОК НОСТРОЙ
    this.servicesService.getServiceById('nok-construction').subscribe((service: any) => {
      if (service) {
        this.seoService.addServicesPricingStructuredData([service]);
      }
    });
  }

  openConsultationPopup(): void {
    this.feedbackService.openForNokNostroy();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
} 