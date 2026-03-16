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
  selector: 'app-nok-other-industries-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './nok-other-industries-page.component.html',
  styleUrls: ['./nok-other-industries-page.component.scss']
})
export class NokOtherIndustriesPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  industries = [
    {
      icon: 'house',
      title: 'ЖКХ',
      subtitle: 'Жилищно-коммунальное хозяйство',
      description: 'Управление многоквартирными домами, обслуживание инженерных систем, эксплуатация жилищного фонда. Обязательная НОК для управляющих МКД.',
      specializations: ['Управляющий МКД', 'Инженер по эксплуатации', 'Специалист по ЖКХ'],
      color: 'teal'
    },
    {
      icon: 'flame',
      title: 'Пожарная безопасность (ОПБ)',
      subtitle: 'Обеспечение пожарной безопасности',
      description: 'Проектирование систем противопожарной защиты, монтаж и обслуживание пожарной автоматики, пожарный аудит объектов.',
      specializations: ['Инженер ОПБ', 'Проектировщик СПЗ', 'Пожарный аудитор'],
      color: 'orange'
    },
    {
      icon: 'zap',
      title: 'Энергетика',
      subtitle: 'Электро- и теплоэнергетика',
      description: 'Эксплуатация электрических и тепловых сетей, обслуживание подстанций, энергосбережение и энергоэффективность предприятий.',
      specializations: ['Энергетик', 'Специалист по энергоаудиту', 'Инженер-электрик'],
      color: 'amber'
    },
    {
      icon: 'siren',
      title: 'МЧС и спасательные службы',
      subtitle: 'Чрезвычайные ситуации и гражданская оборона',
      description: 'Спасатели, специалисты по гражданской обороне, инспекторы пожарного надзора. Обязательная аттестация по 238-ФЗ.',
      specializations: ['Спасатель', 'Специалист ГО', 'Инспектор ГПН'],
      color: 'red'
    },
    {
      icon: 'truck',
      title: 'Транспорт',
      subtitle: 'Автомобильный, железнодорожный, водный',
      description: 'Безопасность дорожного движения, эксплуатация транспортных средств, логистика. Профстандарты для транспортной отрасли.',
      specializations: ['Инженер БДД', 'Диспетчер', 'Механик'],
      color: 'blue'
    },
    {
      icon: 'shield-check',
      title: 'Оценка соответствия',
      subtitle: 'Сертификация и метрология',
      description: 'Специалисты по сертификации продукции, метрологи, аудиторы систем менеджмента качества. Требования ISO и ГОСТ.',
      specializations: ['Эксперт по сертификации', 'Метролог', 'Аудитор СМК'],
      color: 'violet'
    },
    {
      icon: 'factory',
      title: 'Промышленная безопасность',
      subtitle: 'Опасные производственные объекты',
      description: 'Эксплуатация ОПО, экспертиза промышленной безопасности, охрана труда на производственных предприятиях.',
      specializations: ['Эксперт ПБ', 'Инженер ОТ', 'Специалист ОПО'],
      color: 'slate'
    },
    {
      icon: 'monitor',
      title: 'IT и телекоммуникации',
      subtitle: 'Информационные технологии',
      description: 'Информационная безопасность, системное администрирование, разработка ПО. Развивающееся направление НОК.',
      specializations: ['ИБ-специалист', 'Системный администратор', 'Программист'],
      color: 'cyan'
    }
  ];

  processSteps = [
    {
      step: '01',
      icon: 'file-text',
      title: 'Единая правовая основа',
      description: 'Все отрасли работают по 238-ФЗ "О независимой оценке квалификации". Закон устанавливает единый порядок: профстандарт, ЦОК, экзамен, свидетельство.'
    },
    {
      step: '02',
      icon: 'landmark',
      title: 'Советы по профквалификациям',
      description: 'Каждую отрасль координирует свой Совет по профессиональным квалификациям (СПК). СПК разрабатывает профстандарты и аккредитует ЦОК в отрасли.'
    },
    {
      step: '03',
      icon: 'building-2',
      title: 'Экзамен в аккредитованном ЦОК',
      description: 'Соискатель проходит профессиональный экзамен в ЦОК: теоретическая часть (тестирование) и практическая (решение кейсов, портфолио).'
    },
    {
      step: '04',
      icon: 'badge-check',
      title: 'Свидетельство и реестр',
      description: 'При успешной сдаче выдаётся свидетельство о квалификации сроком на 5 лет. Данные вносятся в Федеральный реестр сведений о квалификациях.'
    }
  ];

  keyStats = [
    { number: '40+', label: 'Отраслей', description: 'охвачено системой НОК по 238-ФЗ' },
    { number: '35', label: 'Советов (СПК)', description: 'по профессиональным квалификациям' },
    { number: '500+', label: 'Центров ЦОК', description: 'аккредитовано по всей России' },
    { number: '5 лет', label: 'Срок действия', description: 'свидетельства о квалификации' }
  ];

  faqItems = [
    {
      question: 'Чем отличается НОК в строительстве от других отраслей?',
      answer: 'Процедура одинакова по 238-ФЗ: экзамен в ЦОК по профстандарту. Разница в конкретных профстандартах, составе экзаменационных заданий и Совете по профквалификациям, который координирует отрасль. В строительстве это НОСТРОЙ и НОПРИЗ.'
    },
    {
      question: 'Обязательна ли НОК во всех перечисленных отраслях?',
      answer: 'Обязательность зависит от отрасли. В строительстве (НОСТРОЙ, НОПРИЗ) и ЖКХ НОК обязательна для определённых должностей. В энергетике, транспорте и IT --- преимущественно добровольная, но работодатели всё чаще требуют свидетельство НОК.'
    },
    {
      question: 'Где найти ЦОК для своей отрасли?',
      answer: 'Список аккредитованных ЦОК ведёт Национальное агентство развития квалификаций (НАРК) на сайте nark.ru. Также информацию можно получить в профильном Совете по профессиональным квалификациям (СПК) вашей отрасли.'
    },
    {
      question: 'Сколько стоит НОК в разных отраслях?',
      answer: 'Стоимость варьируется от 10 000 до 35 000 рублей в зависимости от отрасли, уровня квалификации и региона. Работодатель может оплатить расходы на НОК и получить налоговый вычет.'
    },
    {
      question: 'Можно ли пройти НОК сразу по нескольким отраслям?',
      answer: 'Да, ограничений нет. Специалист может получить свидетельства НОК по нескольким профессиональным стандартам из разных отраслей. Каждый экзамен сдаётся отдельно в соответствующем ЦОК.'
    },
    {
      question: 'Какие документы нужны для НОК в любой отрасли?',
      answer: 'Базовый пакет документов одинаков: паспорт, СНИЛС, диплом об образовании, документы о стаже (трудовая книжка или справки). Для некоторых квалификаций дополнительно требуется портфолио проектов.'
    }
  ];

  expandedFaq: number | null = null;

  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полный обзор системы независимой оценки квалификаций: закон, процедура, значение',
      icon: 'book-open',
      link: '/info/what-is-nok',
      color: 'blue'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Оценка квалификации для специалистов строительной отрасли и НРС',
      icon: 'building-2',
      link: '/info/nok-nostroy',
      color: 'cyan'
    },
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание прохождения независимой оценки квалификации',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'emerald'
    },
    {
      title: 'Кому нужна НОК',
      description: 'Какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'violet'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по успешной сдаче профессионального экзамена',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
      color: 'amber'
    },
    {
      title: 'Законодательство НОК',
      description: 'Нормативно-правовая база: 238-ФЗ, профстандарты, приказы',
      icon: 'scale',
      link: '/info/nok-legislation',
      color: 'slate'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setNokOtherIndustriesPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'НОК в других отраслях', url: `${this.seoService.getBaseUrl()}/info/nok-other-industries` }
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

    // OVERVIEW
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

    // INDUSTRIES
    const industriesTl = await this.animationService.sectionTimeline('#industries');
    if (industriesTl) {
      industriesTl.fromTo('#industries .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      industriesTl.fromTo('#industries h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      industriesTl.fromTo('#industries .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      industriesTl.fromTo('.industry-card',
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

    // KEY STATS (dark section)
    const statsSection = document.querySelector('#key-stats');
    if (statsSection) {
      const statsTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: statsSection, start: 'top 92%', once: true }
      });
      statsTl.fromTo('#key-stats .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      statsTl.fromTo('#key-stats h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      statsTl.fromTo('#key-stats .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      statsTl.fromTo('.stat-card',
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
