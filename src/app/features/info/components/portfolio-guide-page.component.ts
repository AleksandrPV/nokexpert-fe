import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-portfolio-guide-page',
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
          <li class="text-brand-dark font-medium">Составление портфолио</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">📁</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Составление портфолио</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Требования к оформлению. Примеры успешных портфолио. Типичные ошибки.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 18 минут</span>
          <span>📅 Обновлено: 7 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Как правильно составить портфолио для НОК</h2>
          <p>Портфолио - это ключевой документ при прохождении НОК. От его качества зависит успешность сдачи экзамена.</p>

          <h3>Структура портфолио</h3>
          <div class="bg-brand-sky/10 p-6 rounded-xl my-6">
            <h4 class="font-bold text-brand-navy mb-4">📋 Обязательные разделы:</h4>
            <ol class="space-y-2">
              <li><strong>Титульный лист</strong> - с указанием ФИО, специальности, квалификации</li>
              <li><strong>Содержание</strong> - структурированный список всех материалов</li>
              <li><strong>Резюме</strong> - краткая информация о профессиональном опыте</li>
              <li><strong>Документы об образовании</strong> - дипломы, сертификаты</li>
              <li><strong>Примеры работ</strong> - проекты, расчеты, чертежи</li>
              <li><strong>Дополнительные материалы</strong> - рекомендации, отзывы</li>
            </ol>
          </div>

          <h3>Требования к оформлению</h3>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <h4 class="font-bold text-brand-navy mb-3">📄 Формат документов</h4>
              <ul class="space-y-2 text-sm">
                <li>• PDF формат для всех документов</li>
                <li>• Четкое качество сканирования</li>
                <li>• Читаемый размер шрифта</li>
                <li>• Правильная ориентация страниц</li>
              </ul>
            </div>
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <h4 class="font-bold text-brand-navy mb-3">📊 Структура материалов</h4>
              <ul class="space-y-2 text-sm">
                <li>• Логичная последовательность</li>
                <li>• Нумерация страниц</li>
                <li>• Четкие заголовки разделов</li>
                <li>• Аннотации к проектам</li>
              </ul>
            </div>
          </div>

          <h3>Примеры работ для портфолио</h3>
          <div class="space-y-6">
            <div class="border-l-4 border-brand-coral pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">Для строителей (НОК НОСТРОЙ):</h4>
              <ul class="text-brand-dark/80">
                <li>• Проекты строительства объектов</li>
                <li>• Технологические карты</li>
                <li>• ППР (проекты производства работ)</li>
                <li>• Фотографии выполненных работ</li>
                <li>• Сертификаты качества</li>
              </ul>
            </div>

            <div class="border-l-4 border-brand-navy pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">Для проектировщиков (НОК НОПРИЗ):</h4>
              <ul class="text-brand-dark/80">
                <li>• Проектная документация</li>
                <li>• Расчеты и обоснования</li>
                <li>• Чертежи и схемы</li>
                <li>• Пояснительные записки</li>
                <li>• Экспертные заключения</li>
              </ul>
            </div>
          </div>

          <h3>Типичные ошибки при составлении портфолио</h3>
          <div class="bg-red-50 border-l-4 border-red-400 p-4 my-6">
            <ul class="list-disc list-inside space-y-2">
              <li>Неполная информация о проектах</li>
              <li>Отсутствие подтверждающих документов</li>
              <li>Неактуальные материалы</li>
              <li>Плохое качество сканирования</li>
              <li>Отсутствие структуры и логики</li>
              <li>Несоответствие требованиям профессиональных стандартов</li>
            </ul>
          </div>

          <h3>Советы по составлению качественного портфолио</h3>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-brand-sky/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">✅ Что делать:</h4>
              <ul class="space-y-2 text-sm">
                <li>Внимательно изучите требования к квалификации</li>
                <li>Подберите разнообразные примеры работ</li>
                <li>Добавьте краткие описания к каждому проекту</li>
                <li>Проверьте актуальность всех документов</li>
                <li>Попросите коллег проверить портфолио</li>
              </ul>
            </div>
            <div class="bg-brand-coral/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">❌ Чего избегать:</h4>
              <ul class="space-y-2 text-sm">
                <li>Копирования чужих работ</li>
                <li>Использования устаревших документов</li>
                <li>Небрежного оформления</li>
                <li>Отсутствия подтверждающих документов</li>
                <li>Несоответствия заявленной квалификации</li>
              </ul>
            </div>
          </div>

          <h3>Проверка портфолио перед подачей</h3>
          <div class="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
            <h4 class="font-bold text-green-800 mb-4">🔍 Чек-лист проверки:</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-semibold text-green-700 mb-2">Содержание:</h5>
                <ul class="text-sm space-y-1">
                  <li>✓ Все разделы заполнены</li>
                  <li>✓ Примеры работ соответствуют квалификации</li>
                  <li>✓ Документы актуальны</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-green-700 mb-2">Оформление:</h5>
                <ul class="text-sm space-y-1">
                  <li>✓ Качество сканирования хорошее</li>
                  <li>✓ Структура логична</li>
                  <li>✓ Нумерация страниц</li>
                </ul>
              </div>
            </div>
          </div>
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
            <a routerLink="/info/online-trainer" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">💻</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Тренажер НОК онлайн</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Демо-версия тренажера. Практика в режиме реального времени.</p>
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
export class PortfolioGuidePageComponent implements OnInit {
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
    this.infoService.getPageBySlug('portfolio-guide').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    // Временно используем общий метод, позже добавим специфичный
    this.seoService.setInfoPageSeo();
  }
} 