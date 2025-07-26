import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CtaSectionComponent, CtaSectionConfig } from '../../../shared/components/cta-section/cta-section.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-qa-centers-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, CtaSectionComponent],
  templateUrl: './centers-page.component.html',
  styleUrls: ['./centers-page.component.scss']
})
export class QaCentersPageComponent implements OnInit {
  
  pageData = {
    title: 'Центры независимой оценки квалификации (ЦОК)',
    description: 'Официальные центры для прохождения НОК в строительстве, проектировании, изысканиях и пожарной безопасности',
    
    whatIsCok: {
      title: 'Что такое Центр оценки квалификации?',
      cards: [
        {
          icon: '🏢',
          title: 'Аккредитованные организации',
          description: 'ЦОК — это юридические лица, получившие право проводить независимую оценку квалификации от советов по профессиональным квалификациям при НОСТРОЙ, НОПРИЗ и других национальных объединениях.'
        },
        {
          icon: '📋',
          title: 'Профессиональный экзамен',
          description: 'В ЦОК проводится независимая оценка квалификации в форме профессионального экзамена, состоящего из теоретической и практической частей.'
        },
        {
          icon: '🎓',
          title: 'Официальное свидетельство',
          description: 'По результатам успешной сдачи экзамена выдается свидетельство о квалификации, действующее 3-5 лет в зависимости от специальности.'
        }
      ]
    },

    process: {
      title: 'Как проходит НОК в ЦОК',
      steps: [
        {
          number: 1,
          title: 'Подача документов',
          description: 'Подача заявления и пакета документов в выбранный ЦОК'
        },
        {
          number: 2,
          title: 'Рассмотрение заявки',
          description: 'Рассмотрение документов в течение 10 календарных дней'
        },
        {
          number: 3,
          title: 'Заключение договора',
          description: 'Подписание договора и оплата услуг ЦОК'
        },
        {
          number: 4,
          title: 'Экзамен',
          description: 'Прохождение теоретической и практической части экзамена'
        },
        {
          number: 5,
          title: 'Получение свидетельства',
          description: 'Выдача свидетельства о квалификации в течение 30 дней'
        }
      ]
    },

    directions: {
      title: 'Направления независимой оценки квалификации',
      cards: [
        {
          icon: '🏗️',
          title: 'Строительство',
          organization: 'СПК НОСТРОЙ',
          specializations: [
            'Главный инженер проекта (специалист по организации строительства)',
            'Специалист по строительству особо опасных объектов',
            'Специалист по организации производства строительных работ'
          ],
          validity: '3 года'
        },
        {
          icon: '📐',
          title: 'Проектирование и изыскания',
          organization: 'СПК НОПРИЗ',
          specializations: [
            'Главный инженер проекта (специалист по организации архитектурно-строительного проектирования)',
            'Главный инженер проекта (специалист по организации инженерных изысканий)',
            'Специалист по проектированию'
          ],
          validity: '5 лет'
        },
        {
          icon: '🔥',
          title: 'Пожарная безопасность',
          organization: 'СПК ЧС',
          specializations: [
            'Руководитель службы пожарной безопасности на объекте',
            'Специалист по противопожарной защите на объекте'
          ],
          validity: '5 лет'
        }
      ]
    },

    centers: {
      title: 'Ведущие центры оценки квалификации',
      regions: [
        {
          name: 'Москва и Московская область',
          centers: [
            {
              name: 'ЦОК-1 (Первый центр оценки квалификации)',
              address: 'Москва',
              phone: '+7 (495) 445-01-60',
              website: 'cok-1.ru',
              specializations: ['Строительство', 'Проектирование', 'Пожарная безопасность']
            },
            {
              name: 'МЦОК "ТехноПрогресс"',
              address: 'Москва, Проектируемый проезд 4062, д. 6, стр. 16',
              website: 'mcoktp.ru',
              specializations: ['Строительство', 'Проектирование', 'Изыскания']
            },
            {
              name: 'ЦОК строительного комплекса',
              website: 'cok-sk.ru',
              specializations: ['Градостроительство', 'Инженерные изыскания', 'Архитектурно-строительное проектирование']
            }
          ]
        },
        {
          name: 'Санкт-Петербург и Ленинградская область',
          centers: [
            {
              name: 'Центр оценки квалификаций (Ленинградская ТПП)',
              address: 'Ленинградская область',
              website: 'lo.tpprf.ru',
              specializations: ['Строительство']
            }
          ]
        },
        {
          name: 'Регионы России',
          centers: [
            {
              name: 'ЦОК Республики Башкортостан',
              address: 'г. Уфа',
              website: 'cokrb.ru',
              specializations: ['Строительство']
            },
            {
              name: 'ЦОК "СтройЭкспертГрупп"',
              address: 'г. Екатеринбург, Свердловская область',
              website: 'ucstroitel.ru',
              specializations: ['Строительство', 'Инженерные изыскания']
            }
          ]
        }
      ]
    },

    benefits: {
      title: 'Преимущества прохождения НОК',
      items: [
        {
          icon: '✓',
          title: 'Для специалистов',
          description: 'Официальное подтверждение квалификации, повышение конкурентоспособности на рынке труда, новые карьерные возможности'
        },
        {
          icon: '✓',
          title: 'Для работодателей',
          description: 'Объективная оценка персонала, снижение рисков при найме, соответствие законодательным требованиям'
        },
        {
          icon: '✓',
          title: 'Налоговые льготы',
          description: 'Возможность получения социального налогового вычета по НДФЛ до 120 000 рублей в год'
        },
        {
          icon: '✓',
          title: 'Включение в НРС',
          description: 'Обязательное требование для включения в Национальный реестр специалистов НОСТРОЙ и НОПРИЗ'
        }
      ]
    },

    faq: {
      title: 'Частые вопросы о ЦОК',
      items: [
        {
          question: 'Как выбрать подходящий ЦОК?',
          answer: 'При выборе ЦОК учитывайте: аккредитацию по вашему направлению (строительство, проектирование, изыскания), территориальную доступность экзаменационных площадок, стоимость услуг и отзывы других специалистов.',
          isOpen: false
        },
        {
          question: 'Какие документы нужны для подачи в ЦОК?',
          answer: 'Базовый пакет: заявление, копия паспорта, диплом об образовании, копия трудовой книжки, СНИЛС, справка об отсутствии судимости, уведомление о включении в НРС (при наличии).',
          isOpen: false
        },
        {
          question: 'Сколько стоит прохождение НОК?',
          answer: 'Стоимость варьируется от 12 000 до 25 000 рублей в зависимости от ЦОК, квалификации и региона. Точную стоимость уточняйте в выбранном центре оценки.',
          isOpen: false
        },
        {
          question: 'Можно ли пройти НОК дистанционно?',
          answer: 'Нет, профессиональный экзамен НОК проводится только в очном формате с обязательным присутствием соискателя и видеофиксацией процедуры.',
          isOpen: false
        },
        {
          question: 'Что делать, если экзамен не сдан?',
          answer: 'При неудовлетворительном результате выдается заключение с рекомендациями. Повторную попытку можно предпринять после дополнительной подготовки, подав новое заявление.',
          isOpen: false
        }
      ]
    }
  };

  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Центры оценки квалификации', url: '/qa-centers' }
  ];

  // Конфигурация CTA для центров оценки квалификации
  qaCentersCtaConfig: CtaSectionConfig = {
    title: 'Нужна помощь в подготовке к НОК?',
    subtitle: 'Наши эксперты помогут выбрать подходящий ЦОК и успешно подготовиться к экзамену',
    background: 'dark',
    padding: 'medium',
    showAdditionalInfo: true,
    buttons: [
      {
        text: 'Получить консультацию',
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

  constructor(
    private seoService: SeoService,
    private feedbackService: FeedbackPopupService,
    public organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.seoService.setQaCentersPageSeo();
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleFaq(event: Event): void {
    const button = event.target as HTMLElement;
    const faqItem = button.closest('.bg-white');
    const answer = faqItem?.querySelector('.faq-answer');
    const icon = button.querySelector('span');
    
    if (answer && icon) {
      const isOpen = answer.classList.contains('block');
      
      // Закрыть все остальные FAQ
      document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('block');
        item.classList.add('hidden');
      });
      document.querySelectorAll('.faq-answer').forEach((item, index) => {
        const parent = item.closest('.bg-white');
        const parentIcon = parent?.querySelector('span');
        if (parentIcon) {
          parentIcon.style.transform = 'rotate(0deg)';
        }
      });
      
      // Переключить текущий FAQ
      if (isOpen) {
        answer.classList.remove('block');
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.remove('hidden');
        answer.classList.add('block');
        icon.style.transform = 'rotate(180deg)';
      }
    }
  }
} 