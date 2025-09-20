import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { RelatedMaterialsComponent } from '../../../shared/components/related-materials/related-materials.component';
import { ContextualLinksComponent } from '../../../shared/components/contextual-links/contextual-links.component';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-what-is-nok-page',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    RelatedMaterialsComponent,
    ContextualLinksComponent
  ],
  templateUrl: './what-is-nok-page.component.html',
  styleUrls: ['./what-is-nok-page.component.scss']
})
export class WhatIsNokPageComponent implements OnInit {
  pageData = {
    title: 'Что такое НОК',
    subtitle: 'Независимая оценка квалификации в России',
    description: 'НОК — это процедура подтверждения соответствия квалификации специалиста требованиям профессиональных стандартов.',
    breadcrumbs: [
      { label: 'Главная', url: '/' },
      { label: 'Информация о НОК', url: '/info' },
      { label: 'Что такое НОК', url: '/info/what-is-nok' }
    ],
    sections: [
      {
        title: 'Определение НОК',
        content: 'Независимая оценка квалификации (НОК) — это процедура подтверждения соответствия квалификации работника требованиям профессиональных стандартов, проводимая в аккредитованных центрах оценки квалификации.',
        icon: '📋'
      },
      {
        title: 'Законодательная база',
        content: 'Основным документом является Федеральный закон №238-ФЗ от 03.07.2016 "О независимой оценке квалификации". Закон регулирует порядок проведения НОК и устанавливает правовые основы системы независимой оценки квалификации.',
        icon: '⚖️'
      },
      {
        title: 'Цели НОК',
        content: '• Подтверждение профессиональной компетентности специалистов\n• Повышение качества профессионального образования\n• Создание единых стандартов оценки квалификации\n• Развитие системы профессиональных квалификаций',
        icon: '🎯'
      },
      {
        title: 'Кто проводит НОК',
        content: 'НОК проводится в аккредитованных центрах оценки квалификации (ЦОК), которые получили право на проведение оценки от советов по профессиональным квалификациям.',
        icon: '🏢'
      }
    ],
    benefits: [
      {
        title: 'Для специалистов',
        description: 'Официальное подтверждение квалификации, повышение конкурентоспособности, новые карьерные возможности'
      },
      {
        title: 'Для работодателей',
        description: 'Объективная оценка персонала, снижение рисков при найме, соответствие законодательным требованиям'
      },
      {
        title: 'Для отрасли',
        description: 'Повышение качества работ, стандартизация требований, развитие профессиональных стандартов'
      }
    ],
    faq: {
      title: 'Частые вопросы о НОК',
      items: [
        {
          question: 'Обязательна ли НОК для всех специалистов?',
          answer: 'НОК обязательна для специалистов, включенных в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ. Для других отраслей НОК может быть добровольной.',
          isOpen: false
        },
        {
          question: 'Сколько действует свидетельство о квалификации?',
          answer: 'Срок действия свидетельства зависит от направления: для строителей — 3 года, для проектировщиков — 5 лет, для специалистов по пожарной безопасности — 5 лет.',
          isOpen: false
        },
        {
          question: 'Можно ли пройти НОК дистанционно?',
          answer: 'Нет, профессиональный экзамен НОК проводится только в очном формате с обязательным присутствием соискателя.',
          isOpen: false
        },
        {
          question: 'Что включает в себя экзамен НОК?',
          answer: 'Экзамен состоит из теоретической части (компьютерное тестирование) и практической части (решение ситуационных задач или защита портфолио).',
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
    this.seoService.setWhatIsNokPageSeo();

    // Добавляем breadcrumbs structured data для информационной страницы
    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Что такое НОК', url: `${this.seoService.getBaseUrl()}/info/what-is-nok` }
    ]);
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