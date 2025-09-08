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

      <!-- How to Get Qualification Section -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
          Как получить профессиональную квалификацию
        </h2>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="glass p-6 rounded-2xl hover-lift">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-brand-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-3xl font-bold text-brand-coral">📝</span>
              </div>
              <h3 class="text-xl font-bold text-brand-navy">Подготовка</h3>
            </div>

            <div class="space-y-3 text-sm text-brand-dark/80">
              <div class="flex items-start gap-3">
                <span class="text-brand-coral font-bold mt-1">•</span>
                <span>Изучение требований к квалификации</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-coral font-bold mt-1">•</span>
                <span>Оценка текущего уровня компетенций</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-coral font-bold mt-1">•</span>
                <span>Планирование обучения и подготовки</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-coral font-bold mt-1">•</span>
                <span>Сбор необходимых документов</span>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="glass p-6 rounded-2xl hover-lift">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-brand-sky/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-3xl font-bold text-brand-sky">🎓</span>
              </div>
              <h3 class="text-xl font-bold text-brand-navy">Обучение</h3>
            </div>

            <div class="space-y-3 text-sm text-brand-dark/80">
              <div class="flex items-start gap-3">
                <span class="text-brand-sky font-bold mt-1">•</span>
                <span>Теоретическая подготовка по стандартам</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-sky font-bold mt-1">•</span>
                <span>Практические занятия и тренинги</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-sky font-bold mt-1">•</span>
                <span>Изучение нормативной документации</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-sky font-bold mt-1">•</span>
                <span>Подготовка портфолио работ</span>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="glass p-6 rounded-2xl hover-lift">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-brand-navy/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-3xl font-bold text-brand-navy">✅</span>
              </div>
              <h3 class="text-xl font-bold text-brand-navy">Подтверждение</h3>
            </div>

            <div class="space-y-3 text-sm text-brand-dark/80">
              <div class="flex items-start gap-3">
                <span class="text-brand-navy font-bold mt-1">•</span>
                <span>Прохождение независимой оценки квалификации</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-navy font-bold mt-1">•</span>
                <span>Получение свидетельства о квалификации</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-navy font-bold mt-1">•</span>
                <span>Внесение в Национальный реестр специалистов</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-navy font-bold mt-1">•</span>
                <span>Использование квалификации в работе</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Qualification Renewal Section -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
          Продление квалификации
        </h2>

        <div class="glass p-6 sm:p-8 rounded-3xl">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold text-brand-navy mb-4 flex items-center gap-3">
                <span class="text-2xl">⏰</span>
                Сроки действия квалификации
              </h3>
              <div class="space-y-3 text-brand-dark/80">
                <p>
                  Свидетельство о квалификации действует <strong class="text-brand-coral">5 лет</strong>
                  с момента получения. По истечении этого срока необходимо пройти процедуру подтверждения квалификации.
                </p>
                <p>
                  Подтверждение квалификации проводится в упрощенном порядке и включает оценку опыта работы
                  и профессиональной деятельности специалиста за прошедший период.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold text-brand-navy mb-4 flex items-center gap-3">
                <span class="text-2xl">🔄</span>
                Процедура подтверждения
              </h3>
              <div class="space-y-3 text-brand-dark/80">
                <div class="flex items-start gap-3">
                  <span class="text-brand-sky font-bold mt-1">1.</span>
                  <span>Подготовка отчета о профессиональной деятельности</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-brand-sky font-bold mt-1">2.</span>
                  <span>Предоставление подтверждающих документов</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-brand-sky font-bold mt-1">3.</span>
                  <span>Рассмотрение в центре оценки квалификации</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-brand-sky font-bold mt-1">4.</span>
                  <span>Получение нового свидетельства</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Professional Standards Section -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
          Профессиональные стандарты
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass p-6 rounded-2xl">
            <h3 class="text-xl font-bold text-brand-navy mb-4 flex items-center gap-3">
              <span class="text-2xl">📊</span>
              Что такое профессиональный стандарт?
            </h3>
            <p class="text-brand-dark/80 leading-relaxed">
              Профессиональный стандарт — это документ, который устанавливает требования к образованию,
              опыту работы, знаниям и умениям работника. Он определяет уровень квалификации,
              необходимый для выполнения трудовых функций в определенной профессиональной области.
            </p>
          </div>

          <div class="glass p-6 rounded-2xl">
            <h3 class="text-xl font-bold text-brand-navy mb-4 flex items-center gap-3">
              <span class="text-2xl">🎯</span>
              Связь с квалификацией
            </h3>
            <p class="text-brand-dark/80 leading-relaxed">
              Независимая оценка квалификации проводится на соответствие требованиям профессиональных стандартов.
              Успешное прохождение НОК подтверждает, что специалист обладает компетенциями,
              необходимыми для выполнения трудовых функций на соответствующем уровне квалификации.
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
          Часто задаваемые вопросы о квалификации
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="glass p-4 rounded-xl">
              <h4 class="font-semibold text-brand-dark mb-2">Какая квалификация нужна для моей профессии?</h4>
              <p class="text-sm text-brand-dark/70">Уровень квалификации зависит от сложности выполняемых задач. Для руководителей обычно требуется 5-6 уровень, для специалистов - 4-5 уровень.</p>
            </div>

            <div class="glass p-4 rounded-xl">
              <h4 class="font-semibold text-brand-dark mb-2">Можно ли получить квалификацию без высшего образования?</h4>
              <p class="text-sm text-brand-dark/70">Да, для многих специальностей достаточно среднего профессионального образования или опыта работы. Требования указаны в профессиональных стандартах.</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="glass p-4 rounded-xl">
              <h4 class="font-semibold text-brand-dark mb-2">Что делать, если у меня нет опыта работы?</h4>
              <p class="text-sm text-brand-dark/70">Для получения начальной квалификации (уровень 1-2) достаточно образования. Для более высоких уровней потребуется опыт работы или дополнительное обучение.</p>
            </div>

            <div class="glass p-4 rounded-xl">
              <h4 class="font-semibold text-brand-dark mb-2">Можно ли получить несколько квалификаций?</h4>
              <p class="text-sm text-brand-dark/70">Да, специалист может иметь несколько квалификаций по разным направлениям. Каждая квалификация подтверждается отдельным свидетельством.</p>
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
