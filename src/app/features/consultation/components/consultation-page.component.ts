import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-consultation-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-brand-sky/5 to-brand-navy/5">
      <!-- Breadcrumbs -->
      <app-breadcrumbs
        [breadcrumbs]="[
          { label: 'Главная', url: '/', icon: '🏠' },
          { label: 'Консультации', active: true, icon: '👨‍🏫' }
        ]">
      </app-breadcrumbs>

      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy mb-6">
              Бесплатная консультация по НОК
            </h1>
            <p class="text-xl sm:text-2xl text-brand-dark/80 mb-8 leading-relaxed">
              Получите профессиональную консультацию от экспертов по подготовке к независимой оценке квалификации
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                (click)="scrollToSection('consultation-form')"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-sky consulting-accent">
                📝 Записаться на консультацию
              </button>
              <button
                (click)="scrollToSection('benefits')"
                class="glass px-8 py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-coral">
                ❓ Что вы получите
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-16">
        <div class="container mx-auto px-4">

          <!-- Benefits Section -->
          <div id="benefits" class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Что вы получите на консультации
            </h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">🎯</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Персональный план</h3>
                  <p class="text-sm text-brand-dark/70">Индивидуальный план подготовки с учетом вашего опыта и специальности</p>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">📋</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Анализ документов</h3>
                  <p class="text-sm text-brand-dark/70">Проверка ваших документов и рекомендации по их подготовке</p>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">💡</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Экспертные советы</h3>
                  <p class="text-sm text-brand-dark/70">Рекомендации по выбору направления и уровня квалификации</p>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">⏰</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Сроки и этапы</h3>
                  <p class="text-sm text-brand-dark/70">Информация о сроках подготовки и прохождения НОК</p>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">💰</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Стоимость услуг</h3>
                  <p class="text-sm text-brand-dark/70">Подробная информация о ценах и вариантах оплаты</p>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20 hover-lift">
                <div class="text-center">
                  <div class="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">📞</span>
                  </div>
                  <h3 class="font-bold text-brand-dark mb-3">Связь с экспертом</h3>
                  <p class="text-sm text-brand-dark/70">Возможность задать вопросы и получить обратную связь</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Consultation Types Section -->
          <div class="max-w-6xl mx-auto mb-16">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Формы консультаций
            </h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-sky/20">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span class="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-brand-navy mb-3">Телефонная консультация</h3>
                    <ul class="space-y-2 text-brand-dark/80 mb-4">
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Удобное время для звонка</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Длительность 30-45 минут</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Ответы на все вопросы</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Запись разговора (по желанию)</span>
                      </li>
                    </ul>
                    <div class="text-sm text-brand-dark/60">Бесплатно</div>
                  </div>
                </div>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/20">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span class="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-brand-navy mb-3">Онлайн консультация</h3>
                    <ul class="space-y-2 text-brand-dark/80 mb-4">
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Видео звонок через Zoom/Skype</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Демонстрация материалов</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Анализ ваших документов</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-brand-coral font-bold mt-1">•</span>
                        <span>Персональные рекомендации</span>
                      </li>
                    </ul>
                    <div class="text-sm text-brand-dark/60">Бесплатно</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Consultation Form Section -->
          <div id="consultation-form" class="max-w-4xl mx-auto mb-16">
            <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-brand-sky/20">
              <h2 class="text-3xl font-bold text-brand-navy mb-6 text-center">
                Записаться на консультацию
              </h2>

              <form class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-brand-dark mb-2">Имя *</label>
                    <input type="text"
                           class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent"
                           placeholder="Ваше имя">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-brand-dark mb-2">Телефон *</label>
                    <input type="tel"
                           class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent"
                           placeholder="+7 (___) ___-__-__">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Email</label>
                  <input type="email"
                         class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent"
                         placeholder="ваш@email.ru">
                </div>

                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Специальность</label>
                  <select class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent">
                    <option value="">Выберите специальность</option>
                    <option value="engineer">Инженер-строитель</option>
                    <option value="architect">Архитектор</option>
                    <option value="electrician">Электрик</option>
                    <option value="plumber">Сантехник</option>
                    <option value="foreman">Прораб</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Предпочитаемое время консультации</label>
                  <select class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent">
                    <option value="">Выберите время</option>
                    <option value="morning">Утро (9:00 - 12:00)</option>
                    <option value="afternoon">День (12:00 - 17:00)</option>
                    <option value="evening">Вечер (17:00 - 20:00)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Сообщение</label>
                  <textarea rows="4"
                            class="w-full px-4 py-3 rounded-xl border border-brand-sky/30 focus:ring-2 focus:ring-brand-coral focus:border-transparent resize-none"
                            placeholder="Опишите ваши вопросы или текущую ситуацию..."></textarea>
                </div>

                <div class="text-center">
                  <button type="submit"
                          class="bg-brand-coral text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg">
                    📞 Записаться на консультацию
                  </button>
                  <p class="text-sm text-brand-dark/60 mt-3">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>
              </form>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">
              Популярные вопросы о консультации
            </h2>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                <h3 class="font-bold text-brand-dark mb-3">Сколько длится консультация?</h3>
                <p class="text-sm text-brand-dark/70">Телефонная консультация занимает 30-45 минут, онлайн - 45-60 минут.</p>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20">
                <h3 class="font-bold text-brand-dark mb-3">Когда мне позвонят?</h3>
                <p class="text-sm text-brand-dark/70">Мы свяжемся с вами в течение 1 рабочего дня в удобное для вас время.</p>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/20">
                <h3 class="font-bold text-brand-dark mb-3">Что взять с собой?</h3>
                <p class="text-sm text-brand-dark/70">Для онлайн консультации подготовьте диплом, трудовую книжку и вопросы.</p>
              </div>

              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-coral/20">
                <h3 class="font-bold text-brand-dark mb-3">Можно ли отменить?</h3>
                <p class="text-sm text-brand-dark/70">Да, отменить или перенести консультацию можно за 2 часа до назначенного времени.</p>
              </div>
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
export class ConsultationPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setConsultationPageSeo();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
