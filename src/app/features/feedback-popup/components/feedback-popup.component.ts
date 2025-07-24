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
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss']
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