import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CtaSectionComponent, CtaSectionConfig } from '../../../shared/components/cta-section/cta-section.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-nok-opb-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, CtaSectionComponent],
  templateUrl: './nok-opb-page.component.html',
  styleUrls: ['./nok-opb-page.component.scss']
})
export class NokOpbPageComponent implements OnInit {
  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Услуги', url: '/services' },
    { label: 'НОК ОПБ', url: '/services/nok-opb' }
  ];

  phoneDisplay = '';
  phoneHref = '';

  // Конфигурация CTA для НОК ОПБ
  nokOpbCtaConfig: CtaSectionConfig = {
    title: 'Готовы начать подготовку к НОК ОПБ?',
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

  serviceData = {
    title: 'НОК для ответственных по пожарной безопасности',
    subtitle: 'Независимая оценка квалификации специалистов по пожарной безопасности',
    price: 'от 13 900 ₽',
    duration: '5 лет',
    features: [
      'Независимая оценка квалификации',
      'Профессиональный экзамен',
      'Свидетельство о квалификации',
      'Подтверждение компетентности'
    ],
    levels: [
      {
        level: '5 уровень',
        title: 'Ответственный за пожарную безопасность',
        functions: [
          'Организация и контроль противопожарных мероприятий',
          'Проведение противопожарных инструктажей',
          'Разработка инструкций по пожарной безопасности',
          'Контроль состояния первичных средств пожаротушения'
        ]
      },
      {
        level: '6 уровень',
        title: 'Специалист по противопожарной защите на объекте',
        functions: [
          'Разработка систем противопожарной защиты',
          'Проектирование противопожарных мероприятий',
          'Экспертиза проектов на соответствие требованиям ПБ',
          'Взаимодействие с надзорными органами'
        ]
      },
      {
        level: '7 уровень',
        title: 'Руководитель службы пожарной безопасности на объекте',
        functions: [
          'Управление службой пожарной безопасности',
          'Стратегическое планирование мер ПБ',
          'Организация обучения персонала',
          'Координация с внешними службами'
        ]
      }
    ],
    requirements: [
      'Образование в области пожарной безопасности или смежных областях',
      'Опыт работы в сфере пожарной безопасности',
      'Отсутствие судимости',
      'Соответствие требованиям профессионального стандарта'
    ],
    documents: [
      'Заявление на прохождение НОК',
      'Копия паспорта',
      'Копия диплома об образовании (заверенная)',
      'Копия трудовой книжки',
      'Справка об отсутствии судимости',
      'СНИЛС',
      'Документы о дополнительном образовании (при наличии)',
      'Согласие на обработку персональных данных'
    ],
    process: [
      {
        step: 1,
        title: 'Подача документов',
        description: 'Подача заявления и пакета документов в аккредитованный ЦОК. Рассмотрение заявки занимает до 10 календарных дней.'
      },
      {
        step: 2,
        title: 'Заключение договора',
        description: 'Подписание договора с ЦОК и оплата услуг по независимой оценке квалификации.'
      },
      {
        step: 3,
        title: 'Теоретический экзамен',
        description: 'Компьютерное тестирование (60 минут, 52 вопроса, нужно правильно ответить на 36). Проводится под видеонаблюдением.'
      },
      {
        step: 4,
        title: 'Практический экзамен',
        description: 'Решение ситуационных задач, демонстрация практических навыков в области пожарной безопасности.'
      },
      {
        step: 5,
        title: 'Получение свидетельства',
        description: 'При успешной сдаче экзамена выдается свидетельство о квалификации в течение 30 дней.'
      }
    ],
    benefits: [
      'Официальное подтверждение квалификации',
      'Повышение конкурентоспособности на рынке труда',
      'Расширение карьерных возможностей',
      'Соответствие требованиям работодателей',
      'Возможность работы на особо важных объектах'
    ],
    risks: [
      'Финансовые затраты на прохождение НОК',
      'Временные затраты на подготовку и сдачу экзамена',
      'Риск не сдать экзамен с первого раза',
      'Необходимость пересдачи при неудаче'
    ],
    faq: [
      {
        question: 'Обязательна ли НОК для ответственного за пожарную безопасность?',
        answer: 'По состоянию на 2025 год НОК НЕ является обязательной. МЧС России в официальных письмах подтвердило добровольный характер независимой оценки квалификации. Решение о направлении сотрудников на НОК принимает работодатель.',
        isOpen: false
      },
      {
        question: 'Можно ли пройти НОК дистанционно?',
        answer: 'Нет, профессиональный экзамен НОК проводится только в очном формате с обязательным присутствием соискателя. Процедура фиксируется средствами видеонаблюдения.',
        isOpen: false
      },
      {
        question: 'Кому НОК не требуется?',
        answer: 'НОК не требуется специалистам с высшим или средним профессиональным образованием по специальности "Пожарная безопасность" или прошедшим профессиональную переподготовку в области пожарной безопасности (256+ часов).',
        isOpen: false
      },
      {
        question: 'Что будет, если экзамен не сдан?',
        answer: 'При неудовлетворительном результате выдается заключение с рекомендациями по дополнительной подготовке. Повторную попытку можно предпринять после подачи новых документов и доплаты.',
        isOpen: false
      },
      {
        question: 'Как часто нужно проходить НОК?',
        answer: 'Свидетельство о квалификации действует 5 лет. По истечении этого срока необходимо пройти НОК повторно для подтверждения квалификации.',
        isOpen: false
      }
    ]
  };

  constructor(
    private seoService: SeoService,
    private feedbackPopupService: FeedbackPopupService,
    public organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.seoService.setNokOpbPageSeo();
    this.phoneDisplay = this.organizationService.getPhoneDisplay();
    this.phoneHref = this.organizationService.getPhoneHref();
  }

  openConsultationPopup(): void {
    this.feedbackPopupService.openForNokOpb();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleFaq(item: any): void {
    item.isOpen = !item.isOpen;
  }
} 