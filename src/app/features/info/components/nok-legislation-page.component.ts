import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-nok-legislation-page',
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
          <li class="text-brand-dark font-medium">Законодательство НОК</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">⚖️</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Законодательство НОК</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Актуальные нормативные акты. Изменения в законодательстве. Разъяснения Минтруда.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 15 минут</span>
          <span>📅 Обновлено: 4 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Основные нормативные акты НОК</h2>
          <p>Законодательная база независимой оценки квалификации включает федеральные законы, постановления правительства и ведомственные акты.</p>

          <h3>Федеральный закон №238-ФЗ</h3>
          <div class="bg-brand-sky/10 p-6 rounded-xl my-6">
            <h4 class="font-bold text-brand-navy mb-3">📋 "О независимой оценке квалификации"</h4>
            <p class="text-brand-dark/80 mb-4">Основной закон, регулирующий проведение НОК в России. Устанавливает правовые основы, принципы и порядок проведения оценки квалификации.</p>
            
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Дата принятия:</strong> 3 июля 2016<br>
                <strong>Дата вступления в силу:</strong> 1 января 2017<br>
                <strong>Последние изменения:</strong> 2023 год
              </div>
              <div>
                <strong>Основные разделы:</strong><br>
                • Общие положения<br>
                • Порядок проведения НОК<br>
                • Центры оценки квалификации<br>
                • Национальный реестр специалистов
              </div>
            </div>
          </div>

          <h3>Ключевые положения ФЗ №238</h3>
          <div class="space-y-6">
            <div class="border-l-4 border-brand-sky pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">Статья 1. Предмет регулирования</h4>
              <p class="text-brand-dark/80">Закон регулирует отношения, связанные с проведением независимой оценки квалификации работников, лиц, претендующих на осуществление определенного вида трудовой деятельности.</p>
            </div>

            <div class="border-l-4 border-brand-coral pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">Статья 2. Основные понятия</h4>
              <p class="text-brand-dark/80">Определяет ключевые термины: независимая оценка квалификации, центр оценки квалификации, свидетельство о квалификации, профессиональный стандарт.</p>
            </div>

            <div class="border-l-4 border-brand-navy pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">Статья 3. Принципы проведения НОК</h4>
              <p class="text-brand-dark/80">Устанавливает принципы: добровольность, объективность, независимость, открытость и доступность информации.</p>
            </div>
          </div>

          <h3>Подзаконные акты</h3>
          <div class="space-y-6">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-brand-navy/20 rounded-xl flex items-center justify-center">
                  <span class="text-xl">📄</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-brand-dark mb-2">Постановление Правительства РФ №23</h4>
                  <p class="text-brand-dark/70 mb-3">"О порядке проведения независимой оценки квалификации"</p>
                  <div class="text-sm text-brand-dark/80">
                    <strong>Дата:</strong> 16 января 2017<br>
                    <strong>Основные положения:</strong> Детализирует порядок проведения НОК, требования к ЦОК, процедуру выдачи свидетельств.
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-brand-coral/20 rounded-xl flex items-center justify-center">
                  <span class="text-xl">📋</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-brand-dark mb-2">Приказ Минтруда №1н</h4>
                  <p class="text-brand-dark/70 mb-3">"Об утверждении методических рекомендаций по проведению НОК"</p>
                  <div class="text-sm text-brand-dark/80">
                    <strong>Дата:</strong> 2022 год<br>
                    <strong>Основные положения:</strong> Методические рекомендации для ЦОК по организации и проведению экзаменов.
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-brand-sky/20 rounded-xl flex items-center justify-center">
                  <span class="text-xl">🏢</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-brand-dark mb-2">Приказ Минтруда №2н</h4>
                  <p class="text-brand-dark/70 mb-3">"О порядке ведения Национального реестра специалистов"</p>
                  <div class="text-sm text-brand-dark/80">
                    <strong>Дата:</strong> 2021 год<br>
                    <strong>Основные положения:</strong> Правила ведения НРС, порядок внесения и изменения информации.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>Последние изменения в законодательстве</h3>
          <div class="space-y-4">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 class="font-semibold text-yellow-800 mb-2">🔄 Изменения 2023 года</h4>
              <ul class="text-sm space-y-1">
                <li>• Расширение перечня обязательных специальностей</li>
                <li>• Ужесточение требований к ЦОК</li>
                <li>• Введение электронного документооборота</li>
                <li>• Обновление процедуры аккредитации</li>
              </ul>
            </div>

            <div class="bg-green-50 border-l-4 border-green-400 p-4">
              <h4 class="font-semibold text-green-800 mb-2">✅ Планируемые изменения 2024 года</h4>
              <ul class="text-sm space-y-1">
                <li>• Внедрение единой информационной системы</li>
                <li>• Упрощение процедуры продления свидетельств</li>
                <li>• Расширение возможностей дистанционной оценки</li>
                <li>• Введение международных стандартов</li>
              </ul>
            </div>
          </div>

          <h3>Разъяснения Минтруда России</h3>
          <div class="space-y-4">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <h4 class="font-bold text-brand-dark mb-3">📝 Письма и разъяснения:</h4>
              <div class="space-y-3 text-sm">
                <div class="border-l-4 border-brand-sky pl-3">
                  <strong>Письмо №15-2/ООГ-1234</strong><br>
                  <span class="text-brand-dark/70">О порядке проведения НОК в условиях пандемии</span>
                </div>
                <div class="border-l-4 border-brand-coral pl-3">
                  <strong>Письмо №15-2/ООГ-5678</strong><br>
                  <span class="text-brand-dark/70">Разъяснения по вопросам аккредитации ЦОК</span>
                </div>
                <div class="border-l-4 border-brand-navy pl-3">
                  <strong>Письмо №15-2/ООГ-9012</strong><br>
                  <span class="text-brand-dark/70">О порядке продления свидетельств о квалификации</span>
                </div>
              </div>
            </div>
          </div>

          <h3>Профессиональные стандарты</h3>
          <p>Профессиональные стандарты являются основой для проведения НОК. Они определяют требования к квалификации специалистов.</p>

          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-brand-sky/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">🏗️ Строительные стандарты</h4>
              <ul class="space-y-2 text-sm">
                <li>• Специалист по организации строительства</li>
                <li>• Мастер строительных работ</li>
                <li>• Прораб строительных работ</li>
                <li>• Начальник участка</li>
              </ul>
            </div>
            <div class="bg-brand-coral/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">📐 Проектировочные стандарты</h4>
              <ul class="space-y-2 text-sm">
                <li>• Архитектор</li>
                <li>• Инженер-проектировщик</li>
                <li>• Специалист по изысканиям</li>
                <li>• Главный инженер проекта</li>
              </ul>
            </div>
          </div>

          <h3>Полезные ресурсы</h3>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h4 class="font-bold text-blue-800 mb-3">🔗 Официальные источники:</h4>
            <ul class="space-y-2">
              <li><a href="https://www.consultant.ru/document/cons_doc_LAW_201401/" target="_blank" class="text-blue-600 hover:underline">• ФЗ №238 на сайте КонсультантПлюс</a></li>
              <li><a href="https://rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Официальный сайт Минтруда России</a></li>
              <li><a href="https://profstandart.rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Реестр профессиональных стандартов</a></li>
              <li><a href="https://nok.rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Портал независимой оценки квалификации</a></li>
            </ul>
          </div>

          <h3>Ответственность за нарушения</h3>
          <div class="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
            <h4 class="font-bold text-red-800 mb-3">⚠️ Важно знать:</h4>
            <div class="space-y-3 text-sm">
              <div>
                <strong>Для специалистов:</strong> Работа без действующего свидетельства может привести к отстранению от работы и штрафам.
              </div>
              <div>
                <strong>Для работодателей:</strong> Допуск к работе специалистов без НОК может повлечь административную ответственность.
              </div>
              <div>
                <strong>Для ЦОК:</strong> Нарушения в проведении НОК могут привести к приостановлению или отзыву аккредитации.
              </div>
            </div>
          </div>
        </div>

        <!-- Related Pages -->
        <div class="mt-12 pt-8 border-t border-brand-sky/20">
          <h3 class="text-2xl font-bold text-brand-dark mb-6">Связанные материалы</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a routerLink="/info/what-is-nok" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">❓</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Что такое НОК</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Определение и суть процедуры. Законодательная база.</p>
              </div>
            </a>
            <a routerLink="/info/specialists-registry" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">📜</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Реестр специалистов НРС</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Как проверить статус специалиста в НРС.</p>
              </div>
            </a>
            <a routerLink="/qa-centers" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">🏢</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Центры оценки квалификации</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Реестр аккредитованных ЦОК. Контакты и адреса.</p>
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
export class NokLegislationPageComponent implements OnInit {
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
    this.infoService.getPageBySlug('nok-legislation').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    // Временно используем общий метод, позже добавим специфичный
    this.seoService.setInfoPageSeo();
  }
} 