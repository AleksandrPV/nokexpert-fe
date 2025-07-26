import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ContextualLink {
  text: string;
  route: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-contextual-links',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-8 p-6 bg-gradient-to-r from-brand-sky/10 to-brand-coral/10 rounded-xl border border-brand-sky/20">
      <h4 class="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-2">
        <span>🔗</span>
        Полезные ссылки по теме
      </h4>
      <div class="grid md:grid-cols-2 gap-4">
        <a 
          *ngFor="let link of contextualLinks"
          [routerLink]="link.route"
          class="group flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-sky/30">
          <span class="text-xl">{{ link.icon }}</span>
          <div class="flex-1">
            <div class="font-medium text-brand-dark group-hover:text-brand-navy transition-colors">
              {{ link.text }}
            </div>
            <div class="text-sm text-brand-dark/60">
              {{ link.description }}
            </div>
          </div>
          <span class="text-brand-coral opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class ContextualLinksComponent implements OnInit {
  @Input() currentPageId: string = '';
  @Input() context: string = '';
  
  contextualLinks: ContextualLink[] = [];

  ngOnInit(): void {
    this.loadContextualLinks();
  }

  private loadContextualLinks(): void {
    // Определяем контекстные ссылки в зависимости от страницы и контекста
    const linksMap: { [key: string]: ContextualLink[] } = {
      'what-is-nok': [
        {
          text: 'Кому обязательно проходить НОК',
          route: '/info/who-must-pass-nok',
          description: 'Список специалистов, обязанных проходить НОК',
          icon: '👥'
        },
        {
          text: 'Процедура прохождения НОК',
          route: '/info/nok-procedure',
          description: 'Пошаговая инструкция по прохождению экзамена',
          icon: '📋'
        },
        {
          text: 'Законодательство НОК',
          route: '/info/nok-legislation',
          description: 'Актуальные нормативные акты и изменения',
          icon: '⚖️'
        }
      ],
      'exam-preparation': [
        {
          text: 'Составление портфолио',
          route: '/info/portfolio-guide',
          description: 'Требования к оформлению и примеры успешных портфолио',
          icon: '📁'
        },
        {
          text: 'Тренажер НОК онлайн',
          route: '/info/online-trainer',
          description: 'Демо-версия тренажера с вопросами и статистикой',
          icon: '💻'
        },
        {
          text: 'Вопросы и ответы НОК',
          route: '/info/nok-qa',
          description: 'База знаний по темам и разбор сложных вопросов',
          icon: '❔'
        }
      ],
      'portfolio-guide': [
        {
          text: 'Подготовка к экзамену НОК',
          route: '/info/exam-preparation',
          description: 'Методики подготовки и рекомендуемая литература',
          icon: '📖'
        },
        {
          text: 'Тренажер НОК онлайн',
          route: '/info/online-trainer',
          description: 'Демо-версия тренажера с вопросами и статистикой',
          icon: '💻'
        },
        {
          text: 'Вопросы и ответы НОК',
          route: '/info/nok-qa',
          description: 'База знаний по темам и разбор сложных вопросов',
          icon: '❔'
        }
      ],
      'nok-qa': [
        {
          text: 'Подготовка к экзамену НОК',
          route: '/info/exam-preparation',
          description: 'Методики подготовки и рекомендуемая литература',
          icon: '📖'
        },
        {
          text: 'Составление портфолио',
          route: '/info/portfolio-guide',
          description: 'Требования к оформлению и примеры успешных портфолио',
          icon: '📁'
        },
        {
          text: 'Тренажер НОК онлайн',
          route: '/info/online-trainer',
          description: 'Демо-версия тренажера с вопросами и статистикой',
          icon: '💻'
        }
      ],
      'specialists-registry': [
        {
          text: 'Центры оценки квалификации',
          route: '/qa-centers',
          description: 'Официальные центры для прохождения НОК',
          icon: '🏢'
        },
        {
          text: 'Законодательство НОК',
          route: '/info/nok-legislation',
          description: 'Актуальные нормативные акты и изменения',
          icon: '⚖️'
        },
        {
          text: 'Процедура прохождения НОК',
          route: '/info/nok-procedure',
          description: 'Пошаговая инструкция по прохождению экзамена',
          icon: '📋'
        }
      ],
      'nok-legislation': [
        {
          text: 'Что такое НОК',
          route: '/info/what-is-nok',
          description: 'Подробная информация о независимой оценке квалификации',
          icon: '❓'
        },
        {
          text: 'Реестр специалистов НРС',
          route: '/info/specialists-registry',
          description: 'Как проверить статус специалиста в НРС',
          icon: '📜'
        },
        {
          text: 'Центры оценки квалификации',
          route: '/qa-centers',
          description: 'Официальные центры для прохождения НОК',
          icon: '🏢'
        }
      ],
      'qa-centers': [
        {
          text: 'Реестр специалистов НРС',
          route: '/info/specialists-registry',
          description: 'Как проверить статус специалиста в НРС',
          icon: '📜'
        },
        {
          text: 'Законодательство НОК',
          route: '/info/nok-legislation',
          description: 'Актуальные нормативные акты и изменения',
          icon: '⚖️'
        },
        {
          text: 'Процедура прохождения НОК',
          route: '/info/nok-procedure',
          description: 'Пошаговая инструкция по прохождению экзамена',
          icon: '📋'
        }
      ]
    };

    this.contextualLinks = linksMap[this.currentPageId] || [];
  }
} 