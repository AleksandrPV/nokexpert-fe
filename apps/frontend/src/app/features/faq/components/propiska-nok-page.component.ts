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
  selector: 'app-propiska-nok-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './propiska-nok-page.component.html',
  styleUrls: ['./propiska-nok-page.component.scss']
})
export class PropiskaNokPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  processSteps = [
    {
      step: '01',
      title: 'Проверьте паспорт',
      description: 'Убедитесь, что на 5-й странице паспорта есть штамп о регистрации по месту жительства или оформлена временная регистрация.'
    },
    {
      step: '02',
      title: 'Оформите регистрацию',
      description: 'При отсутствии постоянной прописки оформите временную регистрацию через МФЦ, паспортный стол или портал Госуслуг. Процедура бесплатна.'
    },
    {
      step: '03',
      title: 'Подготовьте копии',
      description: 'Сделайте копии 2-3 и 5-й страниц паспорта. При временной регистрации приложите копию свидетельства о регистрации по месту пребывания.'
    },
    {
      step: '04',
      title: 'Заполните заявку',
      description: 'Укажите адрес регистрации при заполнении заявления в АИС НОК (exam.nostroy.ru или aisok.ru). Поле является обязательным для заполнения.'
    }
  ];

  requirements = [
    {
      icon: 'file-text',
      title: 'Копия паспорта (стр. 2-3, 5)',
      description: 'Главная страница паспорта и страница с отметкой о регистрации по месту жительства.'
    },
    {
      icon: 'map-pin',
      title: 'Адрес регистрации',
      description: 'Обязательное поле в автоматизированных системах НОК --- АИС НОК, exam.nostroy.ru, aisok.ru.'
    },
    {
      icon: 'clock',
      title: 'Действующая регистрация',
      description: 'Регистрация должна быть действительна на момент сдачи экзамена. Просроченная регистрация не принимается.'
    },
    {
      icon: 'house',
      title: 'Временная или постоянная',
      description: 'Принимается как постоянная регистрация (прописка), так и временная регистрация по месту пребывания.'
    }
  ];

  faqItems = [
    {
      question: 'Можно ли сдать НОК без прописки вообще?',
      answer: 'Нет, без указания адреса регистрации невозможно завершить подачу заявки в системе АИС НОК. Поле является обязательным. Необходимо оформить хотя бы временную регистрацию.'
    },
    {
      question: 'Подойдёт ли временная регистрация?',
      answer: 'Да, временная регистрация по месту пребывания полностью подходит для подачи документов на НОК. Главное --- чтобы она была действующей на момент сдачи экзамена.'
    },
    {
      question: 'Как быстро можно оформить временную регистрацию?',
      answer: 'Через Госуслуги --- до 3 рабочих дней. Через МФЦ или паспортный стол --- от 3 до 8 рабочих дней. Госпошлина за оформление временной регистрации не взимается.'
    },
    {
      question: 'Нужна ли прописка в регионе, где расположен ЦОК?',
      answer: 'Нет, прописка может быть в любом регионе России. Вы можете сдавать экзамен в любом аккредитованном ЦОК вне зависимости от места регистрации.'
    },
    {
      question: 'Что делать, если нет собственного жилья?',
      answer: 'Временную регистрацию можно оформить по месту фактического пребывания --- в арендованной квартире, общежитии, у родственников. Необходимо согласие собственника жилья.'
    }
  ];

  expandedFaq: number | null = null;

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Прописка НОК --- что это и как получить | НОК Эксперт',
      description: 'Узнайте, нужна ли прописка для сдачи экзамена НОК. Требования к регистрации, порядок оформления временной прописки, необходимые документы.',
      keywords: 'прописка НОК, регистрация для НОК, временная регистрация НОК, документы НОК, экзамен НОК',
      ogImage: '/assets/images/og-default.jpg',
      canonical: `${this.seoService.getBaseUrl()}/faq/propiska-nok`
    });

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'FAQ', url: `${this.seoService.getBaseUrl()}/faq` },
      { name: 'Прописка НОК', url: `${this.seoService.getBaseUrl()}/faq/propiska-nok` }
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

    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

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

    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      0.3
    );

    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' },
      0.5
    );

    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );

    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' },
      1.4
    );

  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // WHAT IS section
    const whatTl = await this.animationService.sectionTimeline('#what-is');
    if (whatTl) {
      whatTl.fromTo('#what-is .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whatTl.fromTo('#what-is h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whatTl.fromTo('#what-is .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whatTl.fromTo('.info-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // PROCESS section
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

    // REQUIREMENTS section
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
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // FAQ section
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
