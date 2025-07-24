import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfoSection, InfoPage, InfoCategory } from '../models/info-page.interface';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Page Header -->
    <section class="relative py-20 overflow-hidden">
      <!-- Minimal Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-white via-brand-cream/5 to-brand-sky/10"></div>
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-sky/20 to-transparent"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-brand-sky/20">
            <div class="w-2 h-2 bg-brand-coral rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-brand-dark/80">Информационный центр</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-bold text-brand-dark mb-6">
            Всё о НОК
          </h1>
          <p class="text-xl text-brand-dark/70 leading-relaxed max-w-2xl mx-auto font-medium">
            Полная база знаний о независимой оценке квалификации. 
            От основ до экспертных материалов — всё в одном месте.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Pages -->
    <section class="py-16 bg-gradient-to-b from-transparent to-brand-sky/5">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-brand-dark mb-4">Рекомендуемые материалы</h2>
          <p class="text-brand-dark/70 font-medium">Начните изучение НОК с этих ключевых страниц</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div 
            *ngFor="let page of featuredPages"
            class="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/10 hover:bg-white/70 hover:border-brand-sky/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            
            <!-- Icon -->
            <div class="w-16 h-16 bg-gradient-to-br from-brand-sky/20 to-brand-navy/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">{{ page.icon }}</span>
            </div>

            <!-- Content -->
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-brand-dark leading-tight group-hover:text-brand-navy transition-colors">
                {{ page.title }}
              </h3>
              
              <p class="text-brand-dark/70 leading-relaxed font-medium text-sm line-clamp-3">
                {{ page.description }}
              </p>

              <!-- Meta -->
              <div class="flex items-center justify-between text-xs text-brand-dark/60 pt-2 border-t border-brand-sky/10">
                <span class="font-medium">{{ page.readTime }} мин чтения</span>
                <span class="bg-brand-sky/10 text-brand-navy px-2 py-1 rounded-full font-medium">
                  {{ page.category.name.split(' ')[0] }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Sections -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <!-- Section Navigation -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-brand-dark mb-6">Разделы информации</h2>
          <p class="text-xl text-brand-dark/70 font-medium max-w-3xl mx-auto">
            Вся информация структурирована по тематическим разделам для удобного изучения
          </p>
        </div>

        <!-- Sections Grid -->
        <div class="space-y-16">
          <div 
            *ngFor="let section of infoSections; let sectionIndex = index"
            class="relative">
            
            <!-- Section Header -->
            <div class="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                     [class]="section.category.color">
                  <span class="text-white drop-shadow-sm">{{ section.category.icon }}</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-brand-dark">{{ section.category.name }}</h3>
                  <p class="text-brand-dark/70 font-medium">{{ section.category.description }}</p>
                </div>
              </div>
              
              <div class="lg:ml-auto">
                <span class="bg-white/50 backdrop-blur-sm border border-brand-sky/20 px-4 py-2 rounded-full text-sm font-medium text-brand-dark">
                  {{ section.pages.length }} {{ section.pages.length === 1 ? 'страница' : 'страниц' }}
                </span>
              </div>
            </div>

            <!-- Pages Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                *ngFor="let page of section.pages"
                class="group bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-brand-sky/10 hover:bg-white/50 hover:border-brand-sky/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                
                <div class="flex items-start gap-3">
                  <!-- Page Icon -->
                  <div class="w-10 h-10 bg-gradient-to-br from-brand-sky/10 to-brand-navy/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span class="text-lg">{{ page.icon }}</span>
                  </div>

                  <!-- Page Content -->
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-brand-dark leading-tight mb-1 group-hover:text-brand-navy transition-colors line-clamp-2">
                      {{ page.title }}
                    </h4>
                    
                    <p class="text-sm text-brand-dark/70 leading-relaxed font-medium line-clamp-2 mb-2">
                      {{ page.description }}
                    </p>

                    <!-- Meta Info -->
                    <div class="flex items-center gap-3 text-xs text-brand-dark/60">
                      <span class="font-medium">{{ page.readTime }} мин</span>
                      <span *ngIf="page.featured" class="bg-brand-coral/20 text-brand-coral px-2 py-0.5 rounded-full font-medium">
                        ⭐ Топ
                      </span>
                      <span class="text-brand-dark/40">•</span>
                      <span>{{ formatDate(page.lastUpdated) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Search Section -->
    <section class="py-20 bg-gradient-to-b from-brand-sky/5 to-transparent">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-brand-dark mb-6">Не нашли нужную информацию?</h2>
          <p class="text-xl text-brand-dark/70 font-medium mb-8">
            Воспользуйтесь поиском или свяжитесь с нашими экспертами
          </p>
          
          <!-- Search Bar -->
          <div class="relative mb-8">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="text-brand-dark/40 text-xl">🔍</span>
            </div>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchChange()"
              placeholder="Поиск по всем материалам..."
              class="w-full pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border border-brand-sky/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent transition-all font-medium"
            >
          </div>

          <!-- Search Results -->
          <div *ngIf="searchResults.length > 0" class="bg-white/50 backdrop-blur-sm rounded-2xl border border-brand-sky/20 p-6 mb-8">
            <h3 class="text-lg font-bold text-brand-dark mb-4">Результаты поиска ({{ searchResults.length }})</h3>
            <div class="grid gap-3">
              <div 
                *ngFor="let result of searchResults.slice(0, 5)"
                class="flex items-center gap-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors cursor-pointer">
                <span class="text-lg">{{ result.icon }}</span>
                <div class="flex-1 text-left">
                  <div class="font-medium text-brand-dark">{{ result.title }}</div>
                  <div class="text-sm text-brand-dark/60">{{ result.category.name }}</div>
                </div>
                <div class="text-xs text-brand-dark/60">{{ result.readTime }} мин</div>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-brand-coral hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              📞 Задать вопрос эксперту
            </button>
            <button routerLink="/services" class="bg-white/50 backdrop-blur-sm border border-brand-sky/20 text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-white/70 transition-all duration-300 hover:-translate-y-1">
              📚 Записаться на курс
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class InfoPageComponent implements OnInit {
  infoSections: InfoSection[] = [];
  featuredPages: InfoPage[] = [];
  searchQuery = '';
  searchResults: InfoPage[] = [];
  
  private searchTimeout: any;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.loadInfoSections();
    this.loadFeaturedPages();
  }

  loadInfoSections(): void {
    this.infoService.getInfoSections().subscribe(sections => {
      this.infoSections = sections;
    });
  }

  loadFeaturedPages(): void {
    this.infoService.getFeaturedPages().subscribe(pages => {
      this.featuredPages = pages;
    });
  }

  onSearchChange(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        this.infoService.searchPages(this.searchQuery).subscribe(results => {
          this.searchResults = results;
        });
      } else {
        this.searchResults = [];
      }
    }, 300);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }
} 