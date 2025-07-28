import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-nok-other-industries-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './nok-other-industries-page.component.html',
  styleUrls: ['./nok-other-industries-page.component.scss']
})
export class NokOtherIndustriesPageComponent implements OnInit {
  pageData = {
    title: 'НОК для других отраслей',
    subtitle: 'Независимая оценка квалификации в различных сферах деятельности',
    description: 'Узнайте о возможностях прохождения НОК в лифтовой отрасли, энергетике, машиностроении и других перспективных направлениях.',
    breadcrumbs: [
      { label: 'Главная', url: '/' },
      { label: 'Информация о НОК', url: '/info' },
      { label: 'НОК для других отраслей', url: '/info/nok-other-industries' }
    ],
    industries: [
      {
        title: 'Лифтовая отрасль',
        description: 'НОК для специалистов по обслуживанию и ремонту лифтового оборудования',
        icon: '🛗',
        specializations: [
          'Специалист по техническому обслуживанию лифтов',
          'Специалист по ремонту лифтового оборудования',
          'Инженер по лифтовому хозяйству'
        ],
        council: 'СПК Лифтовой отрасли',
        validity: '3-5 лет',
        status: 'Развивающееся направление'
      },
      {
        title: 'Энергетика',
        description: 'НОК для специалистов энергетической отрасли',
        icon: '⚡',
        specializations: [
          'Специалист по эксплуатации энергетического оборудования',
          'Инженер по энергетике',
          'Специалист по энергосбережению'
        ],
        council: 'СПК Энергетики',
        validity: '5 лет',
        status: 'Перспективное направление'
      },
      {
        title: 'Машиностроение',
        description: 'НОК для специалистов машиностроительной отрасли',
        icon: '⚙️',
        specializations: [
          'Инженер-конструктор',
          'Технолог машиностроения',
          'Специалист по качеству продукции'
        ],
        council: 'СПК Машиностроения',
        validity: '5 лет',
        status: 'Развивающееся направление'
      },
      {
        title: 'Чрезвычайные ситуации',
        description: 'НОК для специалистов МЧС и спасательных служб',
        icon: '🚨',
        specializations: [
          'Спасатель',
          'Специалист по гражданской обороне',
          'Инспектор по пожарному надзору'
        ],
        council: 'СПК ЧС',
        validity: '5 лет',
        status: 'Активное развитие'
      },
      {
        title: 'Медицина',
        description: 'НОК для медицинских специалистов',
        icon: '🏥',
        specializations: [
          'Врач-специалист',
          'Медицинская сестра',
          'Фармацевт'
        ],
        council: 'СПК Здравоохранения',
        validity: '5 лет',
        status: 'Пилотные проекты'
      },
      {
        title: 'IT и телекоммуникации',
        description: 'НОК для специалистов информационных технологий',
        icon: '💻',
        specializations: [
          'Программист',
          'Системный администратор',
          'Специалист по информационной безопасности'
        ],
        council: 'СПК IT',
        validity: '3-5 лет',
        status: 'Перспективное направление'
      }
    ],
    benefits: [
      {
        title: 'Расширение возможностей',
        description: 'Получение квалификации в новых перспективных отраслях'
      },
      {
        title: 'Карьерный рост',
        description: 'Возможность работать в высокотехнологичных отраслях'
      },
      {
        title: 'Конкурентоспособность',
        description: 'Повышение конкурентоспособности на рынке труда'
      },
      {
        title: 'Государственная поддержка',
        description: 'Возможность получения налоговых льгот и субсидий'
      }
    ],
    development: [
      {
        period: '2023-2024',
        description: 'Пилотные проекты НОК в новых отраслях'
      },
      {
        period: '2024-2025',
        description: 'Расширение системы НОК на новые направления'
      },
      {
        period: '2025+',
        description: 'Полное внедрение НОК во всех отраслях экономики'
      }
    ],
    faq: {
      title: 'Частые вопросы о НОК в других отраслях',
      items: [
        {
          question: 'Обязательна ли НОК в новых отраслях?',
          answer: 'В большинстве новых отраслей НОК пока является добровольной. Обязательность вводится поэтапно.',
          isOpen: false
        },
        {
          question: 'Где можно пройти НОК по новым направлениям?',
          answer: 'НОК по новым направлениям проводится в специализированных ЦОК, аккредитованных соответствующими советами по профессиональным квалификациям.',
          isOpen: false
        },
        {
          question: 'Сколько стоит НОК в новых отраслях?',
          answer: 'Стоимость варьируется от 15 000 до 30 000 рублей в зависимости от отрасли и квалификации.',
          isOpen: false
        },
        {
          question: 'Какие документы нужны для НОК в новых отраслях?',
          answer: 'Требования к документам аналогичны основным отраслям: паспорт, диплом, трудовая книжка, справка об отсутствии судимости.',
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
    this.seoService.setNokOtherIndustriesPageSeo();
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