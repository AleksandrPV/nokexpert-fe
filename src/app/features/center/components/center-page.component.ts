import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-center-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <!-- Breadcrumbs -->
      <app-breadcrumbs
        [breadcrumbs]="[
          { label: 'Главная', url: '/', icon: '🏠' },
          { label: 'Центр оценки квалификации', active: true, icon: '🏛️' }
        ]">
      </app-breadcrumbs>

      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy mb-6">
              Центр оценки квалификации НОК Эксперт
            </h1>
            <p class="text-xl sm:text-2xl text-brand-dark/80 mb-8 leading-relaxed">
              Официальный центр для проведения независимой оценки квалификации специалистов строительной отрасли
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                (click)="openConsultationPopup()"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-sky consulting-accent">
                📞 Записаться на консультацию
              </button>
              <button
                (click)="scrollToSection('licenses')"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-coral">
                📄 Наши лицензии
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
                  О нашем центре оценки квалификации
                </h2>
                <p class="text-lg text-brand-dark/80 leading-relaxed">
                  Центр оценки квалификации НОК Эксперт является официальным партнером Национального реестра специалистов
                  в области строительства (НРС). Мы проводим независимую оценку квалификации по всем направлениям
                  строительной отрасли в соответствии с требованиями законодательства РФ.
                </p>
                <div class="grid grid-cols-2 gap-6">
                  <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                    <div class="text-3xl font-bold text-brand-coral mb-2">500+</div>
                    <div class="text-sm text-brand-dark/60">Проведенных экзаменов</div>
                  </div>
                  <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                    <div class="text-3xl font-bold text-brand-navy mb-2">95%</div>
                    <div class="text-sm text-brand-dark/60">Успешная сдача</div>
                  </div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-brand-sky/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-6 text-center">
                  Наши преимущества
                </h3>
                <div class="space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-coral font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Официальная аккредитация</div>
                      <div class="text-sm text-brand-dark/70">Лицензия Минстроя РФ № АКК-2024-001</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-sky/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-sky font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Опытные эксперты</div>
                      <div class="text-sm text-brand-dark/70">Команда из 15 сертифицированных экспертов</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-coral font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Современная инфраструктура</div>
                      <div class="text-sm text-brand-dark/70">Онлайн и оффлайн форматы экзаменов</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-brand-sky/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-brand-sky font-bold">✓</span>
                    </div>
                    <div>
                      <div class="font-semibold text-brand-dark mb-1">Гарантия качества</div>
                      <div class="text-sm text-brand-dark/70">Сопровождение до получения свидетельства</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Licenses Section -->
          <div id="licenses" class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Лицензии и аккредитации
            </h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🏛️</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Лицензия Минстроя РФ</h3>
                  <p class="text-sm text-brand-dark/70 mb-3">АКК-2024-001 от 15.03.2024</p>
                  <div class="text-xs text-brand-dark/50">Действует до 15.03.2029</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">📋</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Аккредитация НОСТРОЙ</h3>
                  <p class="text-sm text-brand-dark/70 mb-3">ЦОК-2024-015 от 01.04.2024</p>
                  <div class="text-xs text-brand-dark/50">Действует до 01.04.2029</div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🏢</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-2">Аккредитация НОПРИЗ</h3>
                  <p class="text-sm text-brand-dark/70 mb-3">ЦОК-2024-008 от 20.02.2024</p>
                  <div class="text-xs text-brand-dark/50">Действует до 20.02.2029</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Services Section -->
          <div class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Наши услуги
            </h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-sky/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  📝 Проведение экзаменов НОК
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Теоретическая часть (тестирование)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Практическая часть (решение кейсов)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Оценка портфолио (для некоторых специальностей)</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/20">
                <h3 class="text-2xl font-bold text-brand-navy mb-4">
                  📋 Регистрация в НРС
                </h3>
                <ul class="space-y-3 text-brand-dark/80">
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Подготовка пакета документов</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Подача заявления в реестр</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-brand-coral font-bold mt-1">•</span>
                    <span>Получение свидетельства о квалификации</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-brand-navy mb-6">
              Готовы начать?
            </h2>
            <p class="text-lg text-brand-dark/80 mb-8">
              Свяжитесь с нами для получения консультации и записи на экзамен НОК
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a [href]="'tel:' + phoneHref"
                 class="bg-brand-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition-all duration-300 hover:shadow-lg">
                📞 Позвонить: {{ phoneDisplay }}
              </a>
              <button
                (click)="openConsultationPopup()"
                class="bg-brand-coral text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg">
                💬 Заказать консультацию
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
export class CenterPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setCenterPageSeo();
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