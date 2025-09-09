import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-exam-preparation-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  template: `
    <div class="container mx-auto px-6 py-8">
      <!-- Breadcrumbs -->
      <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-coral/20 rounded-2xl mb-6">
          <span class="text-3xl">🛠️</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Услуги по подготовке к НОК</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Профессиональные услуги по подготовке к независимой оценке квалификации. Сопровождение во всех регионах России.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 20 минут</span>
          <span>📅 Обновлено: 15 января 2024</span>
        </div>
      </div>

      <!-- City Filter -->
      <div class="mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-brand-sky/20 p-6">
          <h3 class="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-2">
            <span>🏙️</span>
            Выберите город проведения экзамена НОК
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              *ngFor="let city of cities"
              (click)="selectCity(city)"
              [class.active]="selectedCity === city"
              class="px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md"
              [class]="selectedCity === city ? 'bg-brand-coral text-white border-brand-coral' : 'bg-gray-50 text-brand-dark border-gray-200 hover:border-brand-sky'">
              {{ city.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Services Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Наши услуги по подготовке к НОК</h2>
          <p>Мы предоставляем полный спектр профессиональных услуг по подготовке к независимой оценке квалификации во всех регионах России.</p>

          <!-- Services List -->
          <div class="space-y-8 my-12">
            <!-- Basic Package -->
            <div class="bg-white rounded-xl shadow-sm border border-brand-sky/20 p-6 hover:shadow-lg transition-shadow duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-brand-sky/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📋</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-brand-dark mb-2">Базовый пакет подготовки</h3>
                  <p class="text-brand-dark/70 mb-4">Комплексная подготовка к НОК с сопровождением на всех этапах</p>
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Что входит:</h4>
                      <ul class="text-sm space-y-1">
                        <li>✅ Консультация по требованиям</li>
                        <li>✅ Анализ документов</li>
                        <li>✅ Помощь в подготовке портфолио</li>
                        <li>✅ Сопровождение до экзамена</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Стоимость:</h4>
                      <div class="text-2xl font-bold text-brand-coral">от 15 000 ₽</div>
                      <p class="text-sm text-brand-dark/60">Срок подготовки: 2-4 недели</p>
                    </div>
                  </div>
                  <button class="bg-brand-coral text-white px-6 py-2 rounded-lg hover:bg-brand-coral-dark transition-colors duration-200">
                    Заказать консультацию
                  </button>
                </div>
              </div>
            </div>

            <!-- Premium Package -->
            <div class="bg-gradient-to-r from-brand-coral/5 to-brand-sky/5 rounded-xl shadow-sm border border-brand-coral/20 p-6 hover:shadow-lg transition-shadow duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-brand-coral/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">⭐</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-brand-dark mb-2">Премиум сопровождение</h3>
                  <p class="text-brand-dark/70 mb-4">Полное сопровождение с гарантией успешной сдачи экзамена</p>
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Что входит:</h4>
                      <ul class="text-sm space-y-1">
                        <li>✅ Персональный менеджер</li>
                        <li>✅ Индивидуальная программа подготовки</li>
                        <li>✅ Практические занятия</li>
                        <li>✅ Гарантия успешной сдачи</li>
                        <li>✅ Поддержка 24/7</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Стоимость:</h4>
                      <div class="text-2xl font-bold text-brand-coral">от 35 000 ₽</div>
                      <p class="text-sm text-brand-dark/60">Срок подготовки: 1-2 месяца</p>
                    </div>
                  </div>
                  <button class="bg-gradient-to-r from-brand-coral to-brand-coral-dark text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                    Получить персональную консультацию
                  </button>
                </div>
              </div>
            </div>

            <!-- Express Package -->
            <div class="bg-white rounded-xl shadow-sm border border-brand-sky/20 p-6 hover:shadow-lg transition-shadow duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">⚡</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-brand-dark mb-2">Экспресс подготовка</h3>
                  <p class="text-brand-dark/70 mb-4">Срочная подготовка к НОК за минимальный срок</p>
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Что входит:</h4>
                      <ul class="text-sm space-y-1">
                        <li>✅ Ускоренная подготовка документов</li>
                        <li>✅ Интенсивная теоретическая подготовка</li>
                        <li>✅ Практические занятия</li>
                        <li>✅ Срочное сопровождение</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-brand-navy mb-2">Стоимость:</h4>
                      <div class="text-2xl font-bold text-brand-coral">от 25 000 ₽</div>
                      <p class="text-sm text-brand-dark/60">Срок подготовки: 1-2 недели</p>
                    </div>
                  </div>
                  <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Срочная консультация
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2>Города проведения экзаменов НОК</h2>
          <p>Мы оказываем услуги по подготовке к НОК во всех крупных городах России. Выберите ваш город для получения актуальной информации о центрах оценки квалификации.</p>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏛️ Москва</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, НОПРИЗ, ОПБ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: НИИЖБ, ЦНИИСК им. Кучеренко</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏙️ Санкт-Петербург</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, НОПРИЗ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: СПбГАСУ, ЛенНИИпроект</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏭 Екатеринбург</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, ОПБ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: УрФУ, УГТУ-УПИ</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🌆 Новосибирск</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, НОПРИЗ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: НГАСУ, СГУПС</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏙️ Казань</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: КГАСА, КНИТУ-КАИ</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏛️ Нижний Новгород</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, ОПБ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: ННГАСУ, НГТУ им. Р.Е. Алексеева</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🌊 Владивосток</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: ДВФУ, ВГУЭС</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏙️ Ростов-на-Дону</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ, НОПРИЗ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: ДГТУ, РГСУ</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-brand-sky/20 hover:border-brand-sky/40 transition-colors duration-200">
              <h4 class="font-semibold text-brand-navy mb-2">🏛️ Краснодар</h4>
              <p class="text-sm text-brand-dark/60">НОСТРОЙ</p>
              <p class="text-sm text-brand-dark/70 mt-1">Центры: КубГАУ, КубГТУ</p>
            </div>
          </div>

          <div class="bg-brand-sky/10 p-6 rounded-xl my-8">
            <h3 class="text-lg font-bold text-brand-navy mb-3">🎯 Наши преимущества</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-2xl mb-2">📈</div>
                <h4 class="font-semibold text-brand-dark mb-1">98% успешность</h4>
                <p class="text-sm text-brand-dark/60">Гарантированная подготовка</p>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">⏱️</div>
                <h4 class="font-semibold text-brand-dark mb-1">Быстрая подготовка</h4>
                <p class="text-sm text-brand-dark/60">От 1 недели до 2 месяцев</p>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">🌍</div>
                <h4 class="font-semibold text-brand-dark mb-1">Вся Россия</h4>
                <p class="text-sm text-brand-dark/60">Работаем во всех регионах</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Pages -->
        <div class="mt-12 pt-8 border-t border-brand-sky/20">
          <h3 class="text-2xl font-bold text-brand-dark mb-6">Дополнительные услуги</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a routerLink="/services" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">🔧</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Все услуги</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Полный перечень наших услуг по подготовке к НОК.</p>
              </div>
            </a>
            <a routerLink="/qa-centers" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">🏛️</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Центры оценки квалификации</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Адреса и контакты центров НОК по городам.</p>
              </div>
            </a>
            <a routerLink="/consultation" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">💬</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Бесплатная консультация</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Получите ответы на все вопросы по подготовке к НОК.</p>
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
export class ExamPreparationPageComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', url: '/', icon: '🏠' },
    { label: 'Информация о НОК', url: '/info', icon: 'ℹ️' },
    { label: 'Услуги по подготовке к НОК', active: true, icon: '🛠️' }
  ];

  // Cities data
  cities = [
    { id: 'moscow', name: 'Москва', organizations: ['НОСТРОЙ', 'НОПРИЗ', 'ОПБ'], centers: ['НИИЖБ', 'ЦНИИСК им. Кучеренко'] },
    { id: 'spb', name: 'Санкт-Петербург', organizations: ['НОСТРОЙ', 'НОПРИЗ'], centers: ['СПбГАСУ', 'ЛенНИИпроект'] },
    { id: 'ekb', name: 'Екатеринбург', organizations: ['НОСТРОЙ', 'ОПБ'], centers: ['УрФУ', 'УГТУ-УПИ'] },
    { id: 'nsk', name: 'Новосибирск', organizations: ['НОСТРОЙ', 'НОПРИЗ'], centers: ['НГАСУ', 'СГУПС'] },
    { id: 'kazan', name: 'Казань', organizations: ['НОСТРОЙ'], centers: ['КГАСА', 'КНИТУ-КАИ'] },
    { id: 'nnov', name: 'Нижний Новгород', organizations: ['НОСТРОЙ', 'ОПБ'], centers: ['ННГАСУ', 'НГТУ им. Р.Е. Алексеева'] },
    { id: 'vlad', name: 'Владивосток', organizations: ['НОСТРОЙ'], centers: ['ДВФУ', 'ВГУЭС'] },
    { id: 'rostov', name: 'Ростов-на-Дону', organizations: ['НОСТРОЙ', 'НОПРИЗ'], centers: ['ДГТУ', 'РГСУ'] },
    { id: 'krasnodar', name: 'Краснодар', organizations: ['НОСТРОЙ'], centers: ['КубГАУ', 'КубГТУ'] }
  ];

  selectedCity: any = null;
  pageData: InfoPage | null = null;

  constructor(
    private seoService: SeoService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.loadPageData();
    this.setSeoData();
  }

  /**
   * Выбор города для фильтрации
   */
  selectCity(city: any): void {
    this.selectedCity = this.selectedCity === city ? null : city;
  }

  private loadPageData(): void {
    this.infoService.getPageBySlug('exam-preparation').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    this.seoService.setInfoPageSeo();
  }
} 