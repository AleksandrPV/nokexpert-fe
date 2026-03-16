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
  selector: 'app-qa-centers-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './centers-page.component.html',
  styleUrls: ['./centers-page.component.scss']
})
export class QaCentersPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  whatIsCokCards = [
    {
      icon: 'landmark',
      title: 'Аккредитованные организации',
      description: 'ЦОК --- это юридические лица, аккредитованные Советами по профессиональным квалификациям (СПК) и зарегистрированные в реестре НАРК для проведения независимой оценки квалификации.',
      color: 'blue'
    },
    {
      icon: 'clipboard-check',
      title: 'Профессиональный экзамен',
      description: 'В ЦОК проводится независимая оценка квалификации в форме профессионального экзамена --- теоретическая часть (тестирование) и практическая часть (решение задач или защита портфолио).',
      color: 'emerald'
    },
    {
      icon: 'award',
      title: 'Официальное свидетельство',
      description: 'По результатам успешной сдачи экзамена ЦОК выдает свидетельство о квалификации установленного образца, которое вносится в Федеральный реестр сведений о квалификациях.',
      color: 'violet'
    }
  ];

  chooseCriteria = [
    {
      icon: 'shield-check',
      title: 'Аккредитация СПК',
      description: 'Убедитесь, что ЦОК аккредитован по вашему направлению --- НОСТРОЙ, НОПРИЗ, СПК ЧС или другим советом. Проверить можно на сайте nok-nark.ru.',
      color: 'blue'
    },
    {
      icon: 'map-pin',
      title: 'Расположение площадок',
      description: 'Крупные ЦОК имеют экзаменационные площадки в десятках городов России. Выбирайте центр с площадкой в вашем регионе.',
      color: 'emerald'
    },
    {
      icon: 'list-checks',
      title: 'Перечень квалификаций',
      description: 'Каждый ЦОК аккредитован на определённый перечень квалификаций. Проверьте, что ваша специальность входит в список центра.',
      color: 'cyan'
    },
    {
      icon: 'calendar-clock',
      title: 'Расписание экзаменов',
      description: 'Уточните график проведения экзаменов, сроки рассмотрения заявки (до 10 дней) и сроки выдачи свидетельства (до 30 дней).',
      color: 'amber'
    }
  ];

  cokDirections = [
    {
      icon: 'building-2',
      title: 'НОСТРОЙ --- строительство',
      spk: 'СПК в области строительства',
      specializations: [
        'Специалист по организации строительства',
        'Специалист по организации производства строительных работ',
        'Специалист по строительству особо опасных объектов'
      ],
      validity: '3 года',
      color: 'blue'
    },
    {
      icon: 'compass',
      title: 'НОПРИЗ --- проектирование',
      spk: 'СПК в области инженерных изысканий и проектирования',
      specializations: [
        'Специалист по организации архитектурно-строительного проектирования',
        'Специалист по организации инженерных изысканий',
        'Специалист по проектированию уникальных объектов'
      ],
      validity: '5 лет',
      color: 'cyan'
    },
    {
      icon: 'flame',
      title: 'ОПБ --- пожарная безопасность',
      spk: 'СПК в области обеспечения безопасности в ЧС',
      specializations: [
        'Руководитель службы пожарной безопасности',
        'Специалист по противопожарной защите объекта'
      ],
      validity: '5 лет',
      color: 'orange'
    },
    {
      icon: 'house',
      title: 'ЖКХ --- жилищное хозяйство',
      spk: 'СПК в сфере жилищно-коммунального хозяйства',
      specializations: [
        'Специалист по управлению многоквартирным домом',
        'Специалист по содержанию и ремонту общего имущества'
      ],
      validity: '5 лет',
      color: 'teal'
    }
  ];

  examDaySteps = [
    {
      step: '01',
      title: 'Регистрация в ЦОК',
      description: 'Соискатель предъявляет паспорт и оригиналы документов. Оператор ЦОК проверяет личность и регистрирует на экзамен. Включается видеофиксация.'
    },
    {
      step: '02',
      title: 'Теоретическая часть',
      description: 'Компьютерное тестирование: 50--60 вопросов за 90 минут. Проходной балл --- 70%. Разрешено использование нормативных документов. Весь процесс под видеонаблюдением.'
    },
    {
      step: '03',
      title: 'Практическая часть',
      description: 'Решение профессиональных ситуационных задач или защита портфолио перед экспертной комиссией. Время выполнения: 60--120 минут в зависимости от квалификации.'
    },
    {
      step: '04',
      title: 'Получение результата',
      description: 'Решение принимается в течение 30 календарных дней. При успешной сдаче --- свидетельство о квалификации. При неудаче --- заключение с рекомендациями по подготовке.'
    }
  ];

  keyStats = [
    { number: '500+', label: 'Центров ЦОК', description: 'Аккредитованных экзаменационных площадок по всей России' },
    { number: '85', label: 'Регионов', description: 'ЦОК работают практически во всех субъектах РФ' },
    { number: '150+', label: 'Квалификаций', description: 'Перечень профессий, по которым проводится оценка' },
    { number: '238-ФЗ', label: 'Федеральный закон', description: 'Правовая основа системы независимой оценки квалификаций' }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Как выбрать подходящий ЦОК?',
      answer: 'При выборе ЦОК учитывайте: аккредитацию по вашему направлению (НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ), наличие экзаменационной площадки в вашем регионе, стоимость услуг, отзывы других специалистов. Полный реестр ЦОК доступен на сайте НАРК --- nok-nark.ru.'
    },
    {
      question: 'Какие документы нужны для подачи в ЦОК?',
      answer: 'Базовый пакет: заявление установленного образца, копия паспорта, диплом об образовании, копия трудовой книжки, СНИЛС. Для некоторых квалификаций также потребуется портфолио профессиональных достижений, справка об отсутствии судимости и уведомление о включении в НРС.'
    },
    {
      question: 'Сколько стоит экзамен в ЦОК?',
      answer: 'Стоимость зависит от квалификации, ЦОК и региона. Примерные цены: строительные специальности --- 20 000--25 000 руб., проектирование и изыскания --- 25 000--30 000 руб., пожарная безопасность --- 13 000--20 000 руб. Расходы на НОК можно включить в социальный налоговый вычет.'
    },
    {
      question: 'Можно ли пройти экзамен дистанционно?',
      answer: 'Нет. Профессиональный экзамен проводится исключительно в очном формате на экзаменационной площадке ЦОК. Процедура сопровождается обязательной видеофиксацией для обеспечения объективности и прозрачности оценки.'
    },
    {
      question: 'Что делать, если экзамен не сдан?',
      answer: 'При неудовлетворительном результате выдается заключение с рекомендациями. Повторную попытку можно предпринять, подав новое заявление. Ограничений по количеству попыток нет. Также в течение 5 рабочих дней можно подать апелляцию, если есть основания полагать, что процедура была нарушена.'
    },
    {
      question: 'Как проверить аккредитацию ЦОК?',
      answer: 'Реестр аккредитованных ЦОК ведет Национальное агентство развития квалификаций (НАРК). Проверить аккредитацию можно на сайте nok-nark.ru в разделе "Реестр ЦОК". Убедитесь, что у ЦОК есть действующее свидетельство об аккредитации по нужной вам квалификации.'
    }
  ];

  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полное руководство по системе независимой оценки квалификаций в России',
      icon: 'book-open',
      link: '/info/what-is-nok',
      color: 'blue'
    },
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание от подачи заявления до получения свидетельства',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'emerald'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Рекомендации и стратегии для успешной сдачи профессионального экзамена',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
      color: 'violet'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Оценка квалификации для специалистов строительной отрасли',
      icon: 'building-2',
      link: '/services/nok-nostroy',
      color: 'cyan'
    },
    {
      title: 'НОК НОПРИЗ',
      description: 'Оценка квалификации для проектировщиков и изыскателей',
      icon: 'compass',
      link: '/services/nok-nopriz',
      color: 'amber'
    },
    {
      title: 'Реестр специалистов',
      description: 'Как попасть в Национальный реестр специалистов НОСТРОЙ и НОПРИЗ',
      icon: 'database',
      link: '/info/specialists-registry',
      color: 'slate'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setQaCentersPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Центры оценки квалификации', url: `${this.seoService.getBaseUrl()}/qa-centers` }
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

    // Scroll indicator
    masterTl.fromTo('.hero-scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.8
    );

    gsap.to('.hero-scroll-dot', {
      y: 16,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // WHAT IS COK
    const whatTl = await this.animationService.sectionTimeline('#what-is-cok');
    if (whatTl) {
      whatTl.fromTo('#what-is-cok .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whatTl.fromTo('#what-is-cok h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whatTl.fromTo('#what-is-cok .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whatTl.fromTo('.cok-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // HOW TO CHOOSE
    const chooseTl = await this.animationService.sectionTimeline('#how-to-choose');
    if (chooseTl) {
      chooseTl.fromTo('#how-to-choose .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      chooseTl.fromTo('#how-to-choose h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      chooseTl.fromTo('#how-to-choose .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      chooseTl.fromTo('.criteria-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // COK LIST (dark section)
    const listSection = document.querySelector('#cok-list');
    if (listSection) {
      const listTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: listSection, start: 'top 92%', once: true }
      });
      listTl.fromTo('#cok-list .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      listTl.fromTo('#cok-list h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      listTl.fromTo('#cok-list .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      listTl.fromTo('.stat-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
    }

    // DIRECTIONS
    const dirTl = await this.animationService.sectionTimeline('#directions');
    if (dirTl) {
      dirTl.fromTo('#directions .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      dirTl.fromTo('#directions h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      dirTl.fromTo('#directions .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      dirTl.fromTo('.direction-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // EXAM DAY
    const examTl = await this.animationService.sectionTimeline('#exam-day');
    if (examTl) {
      examTl.fromTo('#exam-day .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      examTl.fromTo('#exam-day h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      examTl.fromTo('#exam-day .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      examTl.fromTo('.exam-step',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
      examTl.fromTo('.exam-step .step-number',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, 0.35);
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

    // RELATED
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
