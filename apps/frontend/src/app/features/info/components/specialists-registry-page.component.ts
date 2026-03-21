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
  selector: 'app-specialists-registry-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<!-- Breadcrumbs -->
<app-breadcrumbs
  [breadcrumbs]="[
    { label: 'Главная', url: '/' },
    { label: 'Информация о НОК', url: '/info' },
    { label: 'Реестр специалистов НРС', active: true }
  ]">
</app-breadcrumbs>

<main>

<!-- ============================================ -->
<!-- HERO -- bg-slate-950                         -->
<!-- ============================================ -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <!-- Floating orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-amber-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
    <div class="hero-orb absolute w-[300px] h-[300px] rounded-full bg-cyan-600/[0.06] blur-[90px] top-1/3 right-1/4"></div>
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
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-amber-400/40 top-[15%] left-[10%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 top-[25%] left-[75%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-amber-300/40 top-[65%] left-[85%]"></div>
    <div class="hero-particle absolute w-2 h-2 rounded-full bg-cyan-400/20 top-[45%] left-[5%]"></div>
    <div class="hero-particle absolute w-1 h-1 rounded-full bg-blue-300/30 top-[80%] left-[40%]"></div>
    <div class="hero-particle absolute w-1.5 h-1.5 rounded-full bg-amber-400/25 top-[10%] left-[55%]"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-24 lg:py-32">
    <div class="max-w-4xl">
      <!-- Breadcrumb-style nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <a routerLink="/info" class="hover:text-slate-300 transition-colors">Информация о НОК</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-amber-400">Реестр специалистов НРС</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
        <span class="hero-word inline-block">Национальный</span>
        <span class="hero-word inline-block">реестр</span>
        <span class="hero-word inline-block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">специалистов</span>
        <span class="hero-word inline-block text-white/80">(НРС)</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl mb-8">
        <p class="text-xl sm:text-2xl text-slate-400 leading-relaxed">
          Единая база данных квалифицированных специалистов в области строительства, проектирования
          и инженерных изысканий. Ведётся
          <strong class="text-white font-semibold">НОСТРОЙ</strong> и
          <strong class="text-white font-semibold">НОПРИЗ</strong>.
        </p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-amber-500 via-orange-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- WHAT IS NRS -- bg-white                      -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="what-is-nrs">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div class="max-w-3xl">
        <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
          <lucide-icon name="database" [size]="16" [strokeWidth]="2"></lucide-icon>
          О реестре
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Что такое Национальный реестр специалистов
        </h2>
        <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
          НРС --- это официальная база данных, содержащая сведения
          о специалистах, имеющих право занимать ответственные должности
          в строительстве, проектировании и инженерных изысканиях.
        </p>
      </div>
      <div class="flex justify-center lg:justify-end mt-8 lg:mt-0">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-orange-400/20 rounded-[2.5rem] blur-2xl transform group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div class="absolute inset-0 bg-gradient-to-bl from-white/40 to-transparent rounded-3xl opacity-50"></div>
          <img src="/assets/images/registry.png" alt="Реестр специалистов НРС" class="relative z-10 w-full max-w-sm lg:max-w-[420px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="nrs-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8">
          <lucide-icon name="landmark" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Назначение реестра</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          НРС обеспечивает учёт и контроль специалистов, допущенных к организации
          строительства, проектирования и инженерных изысканий. Включение в реестр
          является обязательным условием для назначения на должности ГИП и ГАП.
        </p>
      </div>

      <div class="nrs-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
          <lucide-icon name="building-2" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Кто ведёт реестр</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          НРС ведётся двумя национальными объединениями: НОСТРОЙ (Национальное
          объединение строителей) --- для строительной отрасли, и НОПРИЗ (Национальное
          объединение изыскателей и проектировщиков) --- для проектирования и изысканий.
        </p>
      </div>

      <div class="nrs-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
          <lucide-icon name="scale" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Правовая основа</h3>
        <p class="text-lg text-slate-600 leading-relaxed">
          Ведение НРС регламентировано Градостроительным кодексом РФ (ст. 55.5-1).
          Требования к включению в реестр установлены для обеспечения безопасности
          и качества на объектах капитального строительства.
        </p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- HOW TO GET INCLUDED -- bg-slate-50           -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="how-to-get-included">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="list-checks" [size]="16" [strokeWidth]="2"></lucide-icon>
        Порядок включения
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Как попасть в НРС
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Включение в Национальный реестр специалистов требует соблюдения ряда условий
        и прохождения определённой процедуры.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-16">
      <!-- Requirements -->
      <div>
        <h3 class="text-2xl font-bold text-slate-900 mb-8">Требования к кандидату</h3>
        <div class="space-y-6">
          <div *ngFor="let req of requirements" class="requirement-card flex gap-5">
            <div class="w-12 h-12 flex-shrink-0 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <lucide-icon [name]="req.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
            </div>
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-1">{{ req.title }}</h4>
              <p class="text-base text-slate-600 leading-relaxed">{{ req.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Process steps -->
      <div>
        <h3 class="text-2xl font-bold text-slate-900 mb-8">Процедура включения</h3>
        <div class="space-y-8">
          <div *ngFor="let step of inclusionSteps; let last = last" class="inclusion-step group">
            <div class="flex items-start gap-5">
              <div class="flex flex-col items-center">
                <div class="step-number w-14 h-14 rounded-2xl text-white flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300"
                     [class.bg-amber-600]="!last"
                     [class.bg-emerald-600]="last">
                  <ng-container *ngIf="!last">{{ step.step }}</ng-container>
                  <lucide-icon *ngIf="last" name="check" [size]="26" [strokeWidth]="2.5"></lucide-icon>
                </div>
                <div *ngIf="!last" class="w-px h-8 bg-gradient-to-b from-amber-200 to-transparent mt-2"></div>
              </div>
              <div class="pt-1">
                <h4 class="text-lg font-bold text-slate-900 mb-1" [class.text-emerald-600]="last">{{ step.title }}</h4>
                <p class="text-base text-slate-600 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- NOSTROY VS NOPRIZ -- bg-white                -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-white" id="nostroy-vs-nopriz">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="layers" [size]="16" [strokeWidth]="2"></lucide-icon>
        Сравнение
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        НРС НОСТРОЙ и НРС НОПРИЗ
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Два реестра --- для разных категорий специалистов. Понимание различий поможет
        определить, в какой именно реестр необходимо включение.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="comparison-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl hover:ring-blue-200 transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
          <lucide-icon name="building-2" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-4">НРС НОСТРОЙ</h3>
        <p class="text-lg text-slate-600 leading-relaxed mb-6">
          Реестр для специалистов в области строительства. Включение обязательно
          для лиц, ответственных за организацию строительного производства.
        </p>
        <ul class="space-y-3">
          <li *ngFor="let item of nostroyFeatures" class="flex items-start gap-3">
            <div class="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <lucide-icon name="check" [size]="12" [strokeWidth]="3"></lucide-icon>
            </div>
            <span class="text-base text-slate-700">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="comparison-card bg-white rounded-2xl p-10 lg:p-12 ring-1 ring-slate-200 hover:shadow-xl hover:ring-emerald-200 transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
          <lucide-icon name="pen-tool" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-4">НРС НОПРИЗ</h3>
        <p class="text-lg text-slate-600 leading-relaxed mb-6">
          Реестр для специалистов в области проектирования и инженерных изысканий.
          Обязателен для главных архитекторов проекта (ГАП) и главных инженеров проекта (ГИП).
        </p>
        <ul class="space-y-3">
          <li *ngFor="let item of noprizFeatures" class="flex items-start gap-3">
            <div class="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <lucide-icon name="check" [size]="12" [strokeWidth]="3"></lucide-icon>
            </div>
            <span class="text-base text-slate-700">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- REQUIRED DOCUMENTS -- bg-slate-50            -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="documents">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="file-text" [size]="16" [strokeWidth]="2"></lucide-icon>
        Документы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Необходимые документы для включения в НРС
      </h2>
      <p class="section-subtitle text-lg lg:text-xl text-slate-500 leading-relaxed">
        Полный перечень документов, которые потребуются для подачи заявления
        на включение в Национальный реестр специалистов.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div *ngFor="let doc of requiredDocuments" class="document-card bg-white rounded-2xl p-10 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
             [ngClass]="{
               'bg-amber-50 text-amber-600': doc.color === 'amber',
               'bg-blue-50 text-blue-600': doc.color === 'blue',
               'bg-emerald-50 text-emerald-600': doc.color === 'emerald',
               'bg-violet-50 text-violet-600': doc.color === 'violet',
               'bg-cyan-50 text-cyan-600': doc.color === 'cyan',
               'bg-red-50 text-red-600': doc.color === 'red'
             }">
          <lucide-icon [name]="doc.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ doc.title }}</h3>
        <p class="text-lg text-slate-600 leading-relaxed">{{ doc.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- ============================================ -->
<!-- BENEFITS -- bg-slate-950 dark                -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-950 overflow-hidden" id="benefits">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="sparkles" [size]="16" [strokeWidth]="2"></lucide-icon>
        Преимущества
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Зачем включаться в НРС
      </h2>
      <p class="section-subtitle text-xl text-slate-400 leading-relaxed">
        Включение в Национальный реестр специалистов --- это не просто формальность,
        а необходимое условие для профессиональной деятельности.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let benefit of benefits"
        class="benefit-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-500 hover:border-amber-500/20">
        <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
          <lucide-icon [name]="benefit.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">{{ benefit.title }}</h3>
        <p class="text-base text-slate-400 leading-relaxed">{{ benefit.description }}</p>
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
      <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="circle-help" [size]="16" [strokeWidth]="2"></lucide-icon>
        Вопросы и ответы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
        Часто задаваемые вопросы о НРС
      </h2>
    </div>

    <div class="max-w-3xl">
      <div class="space-y-4">
        <div
          *ngFor="let item of faqItems; let i = index"
          class="faq-item bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden transition-all duration-300"
          [class.ring-amber-200]="expandedFaq === i">
          <button
            (click)="toggleFaq(i)"
            class="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer">
            <h3 class="text-lg font-semibold text-slate-900">{{ item.question }}</h3>
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center transition-transform duration-300"
                 [class.rotate-180]="expandedFaq === i"
                 [class.bg-amber-100]="expandedFaq === i">
              <lucide-icon name="chevron-down" [size]="18" [strokeWidth]="2"
                           [class.text-amber-600]="expandedFaq === i"
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
<!-- RELATED ARTICLES -- bg-slate-50              -->
<!-- ============================================ -->
<section class="py-24 lg:py-32 bg-slate-50" id="related">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-20">
      <div class="section-label inline-flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="book-open" [size]="16" [strokeWidth]="2"></lucide-icon>
        Полезные материалы
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
        Связанные статьи
      </h2>
      <p class="text-lg lg:text-xl text-slate-500 leading-relaxed">
        Узнайте больше о системе НОК, процедуре прохождения и подготовке к экзамену.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        *ngFor="let article of relatedArticles"
        [routerLink]="article.link"
        class="related-card group bg-white rounded-2xl p-8 ring-1 ring-slate-200 hover:shadow-xl transition-all duration-500 hover:ring-amber-200">
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
        <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{{ article.title }}</h3>
        <p class="text-base text-slate-500 leading-relaxed mb-4">{{ article.description }}</p>
        <div class="flex items-center gap-1 text-sm font-semibold text-amber-600">
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
    <div class="cta-gradient-card relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div class="relative z-10 text-center max-w-3xl mx-auto">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Поможем с включением в НРС
        </h2>
        <p class="text-xl text-amber-100/80 leading-relaxed mb-10">
          Подготовим документы, организуем прохождение НОК и сопроводим на всех этапах
          включения в Национальный реестр специалистов.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openConsultationPopup()"
            class="inline-flex items-center justify-center gap-2.5 bg-white text-amber-700 px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Получить консультацию
          </button>
          <a [href]="'tel:' + phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-10 py-5 text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
        <p class="text-sm text-amber-200/60 mt-6">Ответим в течение 15 минут в рабочее время</p>
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
export class SpecialistsRegistryPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  requirements = [
    {
      icon: 'graduation-cap',
      title: 'Высшее образование',
      description: 'Профильное высшее образование в области строительства, проектирования или инженерных изысканий.'
    },
    {
      icon: 'briefcase',
      title: 'Стаж работы',
      description: 'Не менее 3 лет стажа на инженерных должностях и не менее 10 лет общего стажа (или 5 лет при наличии свидетельства НОК).'
    },
    {
      icon: 'badge-check',
      title: 'Свидетельство НОК',
      description: 'Действующее свидетельство о прохождении независимой оценки квалификации по соответствующему профстандарту.'
    },
    {
      icon: 'shield-check',
      title: 'Отсутствие судимости',
      description: 'Отсутствие непогашенной или неснятой судимости за совершение умышленного преступления.'
    }
  ];

  inclusionSteps = [
    {
      step: '01',
      title: 'Подготовка документов',
      description: 'Соберите полный пакет документов: диплом, трудовая книжка, свидетельство НОК, заявление.'
    },
    {
      step: '02',
      title: 'Подача заявления',
      description: 'Подайте заявление через СРО, членом которой является ваша организация, или напрямую в НОСТРОЙ/НОПРИЗ.'
    },
    {
      step: '03',
      title: 'Проверка документов',
      description: 'Национальное объединение проверяет комплектность и достоверность представленных сведений.'
    },
    {
      step: '04',
      title: 'Включение в реестр',
      description: 'При соответствии всем требованиям специалист включается в НРС. Данные становятся публичными.'
    }
  ];

  nostroyFeatures = [
    'Специалисты по организации строительства',
    'Главные инженеры строительных проектов (ГИП)',
    'Ответственные за строительный контроль',
    'Требуется профстандарт "Организатор строительного производства"',
    'Стаж работы: минимум 3 года на инженерных должностях',
    'Свидетельство НОК НОСТРОЙ обязательно'
  ];

  noprizFeatures = [
    'Специалисты по организации проектирования',
    'Главные архитекторы проекта (ГАП)',
    'Специалисты по инженерным изысканиям',
    'Требуется профстандарт в области проектирования/изысканий',
    'Стаж работы: минимум 3 года на инженерных должностях',
    'Свидетельство НОК НОПРИЗ обязательно'
  ];

  requiredDocuments = [
    {
      icon: 'graduation-cap',
      title: 'Диплом об образовании',
      description: 'Копия диплома о высшем профессиональном образовании по профильной специальности. Для иностранных дипломов --- нотариальный перевод.',
      color: 'amber'
    },
    {
      icon: 'briefcase',
      title: 'Трудовая книжка',
      description: 'Заверенная копия трудовой книжки или иные документы, подтверждающие стаж работы на инженерных должностях.',
      color: 'blue'
    },
    {
      icon: 'badge-check',
      title: 'Свидетельство НОК',
      description: 'Действующее свидетельство о квалификации, выданное аккредитованным центром оценки квалификаций (ЦОК).',
      color: 'emerald'
    },
    {
      icon: 'file-text',
      title: 'Заявление',
      description: 'Заявление установленного образца на включение в НРС. Подаётся через СРО или напрямую в национальное объединение.',
      color: 'violet'
    },
    {
      icon: 'user-check',
      title: 'Удостоверение личности',
      description: 'Копия паспорта гражданина РФ. Для иностранных граждан --- документы, подтверждающие право на работу в России.',
      color: 'cyan'
    },
    {
      icon: 'file-check',
      title: 'Повышение квалификации',
      description: 'Документы о повышении квалификации за последние 5 лет. Минимум 72 часа по профильным программам.',
      color: 'red'
    }
  ];

  benefits = [
    {
      icon: 'target',
      title: 'Доступ к руководящим должностям',
      description: 'Без включения в НРС невозможно занимать должности ГИП, ГАП и руководителя проекта в организациях --- членах СРО.'
    },
    {
      icon: 'shield',
      title: 'Соответствие требованиям закона',
      description: 'Градостроительный кодекс обязывает организации иметь специалистов из НРС для получения и сохранения допусков СРО.'
    },
    {
      icon: 'trending-up',
      title: 'Карьерный рост',
      description: 'Включение в НРС повышает профессиональный статус и открывает новые возможности для развития карьеры.'
    },
    {
      icon: 'building-2',
      title: 'Участие в госзаказах',
      description: 'Организации обязаны привлекать специалистов из НРС при выполнении работ по государственным контрактам.'
    },
    {
      icon: 'eye',
      title: 'Публичная верификация',
      description: 'Данные из НРС доступны для проверки заказчиками, что повышает доверие к специалисту и его организации.'
    },
    {
      icon: 'award',
      title: 'Конкурентное преимущество',
      description: 'Наличие в НРС выделяет специалиста на рынке труда и подтверждает высокий уровень квалификации.'
    }
  ];

  expandedFaq: number | null = null;

  faqItems = [
    {
      question: 'Обязательно ли включение в НРС?',
      answer: 'Да, для лиц, осуществляющих организацию строительства, проектирования или инженерных изысканий (ГИП, ГАП, руководители проектов). Это требование Градостроительного кодекса РФ. Организация --- член СРО обязана иметь в штате минимум двух специалистов из НРС.'
    },
    {
      question: 'Какова связь между НОК и НРС?',
      answer: 'НОК (независимая оценка квалификации) --- это процедура подтверждения квалификации. НРС --- это реестр, куда включаются специалисты. Свидетельство НОК является одним из обязательных документов для включения в НРС. Без прохождения НОК попасть в реестр невозможно.'
    },
    {
      question: 'Сколько стоит включение в НРС?',
      answer: 'Включение в НРС бесплатное. Однако потребуются затраты на прохождение НОК (стоимость экзамена в ЦОК), а также возможно повышение квалификации. Общие расходы зависят от выбранной квалификации и ЦОК.'
    },
    {
      question: 'Можно ли быть одновременно в НРС НОСТРОЙ и НОПРИЗ?',
      answer: 'Да, специалист может быть включён одновременно в оба реестра, если соответствует требованиям каждого из них. Для этого необходимо пройти НОК по соответствующим профессиональным стандартам и подать документы в каждое национальное объединение.'
    },
    {
      question: 'Что будет, если специалиста исключат из НРС?',
      answer: 'Исключение из НРС означает, что специалист не может занимать должности ГИП/ГАП и участвовать в организации строительства/проектирования. Организация, не имеющая в штате достаточного количества специалистов из НРС, может быть исключена из СРО.'
    },
    {
      question: 'Как долго действует включение в НРС?',
      answer: 'Включение в НРС действует бессрочно, однако привязано к действию свидетельства НОК. При истечении срока свидетельства НОК (от 3 до 5 лет в зависимости от квалификации) необходимо пройти процедуру повторной оценки квалификации и обновить данные в реестре.'
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
      title: 'Процедура НОК',
      description: 'Пошаговое описание процесса прохождения независимой оценки квалификации',
      icon: 'list-checks',
      link: '/info/nok-procedure',
      color: 'emerald'
    },
    {
      title: 'НОК НОСТРОЙ',
      description: 'Особенности оценки квалификации для специалистов строительной отрасли',
      icon: 'building-2',
      link: '/info/nok-nostroy',
      color: 'cyan'
    },
    {
      title: 'Кому нужна НОК',
      description: 'Подробный разбор: какие специалисты обязаны проходить оценку квалификации',
      icon: 'users',
      link: '/info/who-must-pass-nok',
      color: 'violet'
    },
    {
      title: 'Подготовка к экзамену',
      description: 'Советы и рекомендации по подготовке к профессиональному экзамену НОК',
      icon: 'graduation-cap',
      link: '/info/exam-preparation',
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

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  ngOnInit(): void {
    this.seoService.setSpecialistsRegistryPageSeo();

    this.seoService.addBreadcrumbsStructuredData([
      { name: 'Главная', url: this.seoService.getBaseUrl() },
      { name: 'Информация о НОК', url: `${this.seoService.getBaseUrl()}/info` },
      { name: 'Реестр специалистов НРС', url: `${this.seoService.getBaseUrl()}/info/specialists-registry` }
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

    // WHAT IS NRS
    const nrsTl = await this.animationService.sectionTimeline('#what-is-nrs');
    if (nrsTl) {
      nrsTl.fromTo('#what-is-nrs .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      nrsTl.fromTo('#what-is-nrs h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      nrsTl.fromTo('#what-is-nrs .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      nrsTl.fromTo('.nrs-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // HOW TO GET INCLUDED
    const howTl = await this.animationService.sectionTimeline('#how-to-get-included');
    if (howTl) {
      howTl.fromTo('#how-to-get-included .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      howTl.fromTo('#how-to-get-included h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      howTl.fromTo('#how-to-get-included .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      howTl.fromTo('.requirement-card',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.35);
      howTl.fromTo('.inclusion-step',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, 0.4);
    }

    // NOSTROY VS NOPRIZ
    const compTl = await this.animationService.sectionTimeline('#nostroy-vs-nopriz');
    if (compTl) {
      compTl.fromTo('#nostroy-vs-nopriz .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      compTl.fromTo('#nostroy-vs-nopriz h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      compTl.fromTo('#nostroy-vs-nopriz .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      compTl.fromTo('.comparison-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
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
      docsTl.fromTo('#documents .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      docsTl.fromTo('.document-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // BENEFITS (dark section)
    const benefitsSection = document.querySelector('#benefits');
    if (benefitsSection) {
      const benefitsTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: benefitsSection, start: 'top 92%', once: true }
      });
      benefitsTl.fromTo('#benefits .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      benefitsTl.fromTo('#benefits h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      benefitsTl.fromTo('#benefits .section-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.2);
      benefitsTl.fromTo('.benefit-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.3);
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
