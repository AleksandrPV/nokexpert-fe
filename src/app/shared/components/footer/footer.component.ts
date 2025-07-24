import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky">
                <span class="text-brand-navy">📘</span>
              </a>
              <a href="#" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky">
                <span class="text-brand-sky">📱</span>
              </a>
              <a href="#" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky">
                <span class="text-brand-sky">💬</span>
              </a>
              <a href="#" class="w-10 h-10 glass-dark rounded-xl flex items-center justify-center hover-lift border-brand-sky">
                <span class="text-brand-coral">📺</span>
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
              <a routerLink="/blog" class="block text-brand-dark/80 hover:text-gradient-accent transition-all duration-300 hover:translate-x-2">
                Блог и новости
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
              <a href="tel:+78001234567" class="text-brand-dark/80 hover:text-brand-sky transition-colors">
                8 (800) 123-45-67
              </a>
              <p class="text-brand-dark/60 text-xs">Звонок бесплатный</p>
            </div>

            <div class="glass-dark rounded-xl p-4 hover-lift card-navy">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-brand-navy rounded-xl flex items-center justify-center">✉️</div>
                <h5 class="font-semibold text-brand-dark">Email</h5>
              </div>
              <a href="mailto:info&#64;nok-expert.ru" class="text-brand-dark/80 hover:text-brand-navy transition-colors">
                info&#64;nok-expert.ru
              </a>
              <p class="text-brand-dark/60 text-xs">Ответим в течение часа</p>
            </div>

            <div class="glass-dark rounded-xl p-4 hover-lift card-coral">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-brand-coral rounded-xl flex items-center justify-center">📍</div>
                <h5 class="font-semibold text-brand-dark">Офис</h5>
              </div>
              <p class="text-brand-dark/80">Москва, ул. Примерная, д. 1</p>
              <p class="text-brand-dark/60 text-xs">Ежедневно 9:00-21:00</p>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-brand-sky/30">
          <div class="text-center md:text-left">
            <p class="text-brand-dark/70 text-sm">© 2024 НОК Эксперт. Все права защищены.</p>
            <p class="text-brand-dark/60 text-xs mt-1">
              Лицензия на образовательную деятельность № Л035-01234-77/00123456
            </p>
          </div>

          <div class="flex flex-wrap gap-6 text-sm">
            <a href="#" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Политика конфиденциальности</a>
            <a href="#" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Пользовательское соглашение</a>
            <a href="#" class="text-brand-dark/70 hover:text-brand-dark transition-colors">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {} 