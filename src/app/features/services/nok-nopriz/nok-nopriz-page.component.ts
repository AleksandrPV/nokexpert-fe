import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-nok-nopriz-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './nok-nopriz-page.component.html',
  styleUrls: ['./nok-nopriz-page.component.scss']
})
export class NokNoprizPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);

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

  // Данные услуги
  serviceData = {
    title: 'НОК НОПРИЗ',
    subtitle: 'Независимая оценка квалификации для специалистов проектирования и изысканий',
    price: '40 000 ₽',
    duration: '35 дней',
    gosposhlina: '22 000 - 28 000 ₽',
    icon: '📐',
    badge: 'ПРЕМИУМ',
    features: [
      '800+ актуальных вопросов для подготовки',
      'Симулятор экзамена с реальными заданиями',
      'Индивидуальные консультации экспертов',
      'Гарантия сдачи с первого раза',
      'Подготовка документов для подачи',
      'Сопровождение до получения свидетельства',
      'Помощь с портфолио проектов'
    ],
    levels: [
      {
        level: '6 уровень',
        title: 'Техники и специалисты',
        description: 'Техники, специалисты, инженеры-проектировщики',
        examples: ['Техник-проектировщик', 'Специалист по проектированию', 'Инженер-проектировщик']
      },
      {
        level: '7 уровень',
        title: 'Ведущие специалисты',
        description: 'Ведущие специалисты, руководители проектов',
        examples: ['Ведущий специалист по проектированию', 'Руководитель проекта', 'Главный специалист']
      },
      {
        level: '8 уровень',
        title: 'Руководители и эксперты',
        description: 'Руководители отделов, эксперты, консультанты',
        examples: ['Руководитель проектного отдела', 'Эксперт по проектированию', 'Консультант по изысканиям']
      }
    ],
    requirements: [
      'Образование: высшее техническое (строительное, архитектурное)',
      'Опыт работы в проектировании или изысканиях от 3 лет',
      'Документы об образовании и трудовой книжке',
      'Портфолио выполненных проектов',
      'Фотографии 3x4 см (2 шт.)',
      'Заявление на прохождение НОК'
    ],
    documents: [
      'Паспорт гражданина РФ',
      'Диплом о высшем образовании',
      'Трудовая книжка или справка о стаже',
      'Портфолио проектов (не менее 3-5 проектов)',
      'Фотографии 3x4 см (2 шт.)',
      'Заявление на прохождение НОК',
      'Квитанция об оплате госпошлины'
    ],
    process: [
      {
        step: '01',
        title: 'Консультация и анализ портфолио',
        description: 'Оцениваем опыт и определяем подходящую квалификацию',
        icon: '📋'
      },
      {
        step: '02',
        title: 'Подготовка портфолио',
        description: 'Помогаем структурировать и оформить проекты для НОК',
        icon: '📁'
      },
      {
        step: '03',
        title: 'Подготовка документов',
        description: 'Собираем и оформляем все необходимые документы',
        icon: '📄'
      },
      {
        step: '04',
        title: 'Обучение и подготовка',
        description: 'Проходим теоретический курс и практические задания',
        icon: '📚'
      },
      {
        step: '05',
        title: 'Пробный экзамен',
        description: 'Сдаем пробный экзамен для проверки готовности',
        icon: '✅'
      },
      {
        step: '06',
        title: 'Запись на экзамен',
        description: 'Записываемся на официальный экзамен в центре оценки',
        icon: '📅'
      },
      {
        step: '07',
        title: 'Сдача экзамена',
        description: 'Проходим независимую оценку квалификации',
        icon: '🎯'
      }
    ],
    benefits: [
      {
        icon: '🏆',
        title: 'Повышение статуса',
        description: 'Получение официального подтверждения квалификации и статуса'
      },
      {
        icon: '💰',
        title: 'Рост доходов',
        description: 'Сертифицированные специалисты получают на 25-40% больше'
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
      },
      {
        icon: '📈',
        title: 'Карьерный рост',
        description: 'Возможность занимать руководящие должности'
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
        description: 'Повторная оплата госпошлины и подготовки (50-80 тыс. ₽)'
      },
      {
        icon: '🚫',
        title: 'Ограничения в работе',
        description: 'Невозможность занимать определенные должности без свидетельства'
      },
      {
        icon: '📉',
        title: 'Потеря репутации',
        description: 'Снижение доверия со стороны работодателей и клиентов'
      }
    ]
  };

  ngOnInit(): void {
    this.seoService.setNokNoprizPageSeo();
  }

  openConsultationPopup(): void {
    this.feedbackService.openForNokNopriz();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
} 