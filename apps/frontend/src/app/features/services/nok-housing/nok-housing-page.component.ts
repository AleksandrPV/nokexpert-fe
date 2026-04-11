import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { ServicesService } from '../services/services.service';
import { PRICING } from '../../../shared/config/pricing.config';
import { InlineContactFormComponent } from '../../../shared/components/inline-contact-form/inline-contact-form.component';
import { FeedbackSubject } from '../../feedback-popup/models/feedback.interface';

@Component({
  selector: 'app-nok-housing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule, InlineContactFormComponent],
  templateUrl: './nok-housing-page.component.html',
  styleUrls: ['./nok-housing-page.component.scss']
})
export class NokHousingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private servicesService = inject(ServicesService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  readonly FeedbackSubject = FeedbackSubject;

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  serviceData = {
    price: PRICING['nok-housing'].price,
    duration: PRICING['nok-housing'].duration,
    gosposhlina: PRICING['nok-housing'].gosposhlina!,
    features: [
      {
        icon: 'book-open',
        title: '400+ актуальных вопросов',
        description: 'Полная база вопросов по управлению МКД, эксплуатации инженерных систем и Жилищному кодексу РФ. Регулярные обновления.'
      },
      {
        icon: 'monitor',
        title: 'Симулятор экзамена',
        description: 'Пробный экзамен с реальными заданиями ЖКХ, контролем времени и мгновенной проверкой. Полное воспроизведение условий ЦОК.'
      },
      {
        icon: 'users',
        title: 'Консультации экспертов ЖКХ',
        description: 'Индивидуальные разборы сложных тем с практикующими специалистами жилищно-коммунального хозяйства. Разбор типичных ошибок.'
      },
      {
        icon: 'shield-check',
        title: 'Гарантия сдачи',
        description: 'При несдаче экзамена после полной подготовки по нашей программе --- бесплатная повторная подготовка или возврат средств.'
      },
      {
        icon: 'file-check',
        title: 'Подготовка документов',
        description: 'Помощь в сборе, оформлении и проверке всех необходимых документов для подачи в ЦОК. Проверка на соответствие требованиям.'
      },
      {
        icon: 'headphones',
        title: 'Сопровождение до результата',
        description: 'Персональный куратор на каждом этапе: от первой консультации до получения свидетельства о квалификации в сфере ЖКХ.'
      }
    ],
    levels: [
      {
        level: '5',
        title: 'Рабочие специальности',
        description: 'Квалифицированные рабочие ЖКХ с опытом от 1 года в обслуживании многоквартирных домов',
        examples: ['Слесарь-сантехник', 'Электрик ЖКХ', 'Дворник', 'Лифтёр', 'Кровельщик']
      },
      {
        level: '6',
        title: 'Специалисты и мастера',
        description: 'Техники, мастера и специалисты среднего звена с профильным образованием в сфере ЖКХ',
        examples: ['Мастер участка', 'Техник ЖКХ', 'Диспетчер АДС', 'Контролёр', 'Инженер ЖКХ']
      },
      {
        level: '7',
        title: 'Руководители и управляющие',
        description: 'Руководители управляющих организаций, ТСЖ, ЖСК с высшим образованием и стажем от 3 лет',
        examples: ['Управляющий МКД', 'Начальник ЖЭУ', 'Директор УК', 'Председатель ТСЖ']
      }
    ],
    process: [
      {
        step: '01',
        title: 'Бесплатная консультация',
        description: 'Анализируем ваш опыт и образование. Определяем квалификационный уровень и подбираем аккредитованный ЦОК для сдачи.'
      },
      {
        step: '02',
        title: 'Подготовка документов',
        description: 'Помогаем собрать полный пакет документов: диплом, стаж, портфолио. Проверяем на соответствие требованиям ЦОК.'
      },
      {
        step: '03',
        title: 'Теоретическая подготовка',
        description: 'Доступ к тренажёру с 400+ вопросами по ЖКХ. Разбор Жилищного кодекса и нормативных актов с экспертом.'
      },
      {
        step: '04',
        title: 'Пробный экзамен',
        description: 'Сдаём полноценный пробный экзамен в условиях, максимально приближённых к реальным. Анализируем результаты.'
      },
      {
        step: '05',
        title: 'Запись и сдача экзамена',
        description: 'Записываем на экзамен в аккредитованный ЦОК. Сопровождаем в день сдачи и решаем организационные вопросы.'
      },
      {
        step: '06',
        title: 'Получение свидетельства',
        description: 'Получаете свидетельство о квалификации в сфере ЖКХ, действующее 5 лет. Помогаем с оформлением всех документов.'
      }
    ],
    documents: [
      'Паспорт гражданина РФ (все страницы)',
      'Диплом об образовании (с приложением)',
      'Трудовая книжка или справка о стаже работы в ЖКХ',
      'СНИЛС',
      'Фотографии 3x4 см --- 2 шт.',
      'Заявление на прохождение НОК (поможем заполнить)'
    ],
    guarantees: [
      {
        icon: 'shield-check',
        title: 'Гарантия сдачи с первого раза',
        number: '94%',
        description: 'Наших клиентов успешно сдают экзамен НОК ЖКХ с первого раза. При несдаче --- бесплатная повторная подготовка.'
      },
      {
        icon: 'award',
        title: 'Аккредитованные ЦОК',
        number: '10+',
        description: 'Работаем только с центрами оценки квалификаций, аккредитованными для проведения экзаменов в сфере ЖКХ.'
      },
      {
        icon: 'users',
        title: 'Подготовленные специалисты',
        number: '150+',
        description: 'Специалистов ЖКХ подготовлено к экзамену НОК. Управляющие компании, ТСЖ, инженеры и руководители.'
      },
      {
        icon: 'clock',
        title: 'Быстрый результат',
        number: '35',
        description: 'Дней в среднем от начала подготовки до получения свидетельства. Доступен интенсивный курс за 14 дней.'
      }
    ],
    faqItems: [
      {
        question: 'Что такое НОК ЖКХ и зачем она нужна?',
        answer: 'НОК ЖКХ --- это независимая оценка квалификации специалистов жилищно-коммунального хозяйства, проводимая в соответствии с Федеральным законом 238-ФЗ. Свидетельство НОК подтверждает компетенции в области управления МКД, эксплуатации инженерных систем и содержания общего имущества. Обязательно для руководителей и специалистов управляющих компаний и ТСЖ.'
      },
      {
        question: 'Кому обязательно проходить НОК в сфере ЖКХ?',
        answer: 'НОК обязательна для руководителей и специалистов управляющих организаций, председателей и членов правления ТСЖ и ЖСК, инженерно-технических работников, обслуживающих многоквартирные дома, а также для специалистов, претендующих на руководящие должности в сфере ЖКХ.'
      },
      {
        question: 'Сколько времени занимает подготовка к экзамену?',
        answer: 'Стандартная программа подготовки рассчитана на 35 дней. Для тех, кому нужен быстрый результат, доступен интенсивный курс за 14 дней. Также возможен индивидуальный график подготовки с учётом вашей занятости.'
      },
      {
        question: 'Как проходит экзамен НОК ЖКХ?',
        answer: 'Экзамен проходит в аккредитованном Центре оценки квалификаций (ЦОК). Состоит из теоретической части --- тестирование по Жилищному кодексу, нормативным актам ЖКХ, управлению МКД и эксплуатации инженерных систем. Результаты известны в течение 30 рабочих дней.'
      },
      {
        question: 'Сколько действует свидетельство НОК ЖКХ?',
        answer: 'Свидетельство о квалификации в сфере ЖКХ действительно в течение 5 лет с момента выдачи. По истечении срока необходимо повторно пройти процедуру независимой оценки квалификации для подтверждения.'
      },
      {
        question: 'Можно ли совмещать подготовку с работой?',
        answer: 'Да, программа разработана для работающих специалистов ЖКХ. Онлайн-доступ к тренажёру 24/7, вечерние и выходные консультации с экспертами, возможность учиться в удобном темпе с мобильного устройства.'
      }
    ],
    relatedServices: [
      {
        title: 'НОСТРОЙ',
        subtitle: 'Строительство',
        icon: 'hard-hat',
        link: '/services/nok-nostroy',
        color: 'blue'
      },
      {
        title: 'НОПРИЗ',
        subtitle: 'Проектирование и изыскания',
        icon: 'search',
        link: '/services/nok-nopriz',
        color: 'cyan'
      },
      {
        title: 'ОПБ',
        subtitle: 'Пожарная безопасность',
        icon: 'flame',
        link: '/services/nok-opb',
        color: 'orange'
      },
      {
        title: 'МЧС',
        subtitle: 'Пожарная безопасность и МЧС',
        icon: 'siren',
        link: '/services/nok-opb',
        color: 'red'
      }
    ]
  };

  expandedFaq: number | null = null;

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setNokHousingPageSeo();

    this.servicesService.getServiceById('nok-housing').subscribe((service: any) => {
      if (service) {
        this.seoService.addServicesPricingStructuredData([service]);
      }
    });
  }

  openConsultationPopup(): void {
    this.feedbackService.openForNokHousing();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

    // Badge
    masterTl.fromTo('.hero-badge',
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
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

    // Stats row
    masterTl.fromTo('.hero-stat',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' },
      1.3
    );

    // CTA buttons
    masterTl.fromTo('.hero-btn-primary',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      1.6
    );
    masterTl.fromTo('.hero-btn-secondary',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      1.75
    );

    // Button shine
    gsap.to('.hero-btn-shine', {
      x: '200%',
      duration: 1.5,
      repeat: -1,
      repeatDelay: 4,
      ease: 'power2.inOut',
      delay: 3
    });
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // WHAT IS NOK SECTION
    const whatTl = await this.animationService.sectionTimeline('#what-is-nok');
    if (whatTl) {
      whatTl.fromTo('#what-is-nok .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whatTl.fromTo('#what-is-nok h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whatTl.fromTo('#what-is-nok .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whatTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // WHO NEEDS IT
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
      whoTl.fromTo('.level-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
    }

    // WHAT'S INCLUDED
    const featuresTl = await this.animationService.sectionTimeline('#whats-included');
    if (featuresTl) {
      featuresTl.fromTo('#whats-included .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      featuresTl.fromTo('#whats-included h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      featuresTl.fromTo('#whats-included .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      featuresTl.fromTo('.feature-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // PRICING
    const pricingTl = await this.animationService.sectionTimeline('#pricing');
    if (pricingTl) {
      pricingTl.fromTo('#pricing .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      pricingTl.fromTo('#pricing h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      pricingTl.fromTo('.pricing-card',
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.1)' }, 0.3);
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

    // DOCUMENTS
    const docsTl = await this.animationService.sectionTimeline('#documents');
    if (docsTl) {
      docsTl.fromTo('#documents .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      docsTl.fromTo('#documents h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      docsTl.fromTo('.doc-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.3);
    }

    // GUARANTEES
    const guaranteeSection = document.querySelector('#guarantees');
    if (guaranteeSection) {
      const gTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: guaranteeSection, start: 'top 92%', once: true }
      });
      gTl.fromTo('#guarantees .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      gTl.fromTo('#guarantees h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      gTl.fromTo('#guarantees .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      gTl.fromTo('.guarantee-card',
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

    // RELATED SERVICES
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
