import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-nok-qa-page',
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
          <li class="text-brand-dark font-medium">Вопросы и ответы НОК</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">❔</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Вопросы и ответы НОК</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          База знаний по темам. Разбор сложных вопросов. Примеры заданий.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 25 минут</span>
          <span>📅 Обновлено: 13 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Часто задаваемые вопросы о НОК</h2>
          <p>В этом разделе собраны ответы на наиболее популярные вопросы о независимой оценке квалификации.</p>

          <div class="space-y-8">
            <!-- FAQ Section 1 -->
            <div class="bg-white rounded-xl border border-brand-sky/20 p-6">
              <h3 class="text-xl font-bold text-brand-dark mb-4">📋 Общие вопросы о НОК</h3>
              
              <div class="space-y-6">
                <div class="border-l-4 border-brand-sky pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Что такое НОК и зачем она нужна?</h4>
                  <p class="text-brand-dark/80">НОК - это независимая оценка квалификации, которая подтверждает соответствие специалиста профессиональным стандартам. Она необходима для включения в Национальный реестр специалистов (НРС).</p>
                </div>

                <div class="border-l-4 border-brand-sky pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Кому обязательно проходить НОК?</h4>
                  <p class="text-brand-dark/80">Специалисты, включенные в Национальный реестр специалистов (НРС), должны проходить НОК в обязательном порядке. Это касается строителей, проектировщиков и других специалистов.</p>
                </div>

                <div class="border-l-4 border-brand-sky pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Как часто нужно проходить НОК?</h4>
                  <p class="text-brand-dark/80">Периодичность прохождения НОК зависит от специальности и уровня квалификации. Обычно это 3-5 лет, но точные сроки определяются профессиональными стандартами.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Section 2 -->
            <div class="bg-white rounded-xl border border-brand-sky/20 p-6">
              <h3 class="text-xl font-bold text-brand-dark mb-4">🏗️ Вопросы по НОК НОСТРОЙ</h3>
              
              <div class="space-y-6">
                <div class="border-l-4 border-brand-coral pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Какие квалификации оцениваются в НОК НОСТРОЙ?</h4>
                  <p class="text-brand-dark/80">В НОК НОСТРОЙ оцениваются квалификации 5-7 уровня по строительным специальностям: мастера, прорабы, начальники участков, руководители строительных организаций.</p>
                </div>

                <div class="border-l-4 border-brand-coral pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Какие документы нужны для НОК НОСТРОЙ?</h4>
                  <p class="text-brand-dark/80">Необходимы: паспорт, диплом об образовании, трудовые книжки, сертификаты о повышении квалификации, портфолио с примерами работ.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Section 3 -->
            <div class="bg-white rounded-xl border border-brand-sky/20 p-6">
              <h3 class="text-xl font-bold text-brand-dark mb-4">📐 Вопросы по НОК НОПРИЗ</h3>
              
              <div class="space-y-6">
                <div class="border-l-4 border-brand-navy pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Что входит в портфолио для НОК НОПРИЗ?</h4>
                  <p class="text-brand-dark/80">Портфолио должно содержать: проекты, выполненные специалистом, технические решения, расчеты, чертежи, пояснительные записки к проектам.</p>
                </div>

                <div class="border-l-4 border-brand-navy pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Как проходит защита проектов в НОК НОПРИЗ?</h4>
                  <p class="text-brand-dark/80">Защита включает презентацию проектов из портфолио, ответы на вопросы экспертов, обоснование принятых технических решений.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Section 4 -->
            <div class="bg-white rounded-xl border border-brand-sky/20 p-6">
              <h3 class="text-xl font-bold text-brand-dark mb-4">💼 Подготовка и документы</h3>
              
              <div class="space-y-6">
                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Сколько времени нужно на подготовку к НОК?</h4>
                  <p class="text-brand-dark/80">Рекомендуется начинать подготовку за 2-3 месяца до экзамена. Это время необходимо для изучения нормативной базы, составления портфолио и практической подготовки.</p>
                </div>

                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Можно ли пересдать НОК при неудаче?</h4>
                  <p class="text-brand-dark/80">Да, при неудачной сдаче НОК можно пересдать экзамен. Сроки пересдачи и количество попыток определяются центром оценки квалификации.</p>
                </div>

                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-semibold text-brand-dark mb-2">Сколько стоит прохождение НОК?</h4>
                  <p class="text-brand-dark/80">Стоимость НОК зависит от квалификации и центра оценки. Обычно составляет от 15 000 до 50 000 рублей. Точную стоимость можно уточнить в выбранном ЦОК.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tips Section -->
          <div class="mt-12 bg-gradient-to-r from-brand-sky/10 to-brand-coral/10 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-brand-dark mb-4">💡 Полезные советы</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-brand-dark mb-2">При подготовке к НОК:</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Изучите актуальные нормативные документы</li>
                  <li>• Внимательно ознакомьтесь с профессиональными стандартами</li>
                  <li>• Подготовьте качественное портфолио</li>
                  <li>• Пройдите тренировочные тесты</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-brand-dark mb-2">На экзамене:</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Внимательно читайте вопросы</li>
                  <li>• Не торопитесь с ответами</li>
                  <li>• Обосновывайте свои решения</li>
                  <li>• Сохраняйте спокойствие</li>
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
export class NokQaPageComponent implements OnInit {
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
    this.infoService.getPageBySlug('nok-qa').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    this.seoService.setInfoPageSeo();
  }
} 