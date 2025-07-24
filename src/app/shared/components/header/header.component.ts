import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-2xl border-b border-brand-sky/30">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-3 group cursor-pointer">
            <div class="relative">
              <div class="w-12 h-12 neomorphic rounded-2xl flex items-center justify-center text-2xl group-hover:animate-pulse-glow transition-all duration-300">
                🏗️
              </div>
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-brand-sky rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 class="text-xl font-black text-gradient-primary">НОК Эксперт</h1>
              <p class="text-xs text-brand-dark/70">Гарантированный успех</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <a routerLink="/"
               class="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:glass">
              <span class="relative z-10 text-brand-dark group-hover:text-gradient-primary">Главная</span>
              <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-brand-coral/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-coral to-brand-sky group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>

            <a routerLink="/services"
               class="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:glass">
              <span class="relative z-10 text-brand-dark group-hover:text-gradient-primary">Услуги</span>
              <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-brand-coral/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-coral to-brand-sky group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>

            <a routerLink="/blog"
               class="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:glass">
              <span class="relative z-10 text-brand-dark group-hover:text-gradient-primary">Блог</span>
              <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-brand-coral/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-coral to-brand-sky group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>

            <a routerLink="/info"
               class="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:glass">
              <span class="relative z-10 text-brand-dark group-hover:text-gradient-primary">Информация</span>
              <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-brand-coral/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-coral to-brand-sky group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>

            <a routerLink="/contacts"
               class="relative group px-4 py-2 rounded-xl transition-all duration-300 hover:glass">
              <span class="relative z-10 text-brand-dark group-hover:text-gradient-primary">Контакты</span>
              <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-brand-coral/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-coral to-brand-sky group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </a>
          </div>

          <!-- CTA Buttons -->
          <div class="hidden md:flex items-center gap-4">
            <a href="tel:+78001234567"
               class="glass-dark px-4 py-2 rounded-full text-brand-dark font-medium hover-lift transition-all duration-300 text-sm border-brand-sky">
              📞 Звонок
            </a>
            <button class="btn-coral px-6 py-2 text-sm hover-glow">
              🚀 Консультация
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="lg:hidden glass-dark p-3 rounded-xl hover-lift border-brand-sky" onclick="toggleMobileMenu()">
            <svg class="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="lg:hidden hidden mt-6 glass rounded-2xl p-6 animate-slide-up border-brand-sky">
          <div class="space-y-4">
            <a routerLink="/"
               class="block p-3 rounded-xl hover:glass-dark transition-all duration-300 text-brand-dark">
              🏠 Главная
            </a>
            <a routerLink="/services"
               class="block p-3 rounded-xl hover:glass-dark transition-all duration-300 text-brand-dark">
              🛠️ Услуги
            </a>
            <a routerLink="/blog"
               class="block p-3 rounded-xl hover:glass-dark transition-all duration-300 text-brand-dark">
              📝 Блог
            </a>
            <a routerLink="/info"
               class="block p-3 rounded-xl hover:glass-dark transition-all duration-300 text-brand-dark">
              ℹ️ Информация
            </a>
            <a routerLink="/contacts"
               class="block p-3 rounded-xl hover:glass-dark transition-all duration-300 text-brand-dark">
              📞 Контакты
            </a>

            <div class="pt-4 border-t border-brand-sky/30 space-y-3">
              <a href="tel:+78001234567"
                 class="block p-3 glass-dark rounded-xl text-center font-medium text-brand-dark border-brand-sky">
                📞 8 (800) 123-45-67
              </a>
              <button class="btn-coral w-full py-3">
                🚀 Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Header Spacer -->
    <div class="h-20"></div>

    <script>
      function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        if (menu) {
          menu.classList.toggle('hidden');
        }
      }
    </script>
  `,
  styles: []
})
export class HeaderComponent {} 