import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-who-must-pass-nok-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './who-must-pass-nok-page.component.html',
  styleUrls: ['./who-must-pass-nok-page.component.scss']
})
export class WhoMustPassNokPageComponent implements OnInit {
  pageData = {
    title: 'Кому обязательно проходить НОК',
    subtitle: 'Требования к специалистам и сроки прохождения',
    description: 'Узнайте, кто обязан пройти независимую оценку квалификации и в какие сроки это необходимо сделать.',
    breadcrumbs: [
      { label: 'Главная', url: '/' },
      { label: 'Информация о НОК', url: '/info' },
      { label: 'Кому обязательно проходить НОК', url: '/info/who-must-pass-nok' }
    ],
    categories: [
      {
        title: 'Специалисты НОСТРОЙ',
        description: 'Строительные специальности, включенные в НРС НОСТРОЙ',
        icon: '🏗️',
        specialists: [
          'Главный инженер проекта',
          'Специалист по организации строительства',
          'Специалист по строительству особо опасных объектов',
          'Специалист по организации производства строительных работ'
        ],
        deadline: 'Обязательно с 2022 года',
        validity: '3 года'
      },
      {
        title: 'Специалисты НОПРИЗ',
        description: 'Проектировщики и изыскатели, включенные в НРС НОПРИЗ',
        icon: '📐',
        specialists: [
          'Главный инженер проекта (архитектурно-строительное проектирование)',
          'Главный инженер проекта (инженерные изыскания)',
          'Специалист по проектированию',
          'Специалист по инженерным изысканиям'
        ],
        deadline: 'Обязательно с 2022 года',
        validity: '5 лет'
      },
      {
        title: 'Специалисты по пожарной безопасности',
        description: 'Ответственные за пожарную безопасность (добровольная НОК)',
        icon: '🔥',
        specialists: [
          'Ответственный за пожарную безопасность',
          'Специалист по противопожарной защите',
          'Руководитель службы пожарной безопасности'
        ],
        deadline: 'Добровольная (не обязательная)',
        validity: '5 лет'
      }
    ],
    requirements: [
      {
        title: 'Обязательные требования',
        items: [
          'Включение в Национальный реестр специалистов (НРС)',
          'Соответствие требованиям профессиональных стандартов',
          'Наличие необходимого образования и опыта работы',
          'Отсутствие судимости'
        ]
      },
      {
        title: 'Документы для подачи',
        items: [
          'Заявление на прохождение НОК',
          'Копия паспорта',
          'Диплом об образовании',
          'Трудовая книжка или трудовой договор',
          'Справка об отсутствии судимости',
          'СНИЛС'
        ]
      }
    ],
    deadlines: [
      {
        period: '2022-2023',
        description: 'Первый этап внедрения НОК для ключевых специалистов'
      },
      {
        period: '2024-2025',
        description: 'Расширение обязательной НОК на все категории специалистов'
      },
      {
        period: '2025+',
        description: 'Полное внедрение системы независимой оценки квалификации'
      }
    ],
    faq: {
      title: 'Частые вопросы о обязательности НОК',
      items: [
        {
          question: 'Что будет, если не пройти НОК в срок?',
          answer: 'При невыполнении обязательной НОК специалист может быть исключен из НРС и потерять право занимать соответствующие должности.',
          isOpen: false
        },
        {
          question: 'Можно ли пройти НОК заранее?',
          answer: 'Да, НОК можно пройти в любое время, не дожидаясь истечения срока действия предыдущего свидетельства.',
          isOpen: false
        },
        {
          question: 'Освобождает ли профильное образование от НОК?',
          answer: 'Нет, даже при наличии профильного образования специалисты, включенные в НРС, обязаны проходить НОК.',
          isOpen: false
        },
        {
          question: 'Как проверить, включен ли я в НРС?',
          answer: 'Проверить включение в НРС можно на официальных сайтах НОСТРОЙ и НОПРИЗ в разделе "Реестр специалистов".',
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
    this.seoService.setWhoMustPassNokPageSeo();
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