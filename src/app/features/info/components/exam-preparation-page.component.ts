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
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">📖</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Подготовка к экзамену НОК</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Методики подготовки. Рекомендуемая литература. Типичные ошибки при подготовке.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 20 минут</span>
          <span>📅 Обновлено: 15 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Методики подготовки к НОК</h2>
          <p>Эффективная подготовка к независимой оценке квалификации требует системного подхода и понимания специфики экзамена.</p>
          
          <h3>Основные этапы подготовки</h3>
          <ol>
            <li><strong>Изучение нормативной базы</strong> - знакомство с ФЗ №238 и подзаконными актами</li>
            <li><strong>Анализ требований к квалификации</strong> - изучение профессиональных стандартов</li>
            <li><strong>Практическая подготовка</strong> - решение типовых задач и кейсов</li>
            <li><strong>Составление портфолио</strong> - сбор и оформление подтверждающих документов</li>
          </ol>

          <h3>Рекомендуемая литература</h3>
          <ul>
            <li>Федеральный закон №238-ФЗ "О независимой оценке квалификации"</li>
            <li>Профессиональные стандарты по вашей специальности</li>
            <li>Методические рекомендации Минтруда России</li>
            <li>Специализированные учебные пособия и справочники</li>
          </ul>

          <h3>Типичные ошибки при подготовке</h3>
          <div class="bg-red-50 border-l-4 border-red-400 p-4 my-6">
            <ul class="list-disc list-inside space-y-2">
              <li>Недостаточное изучение нормативной базы</li>
              <li>Пренебрежение практической частью экзамена</li>
              <li>Неправильное оформление портфолио</li>
              <li>Отсутствие систематизации знаний</li>
              <li>Недооценка важности актуальности информации</li>
            </ul>
          </div>

          <h3>Советы по эффективной подготовке</h3>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-brand-sky/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">📚 Теоретическая подготовка</h4>
              <ul class="space-y-2 text-sm">
                <li>Изучайте актуальные нормативные документы</li>
                <li>Ведите конспекты по ключевым темам</li>
                <li>Регулярно повторяйте изученный материал</li>
              </ul>
            </div>
            <div class="bg-brand-coral/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">🔧 Практическая подготовка</h4>
              <ul class="space-y-2 text-sm">
                <li>Решайте практические задачи</li>
                <li>Изучайте реальные кейсы</li>
                <li>Тренируйтесь в составлении документов</li>
              </ul>
            </div>
          </div>

          <h3>Временные рамки подготовки</h3>
          <p>Рекомендуется начинать подготовку за 2-3 месяца до планируемой даты экзамена. Это позволит:</p>
          <ul>
            <li>Систематически изучить весь необходимый материал</li>
            <li>Выявить и устранить пробелы в знаниях</li>
            <li>Достаточно времени для составления качественного портфолио</li>
            <li>Провести несколько тренировочных тестирований</li>
          </ul>
        </div>

        <!-- Related Pages -->
        <div class="mt-12 pt-8 border-t border-brand-sky/20">
          <h3 class="text-2xl font-bold text-brand-dark mb-6">Связанные материалы</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
export class ExamPreparationPageComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', url: '/', icon: '🏠' },
    { label: 'Информация о НОК', url: '/info', icon: 'ℹ️' },
    { label: 'Подготовка к экзамену НОК', active: true, icon: '📖' }
  ];
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
    this.infoService.getPageBySlug('exam-preparation').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    this.seoService.setInfoPageSeo();
  }
} 