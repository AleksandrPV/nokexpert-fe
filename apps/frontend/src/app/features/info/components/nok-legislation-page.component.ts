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
  selector: 'app-nok-legislation-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Информация о НОК', url: '/info' },
    { label: 'Законодательство НОК', active: true }
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
        <a routerLink="/info" class="hover:text-slate-300 transition-colors">Информация о НОК</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Законодательство НОК</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Законодательство</span><br>
        <span class="hero-word inline-block">о</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">НОК</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-8">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Нормативно-правовая база независимой оценки квалификаций: федеральные законы, профессиональные стандарты и регулирующие органы.
          Основа --- <strong class="text-white font-semibold">Федеральный закон 238-ФЗ от 03.07.2016</strong>.
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- KEY LAWS -- bg-white                         -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="key-laws">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="scale" [size]="16" [strokeWidth]="2"></lucide-icon>
        Ключевые законы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Основные нормативные акты
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Три фундаментальных закона формируют правовую основу системы независимой оценки квалификаций в России.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div *ngFor="let law of keyLaws" class="law-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-blue-50 text-blue-600': law.color === 'blue',
               'bg-emerald-50 text-emerald-600': law.color === 'emerald',
               'bg-violet-50 text-violet-600': law.color === 'violet'
             }">
          <lucide-icon [name]="law.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ law.title }}</h3>
        <p class="text-sm font-medium text-slate-400 mb-4">{{ law.subtitle }}</p>
        <p class="text-lg text-slate-600 leading-relaxed">{{ law.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- 238-FZ DETAIL -- bg-slate-50                 -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="fz238">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="file-text" [size]="16" [strokeWidth]="2"></lucide-icon>
        Федеральный закон 238-ФЗ
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Разбор ключевых статей
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Федеральный закон от 03.07.2016 N 238-ФЗ "О независимой оценке квалификации" --- основной нормативный акт, регулирующий систему НОК. Вступил в силу 1 января 2017 года.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div *ngFor="let article of fzArticles" class="fz-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <lucide-icon [name]="article.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <span class="text-sm font-bold text-blue-600 uppercase tracking-wider">{{ article.label }}</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ article.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed">{{ article.description }}</p>
      </div>
    </div>

    <div class="mt-12 bg-white rounded-2xl p-10 ring-1 ring-slate-200">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <lucide-icon name="info" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900">Срок действия свидетельства</h3>
      </div>
      <p class="text-lg text-slate-600 leading-relaxed">
        Согласно 238-ФЗ, свидетельство о квалификации действует <strong class="text-slate-900">5 лет</strong> с момента выдачи.
        По истечении этого срока специалист обязан повторно пройти процедуру независимой оценки квалификации.
        Данные о выданных свидетельствах вносятся в Федеральный реестр сведений о квалификациях работников (ФРСК),
        который ведётся в соответствии со статьёй 14 закона.
      </p>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- PROFESSIONAL STANDARDS -- bg-white           -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="prof-standards">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="clipboard-list" [size]="16" [strokeWidth]="2"></lucide-icon>
        Профессиональные стандарты
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Основа оценки квалификации
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Профессиональные стандарты --- нормативные документы, утверждённые приказами Минтруда России, которые определяют
        требования к квалификации работников. Именно по ним проводится экзамен НОК.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 mb-12">
      <div class="standard-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
          <lucide-icon name="hard-hat" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">Строительные стандарты</h3>
        <ul class="space-y-3">
          <li *ngFor="let item of buildingStandards" class="flex items-start gap-3">
            <lucide-icon name="check" [size]="18" [strokeWidth]="2" class="text-blue-600 mt-1 flex-shrink-0"></lucide-icon>
            <span class="text-lg text-slate-600">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="standard-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-8">
          <lucide-icon name="pencil-ruler" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">Проектировочные и изыскательские стандарты</h3>
        <ul class="space-y-3">
          <li *ngFor="let item of designStandards" class="flex items-start gap-3">
            <lucide-icon name="check" [size]="18" [strokeWidth]="2" class="text-violet-600 mt-1 flex-shrink-0"></lucide-icon>
            <span class="text-lg text-slate-600">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <div class="standard-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-8">
          <lucide-icon name="flame" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">Пожарная безопасность</h3>
        <ul class="space-y-3">
          <li *ngFor="let item of fireStandards" class="flex items-start gap-3">
            <lucide-icon name="check" [size]="18" [strokeWidth]="2" class="text-orange-600 mt-1 flex-shrink-0"></lucide-icon>
            <span class="text-lg text-slate-600">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="standard-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-8">
          <lucide-icon name="house" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">ЖКХ и другие отрасли</h3>
        <ul class="space-y-3">
          <li *ngFor="let item of otherStandards" class="flex items-start gap-3">
            <lucide-icon name="check" [size]="18" [strokeWidth]="2" class="text-teal-600 mt-1 flex-shrink-0"></lucide-icon>
            <span class="text-lg text-slate-600">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- REGULATORY BODIES -- bg-slate-950 dark       -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950 overflow-hidden" id="regulatory-bodies">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="landmark" [size]="16" [strokeWidth]="2"></lucide-icon>
        Регулирующие органы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Кто управляет системой НОК
      </h2>
      <p class="section-subtitle text-xl text-slate-400 leading-relaxed">
        Система независимой оценки квалификаций координируется на государственном уровне тремя ключевыми структурами.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <div *ngFor="let body of regulatoryBodies"
           class="body-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-10 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/20">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-blue-500/10 text-blue-400': body.color === 'blue',
               'bg-cyan-500/10 text-cyan-400': body.color === 'cyan',
               'bg-violet-500/10 text-violet-400': body.color === 'violet'
             }">
          <lucide-icon [name]="body.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">{{ body.title }}</h3>
        <p class="text-sm font-medium text-slate-500 mb-4">{{ body.fullName }}</p>
        <p class="text-base text-slate-400 leading-relaxed mb-6">{{ body.description }}</p>
        <ul class="space-y-2">
          <li *ngFor="let func of body.functions" class="flex items-start gap-2">
            <lucide-icon name="chevron-right" [size]="16" [strokeWidth]="2" class="text-blue-400 mt-1 flex-shrink-0"></lucide-icon>
            <span class="text-sm text-slate-400">{{ func }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- RECENT CHANGES -- bg-slate-50                -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="recent-changes">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="history" [size]="16" [strokeWidth]="2"></lucide-icon>
        Актуальные изменения
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Последние обновления законодательства
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Законодательство о НОК регулярно обновляется. Отслеживаем ключевые изменения, влияющие на специалистов.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <div *ngFor="let change of recentChanges"
           class="change-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center"
               [ngClass]="{
                 'bg-blue-50 text-blue-600': change.color === 'blue',
                 'bg-emerald-50 text-emerald-600': change.color === 'emerald',
                 'bg-amber-50 text-amber-600': change.color === 'amber',
                 'bg-violet-50 text-violet-600': change.color === 'violet'
               }">
            <lucide-icon [name]="change.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <span class="text-sm font-bold uppercase tracking-wider"
                [ngClass]="{
                  'text-blue-600': change.color === 'blue',
                  'text-emerald-600': change.color === 'emerald',
                  'text-amber-600': change.color === 'amber',
                  'text-violet-600': change.color === 'violet'
                }">{{ change.year }}</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">{{ change.title }}</h3>
        <ul class="space-y-3">
          <li *ngFor="let item of change.items" class="flex items-start gap-3">
            <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="mt-1 flex-shrink-0"
                         [ngClass]="{
                           'text-blue-600': change.color === 'blue',
                           'text-emerald-600': change.color === 'emerald',
                           'text-amber-600': change.color === 'amber',
                           'text-violet-600': change.color === 'violet'
                         }"></lucide-icon>
            <span class="text-base text-slate-600">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- FAQ -- bg-white                              -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="faq">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="circle-help" [size]="16" [strokeWidth]="2"></lucide-icon>
        Вопросы и ответы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
        Частые вопросы о законодательстве НОК
      </h2>
    </div>

    <div class="max-w-3xl">
      <div class="space-y-4">
        <div
          *ngFor="let item of faqItems; let i = index"
          class="faq-item bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden transition-all duration-300"
          [class.ring-blue-200]="expandedFaq === i">
          <button
            (click)="toggleFaq(i)"
            class="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer">
            <h3 class="text-lg font-semibold text-slate-900">{{ item.question }}</h3>
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center transition-transform duration-300"
                 [class.rotate-180]="expandedFaq === i"
                 [class.bg-blue-100]="expandedFaq === i">
              <lucide-icon name="chevron-down" [size]="18" [strokeWidth]="2"
                           [class.text-blue-600]="expandedFaq === i"
                           [class.text-slate-500]="expandedFaq !== i"></lucide-icon>
            </div>
          </button>
          <div class="overflow-hidden transition-all duration-300"
               [class.max-h-0]="expandedFaq !== i"
               [class.max-h-96]="expandedFaq === i">
            <div class="px-6 sm:px-8 pb-6 sm:pb-8">
              <p class="text-lg text-slate-600 leading-relaxed">{{ item.answer }}</p>
            </div>
          </div>
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
      <div class="section-label inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="library" [size]="16" [strokeWidth]="2"></lucide-icon>
        Полезные материалы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Узнайте больше о НОК
      </h2>
      <p class="text-lg lg:text-xl text-slate-500 leading-relaxed">
        Подробные статьи о процедуре, подготовке и требованиях к специалистам.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        *ngFor="let article of relatedArticles"
        [routerLink]="article.link"
        class="related-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-blue-200">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors"
             [ngClass]="{
               'bg-blue-50 text-blue-600 group-hover:bg-blue-100': article.color === 'blue',
               'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100': article.color === 'emerald',
               'bg-violet-50 text-violet-600 group-hover:bg-violet-100': article.color === 'violet',
               'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100': article.color === 'cyan',
               'bg-amber-50 text-amber-600 group-hover:bg-amber-100': article.color === 'amber',
               'bg-slate-100 text-slate-600 group-hover:bg-slate-200': article.color === 'slate'
             }">
          <lucide-icon [name]="article.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{{ article.title }}</h3>
        <p class="text-base text-slate-500 leading-relaxed mb-4">{{ article.description }}</p>
        <div class="flex items-center gap-1 text-sm font-semibold text-blue-600">
          Читать
          <lucide-icon name="arrow-right" [size]="16" [strokeWidth]="2" class="transition-transform duration-300 group-hover:translate-x-1"></lucide-icon>
        </div>
      </a>
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
          Нужна помощь с НОК?
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
          Поможем разобраться в законодательстве, определим подходящую квалификацию и подготовим к экзамену. Бесплатная консультация.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a [href]="'tel:' + phoneHref"
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
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NokLegislationPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  // KEY LAWS
  keyLaws = [
    {
      icon: 'scale',
      title: 'Федеральный закон 238-ФЗ',
      subtitle: 'от 03.07.2016 "О независимой оценке квалификации"',
      description: 'Основной закон, устанавливающий правовые основы, порядок проведения НОК, права и обязанности участников процедуры оценки квалификации.',
      color: 'blue'
    },
    {
      icon: 'building-2',
      title: 'Градостроительный кодекс РФ',
      subtitle: 'Статьи 55.5-1, 55.5-2',
      description: 'Устанавливает требования к специалистам для включения в Национальный реестр специалистов (НРС) НОСТРОЙ и НОПРИЗ. Обязывает подтверждать квалификацию через НОК.',
      color: 'emerald'
    },
    {
      icon: 'briefcase',
      title: 'Трудовой кодекс РФ',
      subtitle: 'Статьи 195.1, 195.3, 196',
      description: 'Определяет право работодателя направлять работников на НОК, порядок оплаты и гарантии. Устанавливает обязательность применения профессиональных стандартов.',
      color: 'violet'
    }
  ];

  // 238-FZ ARTICLES
  fzArticles = [
    {
      icon: 'book-open',
      label: 'Статья 1',
      title: 'Предмет регулирования',
      description: 'Закон регулирует отношения, связанные с проведением независимой оценки квалификации работников и лиц, претендующих на осуществление определённого вида трудовой деятельности.'
    },
    {
      icon: 'list',
      label: 'Статья 2',
      title: 'Основные понятия',
      description: 'Определяет ключевые термины: независимая оценка квалификации, центр оценки квалификации (ЦОК), совет по профессиональным квалификациям, свидетельство о квалификации.'
    },
    {
      icon: 'shield',
      label: 'Статья 3',
      title: 'Принципы проведения НОК',
      description: 'Устанавливает принципы: добровольность участия, объективность и независимость оценки, открытость и доступность информации о процедурах, ответственность участников.'
    },
    {
      icon: 'users',
      label: 'Статья 4',
      title: 'Участники системы НОК',
      description: 'Определяет роли участников: Национальный совет при Президенте, советы по профквалификациям, центры оценки квалификаций (ЦОК), работодатели и соискатели.'
    },
    {
      icon: 'file-check',
      label: 'Статьи 5-6',
      title: 'Порядок проведения экзамена',
      description: 'Регламентирует процедуру: подача заявления, проведение профессионального экзамена, оценка результатов, выдача свидетельства или заключения о несоответствии.'
    },
    {
      icon: 'database',
      label: 'Статья 14',
      title: 'Реестр сведений о квалификациях',
      description: 'Устанавливает порядок ведения Федерального реестра сведений о квалификациях работников (ФРСК), куда вносятся данные обо всех выданных свидетельствах НОК.'
    }
  ];

  // PROFESSIONAL STANDARDS
  buildingStandards = [
    'Специалист по организации строительства (6-й и 7-й уровни квалификации)',
    'Специалист по организации инженерных изысканий',
    'Мастер строительных и монтажных работ',
    'Специалист в области обращения с отходами'
  ];

  designStandards = [
    'Специалист по организации архитектурно-строительного проектирования',
    'Инженер-проектировщик (различные специализации)',
    'Специалист по организации инженерных изысканий',
    'Главный инженер проекта (ГИП), главный архитектор проекта (ГАП)'
  ];

  fireStandards = [
    'Специалист по противопожарной профилактике',
    'Специалист по пожарной безопасности объектов защиты',
    'Специалист по огнезащите',
    'Инженер пожарной безопасности'
  ];

  otherStandards = [
    'Специалист по управлению многоквартирным домом',
    'Специалист в области энергоаудита и энергоэффективности',
    'Специалист по эксплуатации котельных',
    'Другие профессии с утверждёнными профстандартами'
  ];

  // REGULATORY BODIES
  regulatoryBodies = [
    {
      icon: 'building',
      title: 'НАРК',
      fullName: 'Национальное агентство развития квалификаций',
      description: 'Автономная некоммерческая организация, координирующая развитие национальной системы квалификаций в России.',
      color: 'blue',
      functions: [
        'Координация деятельности советов по профквалификациям',
        'Ведение реестра сведений о квалификациях',
        'Методическое обеспечение системы НОК',
        'Мониторинг рынка труда и квалификаций'
      ]
    },
    {
      icon: 'users',
      title: 'Советы по профквалификациям',
      fullName: 'Советы по профессиональным квалификациям (СПК)',
      description: 'Отраслевые органы, создаваемые при НАРК для управления системой НОК в конкретных сферах деятельности.',
      color: 'cyan',
      functions: [
        'Аккредитация центров оценки квалификаций (ЦОК)',
        'Утверждение оценочных средств для экзаменов',
        'Контроль качества проведения НОК',
        'Разработка и актуализация профессиональных стандартов'
      ]
    },
    {
      icon: 'landmark',
      title: 'Минтруд России',
      fullName: 'Министерство труда и социальной защиты РФ',
      description: 'Федеральный орган исполнительной власти, отвечающий за государственную политику в сфере квалификаций.',
      color: 'violet',
      functions: [
        'Утверждение профессиональных стандартов',
        'Нормативно-правовое регулирование системы НОК',
        'Выпуск разъяснений и методических рекомендаций',
        'Формирование государственной кадровой политики'
      ]
    }
  ];

  // RECENT CHANGES
  recentChanges = [
    {
      year: '2025',
      icon: 'zap',
      color: 'blue',
      title: 'Актуальные изменения',
      items: [
        'Расширение перечня обязательных квалификаций для строительной отрасли',
        'Ужесточение требований к аккредитации ЦОК',
        'Внедрение единой информационной системы мониторинга НОК',
        'Усиление контроля за соблюдением сроков действия свидетельств'
      ]
    },
    {
      year: '2024',
      icon: 'refresh-cw',
      color: 'emerald',
      title: 'Изменения 2024 года',
      items: [
        'Введение электронного документооборота между ЦОК и СПК',
        'Обновление процедуры аккредитации центров оценки',
        'Уточнение порядка обжалования результатов экзамена',
        'Расширение возможностей дистанционного мониторинга экзаменов'
      ]
    },
    {
      year: '2023',
      icon: 'file-plus',
      color: 'amber',
      title: 'Изменения 2023 года',
      items: [
        'Расширение перечня специальностей, подлежащих обязательной НОК',
        'Обновление требований к составу оценочных средств',
        'Введение требований по электронной фиксации хода экзамена',
        'Актуализация профессиональных стандартов для строительства'
      ]
    },
    {
      year: '2022',
      icon: 'check-circle',
      color: 'violet',
      title: 'Изменения 2022 года',
      items: [
        'Утверждение новых методических рекомендаций Минтруда',
        'Обновление формата свидетельства о квалификации',
        'Переход на электронный формат ведения ФРСК',
        'Введение дополнительных требований для специалистов ОПБ'
      ]
    }
  ];

  // FAQ
  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Какой основной закон регулирует НОК?',
      answer: 'Основным нормативным актом является Федеральный закон от 03.07.2016 N 238-ФЗ "О независимой оценке квалификации". Он вступил в силу 1 января 2017 года и устанавливает правовые основы, порядок проведения оценки, права и обязанности всех участников процедуры.'
    },
    {
      question: 'Является ли НОК обязательной по закону?',
      answer: 'Согласно 238-ФЗ, НОК основана на принципе добровольности. Однако ряд отраслевых нормативных актов делает её фактически обязательной. В частности, Градостроительный кодекс РФ требует подтверждения квалификации для включения в НРС НОСТРОЙ и НОПРИЗ, что делает НОК обязательной для руководителей строительных и проектных организаций.'
    },
    {
      question: 'Что такое профессиональный стандарт и как он связан с НОК?',
      answer: 'Профессиональный стандарт --- нормативный документ, утверждённый приказом Минтруда, определяющий требования к квалификации работника. Экзамен НОК проводится именно на соответствие профессиональному стандарту. Стандарт описывает трудовые функции, необходимые знания, умения и уровень квалификации.'
    },
    {
      question: 'Кто аккредитует центры оценки квалификаций?',
      answer: 'Аккредитация ЦОК осуществляется советами по профессиональным квалификациям (СПК), которые действуют при Национальном агентстве развития квалификаций (НАРК). Каждый СПК отвечает за свою отрасль: строительство, проектирование, пожарная безопасность и другие.'
    },
    {
      question: 'Может ли работодатель обязать работника пройти НОК?',
      answer: 'Согласно статье 196 Трудового кодекса РФ, работодатель имеет право направить работника на НОК с его письменного согласия. При этом работодатель обязан сохранить за работником место работы и среднюю заработную плату, а также оплатить расходы на прохождение оценки, включая командировочные.'
    },
    {
      question: 'Какие последние изменения в законодательстве о НОК?',
      answer: 'В 2024-2025 годах продолжается расширение перечня обязательных квалификаций, ужесточаются требования к аккредитации ЦОК, внедряется единая информационная система мониторинга. Также обновляются профессиональные стандарты для строительной отрасли и пожарной безопасности.'
    }
  ];

  // RELATED
  relatedArticles = [
    {
      title: 'Что такое НОК',
      description: 'Определение и суть процедуры независимой оценки квалификации',
      icon: 'book-open',
      link: '/info/what-is-nok',
      color: 'blue'
    },
    {
      title: 'Кому нужна НОК',
      description: 'Какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'emerald'
    },
    {
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения оценки',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'violet'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по подготовке к профессиональному экзамену',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
      color: 'cyan'
    },
    {
      title: 'Реестр специалистов',
      description: 'Как попасть в НРС НОСТРОЙ и НОПРИЗ',
      icon: 'database',
      link: '/info/specialists-registry',
      color: 'amber'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Особенности оценки для специалистов строительной отрасли',
      icon: 'building-2',
      link: '/info/nok-nostroy',
      color: 'slate'
    }
  ];

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setNokLegislationPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Законодательство НОК', url: `${this.seoService.getBaseUrl()}/info/nok-legislation` }
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

    // KEY LAWS
    const lawsTl = await this.animationService.sectionTimeline('#key-laws');
    if (lawsTl) {
      lawsTl.fromTo('#key-laws .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      lawsTl.fromTo('#key-laws h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      lawsTl.fromTo('#key-laws .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      lawsTl.fromTo('.law-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // 238-FZ
    const fzTl = await this.animationService.sectionTimeline('#fz238');
    if (fzTl) {
      fzTl.fromTo('#fz238 .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      fzTl.fromTo('#fz238 h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      fzTl.fromTo('#fz238 .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      fzTl.fromTo('.fz-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
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
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // REGULATORY BODIES (dark section)
    const bodiesSection = document.querySelector('#regulatory-bodies');
    if (bodiesSection) {
      const bodiesTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: bodiesSection, start: 'top 92%', once: true }
      });
      bodiesTl.fromTo('#regulatory-bodies .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      bodiesTl.fromTo('#regulatory-bodies h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      bodiesTl.fromTo('#regulatory-bodies .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      bodiesTl.fromTo('.body-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
    }

    // RECENT CHANGES
    const changesTl = await this.animationService.sectionTimeline('#recent-changes');
    if (changesTl) {
      changesTl.fromTo('#recent-changes .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      changesTl.fromTo('#recent-changes h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      changesTl.fromTo('#recent-changes .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      changesTl.fromTo('.change-card',
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
