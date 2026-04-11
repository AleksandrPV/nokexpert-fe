import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { FeedbackSubject } from '../../feedback-popup/models/feedback.interface';
import { OrganizationService } from '../../../shared/services/organization.service';
import { ServicesService } from '../services/services.service';
import { PRICING } from '../../../shared/config/pricing.config';
import { InlineContactFormComponent } from '../../../shared/components/inline-contact-form/inline-contact-form.component';

@Component({
  selector: 'app-trainer-service-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule, InlineContactFormComponent],
  templateUrl: './trainer-service-page.component.html',
  styleUrls: ['./trainer-service-page.component.scss']
})
export class TrainerServicePageComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly FeedbackSubject = FeedbackSubject;

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
    price: PRICING['trainer'].price,
    duration: PRICING['trainer'].duration,
    features: [
      {
        icon: 'book-open',
        title: 'Реальные вопросы экзамена',
        description: 'База из 1 000+ вопросов, идентичных реальному экзамену НОК. Регулярные обновления в соответствии с изменениями профстандартов.'
      },
      {
        icon: 'timer',
        title: 'Симуляция экзамена',
        description: 'Полноценный пробный экзамен с контролем времени и мгновенной проверкой. Условия максимально приближены к реальным.'
      },
      {
        icon: 'bar-chart-3',
        title: 'Детальная аналитика',
        description: 'Статистика по каждой теме: процент правильных ответов, слабые места, прогресс подготовки и рекомендации.'
      },
      {
        icon: 'clock',
        title: 'Доступ 24/7',
        description: 'Тренируйтесь в любое удобное время с любого устройства. 30 дней неограниченного доступа ко всем вопросам.'
      },
      {
        icon: 'smartphone',
        title: 'Мобильная версия',
        description: 'Адаптивный интерфейс для смартфонов и планшетов. Занимайтесь в дороге, на обеде или дома.'
      },
      {
        icon: 'headphones',
        title: 'Поддержка экспертов',
        description: 'Разбор сложных вопросов с практикующими специалистами. Помощь в понимании нормативной базы.'
      }
    ],
    audience: [
      {
        icon: 'building-2',
        title: 'Строители (НОСТРОЙ)',
        description: 'Специалисты строительной отрасли, готовящиеся к НОК для включения в НРС НОСТРОЙ.'
      },
      {
        icon: 'file-text',
        title: 'Проектировщики (НОПРИЗ)',
        description: 'Проектировщики и изыскатели, которым нужно подтвердить квалификацию по стандартам НОПРИЗ.'
      },
      {
        icon: 'house',
        title: 'Специалисты ЖКХ',
        description: 'Управляющие МКД и специалисты жилищно-коммунального хозяйства, сдающие НОК по ЖК РФ.'
      },
      {
        icon: 'flame',
        title: 'Пожарная безопасность',
        description: 'Специалисты по пожарной безопасности и ответственные за ОПБ, готовящиеся к аттестации МЧС.'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Регистрация',
        description: 'Создайте аккаунт и оплатите доступ к тренажёру. Мгновенная активация после оплаты.'
      },
      {
        step: '02',
        title: 'Выбор направления',
        description: 'Выберите своё направление НОК: НОСТРОЙ, НОПРИЗ, ЖКХ или ОПБ. Вопросы подбираются по вашему профилю.'
      },
      {
        step: '03',
        title: 'Тренировка',
        description: 'Решайте вопросы в режиме тренировки или сдавайте пробные экзамены. Отслеживайте свой прогресс.'
      },
      {
        step: '04',
        title: 'Результат',
        description: 'Достигните уверенного уровня подготовки и сдайте реальный экзамен НОК с первого раза.'
      }
    ],
    faqItems: [
      {
        question: 'Что такое тренажёр НОК?',
        answer: 'Тренажёр НОК — это онлайн-платформа для подготовки к экзамену независимой оценки квалификации. Содержит реальные вопросы экзамена, режимы тренировки и симуляции экзамена, а также детальную аналитику ваших результатов.'
      },
      {
        question: 'Сколько вопросов в базе тренажёра?',
        answer: 'В базе более 1 000 вопросов по всем направлениям НОК: строительство (НОСТРОЙ), проектирование (НОПРИЗ), ЖКХ и пожарная безопасность (ОПБ). База регулярно обновляется в соответствии с изменениями профстандартов.'
      },
      {
        question: 'На какой срок предоставляется доступ?',
        answer: 'Стандартный доступ предоставляется на 30 дней. Этого достаточно для полноценной подготовки к экзамену. При необходимости доступ можно продлить.'
      },
      {
        question: 'Можно ли заниматься с телефона?',
        answer: 'Да, тренажёр полностью адаптирован для мобильных устройств. Вы можете тренироваться со смартфона или планшета в любом месте и в любое время.'
      },
      {
        question: 'Чем тренажёр отличается от полной подготовки?',
        answer: 'Тренажёр — это инструмент для самостоятельной подготовки. Полная подготовка (НОК НОСТРОЙ, НОПРИЗ и др.) включает также сопровождение эксперта, помощь с документами, запись в ЦОК и гарантию сдачи с первого раза.'
      },
      {
        question: 'Как оплатить доступ к тренажёру?',
        answer: 'Для получения доступа свяжитесь с нами по телефону или оставьте заявку. После оплаты вы получите логин и пароль на указанный email, и доступ активируется мгновенно.'
      }
    ],
    relatedServices: [
      {
        title: 'НОК НОСТРОЙ',
        subtitle: 'Строительные специальности',
        icon: 'building-2',
        link: '/services/nok-nostroy',
        color: 'blue'
      },
      {
        title: 'НОК НОПРИЗ',
        subtitle: 'Проектирование и изыскания',
        icon: 'search',
        link: '/services/nok-nopriz',
        color: 'cyan'
      },
      {
        title: 'НОК МЧС',
        subtitle: 'Пожарная безопасность',
        icon: 'flame',
        link: '/services/nok-opb',
        color: 'orange'
      },
      {
        title: 'НОК ЖКХ',
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
    this.seoService.setSeoData({
      title: 'Тренажёр НОК — онлайн-подготовка к экзамену | НОК Эксперт',
      description: 'Онлайн-тренажёр с реальными вопросами НОК. 1 000+ вопросов, симуляция экзамена, детальная аналитика. Подготовка к НОК НОСТРОЙ, НОПРИЗ, ЖКХ, ОПБ.',
      keywords: 'тренажёр НОК, подготовка к НОК, вопросы НОК, экзамен НОК онлайн, тренажёр НОСТРОЙ, тренажёр НОПРИЗ'
    });

    this.servicesService.getServiceById('trainer').subscribe((service: any) => {
      if (service) {
        this.seoService.addServicesPricingStructuredData([service]);
      }
    });
  }

  openConsultationPopup(): void {
    this.feedbackService.open({
      title: 'Тренажёр НОК',
      subtitle: 'Получите доступ к тренажёру с реальными вопросами НОК'
    });
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

    // WHAT IS TRAINER
    const whatTl = await this.animationService.sectionTimeline('#what-is-trainer');
    if (whatTl) {
      whatTl.fromTo('#what-is-trainer .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whatTl.fromTo('#what-is-trainer h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whatTl.fromTo('#what-is-trainer .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whatTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // AUDIENCE
    const audienceTl = await this.animationService.sectionTimeline('#audience');
    if (audienceTl) {
      audienceTl.fromTo('#audience .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      audienceTl.fromTo('#audience h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      audienceTl.fromTo('#audience .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      audienceTl.fromTo('.audience-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
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

    // HOW IT WORKS
    const processTl = await this.animationService.sectionTimeline('#how-it-works');
    if (processTl) {
      processTl.fromTo('#how-it-works .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      processTl.fromTo('#how-it-works h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      processTl.fromTo('#how-it-works .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      processTl.fromTo('.process-step',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
      processTl.fromTo('.process-step .step-number',
        { scale: 0, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, 0.35);
    }

    // RESULTS
    const resultsTl = await this.animationService.sectionTimeline('#results');
    if (resultsTl) {
      resultsTl.fromTo('#results .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      resultsTl.fromTo('#results h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      resultsTl.fromTo('#results .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      resultsTl.fromTo('.result-card',
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
