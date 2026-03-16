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

@Component({
  selector: 'app-nok-opb-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './nok-opb-page.component.html',
  styleUrls: ['./nok-opb-page.component.scss']
})
export class NokOpbPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private servicesService = inject(ServicesService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

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
    price: PRICING['nok-opb'].price,
    duration: PRICING['nok-opb'].duration,
    gosposhlina: PRICING['nok-opb'].gosposhlina!,
    features: [
      {
        icon: 'book-open',
        title: 'Полная база вопросов МЧС',
        description: 'Актуальные вопросы для подготовки к экзамену по пожарной безопасности и аварийно-спасательным работам. Регулярные обновления в соответствии с изменениями 123-ФЗ, 69-ФЗ и профстандартов.'
      },
      {
        icon: 'monitor',
        title: 'Симулятор экзамена',
        description: 'Пробный экзамен с 52 вопросами, контролем времени (90 минут) и мгновенной проверкой. Полное воспроизведение условий ЦОК.'
      },
      {
        icon: 'users',
        title: 'Консультации экспертов',
        description: 'Индивидуальные разборы сложных тем пожарной безопасности и аварийно-спасательных работ с практикующими специалистами. Разбор типичных ошибок.'
      },
      {
        icon: 'shield-check',
        title: 'Гарантия сдачи',
        description: 'При несдаче экзамена после полной подготовки по нашей программе --- бесплатная повторная подготовка или возврат средств.'
      },
      {
        icon: 'file-check',
        title: 'Подготовка документов',
        description: 'Помощь в сборе, оформлении и проверке всех необходимых документов для подачи в ЦОК. Включая справку об отсутствии судимости.'
      },
      {
        icon: 'headphones',
        title: 'Сопровождение до результата',
        description: 'Персональный куратор на каждом этапе: от первой консультации до получения свидетельства о квалификации.'
      }
    ],
    levels: [
      {
        level: '5',
        title: 'Монтажник систем ПБ',
        description: 'Монтаж, обслуживание и ремонт систем пожарной безопасности с опытом от 3 лет',
        examples: ['Монтаж систем пожаротушения', 'Обслуживание пожарной сигнализации', 'Проведение противопожарных инструктажей', 'Контроль средств пожаротушения']
      },
      {
        level: '6',
        title: 'Инженер по пожарной безопасности',
        description: 'Проектирование и экспертиза систем противопожарной защиты, организация аварийно-спасательных мероприятий',
        examples: ['Проектирование систем пожарной безопасности', 'Пожарный аудит и экспертиза', 'Разработка планов эвакуации', 'Организация аварийно-спасательных работ']
      },
      {
        level: '7',
        title: 'Руководитель службы ПБ / МЧС',
        description: 'Управление службой пожарной безопасности, руководство аварийно-спасательными подразделениями, стратегическое планирование',
        examples: ['Управление службой пожарной безопасности', 'Руководство аварийно-спасательными работами', 'Стратегическое планирование мер ПБ', 'Организация обучения персонала']
      }
    ],
    process: [
      {
        step: '01',
        title: 'Бесплатная консультация',
        description: 'Анализируем ваш опыт и образование. Определяем квалификационный уровень и подбираем аккредитованный ЦОК.'
      },
      {
        step: '02',
        title: 'Подготовка документов',
        description: 'Помогаем собрать полный пакет документов: диплом, стаж, справка об отсутствии судимости. Проверяем на соответствие требованиям.'
      },
      {
        step: '03',
        title: 'Теоретическая подготовка',
        description: 'Доступ к тренажёру с вопросами по пожарной безопасности и аварийно-спасательным работам. Разбор 123-ФЗ, 69-ФЗ, профстандартов и нормативных документов МЧС.'
      },
      {
        step: '04',
        title: 'Пробный экзамен',
        description: 'Сдаём полноценный пробный экзамен: 52 вопроса за 90 минут с порогом 70%. Анализируем результаты и слабые места.'
      },
      {
        step: '05',
        title: 'Запись и сдача экзамена',
        description: 'Записываем на экзамен в аккредитованный ЦОК. Сопровождаем в день сдачи и решаем организационные вопросы.'
      },
      {
        step: '06',
        title: 'Получение свидетельства',
        description: 'Получаете свидетельство о квалификации по пожарной безопасности (МЧС), действующее 5 лет.'
      }
    ],
    documents: [
      'Паспорт гражданина РФ (все страницы)',
      'Диплом об образовании (с приложением)',
      'Трудовая книжка или справка о стаже работы',
      'СНИЛС',
      'Справка об отсутствии судимости',
      'Документы о дополнительном образовании (при наличии)',
      'Заявление на прохождение НОК (поможем заполнить)',
      'Согласие на обработку персональных данных'
    ],
    guarantees: [
      {
        icon: 'shield-check',
        title: 'Гарантия сдачи с первого раза',
        number: '95%',
        description: 'Наших клиентов успешно сдают экзамен НОК МЧС с первого раза. При несдаче --- бесплатная повторная подготовка.'
      },
      {
        icon: 'award',
        title: 'Аккредитованные ЦОК',
        number: '10+',
        description: 'Работаем только с центрами оценки квалификаций, аккредитованными для проведения экзаменов по пожарной безопасности и МЧС.'
      },
      {
        icon: 'users',
        title: 'Подготовленные специалисты',
        number: '300+',
        description: 'Специалистов по пожарной безопасности и МЧС подготовлено к экзамену НОК. Практикующие эксперты в области ПБ.'
      },
      {
        icon: 'clock',
        title: 'Быстрый результат',
        number: '52',
        description: 'Вопроса на экзамене. Порог сдачи 70%, время 90 минут. Доступен интенсивный курс подготовки за 14 дней.'
      }
    ],
    faqItems: [
      {
        question: 'Что такое НОК МЧС и зачем она нужна?',
        answer: 'НОК МЧС --- это независимая оценка квалификации специалистов по обеспечению пожарной безопасности и аварийно-спасательным работам, проводимая в соответствии с Федеральным законом 238-ФЗ, 123-ФЗ "Технический регламент о требованиях пожарной безопасности" и 69-ФЗ "О пожарной безопасности". Свидетельство НОК подтверждает профессиональный уровень специалиста и действует 5 лет.'
      },
      {
        question: 'Обязательна ли НОК для специалистов по пожарной безопасности?',
        answer: 'По состоянию на 2025 год НОК по пожарной безопасности НЕ является обязательной. МЧС России подтвердило добровольный характер независимой оценки квалификации. Однако многие работодатели требуют свидетельство НОК для занятия руководящих должностей в области ПБ и аварийно-спасательных работ.'
      },
      {
        question: 'Как проходит экзамен НОК МЧС?',
        answer: 'Экзамен проходит очно в аккредитованном ЦОК под видеонаблюдением. Включает 52 вопроса, время --- 90 минут, порог сдачи --- 70% правильных ответов. Вопросы охватывают пожарную безопасность и аварийно-спасательные работы. Может включать практическую часть в зависимости от квалификационного уровня.'
      },
      {
        question: 'Сколько действует свидетельство НОК МЧС?',
        answer: 'Свидетельство о квалификации действительно в течение 5 лет с момента выдачи. По истечении срока необходимо повторно пройти процедуру независимой оценки квалификации для подтверждения.'
      },
      {
        question: 'Что делать, если не сдал экзамен?',
        answer: 'Мы предоставляем гарантию: при несдаче экзамена после полной подготовки по нашей программе вы получаете бесплатную повторную подготовку. Мы анализируем ошибки, корректируем программу обучения и записываем на повторную сдачу.'
      },
      {
        question: 'Можно ли пройти НОК МЧС дистанционно?',
        answer: 'Нет, экзамен НОК проводится исключительно в очном формате с обязательным присутствием соискателя в аккредитованном ЦОК. Процедура фиксируется средствами видеонаблюдения. Подготовка к экзамену может проходить онлайн.'
      },
      {
        question: 'Какие направления охватывает НОК МЧС?',
        answer: 'НОК МЧС объединяет два направления: обеспечение пожарной безопасности (ОПБ) и аварийно-спасательные работы. Экзамен включает вопросы по 123-ФЗ, 69-ФЗ, профстандартам МЧС, организации спасательных работ, гражданской обороне и защите от ЧС.'
      }
    ],
    relatedServices: [
      {
        title: 'НОСТРОЙ',
        subtitle: 'Строительная отрасль',
        icon: 'building-2',
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
        title: 'ЖКХ',
        subtitle: 'Жилищное хозяйство',
        icon: 'house',
        link: '/services/nok-housing',
        color: 'teal'
      }
    ]
  };

  expandedFaq: number | null = null;

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setNokOpbPageSeo();

    this.servicesService.getServiceById('nok-opb').subscribe((service: any) => {
      if (service) {
        this.seoService.addServicesPricingStructuredData([service]);
      }
    });
  }

  openConsultationPopup(): void {
    this.feedbackService.openForNokMcs();
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
