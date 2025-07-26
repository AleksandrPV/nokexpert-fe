import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-online-trainer-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-6 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-brand-dark/70">
          <li><a routerLink="/" class="hover:text-brand-coral transition-colors">Главная</a></li>
          <li><span class="mx-2">/</span></li>
          <li><a routerLink="/info" class="hover:text-brand-coral transition-colors">Информация о НОК</a></li>
          <li><span class="mx-2">/</span></li>
          <li class="text-brand-dark font-medium">Тренажер НОК онлайн</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">💻</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Тренажер НОК онлайн</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Демо-версия тренажера. Статистика прохождения. Рейтинг сложности вопросов.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время прохождения: 5 минут</span>
          <span>📅 Обновлено: 16 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Онлайн тренажер для подготовки к НОК</h2>
          <p>Практикуйтесь в решении типовых задач и вопросов, которые встречаются на экзамене НОК.</p>

          <!-- Demo Trainer Section -->
          <div class="bg-gradient-to-r from-brand-sky/10 to-brand-coral/10 rounded-xl p-8 my-8">
            <h3 class="text-2xl font-bold text-brand-dark mb-6">🎯 Демо-версия тренажера</h3>
            
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="text-center mb-6">
                <div class="text-4xl mb-4">📝</div>
                <h4 class="text-xl font-bold text-brand-dark mb-2">Вопрос 1 из 5</h4>
                <p class="text-brand-dark/70">Какой федеральный закон регулирует проведение НОК?</p>
              </div>

              <div class="space-y-3 mb-6">
                <button class="w-full p-4 text-left bg-white border border-brand-sky/30 rounded-xl hover:bg-brand-sky/10 transition-colors">
                  А) ФЗ №238 "О независимой оценке квалификации"
                </button>
                <button class="w-full p-4 text-left bg-white border border-brand-sky/30 rounded-xl hover:bg-brand-sky/10 transition-colors">
                  Б) ФЗ №273 "Об образовании в Российской Федерации"
                </button>
                <button class="w-full p-4 text-left bg-white border border-brand-sky/30 rounded-xl hover:bg-brand-sky/10 transition-colors">
                  В) ФЗ №184 "О техническом регулировании"
                </button>
                <button class="w-full p-4 text-left bg-white border border-brand-sky/30 rounded-xl hover:bg-brand-sky/10 transition-colors">
                  Г) ФЗ №44 "О контрактной системе"
                </button>
              </div>

              <div class="text-center">
                <button class="bg-brand-coral text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
                  Проверить ответ
                </button>
              </div>
            </div>

            <div class="mt-6 text-center">
              <p class="text-sm text-brand-dark/60">
                Это демо-версия. Полная версия тренажера содержит более 500 вопросов по всем направлениям НОК.
              </p>
            </div>
          </div>

          <h3>Возможности тренажера</h3>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <div class="text-2xl mb-3">📊</div>
              <h4 class="font-bold text-brand-navy mb-3">Статистика прохождения</h4>
              <ul class="space-y-2 text-sm">
                <li>• Процент правильных ответов</li>
                <li>• Время, затраченное на вопросы</li>
                <li>• Сложность по темам</li>
                <li>• Прогресс обучения</li>
              </ul>
            </div>
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <div class="text-2xl mb-3">🎯</div>
              <h4 class="font-bold text-brand-navy mb-3">Рейтинг сложности</h4>
              <ul class="space-y-2 text-sm">
                <li>• Адаптивная сложность вопросов</li>
                <li>• Персонализированные рекомендации</li>
                <li>• Фокус на проблемных темах</li>
                <li>• Постепенное усложнение</li>
              </ul>
            </div>
          </div>

          <h3>Категории вопросов</h3>
          <div class="grid md:grid-cols-3 gap-4 my-8">
            <div class="bg-brand-navy/10 p-4 rounded-xl text-center">
              <div class="text-2xl mb-2">🏗️</div>
              <h4 class="font-semibold text-brand-dark">НОК НОСТРОЙ</h4>
              <p class="text-sm text-brand-dark/60">150+ вопросов</p>
            </div>
            <div class="bg-brand-coral/10 p-4 rounded-xl text-center">
              <div class="text-2xl mb-2">📐</div>
              <h4 class="font-semibold text-brand-dark">НОК НОПРИЗ</h4>
              <p class="text-sm text-brand-dark/60">120+ вопросов</p>
            </div>
            <div class="bg-brand-sky/10 p-4 rounded-xl text-center">
              <div class="text-2xl mb-2">🔥</div>
              <h4 class="font-semibold text-brand-dark">НОК ОПБ</h4>
              <p class="text-sm text-brand-dark/60">80+ вопросов</p>
            </div>
          </div>

          <h3>Как использовать тренажер</h3>
          <div class="space-y-6">
            <div class="border-l-4 border-brand-sky pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">1. Выберите направление</h4>
              <p class="text-brand-dark/80">Определите, к какой квалификации готовитесь: НОСТРОЙ, НОПРИЗ или ОПБ.</p>
            </div>

            <div class="border-l-4 border-brand-coral pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">2. Начните с базовых вопросов</h4>
              <p class="text-brand-dark/80">Пройдите тест на определение текущего уровня знаний.</p>
            </div>

            <div class="border-l-4 border-brand-navy pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">3. Изучайте объяснения</h4>
              <p class="text-brand-dark/80">После каждого ответа читайте подробные объяснения правильного решения.</p>
            </div>

            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">4. Отслеживайте прогресс</h4>
              <p class="text-brand-dark/80">Анализируйте статистику и сосредоточьтесь на проблемных темах.</p>
            </div>
          </div>

          <!-- Features Section -->
          <div class="mt-12 bg-gradient-to-r from-brand-sky/10 to-brand-coral/10 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-brand-dark mb-6">✨ Особенности тренажера</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-brand-dark mb-3">📱 Удобство использования:</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Адаптивный дизайн для всех устройств</li>
                  <li>• Интуитивно понятный интерфейс</li>
                  <li>• Возможность сохранения прогресса</li>
                  <li>• Офлайн режим для мобильных устройств</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-brand-dark mb-3">🎓 Обучающие функции:</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Подробные объяснения к каждому ответу</li>
                  <li>• Ссылки на нормативные документы</li>
                  <li>• Рекомендации по изучению материала</li>
                  <li>• Система повторения сложных вопросов</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 text-center bg-brand-navy text-white rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-4">🚀 Готовы начать подготовку?</h3>
          <p class="text-lg mb-6 opacity-90">
            Получите доступ к полной версии тренажера с более чем 500 вопросами
          </p>
          <button class="bg-brand-coral text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
            Получить доступ к тренажеру
          </button>
        </div>

        <!-- Related Pages -->
        <div class="mt-12 pt-8 border-t border-brand-sky/20">
          <h3 class="text-2xl font-bold text-brand-dark mb-6">Связанные материалы</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a routerLink="/info/exam-preparation" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">📖</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Подготовка к экзамену НОК</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Методики подготовки. Рекомендуемая литература.</p>
              </div>
            </a>
            <a routerLink="/info/nok-qa" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">❔</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Вопросы и ответы НОК</h4>
                <p class="text-sm text-brand-dark/60 mt-2">База знаний по темам. Разбор сложных вопросов.</p>
              </div>
            </a>
            <a routerLink="/info/portfolio-guide" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">📁</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Составление портфолио</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Требования к оформлению. Примеры успешных портфолио.</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class OnlineTrainerPageComponent implements OnInit {
  pageData: InfoPage | null = null;

  constructor(
    private seoService: SeoService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.loadPageData();
    this.setSeoData();
  }

  private loadPageData(): void {
    this.infoService.getPageBySlug('online-trainer').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    // Временно используем общий метод, позже добавим специфичный
    this.seoService.setInfoPageSeo();
  }
} 