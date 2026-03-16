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
  selector: 'app-exam-preparation-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './exam-preparation-page.component.html',
  styleUrls: ['./exam-preparation-page.component.scss']
})
export class ExamPreparationPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  // --- WHY PREPARE ---
  whyPrepareBenefits = [
    {
      icon: 'shield-check',
      title: 'Сдача с первого раза',
      description: 'Подготовленные кандидаты сдают экзамен с первой попытки в 95% случаев. Без подготовки этот показатель составляет лишь 60%.',
      color: 'violet'
    },
    {
      icon: 'clock',
      title: 'Экономия времени и средств',
      description: 'Каждая повторная попытка --- дополнительные расходы и потерянное время. Системная подготовка окупается сразу.',
      color: 'blue'
    },
    {
      icon: 'brain',
      title: 'Глубокое понимание стандартов',
      description: 'Подготовка формирует реальные профессиональные знания, а не механическое запоминание ответов.',
      color: 'emerald'
    },
    {
      icon: 'file-check',
      title: 'Готовность документов',
      description: 'Правильно оформленное портфолио и пакет документов --- обязательное условие допуска к экзамену.',
      color: 'amber'
    },
    {
      icon: 'gauge',
      title: 'Уверенность на экзамене',
      description: 'Знакомство с форматом вопросов и временными ограничениями снижает стресс и повышает результативность.',
      color: 'cyan'
    },
    {
      icon: 'trending-up',
      title: 'Карьерный рост',
      description: 'Свидетельство НОК открывает путь к руководящим должностям и включению в Национальный реестр специалистов.',
      color: 'red'
    }
  ];

  // --- PREPARATION METHODS ---
  preparationMethods = [
    {
      icon: 'monitor',
      title: 'Онлайн-тренажёр',
      description: 'Интерактивная платформа с реальными вопросами из базы ЦОК. Режим экзамена, подробная статистика и разбор ошибок.',
      color: 'blue',
      recommended: true,
      points: [
        'Вопросы из реальных экзаменов',
        'Режим тестирования с таймером',
        'Детальный разбор каждого ответа',
        'Статистика по темам и прогресс',
        'Доступ 24/7 с любого устройства'
      ]
    },
    {
      icon: 'users',
      title: 'Консультации эксперта',
      description: 'Индивидуальная работа с опытным специалистом. Анализ пробелов, помощь с портфолио и персональная программа.',
      color: 'violet',
      recommended: false,
      points: [
        'Персональная программа подготовки',
        'Помощь в оформлении портфолио',
        'Разбор сложных тем и вопросов',
        'Консультация по нормативной базе',
        'Сопровождение до результата'
      ]
    },
    {
      icon: 'book-open',
      title: 'Самоподготовка',
      description: 'Самостоятельное изучение нормативных документов, профстандартов и методических материалов.',
      color: 'emerald',
      recommended: false,
      points: [
        'Изучение профессиональных стандартов',
        'Работа с нормативными документами',
        'Разбор Градостроительного кодекса',
        'Подготовка портфолио',
        'Изучение технических регламентов'
      ]
    }
  ];

  // --- QUESTION TYPES ---
  questionTypes = [
    {
      icon: 'square-check',
      title: 'Тестовые вопросы',
      description: 'Выбор одного или нескольких правильных ответов из предложенных вариантов. Основная часть теоретического блока.',
      color: 'blue'
    },
    {
      icon: 'puzzle',
      title: 'Ситуационные задачи',
      description: 'Анализ практических ситуаций на стройплощадке или в проекте. Требуют знания нормативной базы и опыта.',
      color: 'emerald'
    },
    {
      icon: 'pen-tool',
      title: 'Открытые вопросы',
      description: 'Развёрнутые ответы по нормативным документам, расчётам и профессиональным процедурам.',
      color: 'amber'
    },
    {
      icon: 'briefcase',
      title: 'Защита портфолио',
      description: 'Представление и защита профессионального портфолио перед экспертной комиссией ЦОК.',
      color: 'violet'
    }
  ];

  // --- EXAM TOPICS ---
  examTopics = [
    {
      icon: 'scale',
      title: 'Градостроительный кодекс РФ',
      description: 'Основные положения, требования к специалистам, ответственность участников строительства.'
    },
    {
      icon: 'file-text',
      title: 'Профессиональные стандарты',
      description: 'Трудовые функции, квалификационные требования и компетенции по конкретной специальности.'
    },
    {
      icon: 'shield',
      title: 'Технические регламенты',
      description: 'Требования безопасности зданий и сооружений, противопожарная безопасность, экологические нормы.'
    },
    {
      icon: 'clipboard-list',
      title: 'СП, СНиП и ГОСТ',
      description: 'Своды правил, строительные нормы и государственные стандарты, применяемые в профессиональной деятельности.'
    },
    {
      icon: 'hard-hat',
      title: 'Охрана труда',
      description: 'Требования безопасности на строительной площадке, организация безопасного производства работ.'
    },
    {
      icon: 'landmark',
      title: '238-ФЗ и 447-ФЗ',
      description: 'Законодательство о независимой оценке квалификаций и о саморегулируемых организациях.'
    }
  ];

  // --- EXAM STATS ---
  examStats = [
    { value: '40', label: 'Вопросов', note: 'в теоретической части' },
    { value: '2 ч', label: 'Длительность', note: 'на весь экзамен' },
    { value: '70%', label: 'Порог сдачи', note: 'правильных ответов' },
    { value: '5 лет', label: 'Срок действия', note: 'свидетельства НОК' }
  ];

  // --- SUCCESS TIPS ---
  successTips = [
    {
      icon: 'calendar',
      title: 'Начните заранее',
      description: 'Оптимальный срок подготовки --- 2-4 недели. Распределите темы равномерно, не пытайтесь выучить всё за последние дни.'
    },
    {
      icon: 'book-open',
      title: 'Изучите профстандарт',
      description: 'Внимательно прочитайте профессиональный стандарт по вашей квалификации. Вопросы экзамена напрямую связаны с трудовыми функциями.'
    },
    {
      icon: 'repeat',
      title: 'Тренируйтесь регулярно',
      description: 'Проходите тесты в тренажёре ежедневно. Повторное прохождение закрепляет знания и выявляет слабые места.'
    },
    {
      icon: 'clock',
      title: 'Следите за временем',
      description: 'На экзамене время ограничено. Тренируйтесь отвечать в режиме таймера, чтобы привыкнуть к темпу.'
    },
    {
      icon: 'file-check',
      title: 'Подготовьте портфолио',
      description: 'Соберите все необходимые документы заблаговременно: дипломы, сертификаты, свидетельства о повышении квалификации, справки о стаже.'
    },
    {
      icon: 'focus',
      title: 'Сконцентрируйтесь на слабых местах',
      description: 'Анализируйте ошибки в тренажёре и уделяйте больше времени темам, где показываете низкие результаты.'
    }
  ];

  // --- TRAINER FEATURES ---
  trainerFeatures = [
    {
      icon: 'database',
      title: 'База реальных вопросов',
      description: 'Вопросы из актуальных экзаменов ЦОК, регулярно обновляемые в соответствии с изменениями в нормативной базе.',
      color: 'blue'
    },
    {
      icon: 'bar-chart-3',
      title: 'Подробная статистика',
      description: 'Отслеживайте прогресс по каждой теме: процент правильных ответов, скорость, динамика улучшений.',
      color: 'violet'
    },
    {
      icon: 'timer',
      title: 'Режим экзамена',
      description: 'Полная симуляция реального экзамена: таймер, случайный порядок вопросов, ограниченное количество попыток.',
      color: 'emerald'
    },
    {
      icon: 'message-square',
      title: 'Разбор ошибок',
      description: 'Подробные пояснения к каждому вопросу с указанием нормативного документа и правильной логики ответа.',
      color: 'amber'
    }
  ];

  // --- FAQ ---
  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Сколько времени нужно на подготовку к экзамену НОК?',
      answer: 'Оптимальный срок подготовки --- от 2 до 4 недель при ежедневных занятиях по 1-2 часа. При наличии опыта работы по специальности может быть достаточно 1-2 недель интенсивной подготовки. Рекомендуем начинать заблаговременно, чтобы равномерно охватить все темы.'
    },
    {
      question: 'Какие документы нужны для допуска к экзамену?',
      answer: 'Для допуска к экзамену НОК необходимо предоставить: паспорт, документ об образовании (диплом), документы о повышении квалификации, трудовую книжку или справку о стаже, СНИЛС, профессиональное портфолио. Точный перечень зависит от квалификации и ЦОК.'
    },
    {
      question: 'Можно ли пересдать экзамен при неудачной попытке?',
      answer: 'Да, количество попыток не ограничено. Однако каждая пересдача оплачивается отдельно, а между попытками может потребоваться дополнительное время на подготовку. Мы предоставляем гарантию: при несдаче после полной подготовки по нашей программе --- бесплатная повторная подготовка.'
    },
    {
      question: 'Насколько вопросы тренажёра совпадают с реальным экзаменом?',
      answer: 'Вопросы тренажёра составлены на основе реальных экзаменационных материалов ЦОК и охватывают все темы профессионального стандарта. Формат вопросов, уровень сложности и тематическое распределение максимально приближены к реальному экзамену.'
    },
    {
      question: 'Какой процент правильных ответов нужен для сдачи?',
      answer: 'Для успешной сдачи теоретической части экзамена необходимо ответить правильно минимум на 70% вопросов. Рекомендуем стремиться к результату не менее 85% в тренажёре, чтобы иметь запас на случай волнения на реальном экзамене.'
    },
    {
      question: 'Чем отличается подготовка к НОК НОСТРОЙ и НОПРИЗ?',
      answer: 'Отличия в профессиональных стандартах и нормативной базе. НОСТРОЙ --- строительство (организация строительного производства, контроль качества, охрана труда). НОПРИЗ --- проектирование и изыскания (проектная документация, расчёты, инженерные изыскания). Тренажёр содержит отдельные модули для каждого направления.'
    }
  ];

  // --- RELATED ARTICLES ---
  relatedArticles = [
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения независимой оценки квалификации',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'blue'
    },
    {
      title: 'Онлайн-тренажёр',
      description: 'Подробности о платформе для подготовки с реальными вопросами экзамена',
      icon: 'monitor',
      link: '/info/online-trainer',
      color: 'violet'
    },
    {
      title: 'Портфолио для НОК',
      description: 'Руководство по подготовке профессионального портфолио для экзамена',
      icon: 'folder-open',
      link: '/info/portfolio-guide',
      color: 'emerald'
    },
    {
      title: 'Кому нужна НОК',
      description: 'Подробный разбор: какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'cyan'
    },
    {
      title: 'Законодательство НОК',
      description: 'Нормативно-правовая база: 238-ФЗ, профстандарты, требования СРО',
      icon: 'scale',
      link: '/info/nok-legislation',
      color: 'amber'
    },
    {
      title: 'Реестр специалистов',
      description: 'Как попасть в НРС НОСТРОЙ и НОПРИЗ после успешной сдачи экзамена',
      icon: 'database',
      link: '/info/specialists-registry',
      color: 'slate'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setExamPreparationPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Подготовка к экзамену', url: `${this.seoService.getBaseUrl()}/info/exam-preparation` }
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

    // WHY PREPARE
    const whyTl = await this.animationService.sectionTimeline('#why-prepare');
    if (whyTl) {
      whyTl.fromTo('#why-prepare .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      whyTl.fromTo('#why-prepare h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      whyTl.fromTo('#why-prepare .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      whyTl.fromTo('.why-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // METHODS
    const methodsTl = await this.animationService.sectionTimeline('#methods');
    if (methodsTl) {
      methodsTl.fromTo('#methods .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      methodsTl.fromTo('#methods h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      methodsTl.fromTo('#methods .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      methodsTl.fromTo('.method-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
    }

    // EXAM CONTENT
    const examTl = await this.animationService.sectionTimeline('#exam-content');
    if (examTl) {
      examTl.fromTo('#exam-content .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      examTl.fromTo('#exam-content h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      examTl.fromTo('#exam-content .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      examTl.fromTo('.exam-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.3);
      examTl.fromTo('.exam-stat',
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.5);
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
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.3);
    }

    // TRAINER
    const trainerTl = await this.animationService.sectionTimeline('#trainer');
    if (trainerTl) {
      trainerTl.fromTo('#trainer .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      trainerTl.fromTo('#trainer h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      trainerTl.fromTo('#trainer .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      trainerTl.fromTo('.trainer-card',
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
