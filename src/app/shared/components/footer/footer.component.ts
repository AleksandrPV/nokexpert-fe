import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ORGANIZATION_CONFIG } from '../../../../environments/organization.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative mt-24 overflow-hidden bg-gradient-to-br from-brand-cream/20 to-brand-sky/30 border-t border-brand-sky/30">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-gradient-to-br from-brand-navy/5 via-brand-coral/5 to-brand-cream/10"></div>
      <div class="absolute inset-0 glass-dark"></div>

      <!-- Main Footer Content -->
      <div class="relative z-10 container mx-auto px-6 py-16">
        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">

          <!-- Company Info -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 neomorphic rounded-2xl flex items-center justify-center text-2xl">🏗️</div>
              <div>
                <h3 class="text-xl font-black text-gradient-primary">НОК Эксперт</h3>
                <p class="text-xs text-brand-dark/70">Гарантированный успех</p>
              </div>
            </div>

            <p class="text-brand-dark/80 leading-relaxed">
              Профессиональная подготовка к независимой оценке квалификации для специалистов строительной отрасли.
            </p>

            <div class="flex gap-3 sm:gap-4 flex-wrap">
              <!-- ВКонтакте -->
              <a [href]="'https://vk.com/' + ORGANIZATION_CONFIG.social?.vk" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="ВКонтакте">
                <span class="text-blue-600 group-hover:scale-110 transition-transform text-lg">🔵</span>
              </a>
              
              <!-- Telegram -->
              <a [href]="'https://t.me/' + ORGANIZATION_CONFIG.social?.telegram" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="Telegram">
                <span class="text-blue-500 group-hover:scale-110 transition-transform text-lg">✈️</span>
              </a>
              
              <!-- WhatsApp -->
              <a [href]="'https://wa.me/' + ORGANIZATION_CONFIG.social?.whatsapp" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="WhatsApp">
                <span class="text-green-500 group-hover:scale-110 transition-transform text-lg">📱</span>
              </a>
              
              <!-- YouTube -->
              <a [href]="'https://www.youtube.com/' + ORGANIZATION_CONFIG.social?.youtube" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="YouTube">
                <span class="text-red-500 group-hover:scale-110 transition-transform text-lg">🎥</span>
              </a>
              
              <!-- Instagram -->
              <a [href]="'https://instagram.com/' + ORGANIZATION_CONFIG.social?.instagram" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="Instagram">
                <span class="text-pink-500 group-hover:scale-110 transition-transform text-lg">📸</span>
              </a>
              
              <!-- LinkedIn -->
              <a [href]="'https://linkedin.com/company/' + ORGANIZATION_CONFIG.social?.linkedin" target="_blank" rel="noopener noreferrer" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky group" title="LinkedIn">
                <span class="text-blue-700 group-hover:scale-110 transition-transform text-lg">💼</span>
              </a>
            </div>
          </div>

          <!-- Services -->
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-gradient-secondary">Услуги</h4>
            <div class="space-y-3">
              <a routerLink="/services" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                НОК НОСТРОЙ
              </a>
              <a routerLink="/services" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                НОК НОПРИЗ
              </a>
              <a routerLink="/services" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Консультации экспертов
              </a>
              <a routerLink="/services" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Подготовка документов
              </a>
              <a routerLink="/services" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Запись на экзамен
              </a>
            </div>
          </div>

          <!-- Information -->
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-gradient-secondary">Информация</h4>
            <div class="space-y-3">
              <a routerLink="/info" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Что такое НОК
              </a>
              <a routerLink="/faq" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Частые вопросы
              </a>
              <a routerLink="/center" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Центры оценки
              </a>
              <a routerLink="/qualifications" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Квалификации
              </a>
              <a routerLink="/reviews" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Отзывы клиентов
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <div class="glass-dark rounded-xl p-4 hover-lift border border-brand-sky/30">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-brand-sky rounded-xl flex items-center justify-center">📞</div>
                <h5 class="font-semibold text-brand-dark">Телефон</h5>
              </div>
              <a [href]="'tel:' + ORGANIZATION_CONFIG.phone.href" class="text-brand-dark/80 hover:text-brand-sky transition-colors">
                {{ ORGANIZATION_CONFIG.phone.display }}
              </a>
              <p class="text-brand-dark/60 text-xs">Звонок бесплатный</p>
            </div>

            <div class="glass-dark rounded-xl p-4 hover-lift card-navy">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-brand-navy rounded-xl flex items-center justify-center">✉️</div>
                <h5 class="font-semibold text-brand-dark">Email</h5>
              </div>
              <a [href]="'mailto:' + ORGANIZATION_CONFIG.email" class="text-brand-dark/80 hover:text-brand-navy transition-colors">
                {{ ORGANIZATION_CONFIG.email }}
              </a>
              <p class="text-brand-dark/60 text-xs">Ответим в течение часа</p>
            </div>

            <div class="glass-dark rounded-xl p-4 hover-lift card-coral">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-brand-coral rounded-xl flex items-center justify-center">📍</div>
                <h5 class="font-semibold text-brand-dark">Офис</h5>
              </div>
              <p class="text-brand-dark/80">{{ ORGANIZATION_CONFIG.address.full }}</p>
              <p class="text-brand-dark/60 text-xs">{{ ORGANIZATION_CONFIG.workingHours?.weekdays || 'Пн-Пт: 9:00-18:00' }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-brand-sky/30">
          <div class="text-center md:text-left">
            <p class="text-brand-dark/70 text-sm">© 2021 НОК Эксперт. Все права защищены.</p>
            <p class="text-brand-dark/60 text-xs mt-1">
              Сертифицированный центр подготовки к НОК
            </p>
          </div>

                      <div class="flex flex-wrap gap-6 text-sm">
              <a routerLink="/privacy-policy" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Политика конфиденциальности</a>
              <a routerLink="/user-agreement" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Пользовательское соглашение</a>
              <a routerLink="/public-offer" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Публичная оферта</a>
              <a routerLink="/sitemap" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Карта сайта</a>
            </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  ORGANIZATION_CONFIG = ORGANIZATION_CONFIG;
} 