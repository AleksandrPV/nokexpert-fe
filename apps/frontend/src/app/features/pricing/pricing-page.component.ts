import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../shared/components/icon/icon.component';
import { SeoService } from '../../shared/services/seo.service';
import { FeedbackPopupService } from '../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../shared/services/organization.service';
import { AnimationService } from '../../shared/services/animation.service';
import { PRICING } from '../../shared/config/pricing.config';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  template: `
<app-breadcrumbs [breadcrumbs]="[
  { label: 'Главная', url: '/' },
  { label: 'Стоимость услуг', active: true }
]"></app-breadcrumbs>

<main>

<!-- HERO -->
<section class="relative min-h-[45vh] flex items-center overflow-hidden bg-slate-950" id="pricing-hero">
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-emerald-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
  </div>
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[75%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
    <div class="max-w-4xl">
      <div class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-8">
        <lucide-icon name="tag" [size]="14" [strokeWidth]="2"></lucide-icon>
        <span>Прозрачные цены без скрытых платежей</span>
      </div>
      <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
        Стоимость подготовки к НОК
      </h1>
      <p class="hero-subtitle text-xl text-slate-400 leading-relaxed max-w-2xl">
        Фиксированная цена за всё сопровождение. Никаких доплат в процессе. Если не сдадите — доработаем бесплатно.
      </p>
    </div>
  </div>
</section>


<!-- PRICING CARDS -->
<section class="py-20 lg:py-28 bg-white" id="pricing-cards">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

    <div class="max-w-3xl mb-16">
      <div class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="layers" [size]="16" [strokeWidth]="2"></lucide-icon>
        Наши услуги
      </div>
      <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-4">
        Выберите своё направление
      </h2>
      <p class="text-lg text-slate-500">
        Стоимость включает полное сопровождение: документы, запись в ЦОК, подготовку и поддержку до получения свидетельства.
      </p>
    </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      <!-- НОК НОСТРОЙ -->
      <div class="pricing-card relative bg-white rounded-3xl border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
            <lucide-icon name="building-2" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">НОК НОСТРОЙ</h3>
          <p class="text-sm text-slate-500 mb-6">Строительство, капитальный ремонт</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ prices['nok-nostroy'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за сопровождение</span>
          </div>
          <div class="space-y-2 mb-8">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
              Срок: {{ prices['nok-nostroy'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="receipt" [size]="14" [strokeWidth]="2" class="text-slate-400 shrink-0"></lucide-icon>
              Госпошлина: {{ prices['nok-nostroy'].gosposhlina }}
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of commonFeatures" class="flex items-start gap-2 text-sm text-slate-600">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <a routerLink="/services/nok-nostroy"
             class="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Подробнее
          </a>
        </div>
      </div>

      <!-- НОК НОПРИЗ -->
      <div class="pricing-card relative bg-white rounded-3xl border border-slate-200 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-50 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
            <lucide-icon name="search" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">НОК НОПРИЗ</h3>
          <p class="text-sm text-slate-500 mb-6">Проектирование, инженерные изыскания</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ prices['nok-nopriz'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за сопровождение</span>
          </div>
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-cyan-500 shrink-0"></lucide-icon>
              Срок: {{ prices['nok-nopriz'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="receipt" [size]="14" [strokeWidth]="2" class="text-slate-400 shrink-0"></lucide-icon>
              Госпошлина: {{ prices['nok-nopriz'].gosposhlina }}
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of commonFeatures" class="flex items-start gap-2 text-sm text-slate-600">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <a routerLink="/services/nok-nopriz"
             class="block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Подробнее
          </a>
        </div>
      </div>

      <!-- НОК МЧС (ОПБ) — Popular -->
      <div class="pricing-card relative bg-white rounded-3xl border-2 border-orange-400 hover:shadow-2xl hover:shadow-orange-50 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
        <div class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Популярно
        </div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
            <lucide-icon name="flame" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">НОК МЧС</h3>
          <p class="text-sm text-slate-500 mb-6">Пожарная безопасность, ОПБ</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ prices['nok-opb'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за сопровождение</span>
          </div>
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-orange-500 shrink-0"></lucide-icon>
              Срок: {{ prices['nok-opb'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="receipt" [size]="14" [strokeWidth]="2" class="text-slate-400 shrink-0"></lucide-icon>
              Госпошлина: {{ prices['nok-opb'].gosposhlina }}
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of commonFeatures" class="flex items-start gap-2 text-sm text-slate-600">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <a routerLink="/services/nok-opb"
             class="block w-full text-center bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Подробнее
          </a>
        </div>
      </div>

      <!-- НОК ЖКХ -->
      <div class="pricing-card relative bg-white rounded-3xl border border-slate-200 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-50 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
            <lucide-icon name="house" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">НОК ЖКХ</h3>
          <p class="text-sm text-slate-500 mb-6">Жилищно-коммунальное хозяйство</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ prices['nok-housing'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за сопровождение</span>
          </div>
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-teal-500 shrink-0"></lucide-icon>
              Срок: {{ prices['nok-housing'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="receipt" [size]="14" [strokeWidth]="2" class="text-slate-400 shrink-0"></lucide-icon>
              Госпошлина: {{ prices['nok-housing'].gosposhlina }}
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of commonFeatures" class="flex items-start gap-2 text-sm text-slate-600">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <a routerLink="/services/nok-housing"
             class="block w-full text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Подробнее
          </a>
        </div>
      </div>

      <!-- Тренажёр -->
      <div class="pricing-card relative bg-white rounded-3xl border border-slate-200 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-50 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors">
            <lucide-icon name="dumbbell" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">Тренажёр НОК</h3>
          <p class="text-sm text-slate-500 mb-6">Онлайн-подготовка к экзамену</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ prices['trainer'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за 30 дней доступа</span>
          </div>
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-violet-500 shrink-0"></lucide-icon>
              Доступ: {{ prices['trainer'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <lucide-icon name="book-open" [size]="14" [strokeWidth]="2" class="text-slate-400 shrink-0"></lucide-icon>
              1 000+ вопросов всех направлений
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of trainerFeatures" class="flex items-start gap-2 text-sm text-slate-600">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <a routerLink="/services/trainer"
             class="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Подробнее
          </a>
        </div>
      </div>

      <!-- Гарантированная сдача -->
      <div class="pricing-card relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-500 overflow-hidden group">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500"></div>
        <div class="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Гарантия
        </div>
        <div class="p-8">
          <div class="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
            <lucide-icon name="shield-check" [size]="28" [strokeWidth]="1.5"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-white mb-1">Подготовка под ключ</h3>
          <p class="text-sm text-slate-400 mb-6">С гарантией сдачи с первого раза</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-white">{{ prices['nok-guaranteed'].price }}</span>
            <span class="text-slate-400 text-sm ml-2">за сопровождение</span>
          </div>
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-slate-300">
              <lucide-icon name="clock" [size]="14" [strokeWidth]="2" class="text-amber-400 shrink-0"></lucide-icon>
              Срок: {{ prices['nok-guaranteed'].duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-300">
              <lucide-icon name="repeat" [size]="14" [strokeWidth]="2" class="text-amber-400 shrink-0"></lucide-icon>
              Бесплатная пересдача включена
            </div>
          </div>
          <ul class="space-y-2 mb-8">
            <li *ngFor="let f of guaranteedFeatures" class="flex items-start gap-2 text-sm text-slate-300">
              <lucide-icon name="check" [size]="14" [strokeWidth]="3" class="text-amber-400 shrink-0 mt-0.5"></lucide-icon>
              {{ f }}
            </li>
          </ul>
          <button (click)="openConsultationPopup()"
             class="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors">
            Получить консультацию
          </button>
        </div>
      </div>

    </div>
  </div>
</section>


<!-- WHAT'S INCLUDED -->
<section class="py-20 lg:py-28 bg-slate-50" id="pricing-included">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mb-16">
      <div class="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="list-checks" [size]="16" [strokeWidth]="2"></lucide-icon>
        Что входит в стоимость
      </div>
      <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-4">
        Всё включено
      </h2>
      <p class="text-lg text-slate-500">
        Цена включает полное сопровождение — от первого звонка до получения свидетельства НОК.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let item of includedItems" class="included-card bg-white rounded-2xl p-6 border border-slate-200">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <lucide-icon [name]="item.icon" [size]="24" [strokeWidth]="1.5"></lucide-icon>
        </div>
        <h3 class="font-bold text-slate-900 mb-2">{{ item.title }}</h3>
        <p class="text-sm text-slate-500 leading-relaxed">{{ item.description }}</p>
      </div>
    </div>
  </div>
</section>


<!-- FAQ -->
<section class="py-20 lg:py-28 bg-white" id="pricing-faq">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
        <lucide-icon name="help-circle" [size]="16" [strokeWidth]="2"></lucide-icon>
        Вопросы о цене
      </div>
      <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-12">
        Часто спрашивают
      </h2>

      <div class="space-y-3">
        <div *ngFor="let item of faqItems; let i = index"
             class="faq-item border border-slate-200 rounded-2xl overflow-hidden">
          <button (click)="toggleFaq(i)"
                  class="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors">
            <span class="font-semibold text-slate-900 text-base">{{ item.question }}</span>
            <lucide-icon [name]="expandedFaq === i ? 'minus' : 'plus'" [size]="18" [strokeWidth]="2"
                         class="text-slate-400 shrink-0 ml-4"></lucide-icon>
          </button>
          <div *ngIf="expandedFaq === i" class="px-6 pb-6">
            <p class="text-slate-600 leading-relaxed text-sm">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- CTA -->
<section class="py-20 lg:py-28 bg-white">
  <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 lg:p-20 overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Получите точный расчёт стоимости
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed mb-10">
          Цена зависит от вашего направления и квалификационного уровня. Оставьте заявку — рассчитаем точно за 15 минут.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button (click)="openConsultationPopup()"
             class="inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5">
            <lucide-icon name="message-circle" [size]="22" [strokeWidth]="2"></lucide-icon>
            Рассчитать стоимость
          </button>
          <a [href]="'tel:' + phoneHref"
             class="inline-flex items-center justify-center gap-2.5 text-white px-8 py-4 text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
            <lucide-icon name="phone" [size]="20" [strokeWidth]="2"></lucide-icon>
            {{ phoneDisplay }}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

</main>
  `,
  styles: [':host { display: block; }']
})
export class PricingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  readonly prices = PRICING;

  expandedFaq: number | null = null;

  readonly commonFeatures = [
    'Проверка документов и стажа',
    'Запись в аккредитованный ЦОК',
    'Доступ к тренажёру НОК',
    'Сопровождение до получения свидетельства',
  ];

  readonly trainerFeatures = [
    'Реальные вопросы экзамена',
    'Режим пробного экзамена',
    'Детальная аналитика по темам',
    'Доступ с любого устройства 24/7',
  ];

  readonly guaranteedFeatures = [
    'Всё из стандартного сопровождения',
    'Персональный эксперт-куратор',
    'Разбор сложных вопросов',
    'Пересдача бесплатно при неудаче',
  ];

  readonly includedItems = [
    { icon: 'file-check', title: 'Проверка документов', description: 'Аудит диплома, трудовой книжки и стажа на соответствие требованиям профессиональных стандартов.' },
    { icon: 'compass', title: 'Подбор ЦОК', description: 'Подберём аккредитованный центр с удобным расположением и ближайшими датами экзамена.' },
    { icon: 'calendar-check', title: 'Запись на экзамен', description: 'Полностью берём на себя организацию записи и подачу заявки в центр оценки квалификации.' },
    { icon: 'book-open', title: 'Тренажёр НОК', description: 'Доступ к онлайн-тренажёру с реальными вопросами экзамена на 30 дней.' },
    { icon: 'headphones', title: 'Поддержка эксперта', description: 'Отвечаем на вопросы и помогаем разобраться в нюансах на каждом этапе подготовки.' },
    { icon: 'award', title: 'Результат гарантирован', description: 'Если не сдали с первого раза — помогаем подготовиться к пересдаче без дополнительной оплаты.' },
  ];

  readonly faqItems = [
    {
      question: 'Включена ли госпошлина в стоимость?',
      answer: 'Нет, госпошлина оплачивается отдельно в кассу ЦОК. Её размер зависит от направления и квалификационного уровня — от 4 900 до 28 000 ₽. Мы всегда указываем точный размер заранее.'
    },
    {
      question: 'Когда нужно оплатить?',
      answer: 'Оплата производится поэтапно: аванс после подписания договора, остаток — после успешной записи в ЦОК. Мы не берём деньги вперёд за весь объём работ.'
    },
    {
      question: 'Что если я не сдам экзамен?',
      answer: 'В стандартном пакете мы помогаем разобрать ошибки и готовим к пересдаче на льготных условиях. В пакете "Под ключ" пересдача включена в стоимость и оплачивается нами.'
    },
    {
      question: 'Можно ли оплатить в рассрочку?',
      answer: 'Да, мы готовы обсудить индивидуальные условия оплаты. Свяжитесь с нами, и мы найдём удобный для вас вариант.'
    },
    {
      question: 'Есть ли скидки?',
      answer: 'Да, при заказе услуг для двух и более сотрудников одной организации предоставляется корпоративная скидка. Также действуют специальные условия для клиентов, которые уже пользовались нашим тренажёром.'
    },
  ];

  get phoneDisplay(): string { return this.organizationService.getPhoneDisplay(); }
  get phoneHref(): string { return this.organizationService.getPhoneHref(); }

  toggleFaq(index: number): void {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Стоимость подготовки к НОК — цены на услуги | НОК Эксперт',
      description: 'Прозрачные цены на подготовку к НОК: НОСТРОЙ от 35 000 ₽, НОПРИЗ от 40 000 ₽, МЧС от 13 900 ₽, ЖКХ от 26 000 ₽. Тренажёр 10 000 ₽. Без скрытых платежей.',
      keywords: 'стоимость НОК, цена НОК, сколько стоит НОК, подготовка к НОК цена, НОК НОСТРОЙ стоимость',
      canonical: `${this.seoService.getBaseUrl()}/pricing`,
      ogTitle: 'Стоимость подготовки к НОК — прозрачные цены',
      ogDescription: 'НОК НОСТРОЙ от 35 000 ₽, МЧС от 13 900 ₽. Полное сопровождение, тренажёр, гарантия результата.',
      ogUrl: `${this.seoService.getBaseUrl()}/pricing`,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Главная', 'item': this.seoService.getBaseUrl() },
            { '@type': 'ListItem', 'position': 2, 'name': 'Стоимость услуг', 'item': `${this.seoService.getBaseUrl()}/pricing` }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'name': 'Стоимость подготовки к НОК',
          'description': 'Цены на полное сопровождение при подготовке к независимой оценке квалификации',
          'url': `${this.seoService.getBaseUrl()}/pricing`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'item': {
                '@type': 'Service',
                'name': 'Подготовка к НОК НОСТРОЙ',
                'description': 'Полное сопровождение при подготовке к независимой оценке квалификации в строительстве и капитальном ремонте',
                'url': `${this.seoService.getBaseUrl()}/services/nok-nostroy`,
                'provider': { '@type': 'Organization', 'name': 'НОК Эксперт', 'url': this.seoService.getBaseUrl() },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': 'RUB',
                  'price': '35000',
                  'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'price': '35000',
                    'priceCurrency': 'RUB',
                    'minPrice': '35000',
                    'description': 'Полное сопровождение, без скрытых платежей'
                  },
                  'availability': 'https://schema.org/InStock'
                }
              }
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item': {
                '@type': 'Service',
                'name': 'Подготовка к НОК НОПРИЗ',
                'description': 'Полное сопровождение при подготовке к независимой оценке квалификации в проектировании',
                'url': `${this.seoService.getBaseUrl()}/services/nok-nopriz`,
                'provider': { '@type': 'Organization', 'name': 'НОК Эксперт', 'url': this.seoService.getBaseUrl() },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': 'RUB',
                  'price': '40000',
                  'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'price': '40000',
                    'priceCurrency': 'RUB',
                    'minPrice': '40000',
                    'description': 'Полное сопровождение, без скрытых платежей'
                  },
                  'availability': 'https://schema.org/InStock'
                }
              }
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'item': {
                '@type': 'Service',
                'name': 'Подготовка к НОК МЧС (ОПБ)',
                'description': 'Полное сопровождение при подготовке к независимой оценке квалификации в области пожарной безопасности',
                'url': `${this.seoService.getBaseUrl()}/services/nok-opb`,
                'provider': { '@type': 'Organization', 'name': 'НОК Эксперт', 'url': this.seoService.getBaseUrl() },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': 'RUB',
                  'price': '13900',
                  'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'price': '13900',
                    'priceCurrency': 'RUB',
                    'minPrice': '13900',
                    'description': 'Полное сопровождение, без скрытых платежей'
                  },
                  'availability': 'https://schema.org/InStock'
                }
              }
            },
            {
              '@type': 'ListItem',
              'position': 4,
              'item': {
                '@type': 'Service',
                'name': 'Подготовка к НОК ЖКХ',
                'description': 'Полное сопровождение при подготовке к независимой оценке квалификации в сфере ЖКХ',
                'url': `${this.seoService.getBaseUrl()}/services/nok-housing`,
                'provider': { '@type': 'Organization', 'name': 'НОК Эксперт', 'url': this.seoService.getBaseUrl() },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': 'RUB',
                  'price': '26000',
                  'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'price': '26000',
                    'priceCurrency': 'RUB',
                    'minPrice': '26000',
                    'description': 'Полное сопровождение, без скрытых платежей'
                  },
                  'availability': 'https://schema.org/InStock'
                }
              }
            }
          ]
        }
      ]
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initAnimations();
  }

  private async initAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    gsap.to('.hero-orb', {
      y: 'random(-30, 30)', x: 'random(-20, 20)',
      duration: 'random(4, 7)', repeat: -1, yoyo: true,
      ease: 'sine.inOut', stagger: { amount: 2, from: 'random' }
    });
    gsap.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' }
    );

    const lib = await this.animationService.init();
    if (!lib) return;

    const cardsTl = await this.animationService.sectionTimeline('#pricing-cards');
    if (cardsTl) {
      cardsTl.fromTo('.pricing-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.2);
    }

    const includedTl = await this.animationService.sectionTimeline('#pricing-included');
    if (includedTl) {
      includedTl.fromTo('.included-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.2);
    }

    const faqTl = await this.animationService.sectionTimeline('#pricing-faq');
    if (faqTl) {
      faqTl.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 0.2);
    }
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
