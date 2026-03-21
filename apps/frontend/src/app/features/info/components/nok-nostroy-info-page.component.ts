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
  selector: 'app-nok-nostroy-info-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './nok-nostroy-info-page.component.html',
  styleUrls: ['./nok-nostroy-info-page.component.scss']
})
export class NokNostroyInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  aboutCards = [
    {
      icon: 'landmark',
      title: 'Национальное объединение строителей',
      description: 'НОСТРОЙ --- крупнейшее профессиональное объединение в строительной отрасли России. Создано в 2009 году в соответствии с Градостроительным кодексом РФ для координации деятельности саморегулируемых организаций (СРО) в строительстве.',
      color: 'blue'
    },
    {
      icon: 'history',
      title: 'История создания',
      description: 'НОСТРОЙ образовано 10 ноября 2009 года в результате реформы системы допусков в строительстве. Заменило государственное лицензирование на систему саморегулирования. Объединяет более 240 строительных СРО по всей России.',
      color: 'emerald'
    },
    {
      icon: 'shield-check',
      title: 'Роль в системе НОК',
      description: 'НОСТРОЙ является оператором Национального реестра специалистов (НРС) в строительстве. Организация формирует требования к квалификации специалистов, аккредитует центры оценки квалификаций (ЦОК) и контролирует качество экзаменов.',
      color: 'violet'
    }
  ];

  professionalStandards = [
    {
      code: '16.025',
      title: 'Специалист по организации строительства',
      levels: '6, 7',
      description: 'Руководство строительным производством на объектах капитального строительства'
    },
    {
      code: '16.032',
      title: 'Специалист в области производственно-технического обеспечения строительного производства',
      levels: '6, 7',
      description: 'Контроль качества и соответствия строительных работ проектной документации'
    },
    {
      code: '16.117',
      title: 'Специалист по организации строительства',
      levels: '7',
      description: 'Управление проектами капитального строительства, реконструкции и ремонта'
    },
    {
      code: '16.149',
      title: 'Специалист по организации инженерных изысканий',
      levels: '7',
      description: 'Организация и проведение инженерных изысканий для строительства'
    }
  ];

  qualificationLevels = [
    {
      level: '5',
      title: 'Рабочие специальности',
      icon: 'hard-hat',
      color: 'amber',
      education: 'Среднее профессиональное образование или программы профессиональной подготовки',
      experience: 'Опыт работы от 6 месяцев',
      positions: ['Каменщики', 'Бетонщики', 'Арматурщики', 'Сварщики', 'Кровельщики', 'Отделочники'],
      examFormat: 'Тестирование (40 вопросов) + практическое задание'
    },
    {
      level: '6',
      title: 'Техники и мастера',
      icon: 'clipboard-check',
      color: 'blue',
      education: 'Среднее профессиональное образование',
      experience: 'Опыт работы от 1 года в строительной отрасли',
      positions: ['Техники-строители', 'Мастера строительных работ', 'Прорабы', 'Бригадиры'],
      examFormat: 'Тестирование (50 вопросов) + ситуационные задачи'
    },
    {
      level: '7',
      title: 'Инженеры и руководители',
      icon: 'briefcase',
      color: 'violet',
      education: 'Высшее образование (бакалавриат / специалитет / магистратура)',
      experience: 'Опыт работы от 3 лет на инженерных или руководящих должностях',
      positions: ['Главный инженер проекта (ГИП)', 'Руководитель проекта', 'Инженер строительного контроля', 'Специалист по организации строительства'],
      examFormat: 'Тестирование (60 вопросов) + защита портфолио + собеседование'
    }
  ];

  examDetails = [
    {
      icon: 'monitor',
      title: 'Теоретическая часть',
      description: 'Компьютерное тестирование по вопросам из оценочных средств, утверждённых Советом по профессиональным квалификациям НОСТРОЙ. Время --- от 60 до 120 минут в зависимости от уровня.'
    },
    {
      icon: 'file-text',
      title: 'Практическая часть',
      description: 'Решение ситуационных задач, связанных с реальной профессиональной деятельностью. Для 7 уровня --- защита портфолио выполненных проектов и собеседование с экспертами.'
    },
    {
      icon: 'check-circle',
      title: 'Проходной балл',
      description: 'Для успешной сдачи необходимо набрать не менее 72% правильных ответов в теоретической части (36 из 50) и получить положительную оценку за практическую часть. Результаты объявляются в течение 5 рабочих дней.'
    },
    {
      icon: 'map-pin',
      title: 'Где сдавать',
      description: 'Экзамен проводится очно в аккредитованных НОСТРОЙ центрах оценки квалификаций (ЦОК). Список ЦОК доступен на официальном сайте НОСТРОЙ и в Реестре НАРК.'
    }
  ];

  keyStats = [
    { number: '240+', label: 'СРО в составе', description: 'Саморегулируемых организаций объединено в НОСТРОЙ' },
    { number: '2009', label: 'Год основания', description: 'Создание Национального объединения строителей' },
    { number: '3–5 лет', label: 'Срок действия', description: 'Срок действия свидетельства о квалификации НОК' },
    { number: '72%', label: 'Проходной балл', description: 'Минимальный результат для успешной сдачи экзамена (36 из 50)' }
  ];

  faqItems = [
    {
      question: 'Обязательна ли НОК НОСТРОЙ для всех строителей?',
      answer: 'НОК НОСТРОЙ обязательна для специалистов, включённых или претендующих на включение в Национальный реестр специалистов (НРС) в области строительства. Это касается главных инженеров проекта (ГИП), руководителей проектов и специалистов, ответственных за организацию строительства на объектах, требующих членства в СРО.'
    },
    {
      question: 'Чем НОК НОСТРОЙ отличается от НОК НОПРИЗ?',
      answer: 'НОК НОСТРОЙ предназначена для специалистов строительной отрасли (строительство, реконструкция, капитальный ремонт), а НОК НОПРИЗ --- для проектировщиков и изыскателей. Экзаменационные вопросы, профессиональные стандарты и центры оценки квалификаций различаются. Реестры НРС НОСТРОЙ и НРС НОПРИЗ также ведутся раздельно.'
    },
    {
      question: 'Сколько действует свидетельство НОК НОСТРОЙ?',
      answer: 'Свидетельство о квалификации действует от 3 до 5 лет в зависимости от квалификации. С 27 февраля 2025 года для ГИП (7 уровень) и специалистов по строительству ОТС (6 уровень) срок составляет 3 года, для остальных --- 5 лет. Информация о свидетельствах хранится в реестре сведений о проведении НОК.'
    },
    {
      question: 'Можно ли сдать экзамен НОК НОСТРОЙ дистанционно?',
      answer: 'Нет, экзамен НОК проводится только в очном формате в аккредитованном центре оценки квалификаций (ЦОК). Соискатель обязан лично присутствовать на экзамене. Однако подготовку к экзамену, включая работу с нашим онлайн-тренажёром, можно проходить дистанционно.'
    },
    {
      question: 'Что делать при несдаче экзамена НОК НОСТРОЙ?',
      answer: 'В рамках одной процедуры: пересдача теоретической части допускается 1 раз, практической --- не предусмотрена. Однако можно подать заявление на новый полный экзамен --- количество таких попыток не ограничено, каждая оплачивается отдельно. Мы предоставляем гарантию: при несдаче после полной подготовки по нашей программе --- бесплатная повторная подготовка и сопровождение до успешной сдачи.'
    },
    {
      question: 'Какие документы нужны для прохождения НОК НОСТРОЙ?',
      answer: 'Для прохождения НОК необходимы: паспорт, диплом об образовании, трудовая книжка (или справка о стаже), СНИЛС, заявление установленной формы. Для 7 уровня квалификации дополнительно потребуется портфолио выполненных проектов. Мы помогаем с подготовкой полного пакета документов.'
    }
  ];

  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полный обзор системы независимой оценки квалификаций в России',
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
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения независимой оценки квалификации',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'violet'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по подготовке к профессиональному экзамену НОК',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
      color: 'cyan'
    },
    {
      title: 'Реестр специалистов',
      description: 'Как попасть в Национальный реестр специалистов (НРС) НОСТРОЙ',
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

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setNokNostroyInfoPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'НОК НОСТРОЙ', url: `${this.seoService.getBaseUrl()}/info/nok-nostroy` }
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

    // ABOUT NOSTROY SECTION
    const aboutTl = await this.animationService.sectionTimeline('#about-nostroy');
    if (aboutTl) {
      aboutTl.fromTo('#about-nostroy .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      aboutTl.fromTo('#about-nostroy h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      aboutTl.fromTo('#about-nostroy .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      aboutTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // PROFESSIONAL STANDARDS
    const stdTl = await this.animationService.sectionTimeline('#prof-standards');
    if (stdTl) {
      stdTl.fromTo('#prof-standards .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      stdTl.fromTo('#prof-standards h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      stdTl.fromTo('#prof-standards .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      stdTl.fromTo('.standard-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // QUALIFICATION LEVELS
    const levelsTl = await this.animationService.sectionTimeline('#qual-levels');
    if (levelsTl) {
      levelsTl.fromTo('#qual-levels .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      levelsTl.fromTo('#qual-levels h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      levelsTl.fromTo('#qual-levels .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      levelsTl.fromTo('.level-card',
        { x: -40, opacity: 0, rotateY: -8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.3)' }, 0.3);
    }

    // EXAM DETAILS
    const examTl = await this.animationService.sectionTimeline('#exam-details');
    if (examTl) {
      examTl.fromTo('#exam-details .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      examTl.fromTo('#exam-details h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      examTl.fromTo('#exam-details .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      examTl.fromTo('.exam-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
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
