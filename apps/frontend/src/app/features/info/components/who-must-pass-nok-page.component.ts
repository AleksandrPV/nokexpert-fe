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
  selector: 'app-who-must-pass-nok-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './who-must-pass-nok-page.component.html',
  styleUrls: ['./who-must-pass-nok-page.component.scss']
})
export class WhoMustPassNokPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  // Section 2: Overview — who is required by law
  lawRequirements = [
    {
      icon: 'scale',
      title: 'Федеральный закон 238-ФЗ',
      description: 'Закон от 03.07.2016 устанавливает обязательную независимую оценку квалификации для специалистов, чья деятельность регулируется профессиональными стандартами. Работодатели обязаны направлять сотрудников на НОК.',
      color: 'blue'
    },
    {
      icon: 'landmark',
      title: 'Градостроительный кодекс РФ',
      description: 'Статьи 55.5-1 и 55.5-2 ГрК РФ обязывают специалистов по организации строительства, проектирования и изысканий иметь действующее свидетельство НОК для включения в Национальный реестр специалистов (НРС).',
      color: 'emerald'
    },
    {
      icon: 'file-check',
      title: 'Требования СРО',
      description: 'Саморегулируемые организации НОСТРОЙ и НОПРИЗ обязаны включать в штат специалистов с подтверждённой квалификацией. Без свидетельства НОК компания рискует потерять членство в СРО и допуск к работам.',
      color: 'violet'
    }
  ];

  // Section 3: By industry
  industries = [
    {
      icon: 'building-2',
      title: 'НОСТРОЙ',
      subtitle: 'Строительная отрасль',
      description: 'Специалисты строительных компаний, состоящих в СРО НОСТРОЙ.',
      color: 'blue',
      positions: [
        'Главный инженер проекта (ГИП)',
        'Специалист по организации строительства',
        'Инженерно-технический работник (ИТР)',
        'Прораб, мастер строительных работ',
        'Специалист по строительному контролю',
        'Специалист по организации производства работ'
      ]
    },
    {
      icon: 'compass',
      title: 'НОПРИЗ',
      subtitle: 'Проектирование и изыскания',
      description: 'Специалисты проектных и изыскательских организаций в СРО НОПРИЗ.',
      color: 'cyan',
      positions: [
        'Главный инженер проекта (ГИП)',
        'Главный архитектор проекта (ГАП)',
        'Проектировщик конструктивного раздела',
        'Инженер-геолог, геодезист',
        'Специалист по инженерным изысканиям',
        'Ответственный за техническое руководство проектными работами'
      ]
    },
    {
      icon: 'flame',
      title: 'ОПБ',
      subtitle: 'Пожарная безопасность',
      description: 'Специалисты, ответственные за обеспечение пожарной безопасности объектов.',
      color: 'orange',
      positions: [
        'Ответственный за пожарную безопасность',
        'Специалист по противопожарной защите',
        'Руководитель службы пожарной безопасности',
        'Инженер по пожарной безопасности',
        'Специалист по монтажу систем пожаротушения'
      ]
    },
    {
      icon: 'house',
      title: 'ЖКХ',
      subtitle: 'Жилищно-коммунальное хозяйство',
      description: 'Специалисты управляющих компаний и организаций ЖКХ.',
      color: 'teal',
      positions: [
        'Руководитель управляющей компании',
        'Главный инженер УК',
        'Специалист по эксплуатации зданий',
        'Специалист по управлению МКД',
        'Инженер по обслуживанию инженерных систем'
      ]
    },
    {
      icon: 'siren',
      title: 'МЧС',
      subtitle: 'Спасательные службы',
      description: 'Работники аварийно-спасательных формирований и гражданской обороны.',
      color: 'red',
      positions: [
        'Спасатель',
        'Специалист по гражданской обороне',
        'Работник аварийно-спасательного формирования',
        'Специалист по ликвидации последствий ЧС',
        'Руководитель спасательного подразделения'
      ]
    }
  ];

  // Section 4: Qualification levels
  qualificationLevels = [
    {
      level: '5',
      title: 'Квалификационный уровень 5',
      who: 'Рабочие и линейный персонал',
      description: 'Самостоятельная деятельность по решению практических задач, требующих самостоятельного анализа ситуации. Мастера, бригадиры, квалифицированные рабочие со средним профессиональным образованием.',
      examples: 'Мастер строительных работ, электромонтажник, сварщик высшей категории',
      color: 'blue'
    },
    {
      level: '6',
      title: 'Квалификационный уровень 6',
      who: 'Инженеры и специалисты',
      description: 'Самостоятельная деятельность, предполагающая определение задач собственной работы или работы подчинённых. Требуется высшее образование (бакалавриат) и опыт работы от 3 лет.',
      examples: 'Инженер-строитель, проектировщик, инженер по пожарной безопасности',
      color: 'cyan'
    },
    {
      level: '7',
      title: 'Квалификационный уровень 7',
      who: 'Главные специалисты и ГИП',
      description: 'Стратегическое управление, решение задач развития области профессиональной деятельности. Высшее образование (магистратура/специалитет) и опыт от 5 лет. Необходим для включения в НРС.',
      examples: 'Главный инженер проекта (ГИП), главный архитектор (ГАП), ответственный за организацию строительства',
      color: 'violet'
    },
    {
      level: '8',
      title: 'Квалификационный уровень 8',
      who: 'Руководители высшего звена',
      description: 'Определение стратегии, управление процессами и деятельностью в масштабах отрасли. Высшее образование, учёная степень, опыт от 10 лет. Экспертный уровень квалификации.',
      examples: 'Руководитель крупной строительной организации, технический директор проектного бюро',
      color: 'emerald'
    }
  ];

  // Section 5: Exempt from NOK
  exemptions = [
    {
      icon: 'user-x',
      title: 'Работники без профстандарта',
      description: 'Специалисты, для которых не утверждены профессиональные стандарты, не обязаны проходить НОК. Однако работодатель может направить их на добровольную оценку.'
    },
    {
      icon: 'briefcase',
      title: 'Индивидуальные предприниматели',
      description: 'ИП, выполняющие работы самостоятельно без привлечения наёмных работников и не являющиеся членами СРО, не обязаны проходить НОК.'
    },
    {
      icon: 'graduation-cap',
      title: 'Студенты и стажёры',
      description: 'Лица, проходящие обучение или стажировку, не подпадают под обязательные требования НОК. Оценка квалификации проводится только для действующих специалистов.'
    },
    {
      icon: 'building',
      title: 'Компании вне СРО',
      description: 'Организации, не входящие в саморегулируемые организации и не выполняющие работы, требующие членства в СРО, не обязаны обеспечивать прохождение НОК сотрудниками.'
    }
  ];

  // Section 6: FAQ
  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Обязательна ли НОК для всех строителей?',
      answer: 'Нет, НОК обязательна не для всех. Она требуется для специалистов, включённых или претендующих на включение в Национальный реестр специалистов (НРС), а также для руководителей организации строительства. Рядовые рабочие на стройке без руководящих функций проходят НОК добровольно.'
    },
    {
      question: 'Что будет, если не пройти НОК в установленный срок?',
      answer: 'Специалист будет исключён из НРС и потеряет право занимать должности ГИП, ГАП, ответственного за организацию строительства. Организация-работодатель может получить предписание от СРО и рискует потерять допуск к определённым видам работ.'
    },
    {
      question: 'Освобождает ли профильное образование от необходимости проходить НОК?',
      answer: 'Нет, наличие высшего профильного образования не освобождает от НОК. Образование является одним из условий допуска к экзамену, но само свидетельство НОК выдаётся только по результатам независимой оценки в аккредитованном ЦОК.'
    },
    {
      question: 'Как часто нужно подтверждать квалификацию?',
      answer: 'Свидетельство о квалификации действует 5 лет (для НОСТРОЙ и НОПРИЗ). По истечении срока необходимо повторно пройти процедуру НОК. Рекомендуется начинать подготовку за 2--3 месяца до окончания срока действия свидетельства.'
    },
    {
      question: 'Может ли работодатель направить сотрудника на НОК?',
      answer: 'Да, работодатель имеет право направить сотрудника на НОК за счёт организации. В этом случае все расходы на прохождение оценки несёт работодатель. Сотрудник также может пройти НОК по собственной инициативе и за свой счёт.'
    },
    {
      question: 'Нужна ли НОК для проектировщиков ОПБ?',
      answer: 'Для специалистов по обеспечению пожарной безопасности НОК носит рекомендательный, но всё более востребованный характер. Многие заказчики и подрядчики уже требуют наличие свидетельства НОК у специалистов ОПБ при допуске к объектам.'
    }
  ];

  // Section 7: Related articles
  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полный обзор системы независимой оценки квалификаций: законодательство, процедура, значение',
      icon: 'book-open',
      link: '/info/what-is-nok',
      color: 'blue'
    },
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения экзамена от подачи заявления до получения свидетельства',
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

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setWhoMustPassNokPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Кому нужна НОК', url: `${this.seoService.getBaseUrl()}/info/who-must-pass-nok` }
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

    // OVERVIEW SECTION
    const overviewTl = await this.animationService.sectionTimeline('#overview');
    if (overviewTl) {
      overviewTl.fromTo('#overview .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      overviewTl.fromTo('#overview h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      overviewTl.fromTo('#overview .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      overviewTl.fromTo('.law-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // BY INDUSTRY
    const industryTl = await this.animationService.sectionTimeline('#by-industry');
    if (industryTl) {
      industryTl.fromTo('#by-industry .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      industryTl.fromTo('#by-industry h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      industryTl.fromTo('#by-industry .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      industryTl.fromTo('.industry-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // QUALIFICATION LEVELS
    const levelsTl = await this.animationService.sectionTimeline('#levels');
    if (levelsTl) {
      levelsTl.fromTo('#levels .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      levelsTl.fromTo('#levels h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      levelsTl.fromTo('#levels .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      levelsTl.fromTo('.level-card',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.3)' }, 0.35);
    }

    // EXEMPTIONS
    const exemptTl = await this.animationService.sectionTimeline('#exemptions');
    if (exemptTl) {
      exemptTl.fromTo('#exemptions .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      exemptTl.fromTo('#exemptions h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      exemptTl.fromTo('#exemptions .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      exemptTl.fromTo('.exempt-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
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
