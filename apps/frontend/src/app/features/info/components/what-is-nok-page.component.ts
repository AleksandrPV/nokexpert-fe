import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-what-is-nok-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './what-is-nok-page.component.html',
  styleUrls: ['./what-is-nok-page.component.scss']
})
export class WhatIsNokPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  specialists = [
    {
      icon: 'building-2',
      title: 'Специалисты НОСТРОЙ',
      description: 'Инженеры, прорабы и ГИП строительных компаний, включённых в СРО. Обязательна для НРС.',
      color: 'blue'
    },
    {
      icon: 'search',
      title: 'Специалисты НОПРИЗ',
      description: 'Проектировщики, изыскатели и архитекторы. Подтверждение квалификации для проектных организаций.',
      color: 'cyan'
    },
    {
      icon: 'flame',
      title: 'Специалисты ОПБ',
      description: 'Инженеры по пожарной безопасности и специалисты, ответственные за противопожарную защиту объектов.',
      color: 'orange'
    },
    {
      icon: 'siren',
      title: 'Специалисты МЧС',
      description: 'Работники аварийно-спасательных формирований и специалисты в области гражданской обороны.',
      color: 'red'
    },
    {
      icon: 'house',
      title: 'Специалисты ЖКХ',
      description: 'Управляющие многоквартирными домами и специалисты жилищно-коммунального хозяйства.',
      color: 'teal'
    },
    {
      icon: 'factory',
      title: 'Другие отрасли',
      description: 'Энергетика, транспорт, сельское хозяйство и другие отрасли с профессиональными стандартами.',
      color: 'violet'
    }
  ];

  processSteps = [
    {
      step: '01',
      title: 'Подача заявления',
      description: 'Соискатель подаёт заявление в аккредитованный Центр оценки квалификаций (ЦОК) вместе с пакетом документов: диплом, трудовая книжка, СНИЛС, портфолио.'
    },
    {
      step: '02',
      title: 'Профессиональный экзамен',
      description: 'Экзамен проходит очно в ЦОК и состоит из теоретической части (компьютерное тестирование) и практической части (решение ситуационных задач или защита портфолио).'
    },
    {
      step: '03',
      title: 'Получение свидетельства',
      description: 'При успешной сдаче выдаётся свидетельство о квалификации установленного образца. Результаты вносятся в Федеральный реестр сведений о квалификациях.'
    },
    {
      step: '04',
      title: 'Включение в НРС',
      description: 'На основании свидетельства НОК специалист может быть внесён в Национальный реестр специалистов (НРС) НОСТРОЙ или НОПРИЗ для занятия руководящих должностей.'
    }
  ];

  benefits = [
    {
      icon: 'badge-check',
      title: 'Официальное подтверждение',
      description: 'Свидетельство НОК --- единственный законный способ подтвердить квалификацию по профессиональным стандартам в России.'
    },
    {
      icon: 'trending-up',
      title: 'Карьерный рост',
      description: 'Без свидетельства НОК невозможно занимать должности ГИП, ГАП и руководителя проекта в строительных и проектных организациях.'
    },
    {
      icon: 'shield-check',
      title: 'Конкурентное преимущество',
      description: 'Работодатели обязаны привлекать специалистов с подтверждённой квалификацией. НОК повышает вашу ценность на рынке труда.'
    },
    {
      icon: 'scale',
      title: 'Соответствие закону',
      description: 'Организации-члены СРО обязаны иметь специалистов с действующим свидетельством НОК. Это требование 238-ФЗ и градостроительного кодекса.'
    },
    {
      icon: 'building',
      title: 'Допуск к объектам',
      description: 'Без НОК специалист не может быть назначен ответственным за организацию строительства, проектирования или инженерных изысканий.'
    },
    {
      icon: 'award',
      title: 'Единый стандарт',
      description: 'НОК обеспечивает единую систему оценки квалификации по всей России, признаваемую всеми СРО, заказчиками и госорганами.'
    }
  ];

  keyFacts = [
    { number: '238-ФЗ', label: 'Федеральный закон', description: 'Закон о независимой оценке квалификаций от 03.07.2016' },
    { number: '3–5 лет', label: 'Срок действия', description: 'Период действия свидетельства о квалификации (зависит от квалификации)' },
    { number: '400+', label: 'Центров ЦОК', description: 'Аккредитованных центров оценки квалификаций в России' },
    { number: '2017', label: 'Старт системы', description: 'Год вступления в силу закона о НОК' }
  ];

  relatedArticles = [
    {
      title: 'Кому нужна НОК',
      description: 'Подробный разбор: какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'blue'
    },
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения независимой оценки квалификации',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'emerald'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по подготовке к профессиональному экзамену НОК',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
      color: 'violet'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Особенности оценки квалификации для специалистов строительной отрасли',
      icon: 'building-2',
      link: '/info/nok-nostroy',
      color: 'cyan'
    },
    {
      title: 'Реестр специалистов',
      description: 'Как попасть в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ',
      icon: 'database',
      link: '/info/specialists-registry',
      color: 'amber'
    },
    {
      title: 'Законодательство НОК',
      description: 'Нормативно-правовая база независимой оценки квалификации',
      icon: 'scale',
      link: '/info/nok-legislation',
      color: 'slate'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Обязательна ли НОК для всех специалистов?',
      answer: 'НОК обязательна для специалистов, включённых или претендующих на включение в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ. Также обязательна для специалистов ОПБ, ЖКХ и МЧС в соответствии с отраслевыми требованиями. Для других категорий работников НОК может быть добровольной.'
    },
    {
      question: 'Сколько действует свидетельство о квалификации?',
      answer: 'Свидетельство о квалификации действует от 3 до 5 лет с момента выдачи в зависимости от квалификации. С 27 февраля 2025 года для ГИП (7 уровень) и специалистов по строительству ОТС (6 уровень) срок составляет 3 года, для остальных — 5 лет. По истечении срока необходимо повторно пройти процедуру НОК.'
    },
    {
      question: 'Можно ли пройти НОК дистанционно?',
      answer: 'Нет, профессиональный экзамен НОК проводится только в очном формате в аккредитованном Центре оценки квалификаций (ЦОК). Соискатель обязан лично присутствовать на экзамене. Однако подготовку к экзамену можно проходить дистанционно.'
    },
    {
      question: 'Что включает в себя экзамен НОК?',
      answer: 'Экзамен состоит из теоретической части (компьютерное тестирование по профессиональным стандартам) и практической части (решение ситуационных задач или защита портфолио). Формат зависит от конкретной квалификации и отрасли.'
    },
    {
      question: 'Что такое ЦОК и как его выбрать?',
      answer: 'ЦОК --- Центр оценки квалификаций --- это организация, аккредитованная Советом по профессиональным квалификациям для проведения экзаменов НОК. Список аккредитованных ЦОК доступен на сайте Национального агентства развития квалификаций (НАРК). Мы поможем подобрать удобный ЦОК.'
    },
    {
      question: 'Что делать при несдаче экзамена?',
      answer: 'При несдаче экзамена в рамках одной процедуры: пересдача теоретической части допускается 1 раз, пересдача практической части не предусмотрена. Однако соискатель может подать заявление на новый полный экзамен --- количество таких попыток не ограничено, каждая оплачивается отдельно. Мы предоставляем гарантию: при несдаче после полной подготовки по нашей программе --- бесплатная повторная подготовка.'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setWhatIsNokPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Что такое НОК', url: `${this.seoService.getBaseUrl()}/info/what-is-nok` }
    ]);
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

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Floating orbs
    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    // Grid lines
    masterTl.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' },
      0
    );
    masterTl.fromTo('.hero-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' },
      0.3
    );

    // Particles
    gsap.to('.hero-particle', {
      y: 'random(-60, 60)',
      x: 'random(-40, 40)',
      opacity: 'random(0.2, 0.6)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 3, from: 'random' }
    });

    // Breadcrumb nav
    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      0.3
    );

    // Title words stagger
    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' },
      0.5
    );

    // Subtitle
    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );

    // Underline
    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' },
      1.4
    );
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // DEFINITION SECTION
    const defTl = await this.animationService.sectionTimeline('#definition');
    if (defTl) {
      defTl.fromTo('#definition .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      defTl.fromTo('#definition h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      defTl.fromTo('#definition .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      defTl.fromTo('.def-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // WHO NEEDS
    const whoTl = await this.animationService.sectionTimeline('#who-needs');
    if (whoTl) {
      whoTl.fromTo('#who-needs .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whoTl.fromTo('#who-needs h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whoTl.fromTo('#who-needs .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whoTl.fromTo('.specialist-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // PROCESS
    const processTl = await this.animationService.sectionTimeline('#process');
    if (processTl) {
      processTl.fromTo('#process .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      processTl.fromTo('#process h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      processTl.fromTo('#process .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      processTl.fromTo('.process-step',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
      processTl.fromTo('.process-step .step-number',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, 0.35);
    }

    // BENEFITS
    const benefitsTl = await this.animationService.sectionTimeline('#benefits');
    if (benefitsTl) {
      benefitsTl.fromTo('#benefits .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      benefitsTl.fromTo('#benefits h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      benefitsTl.fromTo('#benefits .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      benefitsTl.fromTo('.benefit-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // KEY FACTS (dark section)
    const factsSection = document.querySelector('#key-facts');
    if (factsSection) {
      const factsTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: factsSection, start: 'top 92%', once: true }
      });
      factsTl.fromTo('#key-facts .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      factsTl.fromTo('#key-facts h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      factsTl.fromTo('#key-facts .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      factsTl.fromTo('.fact-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
    }

    // FAQ
    const faqTl = await this.animationService.sectionTimeline('#faq');
    if (faqTl) {
      faqTl.fromTo('#faq .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      faqTl.fromTo('#faq h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      faqTl.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.3);
    }

    // RELATED ARTICLES
    const relatedTl = await this.animationService.sectionTimeline('#related');
    if (relatedTl) {
      relatedTl.fromTo('#related .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      relatedTl.fromTo('#related h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      relatedTl.fromTo('.related-card',
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 0.3);
    }

    // CTA
    const ctaCard = document.querySelector('.cta-gradient-card');
    if (ctaCard) {
      const ctaSection = ctaCard.closest('section');
      if (ctaSection) {
        gsap.fromTo(ctaCard,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.1)',
            scrollTrigger: { trigger: ctaSection, start: 'top 92%', once: true }
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
