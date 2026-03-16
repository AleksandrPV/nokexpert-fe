import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FaqService } from '../services/faq.service';
import { FaqQuestion } from '../models/faq.interface';

@Component({
  selector: 'app-faq-widget',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterModule],
  template: `
    <div class="faq-widget" *ngIf="questions.length > 0">
      <div class="faq-widget-header">
        <h3 class="faq-widget-title">
          <span class="faq-widget-icon">❓</span>
          Часто задаваемые вопросы
        </h3>
        <p class="faq-widget-subtitle">Ответы на популярные вопросы по данной теме</p>
      </div>
      
      <div class="faq-widget-content">
        <div *ngFor="let question of questions; let i = index" 
             class="faq-item"
             [ngClass]="{'faq-item-open': openedIndex === i}">
          
          <button type="button"
                  class="faq-item-question"
                  (click)="toggle(i)">
            <span class="faq-item-text">{{ question.question }}</span>
            <span class="faq-item-icon"
                  [ngClass]="{'faq-item-icon-rotated': openedIndex === i}">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          
          <div *ngIf="openedIndex === i" class="faq-item-answer">
            <p class="faq-item-answer-text">{{ question.shortAnswer }}</p>
            <a [routerLink]="['/faq', question.slug]" 
               class="faq-item-link">
              Читать подробнее →
            </a>
          </div>
        </div>
      </div>
      
      <div class="faq-widget-footer">
        <a [routerLink]="['/faq']" class="faq-widget-all-link">
          Все вопросы и ответы →
        </a>
      </div>
    </div>
  `,
  styles: [`
    .faq-widget {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      border: 1px solid #e9ecef;
    }

    .faq-widget-header {
      margin-bottom: 20px;
    }

    .faq-widget-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .faq-widget-icon {
      font-size: 1.2rem;
    }

    .faq-widget-subtitle {
      color: #6c757d;
      margin: 0;
      font-size: 0.95rem;
    }

    .faq-widget-content {
      margin-bottom: 20px;
    }

    .faq-item {
      border-bottom: 1px solid #e9ecef;
      margin-bottom: 8px;
    }

    .faq-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .faq-item-question {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: #2c3e50;
      transition: color 0.2s ease;
    }

    .faq-item-question:hover {
      color: #e74c3c;
    }

    .faq-item-text {
      flex: 1;
      margin-right: 12px;
    }

    .faq-item-icon {
      transition: transform 0.2s ease;
      color: #6c757d;
    }

    .faq-item-icon-rotated {
      transform: rotate(180deg);
    }

    .faq-item-answer {
      padding: 0 0 16px 0;
      animation: fadeIn 0.3s ease;
    }

    .faq-item-answer-text {
      color: #495057;
      line-height: 1.6;
      margin: 0 0 12px 0;
    }

    .faq-item-link {
      color: #e74c3c;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }

    .faq-item-link:hover {
      color: #c0392b;
      text-decoration: underline;
    }

    .faq-widget-footer {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid #e9ecef;
    }

    .faq-widget-all-link {
      color: #e74c3c;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }

    .faq-widget-all-link:hover {
      color: #c0392b;
      text-decoration: underline;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class FaqWidgetComponent implements OnInit {
  @Input() pageTags: string[] = [];
  @Input() limit: number = 5;
  @Input() category?: string;

  private faqService = inject(FaqService);
  private router = inject(Router);

  questions: FaqQuestion[] = [];
  openedIndex: number | null = null;

  ngOnInit(): void {
    this.loadQuestions();
  }

  private loadQuestions(): void {
    if (this.category) {
      // Если указана категория, загружаем вопросы по категории
      this.faqService.getQuestionsByCategory(this.category).subscribe(questions => {
        this.questions = questions.slice(0, this.limit);
      });
    } else if (this.pageTags.length > 0) {
      // Если указаны теги страницы, загружаем релевантные вопросы
      this.faqService.getQuestionsForPage(this.pageTags, this.limit).subscribe(questions => {
        this.questions = questions;
      });
    } else {
      // По умолчанию загружаем популярные вопросы
      this.faqService.getPopularQuestions(this.limit).subscribe(questions => {
        this.questions = questions;
      });
    }
  }

  toggle(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
} 