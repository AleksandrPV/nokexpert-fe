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
  selector: 'app-portfolio-guide-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './portfolio-guide-page.component.html',
  styleUrls: ['./portfolio-guide-page.component.scss']
})
export class PortfolioGuidePageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  requirements = [
    {
      icon: 'building-2',
      title: 'НОСТРОЙ (строительство)',
      description: 'Портфолио для специалистов строительной отрасли, включённых или претендующих на включение в НРС НОСТРОЙ.',
      color: 'blue',
      items: [
        'Диплом о высшем или среднем профессиональном образовании',
        'Трудовая книжка с подтверждением стажа от 5 лет',
        'Сертификаты повышения квалификации',
        'Проекты производства работ (ППР)',
        'Технологические карты выполненных работ',
        'Фотоотчёты по объектам строительства'
      ]
    },
    {
      icon: 'search',
      title: 'НОПРИЗ (проектирование)',
      description: 'Требования к портфолио для проектировщиков, изыскателей и архитекторов, входящих в СРО НОПРИЗ.',
      color: 'cyan',
      items: [
        'Диплом о профильном высшем образовании',
        'Документы, подтверждающие стаж проектирования',
        'Проектная документация (разделы, за которые отвечали)',
        'Расчёты и обоснования проектных решений',
        'Заключения экспертиз по вашим проектам',
        'Авторский надзор и участие в согласованиях'
      ]
    },
    {
      icon: 'flame',
      title: 'ОПБ (пожарная безопасность)',
      description: 'Портфолио для инженеров по пожарной безопасности и специалистов противопожарной защиты.',
      color: 'orange',
      items: [
        'Диплом по профилю пожарной безопасности',
        'Удостоверения о прохождении специальной подготовки',
        'Акты проверок и испытаний систем ПБ',
        'Разработанные планы эвакуации и инструкции',
        'Документы по проведённым противопожарным мероприятиям',
        'Рекомендательные письма от работодателей'
      ]
    },
    {
      icon: 'siren',
      title: 'МЧС (аварийно-спасательные)',
      description: 'Требования к портфолио для работников аварийно-спасательных формирований и специалистов ГО.',
      color: 'red',
      items: [
        'Диплом по профилю защиты в чрезвычайных ситуациях',
        'Свидетельства о прохождении аттестации',
        'Документы об участии в учениях и операциях',
        'Отчёты о проведённых спасательных работах',
        'Сертификаты специальной подготовки',
        'Характеристики и рекомендации от руководства'
      ]
    }
  ];

  documents = [
    {
      number: '01',
      icon: 'graduation-cap',
      title: 'Диплом об образовании',
      description: 'Копия диплома о высшем или среднем профессиональном образовании по профильной специальности. Нотариальное заверение не требуется.',
      color: 'blue'
    },
    {
      number: '02',
      icon: 'briefcase',
      title: 'Трудовая книжка',
      description: 'Заверенная копия трудовой книжки, подтверждающая стаж работы по специальности. С 01.09.2022 для НРС: общий стаж от 5 лет, на инженерных должностях от 3 лет (при наличии НОК).',
      color: 'emerald'
    },
    {
      number: '03',
      icon: 'award',
      title: 'Сертификаты и удостоверения',
      description: 'Копии сертификатов о повышении квалификации, переподготовке, прохождении специализированных курсов и тренингов за последние 5 лет.',
      color: 'violet'
    },
    {
      number: '04',
      icon: 'file-check',
      title: 'Описание проектов',
      description: 'Подробное описание ключевых проектов с указанием вашей роли, задач, результатов и применённых технологий. Рекомендуется 3--5 проектов.',
      color: 'cyan'
    },
    {
      number: '05',
      icon: 'mail',
      title: 'Рекомендательные письма',
      description: 'Письма от работодателей или заказчиков, характеризующие вашу профессиональную деятельность и компетенции. Желательно не менее двух.',
      color: 'amber'
    },
    {
      number: '06',
      icon: 'id-card',
      title: 'СНИЛС и паспорт',
      description: 'Копия паспорта (основная страница и прописка) и СНИЛС. Данные должны совпадать с указанными в заявлении на прохождение НОК.',
      color: 'orange'
    }
  ];

  mistakes = [
    {
      icon: 'file-x',
      title: 'Неполный пакет документов',
      description: 'Отсутствие хотя бы одного обязательного документа --- самая частая причина отклонения портфолио. Проверьте полноту пакета по чек-листу.'
    },
    {
      icon: 'calendar-x',
      title: 'Устаревшие документы',
      description: 'Сертификаты повышения квалификации старше 5 лет не принимаются. Убедитесь, что все документы актуальны на момент подачи.'
    },
    {
      icon: 'scan',
      title: 'Плохое качество сканов',
      description: 'Нечитаемые копии, обрезанные края, низкое разрешение. Сканируйте документы в цвете с разрешением не менее 300 dpi.'
    },
    {
      icon: 'shuffle',
      title: 'Отсутствие структуры',
      description: 'Хаотично собранные документы без логичной последовательности. Используйте титульный лист, содержание и нумерацию страниц.'
    },
    {
      icon: 'user-x',
      title: 'Несоответствие квалификации',
      description: 'Документы не соответствуют заявленному уровню квалификации или профессиональному стандарту. Изучите требования заранее.'
    },
    {
      icon: 'copy',
      title: 'Копирование чужих материалов',
      description: 'Использование чужих проектов или документов. Эксперты легко выявляют подобные случаи, что приводит к отказу и запрету пересдачи.'
    }
  ];

  tips = [
    {
      icon: 'list-checks',
      title: 'Изучите профстандарт',
      description: 'Начните с изучения профессионального стандарта по вашей квалификации. Он определяет, какие компетенции нужно подтвердить в портфолио.',
      color: 'blue'
    },
    {
      icon: 'layers',
      title: 'Структурируйте материалы',
      description: 'Создайте чёткую структуру: титульный лист, содержание, документы об образовании, опыт работы, проекты, дополнительные материалы.',
      color: 'emerald'
    },
    {
      icon: 'pen-tool',
      title: 'Опишите каждый проект',
      description: 'К каждому проекту добавьте аннотацию: цели, задачи, ваша роль, применённые технологии и результат. Это значительно повышает ценность портфолио.',
      color: 'violet'
    },
    {
      icon: 'clock',
      title: 'Актуализируйте документы',
      description: 'Убедитесь, что все сертификаты и удостоверения действительны. Обновите документы о повышении квалификации, если они старше 5 лет.',
      color: 'cyan'
    },
    {
      icon: 'users',
      title: 'Попросите обратную связь',
      description: 'Покажите портфолио коллегам или специалистам, уже прошедшим НОК. Свежий взгляд поможет выявить слабые места и недочёты.',
      color: 'amber'
    },
    {
      icon: 'printer',
      title: 'Подготовьте два формата',
      description: 'Сделайте электронную версию в PDF и бумажную копию. Для ЦОК может потребоваться один или оба формата. Качество печати должно быть высоким.',
      color: 'teal'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Обязательно ли портфолио для прохождения НОК?',
      answer: 'Да, портфолио является обязательной частью пакета документов для прохождения независимой оценки квалификации. Без портфолио заявление на прохождение НОК не будет принято к рассмотрению. Исключение составляют некоторые базовые квалификации, где достаточно только документов об образовании и стаже.'
    },
    {
      question: 'Какой формат портфолио предпочтителен?',
      answer: 'Рекомендуется подготовить портфолио в формате PDF. Каждый документ сканируется в цвете с разрешением 300 dpi. Общий объём файла не должен превышать 50 МБ. Бумажную версию также стоит подготовить --- некоторые ЦОК требуют оригиналы для сверки.'
    },
    {
      question: 'Сколько проектов нужно включить в портфолио?',
      answer: 'Рекомендуется включить 3--5 наиболее значимых проектов, в которых вы принимали непосредственное участие. Важно не количество, а качество описания и соответствие проектов заявленной квалификации. Каждый проект должен быть подробно описан с указанием вашей роли.'
    },
    {
      question: 'Можно ли включить проекты с предыдущих мест работы?',
      answer: 'Да, можно и нужно. Портфолио должно охватывать весь ваш профессиональный опыт. Однако убедитесь, что вы имеете право использовать эти материалы и не нарушаете условия конфиденциальности. При необходимости замените названия конкретных объектов.'
    },
    {
      question: 'Различаются ли требования к портфолио для НОСТРОЙ и НОПРИЗ?',
      answer: 'Да, требования различаются. Для НОСТРОЙ акцент делается на практическом опыте строительства: ППР, технологические карты, фотоотчёты. Для НОПРИЗ важнее проектная документация: чертежи, расчёты, пояснительные записки, заключения экспертизы.'
    },
    {
      question: 'Что делать, если портфолио отклонили?',
      answer: 'При отклонении портфолио вы получите перечень замечаний. Устраните все указанные недостатки и подайте портфолио повторно. Как правило, на доработку даётся 30 дней. Мы поможем проанализировать замечания и подготовить доработанную версию портфолио.'
    }
  ];

  relatedArticles = [
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по подготовке к профессиональному экзамену НОК',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
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
      title: 'Вопросы и ответы НОК',
      description: 'База знаний по типичным вопросам экзамена и разбор сложных тем',
      icon: 'circle-help',
      link: '/info/nok-qa',
      color: 'violet'
    },
    {
      title: 'Онлайн-тренажёр',
      description: 'Практика в формате реального экзамена НОК с проверкой ответов',
      icon: 'monitor',
      link: '/info/online-trainer',
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
      title: 'Кому нужна НОК',
      description: 'Подробный разбор: какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'slate'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setPortfolioGuidePageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Составление портфолио', url: `${this.seoService.getBaseUrl()}/info/portfolio-guide` }
    ]);
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
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

    // WHAT IS PORTFOLIO
    const aboutTl = await this.animationService.sectionTimeline('#what-is-portfolio');
    if (aboutTl) {
      aboutTl.fromTo('#what-is-portfolio .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      aboutTl.fromTo('#what-is-portfolio h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      aboutTl.fromTo('#what-is-portfolio .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      aboutTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // REQUIREMENTS
    const reqTl = await this.animationService.sectionTimeline('#requirements');
    if (reqTl) {
      reqTl.fromTo('#requirements .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      reqTl.fromTo('#requirements h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      reqTl.fromTo('#requirements .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      reqTl.fromTo('.req-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // DOCUMENTS
    const docTl = await this.animationService.sectionTimeline('#documents');
    if (docTl) {
      docTl.fromTo('#documents .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      docTl.fromTo('#documents h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      docTl.fromTo('#documents .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      docTl.fromTo('.doc-card',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.3)' }, 0.3);
    }

    // MISTAKES (dark section)
    const mistakesSection = document.querySelector('#mistakes');
    if (mistakesSection) {
      const mistakesTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: mistakesSection, start: 'top 92%', once: true }
      });
      mistakesTl.fromTo('#mistakes .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      mistakesTl.fromTo('#mistakes h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      mistakesTl.fromTo('#mistakes .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      mistakesTl.fromTo('.mistake-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.3);
    }

    // TIPS
    const tipsTl = await this.animationService.sectionTimeline('#tips');
    if (tipsTl) {
      tipsTl.fromTo('#tips .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      tipsTl.fromTo('#tips h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      tipsTl.fromTo('#tips .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      tipsTl.fromTo('.tip-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
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
