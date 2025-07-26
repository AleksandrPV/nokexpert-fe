import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-nok-procedure-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './nok-procedure-page.component.html',
  styleUrls: ['./nok-procedure-page.component.scss']
})
export class NokProcedurePageComponent implements OnInit {
  pageData = {
    title: 'Процедура прохождения НОК',
    subtitle: 'Пошаговая инструкция по прохождению независимой оценки квалификации',
    description: 'Подробная инструкция по прохождению НОК: от подачи документов до получения свидетельства о квалификации.',
    breadcrumbs: [
      { label: 'Главная', url: '/' },
      { label: 'Информация о НОК', url: '/info' },
      { label: 'Процедура прохождения НОК', url: '/info/nok-procedure' }
    ],
    steps: [
      {
        number: 1,
        title: 'Подача документов',
        description: 'Подготовка и подача пакета документов в выбранный ЦОК',
        icon: '📋',
        details: [
          'Заполнение заявления на прохождение НОК',
          'Сбор необходимых документов',
          'Подача документов в ЦОК лично или по почте',
          'Получение подтверждения о принятии документов'
        ],
        duration: '1-2 дня',
        cost: 'Без оплаты'
      },
      {
        number: 2,
        title: 'Рассмотрение заявки',
        description: 'Проверка документов и принятие решения о допуске к экзамену',
        icon: '🔍',
        details: [
          'Проверка полноты и корректности документов',
          'Проверка соответствия требованиям профессиональных стандартов',
          'Принятие решения о допуске к экзамену',
          'Уведомление о результате рассмотрения'
        ],
        duration: 'До 10 календарных дней',
        cost: 'Без оплаты'
      },
      {
        number: 3,
        title: 'Заключение договора',
        description: 'Подписание договора с ЦОК и оплата услуг',
        icon: '📝',
        details: [
          'Подписание договора на проведение НОК',
          'Оплата услуг ЦОК согласно тарифам',
          'Получение квитанции об оплате',
          'Согласование даты и времени экзамена'
        ],
        duration: '1 день',
        cost: '12 000 - 25 000 ₽'
      },
      {
        number: 4,
        title: 'Теоретический экзамен',
        description: 'Компьютерное тестирование по теоретическим вопросам',
        icon: '💻',
        details: [
          'Регистрация на экзамене',
          'Инструктаж по правилам проведения',
          'Компьютерное тестирование (60 минут)',
          '52 вопроса, нужно правильно ответить на 36'
        ],
        duration: '60 минут',
        cost: 'Включено в стоимость'
      },
      {
        number: 5,
        title: 'Практический экзамен',
        description: 'Решение ситуационных задач или защита портфолио',
        icon: '🎯',
        details: [
          'Решение практических задач',
          'Демонстрация профессиональных навыков',
          'Защита портфолио (для некоторых специальностей)',
          'Ответы на вопросы комиссии'
        ],
        duration: 'До 120 минут',
        cost: 'Включено в стоимость'
      },
      {
        number: 6,
        title: 'Получение результата',
        description: 'Получение свидетельства о квалификации или заключения',
        icon: '🎓',
        details: [
          'Ожидание результатов экзамена',
          'Получение свидетельства о квалификации (при успешной сдаче)',
          'Получение заключения с рекомендациями (при неудаче)',
          'Регистрация в реестре квалификаций'
        ],
        duration: 'До 30 дней',
        cost: 'Без оплаты'
      }
    ],
    requirements: {
      title: 'Требования к кандидатам',
      items: [
        {
          category: 'Образование',
          requirements: [
            'Высшее или среднее профессиональное образование',
            'Соответствие профилю квалификации',
            'Дополнительное профессиональное образование (при необходимости)'
          ]
        },
        {
          category: 'Опыт работы',
          requirements: [
            'Не менее 3 лет стажа по специальности',
            'Соответствие опыта требованиям профессионального стандарта',
            'Подтверждение опыта работы документами'
          ]
        },
        {
          category: 'Документы',
          requirements: [
            'Паспорт гражданина РФ',
            'Диплом об образовании',
            'Трудовая книжка или трудовой договор',
            'Справка об отсутствии судимости',
            'СНИЛС'
          ]
        }
      ]
    },
    tips: [
      {
        title: 'Подготовка к экзамену',
        content: 'Изучите профессиональные стандарты, пройдите подготовительные курсы, используйте тренажеры для практики.'
      },
      {
        title: 'Выбор ЦОК',
        content: 'Выбирайте ЦОК с аккредитацией по вашей специальности, удобным расположением и положительными отзывами.'
      },
      {
        title: 'Документы',
        content: 'Подготовьте документы заранее, убедитесь в их актуальности и корректности заполнения.'
      },
      {
        title: 'Психологическая подготовка',
        content: 'Сохраняйте спокойствие на экзамене, внимательно читайте вопросы, распределите время правильно.'
      }
    ],
    faq: {
      title: 'Частые вопросы о процедуре НОК',
      items: [
        {
          question: 'Сколько времени занимает вся процедура НОК?',
          answer: 'От подачи документов до получения свидетельства проходит 1-2 месяца. Сама процедура экзамена занимает 1 день.',
          isOpen: false
        },
        {
          question: 'Можно ли пересдать экзамен при неудаче?',
          answer: 'Да, при неудаче можно подать новое заявление и пройти экзамен повторно после дополнительной подготовки.',
          isOpen: false
        },
        {
          question: 'Что делать, если не согласен с результатом?',
          answer: 'Можно подать апелляцию в ЦОК в течение 10 дней после получения результата.',
          isOpen: false
        },
        {
          question: 'Нужно ли проходить НОК повторно при смене работы?',
          answer: 'Нет, свидетельство о квалификации действует независимо от места работы в течение установленного срока.',
          isOpen: false
        }
      ]
    }
  };

  constructor(
    private seoService: SeoService,
    public feedbackPopupService: FeedbackPopupService,
    public organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.seoService.setNokProcedurePageSeo();
  }

  openConsultationPopup(): void {
    this.feedbackPopupService.openForConsultation();
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