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
  selector: 'app-nok-procedure-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './nok-procedure-page.component.html',
  styleUrls: ['./nok-procedure-page.component.scss']
})
export class NokProcedurePageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  overviewCards = [
    {
      icon: 'clipboard-list',
      title: 'Что такое процедура НОК',
      description: 'Процедура НОК --- это установленный законом порядок подтверждения соответствия квалификации специалиста требованиям профессионального стандарта. Включает подачу заявления, прохождение экзамена и получение свидетельства.',
      color: 'blue'
    },
    {
      icon: 'landmark',
      title: 'Кто проводит оценку',
      description: 'Оценку проводят аккредитованные Центры оценки квалификаций (ЦОК), действующие под контролем Совета по профессиональным квалификациям (СПК). Координацию осуществляет НАРК.',
      color: 'emerald'
    },
    {
      icon: 'file-check',
      title: 'Правовая основа',
      description: 'Процедура регламентируется Федеральным законом 238-ФЗ от 03.07.2016 и Постановлением Правительства РФ N 1204. Все этапы строго регулируются нормативными актами.',
      color: 'violet'
    }
  ];

  procedureSteps = [
    {
      step: '01',
      icon: 'file-text',
      title: 'Подача заявления',
      description: 'Соискатель заполняет заявление на прохождение НОК и подаёт его в выбранный аккредитованный Центр оценки квалификаций (ЦОК). Заявление можно подать лично, по почте или в электронной форме.',
      duration: '1--2 дня',
      color: 'blue'
    },
    {
      step: '02',
      icon: 'folder-open',
      title: 'Комплект документов',
      description: 'К заявлению прикладывается пакет документов: копия паспорта, диплом об образовании, трудовая книжка или трудовой договор, СНИЛС, фотография. Для некоторых квалификаций --- портфолио и удостоверения о повышении квалификации.',
      duration: '1--3 дня',
      color: 'cyan'
    },
    {
      step: '03',
      icon: 'search',
      title: 'Рассмотрение заявки',
      description: 'ЦОК проверяет полноту и корректность документов, соответствие соискателя требованиям профессионального стандарта по образованию и опыту работы. При необходимости запрашиваются дополнительные документы.',
      duration: 'До 10 дней',
      color: 'violet'
    },
    {
      step: '04',
      icon: 'check-circle',
      title: 'Допуск к экзамену',
      description: 'По результатам рассмотрения ЦОК принимает решение о допуске к профессиональному экзамену. Соискатель получает уведомление с датой, временем и местом проведения экзамена. Заключается договор и производится оплата.',
      duration: '1--5 дней',
      color: 'emerald'
    },
    {
      step: '05',
      icon: 'monitor',
      title: 'Теоретическая часть экзамена',
      description: 'Компьютерное тестирование по вопросам профессионального стандарта. Как правило, 50--60 вопросов за 60 минут. Необходимо набрать не менее 70% правильных ответов для успешного прохождения.',
      duration: '60 минут',
      color: 'blue'
    },
    {
      step: '06',
      icon: 'pen-tool',
      title: 'Практическая часть экзамена',
      description: 'Решение ситуационных задач, демонстрация практических навыков или защита портфолио перед экспертной комиссией. Формат зависит от конкретной квалификации и отрасли.',
      duration: 'До 120 минут',
      color: 'amber'
    },
    {
      step: '07',
      icon: 'award',
      title: 'Получение свидетельства',
      description: 'При успешной сдаче обеих частей экзамена выдаётся свидетельство о квалификации установленного образца. Результаты вносятся в Федеральный реестр сведений о квалификациях (ФРСК) в течение 30 дней.',
      duration: 'До 30 дней',
      color: 'emerald'
    },
    {
      step: '08',
      icon: 'database',
      title: 'Включение в реестр',
      description: 'На основании свидетельства НОК специалист подаёт заявление на включение в Национальный реестр специалистов (НРС) НОСТРОЙ или НОПРИЗ. Это даёт право занимать руководящие должности в строительстве и проектировании.',
      duration: '5--15 дней',
      color: 'teal'
    }
  ];

  examFormatItems = [
    {
      icon: 'monitor',
      title: 'Компьютерное тестирование',
      description: 'Теоретическая часть проводится на компьютере в специально оборудованном помещении ЦОК. Вопросы формируются случайным образом из банка оценочных средств.',
      detail: '50--60 вопросов'
    },
    {
      icon: 'clock',
      title: 'Ограничение по времени',
      description: 'На теоретическую часть отводится 60 минут. Практическая часть может длиться до 120 минут в зависимости от квалификации.',
      detail: '60--180 минут'
    },
    {
      icon: 'target',
      title: 'Проходной балл',
      description: 'Для успешного прохождения необходимо правильно ответить минимум на 70% вопросов теоретической части и получить положительную оценку по практической.',
      detail: 'от 70%'
    },
    {
      icon: 'users',
      title: 'Экспертная комиссия',
      description: 'Практическую часть оценивает экспертная комиссия из квалифицированных специалистов отрасли. Решение комиссии фиксируется в протоколе.',
      detail: '2--3 эксперта'
    }
  ];

  afterExamItems = [
    {
      icon: 'file-check',
      title: 'Свидетельство о квалификации',
      description: 'Документ государственного образца, подтверждающий соответствие квалификации требованиям профессионального стандарта. Выдаётся в бумажном виде с уникальным номером.'
    },
    {
      icon: 'database',
      title: 'Федеральный реестр (ФРСК)',
      description: 'Сведения о выданном свидетельстве вносятся в Федеральный реестр сведений о квалификациях. Любой работодатель может проверить подлинность свидетельства.'
    },
    {
      icon: 'building-2',
      title: 'Национальный реестр (НРС)',
      description: 'Свидетельство НОК является основанием для включения в НРС НОСТРОЙ или НОПРИЗ, что необходимо для занятия руководящих должностей в строительных организациях.'
    },
    {
      icon: 'calendar',
      title: 'Срок действия --- 5 лет',
      description: 'Свидетельство о квалификации действует 5 лет с даты выдачи. По истечении срока необходимо повторно пройти процедуру НОК для подтверждения квалификации.'
    }
  ];

  tipCards = [
    {
      icon: 'book-open',
      title: 'Изучите профстандарт',
      description: 'Внимательно изучите профессиональный стандарт по вашей квалификации. Все вопросы экзамена базируются на его требованиях и трудовых функциях.'
    },
    {
      icon: 'dumbbell',
      title: 'Используйте тренажёр',
      description: 'Пройдите тренировочное тестирование на нашем онлайн-тренажёре. Вопросы максимально приближены к реальному экзамену. Это повысит ваши шансы на успех.'
    },
    {
      icon: 'folder-check',
      title: 'Подготовьте документы заранее',
      description: 'Соберите полный пакет документов за 1--2 недели до подачи заявления. Проверьте сроки действия удостоверений и соответствие данных в документах.'
    },
    {
      icon: 'clock',
      title: 'Распределите время на экзамене',
      description: 'На экзамене не задерживайтесь на сложных вопросах. Ответьте сначала на простые, затем вернитесь к трудным. 60 минут --- достаточно, если не паниковать.'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Сколько по времени занимает вся процедура НОК?',
      answer: 'От подачи заявления до получения свидетельства проходит от 1 до 2 месяцев. Рассмотрение заявки --- до 10 дней, экзамен --- 1 день, оформление свидетельства --- до 30 дней. При полной готовности документов процесс может быть ускорен.'
    },
    {
      question: 'Можно ли пересдать экзамен при неудаче?',
      answer: 'Да, при неудачной сдаче экзамена соискатель получает заключение с рекомендациями по дополнительной подготовке. Повторная попытка возможна после подачи нового заявления. Ограничений по количеству попыток нет, но каждая попытка оплачивается отдельно.'
    },
    {
      question: 'Сколько стоит прохождение НОК?',
      answer: 'Стоимость зависит от квалификации и ЦОК. В среднем --- от 12 000 до 25 000 рублей за один профессиональный экзамен. В стоимость входит теоретическая и практическая части, а также оформление свидетельства при успешной сдаче.'
    },
    {
      question: 'Что делать, если не согласен с результатом экзамена?',
      answer: 'Соискатель имеет право подать апелляцию в ЦОК в течение 10 рабочих дней после получения результата. Апелляция рассматривается апелляционной комиссией, решение которой является окончательным.'
    },
    {
      question: 'Нужно ли проходить НОК повторно при смене работы?',
      answer: 'Нет, свидетельство о квалификации привязано к специалисту, а не к работодателю. Оно действует 5 лет независимо от смены места работы и признаётся всеми организациями на территории России.'
    },
    {
      question: 'Можно ли сдать НОК дистанционно?',
      answer: 'Нет, профессиональный экзамен проводится исключительно в очном формате в аккредитованном ЦОК. Соискатель обязан лично присутствовать на экзамене. Однако подготовку к экзамену можно проходить дистанционно, в том числе на нашем онлайн-тренажёре.'
    }
  ];

  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полное описание системы независимой оценки квалификаций, её целей и правовой основы',
      icon: 'book-open',
      link: '/info/what-is-nok',
      color: 'blue'
    },
    {
      title: 'Кому нужна НОК',
      description: 'Подробный разбор: какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
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
      title: 'Реестр специалистов',
      description: 'Как попасть в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ',
      icon: 'database',
      link: '/info/specialists-registry',
      color: 'cyan'
    },
    {
      title: 'Портфолио для НОК',
      description: 'Как правильно оформить портфолио для прохождения независимой оценки квалификации',
      icon: 'briefcase',
      link: '/info/portfolio-guide',
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
    this.seoService.setNokProcedurePageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Процедура сдачи НОК', url: `${this.seoService.getBaseUrl()}/info/nok-procedure` }
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
      overviewTl.fromTo('.overview-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // STEPS SECTION
    const stepsTl = await this.animationService.sectionTimeline('#steps');
    if (stepsTl) {
      stepsTl.fromTo('#steps .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      stepsTl.fromTo('#steps h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      stepsTl.fromTo('#steps .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      stepsTl.fromTo('.step-card',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.3)' }, 0.3);
      stepsTl.fromTo('.step-card .step-number',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 0.35);
    }

    // EXAM FORMAT
    const examTl = await this.animationService.sectionTimeline('#exam-format');
    if (examTl) {
      examTl.fromTo('#exam-format .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      examTl.fromTo('#exam-format h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      examTl.fromTo('#exam-format .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      examTl.fromTo('.exam-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // AFTER EXAM
    const afterTl = await this.animationService.sectionTimeline('#after-exam');
    if (afterTl) {
      afterTl.fromTo('#after-exam .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      afterTl.fromTo('#after-exam h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      afterTl.fromTo('#after-exam .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      afterTl.fromTo('.after-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // TIPS (dark section)
    const tipsSection = document.querySelector('#tips');
    if (tipsSection) {
      const tipsTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: tipsSection, start: 'top 92%', once: true }
      });
      tipsTl.fromTo('#tips .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      tipsTl.fromTo('#tips h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      tipsTl.fromTo('#tips .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      tipsTl.fromTo('.tip-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.3);
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
