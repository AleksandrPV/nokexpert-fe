import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ORGANIZATION_CONFIG } from '../../../../environments/organization.config';
import { IconModule } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconModule],
  template: `
    <footer class="bg-slate-900 mt-0">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        <div>
          <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">

            <!-- Company Info -->
            <div class="space-y-5">
              <div class="flex items-center gap-3.5 group relative">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="relative z-10 shrink-0 transform group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 drop-shadow-md">
                  <path d="M12 21.5C12 21.5 4 16.5 4 9.5V5.5L12 2.5L20 5.5V9.5C20 16.5 12 21.5 12 21.5Z" fill="url(#footer-shield-grad)" stroke="url(#footer-shield-border)" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M8.5 11.5L11 14L16 8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <defs>
                    <linearGradient id="footer-shield-grad" x1="4" y1="2.5" x2="20" y2="21.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#3B82F6"/>
                      <stop offset="1" stop-color="#1D4ED8"/>
                    </linearGradient>
                    <linearGradient id="footer-shield-border" x1="4" y1="2.5" x2="20" y2="21.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#60A5FA"/>
                      <stop offset="1" stop-color="#2563EB"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="flex flex-col justify-center">
                  <div class="text-[20px] tracking-tight transition-colors duration-300 flex items-center leading-none">
                    <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">НОК</span>
                    <span class="ml-1 font-bold text-white/95">Эксперт</span>
                  </div>
                  <p class="text-[9.5px] font-bold tracking-[0.06em] uppercase text-[#A5B4FC] mt-[5px]">Независимая оценка квалификаций</p>
                </div>
              </div>

              <p class="text-slate-400 leading-relaxed text-sm">
                Профессиональная подготовка к независимой оценке квалификации для специалистов строительной отрасли.
              </p>

              <div class="flex gap-3">
                <a [href]="'https://t.me/' + ORGANIZATION_CONFIG.social?.telegram" target="_blank" rel="noopener noreferrer"
                   class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 text-slate-400 hover:text-white"
                   title="Telegram">
                  <lucide-icon name="send" [size]="20"></lucide-icon>
                </a>

                <a [href]="'https://wa.me/' + ORGANIZATION_CONFIG.social?.whatsapp" target="_blank" rel="noopener noreferrer"
                   class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 text-slate-400 hover:text-white"
                   title="WhatsApp">
                  <lucide-icon name="message-circle" [size]="20"></lucide-icon>
                </a>
              </div>
            </div>

            <!-- Services -->
            <div class="space-y-5">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Услуги</h4>
              <div class="space-y-3">
                <a routerLink="/services/nok-nostroy" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  НОК НОСТРОЙ
                </a>
                <a routerLink="/services/nok-nopriz" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  НОК НОПРИЗ
                </a>
                <a routerLink="/services/nok-opb" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  НОК МЧС
                </a>
                <a routerLink="/services/nok-housing" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  НОК ЖКХ
                </a>
              </div>
            </div>

            <!-- Information -->
            <div class="space-y-5">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Информация</h4>
              <div class="space-y-3">
                <a routerLink="/info" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Что такое НОК
                </a>
                <a routerLink="/faq" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Частые вопросы
                </a>
                <a routerLink="/qa-centers" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Центры оценки
                </a>
                <a routerLink="/qualifications" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Квалификации
                </a>
                <a routerLink="/trainer" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Тренажёр НОК
                </a>
                <a routerLink="/consultation" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Консультации
                </a>
                <a routerLink="/sitemap" class="block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Карта сайта
                </a>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Контакты</h4>

              <div class="bg-slate-800 rounded-xl p-4 space-y-1">
                <div class="flex items-center gap-2">
                  <lucide-icon name="phone" [size]="14" class="text-slate-500"></lucide-icon>
                  <h5 class="text-sm font-medium text-white">Телефон</h5>
                </div>
                <a [href]="'tel:' + ORGANIZATION_CONFIG.phone.href" class="text-sm text-slate-400 hover:text-white transition-colors">
                  {{ ORGANIZATION_CONFIG.phone.display }}
                </a>
                <p class="text-xs text-slate-500">Звонок бесплатный</p>
              </div>

              <div class="bg-slate-800 rounded-xl p-4 space-y-1">
                <div class="flex items-center gap-2">
                  <lucide-icon name="mail" [size]="14" class="text-slate-500"></lucide-icon>
                  <h5 class="text-sm font-medium text-white">Email</h5>
                </div>
                <a [href]="'mailto:' + ORGANIZATION_CONFIG.email" class="text-sm text-slate-400 hover:text-white transition-colors">
                  {{ ORGANIZATION_CONFIG.email }}
                </a>
                <p class="text-xs text-slate-500">Ответим в течение часа</p>
              </div>
            </div>
          </div>

          <!-- Bottom Section -->
          <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800">
            <div class="text-center md:text-left">
              <p class="text-slate-500 text-sm">&copy; 2021&ndash;{{ currentYear }} НОК Эксперт. Все права защищены.</p>
              <p class="text-slate-600 text-xs mt-1">
                Сертифицированный центр подготовки к НОК
              </p>
            </div>

            <div class="flex flex-wrap gap-6 text-sm">
              <a routerLink="/privacy-policy" class="text-slate-500 hover:text-white transition-colors">Политика конфиденциальности</a>
              <a routerLink="/user-agreement" class="text-slate-500 hover:text-white transition-colors">Пользовательское соглашение</a>
              <a routerLink="/sitemap" class="text-slate-500 hover:text-white transition-colors">Карта сайта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  ORGANIZATION_CONFIG = ORGANIZATION_CONFIG;
  currentYear = new Date().getFullYear();
}
