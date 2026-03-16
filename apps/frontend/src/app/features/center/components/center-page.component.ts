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
  selector: 'app-center-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Наш центр', active: true }
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
      <!-- Breadcrumb-style nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Наш центр</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Наш</span>
        <span class="hero-word inline-block">центр</span>
        <span class="hero-word inline-block">подготовки</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">к НОК</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-8">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Помогаем специалистам строительной отрасли и смежных направлений успешно пройти независимую оценку квалификаций.
          <strong class="text-white font-semibold">Более 7 лет опыта, 3 000+ подготовленных специалистов.</strong>
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
    <span class="text-xs uppercase tracking-widest">Подробнее</span>
    <div class="w-6 h-10 rounded-full border border-slate-600 flex items-start justify-center p-1.5">
      <div class="hero-scroll-dot w-1.5 h-1.5 rounded-full bg-slate-400"></div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- ABOUT US -- bg-white                         -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="about">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="building-2" [size]="16" [strokeWidth]="2"></lucide-icon>
        О нас
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Кто мы и чем занимаемся
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        НОК Эксперт --- профессиональный центр подготовки специалистов к независимой оценке квалификаций.
        Мы работаем с 2017 года и за это время помогли тысячам специалистов со всей России подтвердить свою квалификацию.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
          <lucide-icon name="target" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Наша миссия</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Сделать процесс прохождения НОК понятным и доступным. Мы берём на себя всю подготовку ---
          от консультации по документам до полной готовности к экзамену. Каждый специалист заслуживает
          качественной поддержки.
        </p>
      </div>

      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
          <lucide-icon name="clock" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Опыт и надёжность</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          За более чем 7 лет работы мы выстроили системный подход к подготовке. Наши методики
          постоянно обновляются с учётом изменений в законодательстве, профессиональных стандартах
          и требованиях экзаменационных комиссий.
        </p>
      </div>

      <div class="about-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-8">
          <lucide-icon name="users" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Индивидуальный подход</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Мы учитываем специфику каждого направления --- НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ, МЧС.
          Программа подготовки формируется под конкретную квалификацию и уровень
          специалиста, чтобы экзамен был сдан с первого раза.
        </p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- SERVICES -- bg-slate-50                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="services">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="layers" [size]="16" [strokeWidth]="2"></lucide-icon>
        Что мы предлагаем
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Полный спектр услуг по НОК
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        От первичной консультации до получения свидетельства о квалификации ---
        сопровождаем на каждом этапе.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        *ngFor="let service of services"
        class="service-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-blue-50 text-blue-600': service.color === 'blue',
               'bg-cyan-50 text-cyan-600': service.color === 'cyan',
               'bg-emerald-50 text-emerald-600': service.color === 'emerald',
               'bg-orange-50 text-orange-600': service.color === 'orange',
               'bg-violet-50 text-violet-600': service.color === 'violet',
               'bg-red-50 text-red-600': service.color === 'red'
             }">
          <lucide-icon [name]="service.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ service.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed">{{ service.description }}</p>
      </div>
    </div>

    <div class="mt-12 text-center">
      <a routerLink="/services"
         class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200">
        Все наши услуги
        <lucide-icon name="arrow-right" [size]="20" [strokeWidth]="2"></lucide-icon>
      </a>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- TEAM -- bg-white                             -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="team">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="hard-hat" [size]="16" [strokeWidth]="2"></lucide-icon>
        Наша команда
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Эксперты в своём деле
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        В нашей команде --- практикующие специалисты с опытом в строительстве, проектировании
        и нормативном регулировании. Мы знаем экзамен изнутри.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        *ngFor="let area of teamAreas"
        class="team-card group">
        <div class="bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200 h-full">
          <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
            <lucide-icon [name]="area.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ area.title }}</h3>
          <p class="text-base text-slate-600 leading-relaxed">{{ area.description }}</p>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- WHY CHOOSE US -- bg-slate-950 dark           -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950 overflow-hidden" id="advantages">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="trophy" [size]="16" [strokeWidth]="2"></lucide-icon>
        Почему мы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Наши преимущества в цифрах
      </h2>
      <p class="section-subtitle text-xl text-slate-400 leading-relaxed">
        Результаты, которые говорят сами за себя. Мы не просто готовим --- мы гарантируем результат.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <div
        *ngFor="let stat of stats"
        class="stat-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/20">
        <div class="text-4xl sm:text-5xl font-bold text-white mb-3">{{ stat.number }}</div>
        <h3 class="text-lg font-semibold text-white mb-2">{{ stat.label }}</h3>
        <p class="text-base text-slate-400 leading-relaxed">{{ stat.description }}</p>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        *ngFor="let advantage of advantages"
        class="advantage-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/20">
        <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
          <lucide-icon [name]="advantage.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">{{ advantage.title }}</h3>
        <p class="text-base text-slate-400 leading-relaxed">{{ advantage.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- GEOGRAPHY -- bg-slate-50                     -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="geography">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="globe" [size]="16" [strokeWidth]="2"></lucide-icon>
        География работы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Работаем по всей России
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Дистанционный формат подготовки позволяет нам работать со специалистами из любого региона.
        Экзамен сдаётся очно в аккредитованном ЦОК --- мы подберём ближайший к вам.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        *ngFor="let region of regions"
        class="region-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-blue-50 text-blue-600': region.color === 'blue',
               'bg-cyan-50 text-cyan-600': region.color === 'cyan',
               'bg-emerald-50 text-emerald-600': region.color === 'emerald',
               'bg-violet-50 text-violet-600': region.color === 'violet',
               'bg-orange-50 text-orange-600': region.color === 'orange',
               'bg-red-50 text-red-600': region.color === 'red'
             }">
          <lucide-icon [name]="region.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ region.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed">{{ region.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- CTA -- bg-white                              -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="cta-gradient-card relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Готовы к подготовке?
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
          Получите бесплатную консультацию. Определим вашу квалификацию, расскажем о процедуре
          и составим индивидуальный план подготовки к экзамену НОК.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a [href]="phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-10 py-5 text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
        <p class="text-sm text-blue-200/60 mt-6">Ответим в течение 15 минут в рабочее время</p>
      </div>
    </div>
  </div>
</section>

</main>
  `,
  styles: []
})
export class CenterPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  services = [
    {
      icon: 'graduation-cap',
      title: 'Подготовка к экзамену НОК',
      description: 'Комплексная подготовка по актуальным вопросам экзамена. Теоретическая база, тренировочные тесты и разбор ситуационных задач.',
      color: 'blue'
    },
    {
      icon: 'file-text',
      title: 'Помощь с документами',
      description: 'Проверка и подготовка полного пакета документов для подачи заявления в ЦОК: дипломы, трудовая книжка, СНИЛС, портфолио.',
      color: 'emerald'
    },
    {
      icon: 'building-2',
      title: 'НОК для НОСТРОЙ',
      description: 'Подготовка специалистов строительных организаций --- инженеров, прорабов, ГИП. Включение в Национальный реестр специалистов.',
      color: 'cyan'
    },
    {
      icon: 'search',
      title: 'НОК для НОПРИЗ',
      description: 'Подготовка проектировщиков, изыскателей и архитекторов к оценке квалификации для проектных организаций.',
      color: 'violet'
    },
    {
      icon: 'flame',
      title: 'НОК по пожарной безопасности',
      description: 'Подготовка инженеров по пожарной безопасности и специалистов ОПБ. Все актуальные профессиональные стандарты.',
      color: 'orange'
    },
    {
      icon: 'siren',
      title: 'НОК для МЧС и ЖКХ',
      description: 'Подготовка специалистов аварийно-спасательных формирований и работников жилищно-коммунального хозяйства.',
      color: 'red'
    }
  ];

  teamAreas = [
    {
      icon: 'hard-hat',
      title: 'Строительство',
      description: 'Эксперты с опытом работы на крупных строительных объектах и знанием нормативной базы НОСТРОЙ.'
    },
    {
      icon: 'pen-tool',
      title: 'Проектирование',
      description: 'Практикующие проектировщики, знакомые с требованиями НОПРИЗ и стандартами проектной документации.'
    },
    {
      icon: 'shield',
      title: 'Безопасность',
      description: 'Специалисты по пожарной и промышленной безопасности с профильным образованием и сертификатами.'
    },
    {
      icon: 'scale',
      title: 'Нормативка',
      description: 'Юристы и методологи, отслеживающие все изменения в законодательстве о НОК и профстандартах.'
    }
  ];

  stats = [
    { number: '7+', label: 'Лет работы', description: 'Работаем в сфере НОК с момента запуска системы в 2017 году' },
    { number: '3 000+', label: 'Специалистов', description: 'Подготовлено к успешной сдаче экзамена по всем направлениям' },
    { number: '95%', label: 'Успешная сдача', description: 'Средний процент сдачи экзамена НОК с первой попытки' },
    { number: '6', label: 'Направлений', description: 'НОСТРОЙ, НОПРИЗ, ОПБ, ЖКХ, МЧС и другие отрасли' }
  ];

  advantages = [
    {
      icon: 'shield-check',
      title: 'Гарантия результата',
      description: 'При несдаче экзамена после полной подготовки по нашей программе --- бесплатная повторная подготовка.'
    },
    {
      icon: 'brain',
      title: 'Актуальные материалы',
      description: 'Вопросы и материалы постоянно обновляются. Мы используем реальные вопросы из экзаменационных баз.'
    },
    {
      icon: 'headphones',
      title: 'Персональный куратор',
      description: 'К каждому специалисту прикрепляется куратор, который ведёт от подачи заявления до получения свидетельства.'
    },
    {
      icon: 'timer',
      title: 'Быстрые сроки',
      description: 'Средний срок подготовки --- от 3 до 14 дней. Подбираем ближайшую дату экзамена в удобном ЦОК.'
    },
    {
      icon: 'monitor',
      title: 'Дистанционная подготовка',
      description: 'Готовьтесь из любой точки России. Онлайн-консультации, тренажёр вопросов и удалённая поддержка.'
    },
    {
      icon: 'refresh-cw',
      title: 'Полное сопровождение',
      description: 'Помогаем на всех этапах: документы, подготовка, запись в ЦОК, экзамен, получение свидетельства и включение в НРС.'
    }
  ];

  regions = [
    {
      icon: 'landmark',
      title: 'Москва и МО',
      description: 'Центральный офис и партнёрские ЦОК в Москве и Московской области. Личные и онлайн-консультации.',
      color: 'blue'
    },
    {
      icon: 'building-2',
      title: 'Санкт-Петербург',
      description: 'Работаем с ведущими ЦОК Северо-Западного региона. Полное дистанционное сопровождение.',
      color: 'cyan'
    },
    {
      icon: 'factory',
      title: 'Урал и Сибирь',
      description: 'Екатеринбург, Новосибирск, Красноярск, Тюмень и другие крупные города региона.',
      color: 'emerald'
    },
    {
      icon: 'compass',
      title: 'Юг России',
      description: 'Краснодар, Ростов-на-Дону, Волгоград и другие города южного направления.',
      color: 'orange'
    },
    {
      icon: 'map-pin',
      title: 'Дальний Восток',
      description: 'Владивосток, Хабаровск, Якутск. Дистанционная подготовка с подбором ближайшего ЦОК.',
      color: 'violet'
    },
    {
      icon: 'globe',
      title: 'Любой регион РФ',
      description: 'Подготовка полностью дистанционная. Подберём аккредитованный ЦОК в вашем городе для сдачи экзамена.',
      color: 'red'
    }
  ];

  ngOnInit(): void {
    this.seoService.setCenterPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Наш центр', url: `${this.seoService.getBaseUrl()}/center` }
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

    // ABOUT SECTION
    const aboutTl = await this.animationService.sectionTimeline('#about');
    if (aboutTl) {
      aboutTl.fromTo('#about .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      aboutTl.fromTo('#about h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      aboutTl.fromTo('#about .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      aboutTl.fromTo('.about-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // SERVICES SECTION
    const servicesTl = await this.animationService.sectionTimeline('#services');
    if (servicesTl) {
      servicesTl.fromTo('#services .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      servicesTl.fromTo('#services h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      servicesTl.fromTo('#services .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      servicesTl.fromTo('.service-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // TEAM SECTION
    const teamTl = await this.animationService.sectionTimeline('#team');
    if (teamTl) {
      teamTl.fromTo('#team .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      teamTl.fromTo('#team h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      teamTl.fromTo('#team .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      teamTl.fromTo('.team-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // ADVANTAGES SECTION (dark)
    const advSection = document.querySelector('#advantages');
    if (advSection) {
      const advTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: advSection, start: 'top 92%', once: true }
      });
      advTl.fromTo('#advantages .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      advTl.fromTo('#advantages h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      advTl.fromTo('#advantages .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      advTl.fromTo('.stat-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
      advTl.fromTo('.advantage-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.6);
    }

    // GEOGRAPHY SECTION
    const geoTl = await this.animationService.sectionTimeline('#geography');
    if (geoTl) {
      geoTl.fromTo('#geography .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      geoTl.fromTo('#geography h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      geoTl.fromTo('#geography .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      geoTl.fromTo('.region-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
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
