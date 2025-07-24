import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service, ServiceCategory } from '../models/service.interface';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Header -->
    <section class="relative py-20 overflow-hidden">
      <!-- Простой светлый фон -->
      <div class="absolute inset-0 bg-white"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full mb-6 border border-gray-200">
            <div class="w-2 h-2 bg-brand-coral rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-brand-dark/80">Профессиональная подготовка</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-bold text-brand-dark mb-6">
            Наши услуги
          </h1>
          <p class="text-xl text-brand-dark/70 leading-relaxed max-w-2xl mx-auto">
            Комплексная подготовка к НОК для специалистов всех уровней. 
            Выберите подходящий курс и гарантированно сдайте экзамен.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <!-- Services Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            *ngFor="let category of categories"
            (click)="selectCategory(category.key)"
            [class]="selectedCategory === category.key ? 
              'bg-brand-navy text-white' : 
              'bg-white/50 text-brand-dark hover:bg-white/70'"
            class="px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-brand-sky/20 backdrop-blur-sm">
            {{ category.name }}
          </button>
        </div>

        <!-- Services Grid -->
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            *ngFor="let service of filteredServices; trackBy: trackByServiceId"
            class="group relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-brand-sky/10 hover:bg-white/70 hover:border-brand-sky/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            
            <!-- Popular Badge -->
            <div 
              *ngIf="service.popular"
              class="absolute -top-3 -right-3 bg-gradient-to-r from-brand-coral to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
              ⭐ Популярно
            </div>

            <!-- Service Icon -->
            <div class="w-16 h-16 bg-gradient-to-br from-brand-sky/20 to-brand-navy/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">{{ service.icon }}</span>
            </div>

            <!-- Service Content -->
            <div class="space-y-4">
              <!-- Title and Difficulty -->
              <div>
                <h3 class="text-2xl font-semibold text-brand-dark mb-2 group-hover:text-brand-navy transition-colors">
                  {{ service.title }}
                </h3>
                <div class="flex items-center gap-2 mb-3">
                  <span 
                    [class]="getDifficultyClass(service.difficulty)"
                    class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ service.difficulty }}
                  </span>
                  <span class="text-brand-dark/60 text-sm">{{ service.duration }}</span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-brand-dark/70 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Features -->
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-brand-dark/80 uppercase tracking-wide">Что включено:</h4>
                <ul class="space-y-1">
                  <li 
                    *ngFor="let feature of service.features.slice(0, 3)" 
                    class="flex items-center gap-2 text-sm text-brand-dark/70">
                    <div class="w-1.5 h-1.5 bg-brand-sky rounded-full"></div>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- Price and CTA -->
              <div class="pt-4 border-t border-brand-sky/10">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <div class="text-2xl font-bold text-brand-navy">{{ service.price }}</div>
                    <div class="text-sm text-brand-dark/60">за полный курс</div>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <button class="w-full bg-gradient-to-r from-brand-navy to-brand-dark text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    Подробнее
                  </button>
                  <button class="w-full bg-white/50 backdrop-blur-sm border border-brand-sky/20 text-brand-dark py-3 px-4 rounded-xl font-medium hover:bg-white/70 transition-all duration-300">
                    Бесплатная консультация
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-brand-dark mb-4">Наши результаты</h2>
          <p class="text-brand-dark/70">Статистика успешности наших курсов</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/10">
            <div class="text-4xl font-bold text-brand-navy mb-2">98%</div>
            <div class="text-brand-dark/70">Успешная сдача НОК</div>
          </div>
                      <div class="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/10">
              <div class="text-4xl font-bold text-brand-coral mb-2">3000+</div>
              <div class="text-brand-dark/70">Подготовленных специалистов</div>
            </div>
            <div class="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/10">
              <div class="text-4xl font-bold text-brand-navy mb-2">4.9</div>
              <div class="text-brand-dark/70">Средний балл экзамена</div>
            </div>
            <div class="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-sky/10">
              <div class="text-4xl font-bold text-brand-dark mb-2">30</div>
              <div class="text-brand-dark/70">Дней подготовки</div>
            </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative">
      <!-- Простой светлый фон -->
      <div class="absolute inset-0 bg-white"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="bg-white rounded-3xl p-12 text-brand-dark relative overflow-hidden shadow-xl border border-brand-sky/20">
            <!-- Enhanced Decorative Elements -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-coral/10 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-brand-cream/15 to-transparent rounded-full -ml-16 -mb-16"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-brand-sky/5 to-transparent rounded-full"></div>
            
            <div class="relative z-10">
              <!-- Badge -->
              <div class="inline-flex items-center gap-2 bg-brand-sky/10 px-6 py-2 rounded-full mb-6 border border-brand-sky/20">
                <div class="w-2 h-2 bg-brand-coral rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-brand-dark">Специальное предложение</span>
              </div>
              
              <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-dark">
                Готовы начать подготовку?
              </h2>
              <p class="text-xl text-brand-dark/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Получите персональный план подготовки и гарантированно сдайте НОК с первого раза
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-brand-coral hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border border-brand-coral/30">
                  📞 Бесплатная консультация
                </button>
                <button class="bg-brand-navy hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  📧 Оставить заявку
                </button>
              </div>

              <!-- Trust Indicators -->
              <div class="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t border-brand-sky/20">
                <div class="flex items-center gap-2 text-brand-dark/80">
                  <span class="text-brand-coral">✓</span>
                  <span class="text-sm">Гарантия результата</span>
                </div>
                <div class="flex items-center gap-2 text-brand-dark/80">
                  <span class="text-brand-coral">✓</span>
                  <span class="text-sm">Бесплатная пересдача</span>
                </div>
                <div class="flex items-center gap-2 text-brand-dark/80">
                  <span class="text-brand-coral">✓</span>
                  <span class="text-sm">Поддержка 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ServicesPageComponent implements OnInit {
  selectedCategory: string = 'all';
  
  categories = [
    { key: 'all', name: 'Все услуги' },
    { key: ServiceCategory.CONSTRUCTION, name: 'Строительство' },
    { key: ServiceCategory.DESIGN, name: 'Проектирование' },
    { key: ServiceCategory.RESEARCH, name: 'Изыскания' },
    { key: ServiceCategory.SAFETY, name: 'Пром. безопасность' },
    { key: ServiceCategory.CONSULTATION, name: 'Консультации' }
  ];

  services: Service[] = [
    {
      id: 'nok-construction',
      title: 'НОК по строительству',
      description: 'Комплексная подготовка к независимой оценке квалификации для специалистов строительной отрасли. Изучение всех аспектов современного строительства.',
      icon: '🏗️',
      price: '25 000 ₽',
      duration: '30 дней',
      features: [
        'Теоретическая подготовка',
        'Практические задания',
        'Пробные экзамены',
        'Индивидуальные консультации',
        'Актуальные нормативы'
      ],
      category: ServiceCategory.CONSTRUCTION,
      difficulty: 'Средний',
      popular: true
    },
    {
      id: 'nok-design',
      title: 'НОК по проектированию',
      description: 'Специализированный курс для архитекторов и проектировщиков. Углубленное изучение проектной документации и нормативов.',
      icon: '📐',
      price: '28 000 ₽',
      duration: '35 дней',
      features: [
        'Проектная документация',
        'CAD системы',
        'Нормативная база',
        'Экспертиза проектов',
        'Авторский надзор'
      ],
      category: ServiceCategory.DESIGN,
      difficulty: 'Продвинутый'
    },
    {
      id: 'nok-research',
      title: 'НОК по изысканиям',
      description: 'Подготовка специалистов инженерных изысканий. Геология, геодезия, экология - все необходимые знания для успешной сдачи.',
      icon: '🔬',
      price: '22 000 ₽',
      duration: '25 дней',
      features: [
        'Инженерная геология',
        'Геодезические работы',
        'Экологические изыскания',
        'Полевые работы',
        'Лабораторные исследования'
      ],
      category: ServiceCategory.RESEARCH,
      difficulty: 'Средний'
    },
    {
      id: 'nok-safety',
      title: 'НОК по пром. безопасности',
      description: 'Обучение специалистов промышленной безопасности опасных производственных объектов. Актуальные требования и практические кейсы.',
      icon: '⚠️',
      price: '30 000 ₽',
      duration: '40 дней',
      features: [
        'Промышленная безопасность',
        'Анализ рисков',
        'Экспертиза безопасности',
        'Надзорная деятельность',
        'Аварийные ситуации'
      ],
      category: ServiceCategory.SAFETY,
      difficulty: 'Продвинутый',
      popular: true
    },
    {
      id: 'consultation',
      title: 'Индивидуальные консультации',
      description: 'Персональные консультации с экспертами по любым вопросам НОК. Разбор сложных тем и подготовка к пересдачам.',
      icon: '👨‍🏫',
      price: '3 000 ₽',
      duration: '2 часа',
      features: [
        'Индивидуальный подход',
        'Экспертные консультации',
        'Разбор ошибок',
        'Дополнительные материалы',
        'Гибкий график'
      ],
      category: ServiceCategory.CONSULTATION,
      difficulty: 'Начальный'
    },
    {
      id: 'nok-refresher',
      title: 'Курс повышения квалификации',
      description: 'Обновление знаний для специалистов с опытом. Новые нормативы, изменения в законодательстве и практические нововведения.',
      icon: '📚',
      price: '18 000 ₽',
      duration: '20 дней',
      features: [
        'Актуальные изменения',
        'Новые нормативы',
        'Практические кейсы',
        'Обмен опытом',
        'Сертификат повышения'
      ],
      category: ServiceCategory.CONSULTATION,
      difficulty: 'Начальный'
    }
  ];

  filteredServices: Service[] = [];

  ngOnInit() {
    this.filteredServices = this.services;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.category === category);
    }
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty) {
      case 'Начальный':
        return 'bg-green-100 text-green-700';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-700';
      case 'Продвинутый':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
} 