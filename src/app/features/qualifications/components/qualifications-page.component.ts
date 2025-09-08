import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-qualifications-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <!-- Breadcrumbs -->
      <app-breadcrumbs
        [breadcrumbs]="[
          { label: 'Главная', url: '/', active: false },
          { label: 'Квалификации', url: '/qualifications', active: true }
        ]">
      </app-breadcrumbs>

      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy mb-6">
              Профессиональные квалификации
            </h1>
            <p class="text-xl sm:text-2xl text-brand-dark/80 mb-8 leading-relaxed">
              Полная информация о квалификационных уровнях, требованиях и процедуре подтверждения квалификации
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                (click)="scrollToSection('levels')"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-sky consulting-accent">
                📊 Уровни квалификации
              </button>
              <button
                (click)="scrollToSection('requirements')"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-coral">
                📋 Требования
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-16">
        <div class="container mx-auto px-4">

          <!-- About Section -->
          <div class="max-w-6xl mx-auto mb-16">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <h2 class="text-3xl font-bold text-brand-navy mb-6">
                  Что такое профессиональная квалификация?
                </h2>
                <p class="text-lg text-brand-dark/80 leading-relaxed">
                  Профессиональная квалификация - это подтвержденный уровень компетенций, знаний и навыков специалиста
                  в определенной профессиональной области. Квалификация присваивается на основании результатов независимой
                  оценки квалификации (НОК) и заносится в Национальный реестр специалистов (НРС).
                </p>
                <div class="grid grid-cols-2 gap-6">
                  <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                    <div class="text-3xl font-bold text-brand-coral mb-2">7</div>
                    <div class="text-sm text-brand-dark/60">Уровней квалификации</div>
                  </div>
                  <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                    <div class="text-3xl font-bold text-brand-navy mb-2">25+</div>
                    <div class="text-sm text-brand-dark/60">Профессий</div>
                  </div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-brand-sky/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-6 text-center">
                  Преимущества подтверждения квалификации
                </h3>
                <div class="space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-coral font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Официальное признание</div>
                      <div class="text-sm text-brand-dark/70">Подтверждение компетенций государственным стандартом</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-sky/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-sky font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Конкурентное преимущество</div>
                      <div class="text-sm text-brand-dark/70">Выделение среди других специалистов на рынке труда</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-coral font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Повышение зарплаты</div>
                      <div class="text-sm text-brand-dark/70">Специалисты с подтвержденной квалификацией получают на 15-30% выше</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-sky/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-sky font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Вхождение в НРС</div>
                      <div class="text-sm text-brand-dark/70">Запись в Национальный реестр специалистов</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Qualification Levels Section -->
          <div id="levels" class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Уровни профессиональной квалификации
            </h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-navy">1</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 1</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Базовый уровень - выполнение простых задач под руководством</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 0-1 год</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-coral">2</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 2</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Стартовый уровень - самостоятельное выполнение стандартных задач</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 1-2 года</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-navy">3</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 3</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Средний уровень - планирование и организация работы</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 2-4 года</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-coral">4</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 4</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Продвинутый уровень - управление процессами и командами</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 3-6 лет</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-navy">5</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 5</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Высокий уровень - стратегическое планирование и развитие</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 5-8 лет</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl font-bold text-brand-navy">6</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Уровень 6</h3>
                  <p class="text-sm text-brand-dark/70 mb-4">Экспертный уровень - инновации и научные исследования</p>
                  <div class="text-xs text-brand-dark/50">Стаж: 7-10 лет</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements Section -->
          <div id="requirements" class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Требования к кандидатам
            </h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-sky/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  🎓 Образование
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Высшее или среднее профессиональное образование по профилю</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Подтверждение образования дипломом или свидетельством</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Дополнительное образование (курсы, сертификаты)</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  💼 Опыт работы
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Минимальный стаж работы по специальности</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Подтверждение опыта трудовой книжкой или договорами</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Рекомендации от предыдущих работодателей</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-sky/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  📋 Документы
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Паспорт или документ, удостоверяющий личность</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Диплом об образовании</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Трудовая книжка или справки о стаже</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  🎯 Компетенции
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Профессиональные знания в области деятельности</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Навыки применения знаний на практике</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Способность решать профессиональные задачи</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Professions Section -->
          <div class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Популярные профессии для квалификации
            </h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🏗️</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Инженер-строитель</h3>
                  <p class="text-sm text-brand-dark/70">Проектирование и строительство зданий и сооружений</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 4-6</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">📐</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Архитектор</h3>
                  <p class="text-sm text-brand-dark/70">Архитектурное проектирование и дизайн</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 5-6</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">⚡</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Электрик</h3>
                  <p class="text-sm text-brand-dark/70">Электромонтажные и электроснабжение работы</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 3-5</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🔧</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Сантехник</h3>
                  <p class="text-sm text-brand-dark/70">Монтаж и ремонт сантехнических систем</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 3-4</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🚧</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Прораб</h3>
                  <p class="text-sm text-brand-dark/70">Руководство строительными работами</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 4-5</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🏭</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Технолог</h3>
                  <p class="text-sm text-brand-dark/70">Разработка технологических процессов</p>
                  <div class="text-xs text-brand-dark/50 mt-2">Уровень: 4-6</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-brand-navy mb-6">
              Нужна консультация по квалификации?
            </h2>
            <p class="text-lg text-brand-dark/80 mb-8">
              Получите бесплатную консультацию по выбору уровня квалификации и подготовке к НОК
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a [href]="'tel:' + phoneHref"
                 class="bg-brand-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition-all duration-300 hover:shadow-lg">
                📞 Позвонить: {{ phoneDisplay }}
              </a>
              <button
                (click)="openConsultationPopup()"
                class="bg-brand-coral text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg">
                💬 Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hover-lift:hover {
      transform: translateY(-4px);
      transition: transform 0.3s ease;
    }
  `]
})
export class QualificationsPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setQualificationsPageSeo();
  }

  get phoneHref(): string {
    return 'tel:+78001234567';
  }

  get phoneDisplay(): string {
    return '+7 (800) 123-45-67';
  }

  openConsultationPopup(): void {
    // TODO: Implement consultation popup
    console.log('Opening consultation popup');
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
