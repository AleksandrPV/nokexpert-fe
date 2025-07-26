import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { InfoService } from '../services/info.service';
import { InfoPage } from '../models/info-page.interface';

@Component({
  selector: 'app-specialists-registry-page',
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
          <li class="text-brand-dark font-medium">Реестр специалистов НРС</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-brand-sky/20 rounded-2xl mb-6">
          <span class="text-3xl">📜</span>
        </div>
        <h1 class="text-4xl font-bold text-brand-dark mb-4">Реестр специалистов НРС</h1>
        <p class="text-xl text-brand-dark/70 max-w-3xl mx-auto">
          Как проверить статус специалиста. Сроки действия свидетельств. Процедура продления.
        </p>
        <div class="flex items-center justify-center gap-4 mt-6 text-sm text-brand-dark/60">
          <span>⏱️ Время чтения: 8 минут</span>
          <span>📅 Обновлено: 5 января 2024</span>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>Что такое Национальный реестр специалистов (НРС)</h2>
          <p>НРС - это единая база данных специалистов, прошедших независимую оценку квалификации и получивших соответствующие свидетельства.</p>

          <h3>Основные функции НРС</h3>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-brand-sky/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">📋 Информационные функции</h4>
              <ul class="space-y-2 text-sm">
                <li>• Хранение данных о квалификации специалистов</li>
                <li>• Предоставление информации работодателям</li>
                <li>• Контроль сроков действия свидетельств</li>
                <li>• Статистика по отраслям</li>
              </ul>
            </div>
            <div class="bg-brand-coral/10 p-6 rounded-xl">
              <h4 class="font-bold text-brand-navy mb-3">🔍 Контрольные функции</h4>
              <ul class="space-y-2 text-sm">
                <li>• Проверка подлинности свидетельств</li>
                <li>• Мониторинг актуальности квалификаций</li>
                <li>• Контроль соответствия требованиям</li>
                <li>• Предотвращение фальсификаций</li>
              </ul>
            </div>
          </div>

          <h3>Как проверить статус специалиста в НРС</h3>
          <div class="space-y-6">
            <div class="border-l-4 border-brand-sky pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">1. Онлайн проверка</h4>
              <p class="text-brand-dark/80">Используйте официальный сайт НРС для проверки статуса специалиста по ФИО или номеру свидетельства.</p>
            </div>

            <div class="border-l-4 border-brand-coral pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">2. Проверка по свидетельству</h4>
              <p class="text-brand-dark/80">Введите номер свидетельства о квалификации для получения подробной информации.</p>
            </div>

            <div class="border-l-4 border-brand-navy pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">3. Поиск по ФИО</h4>
              <p class="text-brand-dark/80">Найдите специалиста по фамилии, имени и отчеству с указанием региона.</p>
            </div>
          </div>

          <!-- Demo Search Section -->
          <div class="bg-gradient-to-r from-brand-sky/10 to-brand-coral/10 rounded-xl p-8 my-8">
            <h3 class="text-2xl font-bold text-brand-dark mb-6">🔍 Демо-поиск в НРС</h3>
            
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Поиск по ФИО</label>
                  <div class="grid md:grid-cols-3 gap-3">
                    <input type="text" placeholder="Фамилия" class="w-full p-3 border border-brand-sky/30 rounded-xl focus:border-brand-sky focus:outline-none">
                    <input type="text" placeholder="Имя" class="w-full p-3 border border-brand-sky/30 rounded-xl focus:border-brand-sky focus:outline-none">
                    <input type="text" placeholder="Отчество" class="w-full p-3 border border-brand-sky/30 rounded-xl focus:border-brand-sky focus:outline-none">
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-brand-dark mb-2">Или поиск по номеру свидетельства</label>
                  <input type="text" placeholder="Номер свидетельства" class="w-full p-3 border border-brand-sky/30 rounded-xl focus:border-brand-sky focus:outline-none">
                </div>

                <button class="w-full bg-brand-coral text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
                  Найти специалиста
                </button>
              </div>
            </div>

            <div class="mt-6 text-center">
              <p class="text-sm text-brand-dark/60">
                Это демо-версия. Для реальной проверки используйте официальный сайт НРС.
              </p>
            </div>
          </div>

          <h3>Сроки действия свидетельств</h3>
          <div class="space-y-4">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-6">
              <h4 class="font-bold text-brand-dark mb-3">⏰ Периодичность подтверждения квалификации:</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 class="font-semibold text-brand-navy mb-2">Строительные специальности:</h5>
                  <ul class="text-sm space-y-1">
                    <li>• 5 уровень - 3 года</li>
                    <li>• 6 уровень - 4 года</li>
                    <li>• 7 уровень - 5 лет</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-semibold text-brand-navy mb-2">Проектировщики:</h5>
                  <ul class="text-sm space-y-1">
                    <li>• 6 уровень - 4 года</li>
                    <li>• 7 уровень - 5 лет</li>
                    <li>• 8 уровень - 6 лет</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3>Процедура продления свидетельства</h3>
          <div class="space-y-6">
            <div class="border-l-4 border-brand-sky pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">1. Подготовка документов</h4>
              <p class="text-brand-dark/80">Соберите документы о повышении квалификации, новых проектах и достижениях за период действия свидетельства.</p>
            </div>

            <div class="border-l-4 border-brand-coral pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">2. Подача заявки</h4>
              <p class="text-brand-dark/80">Обратитесь в ЦОК с заявкой на продление свидетельства не позднее чем за 3 месяца до истечения срока.</p>
            </div>

            <div class="border-l-4 border-brand-navy pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">3. Прохождение оценки</h4>
              <p class="text-brand-dark/80">Пройдите упрощенную процедуру оценки, включающую проверку новых компетенций и достижений.</p>
            </div>

            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-brand-dark mb-2">4. Получение нового свидетельства</h4>
              <p class="text-brand-dark/80">При успешном прохождении оценки получите новое свидетельство с обновленным сроком действия.</p>
            </div>
          </div>

          <h3>Полезная информация</h3>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h4 class="font-bold text-blue-800 mb-3">🔗 Официальные ресурсы:</h4>
            <ul class="space-y-2">
              <li><a href="https://nrs.rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Официальный сайт Национального реестра специалистов</a></li>
              <li><a href="https://nok.rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Портал независимой оценки квалификации</a></li>
              <li><a href="https://profstandart.rosmintrud.ru" target="_blank" class="text-blue-600 hover:underline">• Реестр профессиональных стандартов</a></li>
            </ul>
          </div>

          <h3>Часто задаваемые вопросы</h3>
          <div class="space-y-4">
            <div class="bg-white border border-brand-sky/20 rounded-xl p-4">
              <h4 class="font-semibold text-brand-dark mb-2">Что делать, если свидетельство истекло?</h4>
              <p class="text-brand-dark/80">Необходимо пройти полную процедуру НОК заново, так как продление возможно только при действующем свидетельстве.</p>
            </div>

            <div class="bg-white border border-brand-sky/20 rounded-xl p-4">
              <h4 class="font-semibold text-brand-dark mb-2">Можно ли проверить свидетельство работодателю?</h4>
              <p class="text-brand-dark/80">Да, работодатели имеют доступ к открытой информации НРС для проверки квалификации сотрудников.</p>
            </div>

            <div class="bg-white border border-brand-sky/20 rounded-xl p-4">
              <h4 class="font-semibold text-brand-dark mb-2">Что означает статус "Приостановлено"?</h4>
              <p class="text-brand-dark/80">Это означает, что свидетельство временно недействительно, обычно из-за нарушений или проверок.</p>
            </div>
          </div>
        </div>

        <!-- Related Pages -->
        <div class="mt-12 pt-8 border-t border-brand-sky/20">
          <h3 class="text-2xl font-bold text-brand-dark mb-6">Связанные материалы</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a routerLink="/qa-centers" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">🏢</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Центры оценки квалификации</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Реестр аккредитованных ЦОК. Контакты и адреса.</p>
              </div>
            </a>
            <a routerLink="/info/nok-legislation" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">⚖️</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Законодательство НОК</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Актуальные нормативные акты и изменения.</p>
              </div>
            </a>
            <a routerLink="/info/nok-procedure" class="group">
              <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg">
                <div class="text-2xl mb-3">📋</div>
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors">Процедура прохождения НОК</h4>
                <p class="text-sm text-brand-dark/60 mt-2">Пошаговая инструкция по прохождению экзамена.</p>
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
export class SpecialistsRegistryPageComponent implements OnInit {
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
    this.infoService.getPageBySlug('specialists-registry').subscribe(page => {
      this.pageData = page;
    });
  }

  private setSeoData(): void {
    // Временно используем общий метод, позже добавим специфичный
    this.seoService.setInfoPageSeo();
  }
} 