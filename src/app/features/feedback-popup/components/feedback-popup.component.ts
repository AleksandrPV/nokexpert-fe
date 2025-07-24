import { Component, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../services/feedback-popup.service';
import { 
  FeedbackFormData, 
  FeedbackSubject, 
  FeedbackSubmitResult 
} from '../models/feedback.interface';

@Component({
  selector: 'app-feedback-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <!-- Popup Overlay -->
    <div 
      *ngIf="isVisible()"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      (click)="onBackdropClick($event)">
      
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Popup Container -->
      <div 
        class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 animate-scale-in overflow-hidden"
        (click)="$event.stopPropagation()">
        
        <!-- Close Button -->
        <button 
          (click)="close()"
          class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10">
          <span class="text-lg leading-none">×</span>
        </button>
        
        <!-- Header -->
        <div class="px-6 pt-6 pb-4 text-center">
          <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand-coral/20 to-brand-navy/20 rounded-full flex items-center justify-center">
            <span class="text-xl">💬</span>
          </div>
          <h2 class="text-2xl font-bold text-brand-dark mb-2">{{ config().title }}</h2>
          <p class="text-sm text-brand-dark/70 leading-relaxed">{{ config().subtitle }}</p>
        </div>
        
        <!-- Form -->
        <div class="px-6 pb-6">
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Name and Email Row -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-brand-dark/80">Имя *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData().name"
                  name="name"
                  required
                  [disabled]="isSubmitting()"
                  class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent focus:bg-white transition-all text-brand-dark placeholder-gray-400"
                  placeholder="Ваше имя">
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-brand-dark/80">Email *</label>
                <input 
                  type="email" 
                  [(ngModel)]="formData().email"
                  name="email"
                  required
                  [disabled]="isSubmitting()"
                  class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent focus:bg-white transition-all text-brand-dark placeholder-gray-400"
                  placeholder="your@email.com">
              </div>
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-brand-dark/80">Телефон</label>
              <input 
                type="tel" 
                [(ngModel)]="formData().phone"
                name="phone"
                [disabled]="isSubmitting()"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent focus:bg-white transition-all text-brand-dark placeholder-gray-400"
                placeholder="+7 (___) ___-__-__">
            </div>

            <!-- Subject -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-brand-dark/80">Тема обращения</label>
              <select 
                [(ngModel)]="formData().subject"
                name="subject"
                [disabled]="isSubmitting()"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent focus:bg-white transition-all text-brand-dark">
                <option value="">Выберите тему</option>
                <option 
                  *ngFor="let option of subjectOptions" 
                  [value]="option.value">
                  {{ option.icon }} {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Message -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-brand-dark/80">Сообщение *</label>
              <textarea 
                [(ngModel)]="formData().message"
                name="message"
                required
                [disabled]="isSubmitting()"
                rows="3"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-sky/30 focus:border-transparent focus:bg-white transition-all resize-none text-brand-dark placeholder-gray-400"
                placeholder="Расскажите о вашем вопросе или проблеме..."></textarea>
            </div>

            <!-- Privacy -->
            <div class="flex items-start gap-3">
              <input 
                type="checkbox" 
                [(ngModel)]="formData().privacy"
                name="privacy"
                required
                [disabled]="isSubmitting()"
                class="mt-1 w-4 h-4 text-brand-sky rounded border-gray-300 focus:ring-brand-sky/30">
              <label class="text-sm text-brand-dark/70 leading-relaxed">
                Я согласен с 
                <a routerLink="/privacy-policy" class="text-brand-coral hover:underline font-medium">политикой конфиденциальности</a> 
                и обработкой персональных данных
              </label>
            </div>

            <!-- Error Message -->
            <div 
              *ngIf="submitResult() && !submitResult()?.success" 
              class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center gap-3">
                <span class="text-red-500 text-lg">⚠️</span>
                <div>
                  <p class="text-red-800 font-medium">Ошибка</p>
                  <p class="text-red-700 text-sm">{{ submitResult()?.error || submitResult()?.message }}</p>
                </div>
              </div>
            </div>

            <!-- Success Message -->
            <div 
              *ngIf="submitResult() && submitResult()?.success" 
              class="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center gap-3">
                <span class="text-green-500 text-lg">✅</span>
                <div>
                  <p class="text-green-800 font-medium">Успешно отправлено!</p>
                  <p class="text-green-700 text-sm">{{ submitResult()?.message }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button 
                type="submit"
                [disabled]="isSubmitting() || (submitResult() && submitResult()?.success)"
                class="w-full py-3 bg-brand-coral hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md">
                
                <span *ngIf="!isSubmitting() && (!submitResult() || !submitResult()?.success)" class="flex items-center justify-center gap-2">
                  <span>📤</span>
                  <span>Отправить сообщение</span>
                </span>
                
                <span *ngIf="isSubmitting()" class="flex items-center justify-center gap-3">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Отправляем...</span>
                </span>
                
                <span *ngIf="submitResult() && submitResult()?.success" class="flex items-center justify-center gap-2">
                  <span>✅</span>
                  <span>Отправлено</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scale-in {
      from { 
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
      }
      to { 
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fade-in 0.2s ease-out;
    }
    
    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }
    
    /* Стили для фокуса */
    input:focus, textarea:focus, select:focus {
      box-shadow: 0 0 0 3px rgba(168, 208, 230, 0.1);
    }
    
    /* Плавные переходы для disabled состояния */
    input:disabled, textarea:disabled, select:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class FeedbackPopupComponent implements OnInit, OnDestroy {
  // Сигналы для состояния
  private _formData = signal<FeedbackFormData>({
    name: '',
    email: '',
    phone: '',
    subject: FeedbackSubject.CONSULTATION,
    message: '',
    privacy: false
  });

  private _isSubmitting = signal(false);
  private _submitResult = signal<FeedbackSubmitResult | null>(null);

  // Вычисляемые свойства
  readonly formData = this._formData.asReadonly();
  readonly isSubmitting = this._isSubmitting.asReadonly();
  readonly submitResult = this._submitResult.asReadonly();
  readonly config: any;
  readonly subjectOptions: any;
  readonly isVisible: any;

  constructor(private feedbackService: FeedbackPopupService) {
    this.config = this.feedbackService.config;
    this.subjectOptions = this.feedbackService.subjectOptions;
    this.isVisible = computed(() => this.config().isVisible);
  }

  ngOnInit(): void {
    // Сброс формы при открытии popup
    this.resetForm();
  }

  ngOnDestroy(): void {
    // Очистка при уничтожении компонента
    this.feedbackService.close();
  }

  /**
   * Закрыть popup
   */
  close(): void {
    this.feedbackService.close();
    // Сброс формы с небольшой задержкой для плавности анимации
    setTimeout(() => this.resetForm(), 300);
  }

  /**
   * Обработка клика по backdrop
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.config().closeOnBackdrop) {
      this.close();
    }
  }

  /**
   * Отправка формы
   */
  async onSubmit(): Promise<void> {
    if (this._isSubmitting()) return;

    this._isSubmitting.set(true);
    this._submitResult.set(null);

    try {
      const result = await this.feedbackService.submitFeedback(this._formData());
      this._submitResult.set(result);

      if (result.success) {
        // Автоматически закрыть popup через 3 секунды после успешной отправки
        setTimeout(() => {
          this.close();
        }, 3000);
      }
    } catch (error) {
      this._submitResult.set({
        success: false,
        message: 'Произошла неожиданная ошибка',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    } finally {
      this._isSubmitting.set(false);
    }
  }

  /**
   * Сброс формы
   */
  private resetForm(): void {
    this._formData.set({
      name: '',
      email: '',
      phone: '',
      subject: FeedbackSubject.CONSULTATION,
      message: '',
      privacy: false
    });
    this._isSubmitting.set(false);
    this._submitResult.set(null);
  }
} 