import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';

interface QaItem {
  question: string;
  answer: string;
}

interface QaCategory {
  icon: string;
  title: string;
  color: string;
  items: QaItem[];
}

@Component({
  selector: 'app-nok-qa-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Информация о НОК', url: '/info' },
    { label: 'Вопросы и ответы', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- ============================================ -->
<!-- HERO -- bg-slate-950                         -->
<!-- ============================================ -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <!-- Floating orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    <div class="hero-orb absolute w-[300px] h-[300px] rounded-full bg-violet-600/[0.06] blur-[90px] top-1/3 right-1/4"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[70%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"></div>
  </div>

  <!-- Particles -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-400/40 top-[15%] left-[10%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 top-[25%] left-[75%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-300/40 top-[65%] left-[85%]"></div>
    <div class="hero-particle absolute w-2 h-2 rounded-full bg-violet-400/20 top-[45%] left-[5%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-cyan-300/30 top-[80%] left-[40%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-blue-400/25 top-[10%] left-[55%]"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-24 lg:py-32">
    <div class="max-w-4xl">
      <!-- Breadcrumb nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <a routerLink="/info" class="hover:text-slate-300 transition-colors">Информация о НОК</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Вопросы и ответы</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Вопросы</span>
        <span class="hero-word inline-block">и</span>
        <span class="hero-word inline-block">ответы</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">о НОК</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-8">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Подробные ответы на самые распространённые вопросы о независимой оценке квалификаций ---
          от документов и стоимости до пересдачи и сроков действия свидетельства.
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- POPULAR QUESTIONS -- bg-white                -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="popular">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="circle-help" [size]="16" [strokeWidth]="2"></lucide-icon>
        Популярные вопросы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Самое важное о НОК
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Ответы на вопросы, которые задают чаще всего. Нажмите на вопрос, чтобы раскрыть ответ.
      </p>
    </div>

    <div class="max-w-4xl space-y-4">
      <div
        *ngFor="let item of popularQuestions; let i = index"
        class="popular-item bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-slate-300 transition-all duration-300 overflow-hidden"
        [class.ring-blue-300]="expandedPopular === i"
        [class.shadow-lg]="expandedPopular === i"
      >
        <button
          (click)="togglePopular(i)"
          class="w-full flex items-center justify-between gap-4 p-7 lg:p-8 text-left cursor-pointer"
        >
          <div class="flex items-center gap-5">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              [class]="expandedPopular === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'">
              <lucide-icon name="circle-help" [size]="20" [strokeWidth]="1.8"></lucide-icon>
            </div>
            <span class="text-lg font-semibold text-slate-900">{{ item.question }}</span>
          </div>
          <lucide-icon
            [name]="expandedPopular === i ? 'chevron-up' : 'chevron-down'"
            [size]="20" [strokeWidth]="2"
            class="text-slate-400 shrink-0 transition-transform duration-300"
          ></lucide-icon>
        </button>
        <div
          *ngIf="expandedPopular === i"
          class="px-7 lg:px-8 pb-7 lg:pb-8 pt-0"
        >
          <div class="pl-[60px]">
            <p class="text-lg text-slate-600 leading-relaxed">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- BY TOPIC -- bg-slate-50                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="by-topic">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="layout-grid" [size]="16" [strokeWidth]="2"></lucide-icon>
        По темам
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Вопросы по категориям
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Найдите ответ в нужном разделе: документы, экзамен, результаты или стоимость.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div
        *ngFor="let cat of categories; let ci = index"
        class="category-card bg-white rounded-2xl ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
      >
        <!-- Category header -->
        <div class="p-8 lg:p-10 border-b border-slate-100">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center"
              [ngClass]="{
                'bg-blue-50 text-blue-600': cat.color === 'blue',
                'bg-amber-50 text-amber-600': cat.color === 'amber',
                'bg-emerald-50 text-emerald-600': cat.color === 'emerald',
                'bg-violet-50 text-violet-600': cat.color === 'violet'
              }">
              <lucide-icon [name]="cat.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
            </div>
            <h3 class="text-2xl font-bold text-slate-900">{{ cat.title }}</h3>
          </div>
        </div>

        <!-- Category items -->
        <div class="divide-y divide-slate-100">
          <div
            *ngFor="let item of cat.items; let qi = index"
            class="cat-qa-item"
          >
            <button
              (click)="toggleCategory(ci, qi)"
              class="w-full flex items-center justify-between gap-4 px-8 lg:px-10 py-5 text-left cursor-pointer hover:bg-slate-50/60 transition-colors"
            >
              <span class="text-base font-medium text-slate-800">{{ item.question }}</span>
              <lucide-icon
                [name]="expandedCategory[ci] === qi ? 'chevron-up' : 'chevron-down'"
                [size]="18" [strokeWidth]="2"
                class="text-slate-400 shrink-0"
              ></lucide-icon>
            </button>
            <div
              *ngIf="expandedCategory[ci] === qi"
              class="px-8 lg:px-10 pb-6 pt-0"
            >
              <p class="text-base text-slate-600 leading-relaxed">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- QUICK FACTS -- bg-slate-950                  -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950" id="quick-facts">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="bar-chart-3" [size]="16" [strokeWidth]="2"></lucide-icon>
        Ключевые цифры
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        НОК в цифрах
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-400 leading-relaxed">
        Основные параметры системы независимой оценки квалификаций в строительной отрасли.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        *ngFor="let fact of keyFacts"
        class="fact-card rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] p-8 lg:p-10 hover:bg-white/[0.07] transition-all duration-500"
      >
        <div class="text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
          {{ fact.number }}
        </div>
        <div class="text-white font-semibold text-lg mb-2">{{ fact.label }}</div>
        <p class="text-slate-400 text-base leading-relaxed">{{ fact.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- STILL HAVE QUESTIONS -- bg-white (CTA)       -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="cta-section">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="cta-gradient-card relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 lg:p-20">
      <!-- Decorative orb -->
      <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" aria-hidden="true"></div>

      <div class="relative z-10 max-w-3xl">
        <div class="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-6">
          <lucide-icon name="headphones" [size]="16" [strokeWidth]="2"></lucide-icon>
          Поддержка
        </div>
        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Остались вопросы?
        </h2>
        <p class="text-lg lg:text-xl text-slate-300 leading-relaxed mb-10">
          Не нашли ответ на свой вопрос? Наши эксперты помогут разобраться в любых нюансах
          независимой оценки квалификации. Бесплатная консультация.
        </p>

        <div class="flex flex-col sm:flex-row items-start gap-4">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300"
          >
            <lucide-icon name="message-circle" [size]="20" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a
            [href]="phoneHref"
            class="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl ring-1 ring-white/20 transition-all duration-300"
          >
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- RELATED -- bg-slate-50                       -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="related">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-slate-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="compass" [size]="16" [strokeWidth]="2"></lucide-icon>
        Полезные материалы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Связанные статьи
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <a
        *ngFor="let article of relatedArticles"
        [routerLink]="article.link"
        class="related-card group bg-white rounded-2xl p-8 lg:p-10 ring-1 ring-slate-200 hover:shadow-xl hover:ring-slate-300 transition-all duration-500"
      >
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
          [ngClass]="{
            'bg-blue-50 text-blue-600': article.color === 'blue',
            'bg-emerald-50 text-emerald-600': article.color === 'emerald',
            'bg-violet-50 text-violet-600': article.color === 'violet',
            'bg-cyan-50 text-cyan-600': article.color === 'cyan',
            'bg-amber-50 text-amber-600': article.color === 'amber',
            'bg-slate-100 text-slate-600': article.color === 'slate'
          }">
          <lucide-icon [name]="article.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">{{ article.title }}</h3>
        <p class="text-base text-slate-500 leading-relaxed mb-6">{{ article.description }}</p>
        <div class="flex items-center gap-2 text-blue-600 font-semibold text-sm">
          <span>Подробнее</span>
          <lucide-icon name="arrow-right" [size]="16" [strokeWidth]="2" class="group-hover:translate-x-1 transition-transform"></lucide-icon>
        </div>
      </a>
    </div>
  </div>
</section>

</main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NokQaPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  expandedPopular: number | null = null;
  expandedCategory: Record<number, number | null> = {};

  popularQuestions: QaItem[] = [
    {
      question: 'Обязательна ли НОК для всех специалистов?',
      answer: 'НОК обязательна для специалистов, включённых или претендующих на включение в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ. Также обязательна для специалистов в области пожарной безопасности (ОПБ), жилищно-коммунального хозяйства (ЖКХ) и МЧС. Для остальных категорий работников НОК может быть добровольной, но даёт конкурентное преимущество при трудоустройстве.'
    },
    {
      question: 'Сколько стоит прохождение НОК?',
      answer: 'Стоимость зависит от квалификации и отрасли. Для специалистов НОСТРОЙ и НОПРИЗ стоимость составляет от 15 000 до 50 000 рублей. Оплата производится до прохождения экзамена. При несдаче экзамена оплата не возвращается, но вы можете пересдать с дополнительной оплатой. Мы предлагаем комплексные пакеты «подготовка + экзамен» по выгодной цене.'
    },
    {
      question: 'Сколько действует свидетельство о квалификации?',
      answer: 'Свидетельство о квалификации действует от 3 до 5 лет с момента выдачи в зависимости от квалификации. С 2025 года для ряда строительных квалификаций срок составляет 3 года. По истечении срока необходимо повторно пройти процедуру НОК. Информация о свидетельствах хранится в Реестре сведений о проведении НОК (nok-nark.ru). Рекомендуем начать подготовку к пересдаче за 3-4 месяца до окончания срока действия.'
    },
    {
      question: 'Можно ли пересдать экзамен НОК?',
      answer: 'Да, при несдаче экзамена возможна пересдача: теоретическую часть можно пересдать один раз, практическую --- нет. При неудаче на обеих частях можно подать заявление на полный новый экзамен через 30 дней. Количество полных пересдач не ограничено, каждая оплачивается отдельно. Мы предоставляем гарантию: при несдаче после полной подготовки по нашей программе --- бесплатная повторная подготовка и сопровождение.'
    },
    {
      question: 'Чем НОК отличается от аттестации и повышения квалификации?',
      answer: 'НОК --- это независимая оценка соответствия квалификации работника профессиональным стандартам, проводимая аккредитованными ЦОК. Аттестация --- внутренняя процедура работодателя. Повышение квалификации --- обучение новым навыкам. НОК не заменяет и не отменяет аттестацию, а является дополнительным подтверждением квалификации по 238-ФЗ. Свидетельство НОК является обязательным для включения в НРС.'
    },
    {
      question: 'Какие документы нужны для прохождения НОК?',
      answer: 'Для прохождения НОК необходимы: паспорт, СНИЛС, диплом о высшем или среднем профессиональном образовании, трудовая книжка или её заверенная копия, документы о повышении квалификации. Для некоторых квалификаций также потребуется портфолио с примерами выполненных проектов. Мы помогаем собрать и оформить полный пакет документов.'
    },
    {
      question: 'Можно ли пройти НОК дистанционно?',
      answer: 'Профессиональный экзамен НОК проводится только очно в аккредитованном Центре оценки квалификаций (ЦОК). Соискатель обязан лично присутствовать на экзамене. Однако подготовку к экзамену можно проходить полностью дистанционно --- наш онлайн-тренажёр доступен 24/7 из любой точки мира.'
    },
    {
      question: 'Сколько времени занимает процедура НОК от подачи заявления до получения свидетельства?',
      answer: 'Весь процесс занимает от 4 до 8 недель. Подача документов и их проверка --- до 10 рабочих дней. Сам экзамен занимает от 2 до 6 часов в зависимости от квалификации. Результаты направляются в СПК в течение 7 дней. Свидетельство выдаётся в срок, не превышающий 30 календарных дней после сдачи экзамена.'
    }
  ];

  categories: QaCategory[] = [
    {
      icon: 'file-text',
      title: 'Документы',
      color: 'blue',
      items: [
        {
          question: 'Какой диплом подходит для НОК?',
          answer: 'Для прохождения НОК подходит диплом о высшем профессиональном образовании (бакалавриат, специалитет, магистратура) или среднем профессиональном образовании по профильному направлению. Специальность в дипломе должна соответствовать профессиональному стандарту, по которому проходит оценка.'
        },
        {
          question: 'Нужна ли трудовая книжка для НОК?',
          answer: 'Да, трудовая книжка или её заверенная копия необходима для подтверждения стажа работы по специальности. С 01.09.2022 требования к стажу для НРС: общий стаж по специальности от 5 лет, стаж на инженерных должностях от 3 лет (при наличии свидетельства НОК). Также подойдут трудовые договоры или справки от работодателей.'
        },
        {
          question: 'Что входит в портфолио для НОК?',
          answer: 'Портфолио включает примеры выполненных проектов, технические решения, акты выполненных работ, проектную документацию. Для строителей --- акты скрытых работ, исполнительная документация. Для проектировщиков --- чертежи, пояснительные записки, расчёты. Мы помогаем составить портфолио по всем требованиям.'
        },
        {
          question: 'Можно ли подать документы за другого человека?',
          answer: 'Подать документы может представитель по нотариально заверенной доверенности. Однако на экзамен соискатель обязан явиться лично с паспортом. Также возможна подача документов через работодателя, если он является направляющей стороной.'
        }
      ]
    },
    {
      icon: 'graduation-cap',
      title: 'Экзамен',
      color: 'amber',
      items: [
        {
          question: 'Из чего состоит экзамен НОК?',
          answer: 'Экзамен включает теоретическую часть (компьютерное тестирование --- 50 вопросов за 60 минут для НОСТРОЙ) и практическую часть (решение ситуационных задач или защита портфолио). Формат зависит от конкретной квалификации. Для строительных специальностей обычно предусмотрены обе части.'
        },
        {
          question: 'Сколько длится экзамен?',
          answer: 'Теоретическая часть --- от 60 до 90 минут. Практическая часть --- от 1 до 3 часов. В общей сложности экзамен занимает от 2 до 6 часов в зависимости от квалификации. Перерыв между частями --- 15-30 минут.'
        },
        {
          question: 'Какой проходной балл на экзамене НОК?',
          answer: 'Для теоретической части необходимо правильно ответить минимум на 72% вопросов (36 из 50 для НОСТРОЙ). Практическая часть оценивается экспертной комиссией по установленным критериям. Для получения свидетельства необходимо успешно пройти обе части экзамена.'
        },
        {
          question: 'Какие темы входят в тестирование?',
          answer: 'Вопросы основаны на профессиональных стандартах, нормативно-технической документации (СП, ГОСТ, СНиП), градостроительном кодексе, требованиях промышленной безопасности. Конкретный перечень тем зависит от квалификации. Наш тренажёр содержит актуальную базу вопросов.'
        }
      ]
    },
    {
      icon: 'badge-check',
      title: 'Результаты',
      color: 'emerald',
      items: [
        {
          question: 'Когда станут известны результаты экзамена?',
          answer: 'Результаты теоретической части доступны сразу после завершения тестирования. Итоговое решение экспертной комиссии направляется в СПК в течение 7 дней, сведения вносятся в реестр в течение 14 дней.'
        },
        {
          question: 'Как получить свидетельство о квалификации?',
          answer: 'Свидетельство выдаётся в срок, не превышающий 30 календарных дней после сдачи экзамена. Получить можно лично в ЦОК или по почте. Данные о свидетельстве вносятся в реестр НОК (nok-nark.ru), что позволяет работодателям проверить его подлинность онлайн.'
        },
        {
          question: 'Что делать, если результаты экзамена кажутся несправедливыми?',
          answer: 'Вы можете подать апелляцию в ЦОК в течение 30 календарных дней с момента получения результатов. Апелляция регистрируется в течение 7 дней, рассматривается в течение 60 дней, решение доводится до заявителя в течение 7 дней.'
        },
        {
          question: 'Как проверить подлинность свидетельства НОК?',
          answer: 'Подлинность свидетельства можно проверить на сайте Реестра сведений о проведении независимой оценки квалификации (nok-nark.ru) по номеру свидетельства или ФИО специалиста. Все данные хранятся бессрочно.'
        }
      ]
    },
    {
      icon: 'credit-card',
      title: 'Стоимость и оплата',
      color: 'violet',
      items: [
        {
          question: 'Из чего складывается стоимость НОК?',
          answer: 'Стоимость включает: оплату профессионального экзамена в ЦОК, оформление документов, работу экспертной комиссии. Дополнительно может оплачиваться подготовка к экзамену и помощь в составлении портфолио. Мы предлагаем комплексные пакеты со скидкой.'
        },
        {
          question: 'Кто оплачивает прохождение НОК?',
          answer: 'Оплатить прохождение НОК может как сам специалист, так и его работодатель. Если работодатель направляет специалиста на НОК, он обязан оплатить все расходы. При самостоятельном прохождении расходы на НОК можно включить в налоговый вычет (НДФЛ).'
        },
        {
          question: 'Есть ли налоговый вычет за прохождение НОК?',
          answer: 'Да, согласно статье 219 Налогового кодекса РФ, расходы на прохождение независимой оценки квалификации можно вернуть через социальный налоговый вычет. Максимальная сумма вычета --- 150 000 рублей в год (возврат до 19 500 рублей). Для оформления потребуются договор с ЦОК и платёжные документы.'
        },
        {
          question: 'Возвращаются ли деньги при несдаче экзамена?',
          answer: 'Нет, при несдаче экзамена оплата не возвращается, так как услуга по проведению оценки была оказана. Однако вы можете пересдать экзамен, оплатив его повторно. Наша программа подготовки значительно повышает шансы на успешную сдачу с первой попытки.'
        }
      ]
    }
  ];

  keyFacts = [
    { number: '238-ФЗ', label: 'Федеральный закон', description: 'Основной нормативный акт о независимой оценке квалификаций' },
    { number: '3–5 лет', label: 'Срок действия', description: 'Период действия свидетельства о квалификации' },
    { number: '72%', label: 'Проходной балл', description: 'Минимальный порог правильных ответов (36 из 50)' },
    { number: '30 дней', label: 'Срок пересдачи', description: 'Минимальный период между попытками сдачи экзамена' }
  ];

  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Полный обзор системы независимой оценки квалификаций: история, цели, правовые основы',
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
      description: 'Как попасть в Национальный реестр специалистов НОСТРОЙ и НОПРИЗ',
      icon: 'clipboard-list',
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

  togglePopular(index: number): void {
    this.expandedPopular = this.expandedPopular === index ? null : index;
  }

  toggleCategory(catIndex: number, itemIndex: number): void {
    this.expandedCategory[catIndex] = this.expandedCategory[catIndex] === itemIndex ? null : itemIndex;
  }

  ngOnInit(): void {
    this.seoService.setNokQaPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Вопросы и ответы о НОК', url: `${this.seoService.getBaseUrl()}/info/nok-qa` }
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

    // POPULAR QUESTIONS
    const popularTl = await this.animationService.sectionTimeline('#popular');
    if (popularTl) {
      popularTl.fromTo('#popular .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      popularTl.fromTo('#popular h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      popularTl.fromTo('#popular .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      popularTl.fromTo('.popular-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.35);
    }

    // BY TOPIC
    const topicTl = await this.animationService.sectionTimeline('#by-topic');
    if (topicTl) {
      topicTl.fromTo('#by-topic .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      topicTl.fromTo('#by-topic h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      topicTl.fromTo('#by-topic .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      topicTl.fromTo('.category-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // QUICK FACTS (dark section)
    const factsSection = document.querySelector('#quick-facts');
    if (factsSection) {
      const factsTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: factsSection, start: 'top 92%', once: true }
      });
      factsTl.fromTo('#quick-facts .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      factsTl.fromTo('#quick-facts h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      factsTl.fromTo('#quick-facts .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      factsTl.fromTo('.fact-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
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
