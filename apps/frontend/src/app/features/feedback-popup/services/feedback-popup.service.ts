import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  FeedbackFormData,
  FeedbackSubject,
  FeedbackSubjectOption,
  PopupConfig,
  FeedbackSubmitResult
} from '../models/feedback.interface';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackPopupService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private http = inject(HttpClient);
  
  // Состояние popup
  private _config = signal<PopupConfig>({
    isVisible: false,
    title: 'Свяжитесь с нами',
    subtitle: 'Получите профессиональную консультацию по подготовке к НОК',
    closeOnBackdrop: true,
    closeOnEsc: true
  });

  // Публичный readonly доступ к конфигурации
  readonly config = this._config.asReadonly();

  // Опции для выбора темы обращения
  readonly subjectOptions: FeedbackSubjectOption[] = [
    { value: FeedbackSubject.NOK_NOSTROY, label: 'НОК НОСТРОЙ', icon: '' },
    { value: FeedbackSubject.NOK_NOPRIZ, label: 'НОК НОПРИЗ', icon: '' },
    { value: FeedbackSubject.CONSULTATION, label: 'Консультация', icon: '' },
    { value: FeedbackSubject.DOCUMENTS, label: 'Подготовка документов', icon: '' },
    { value: FeedbackSubject.PRICING, label: 'Стоимость услуг', icon: '' },
    { value: FeedbackSubject.TRAINER, label: 'Тренажёр НОК', icon: '' },
    { value: FeedbackSubject.OTHER, label: 'Другое', icon: '' },
  ];

  /**
   * Открыть popup с кастомными настройками
   */
  open(customConfig?: Partial<PopupConfig>): void {
    this._config.update(current => ({
      ...current,
      isVisible: true,
      ...customConfig
    }));

    // Блокируем прокрутку страницы
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';

      // Обработчик ESC
      if (this._config().closeOnEsc) {
        document.addEventListener('keydown', this.handleEscKey);
      }
    }
  }

  /**
   * Закрыть popup
   */
  close(): void {
    this._config.update(current => ({
      ...current,
      isVisible: false
    }));

    // Восстанавливаем прокрутку страницы
    if (this.isBrowser) {
      document.body.style.overflow = '';

      // Убираем обработчик ESC
      document.removeEventListener('keydown', this.handleEscKey);
    }
  }

  /**
   * Быстрые методы для открытия с предустановленной темой
   */
  openForNokNostroy(): void {
    this.open({
      title: 'НОК НОСТРОЙ',
      subtitle: 'Получите консультацию по подготовке к независимой оценке квалификации для строительных специалистов'
    });
  }

  openForNokNopriz(): void {
    this.open({
      title: 'НОК НОПРИЗ',
      subtitle: 'Профессиональная подготовка проектировщиков и изыскателей к НОК'
    });
  }

  openForNokOpb(): void {
    this.openForNokMcs();
  }

  openForNokMcs(): void {
    this.open({
      title: 'НОК МЧС',
      subtitle: 'Независимая оценка квалификации для ответственных по пожарной безопасности и аварийно-спасательным работам'
    });
  }

  openForNokHousing(): void {
    this.open({
      title: 'НОК ЖКХ',
      subtitle: 'Независимая оценка квалификации для специалистов жилищно-коммунального хозяйства'
    });
  }

  openForConsultation(): void {
    this.open({
      title: 'Бесплатная консультация',
      subtitle: 'Узнайте больше о наших услугах и получите персональные рекомендации'
    });
  }

  openForPremium(): void {
    this.open({
      title: 'Премиум подготовка к НОК',
      subtitle: 'Максимальные гарантии успеха с персональным сопровождением'
    });
  }

  /**
   * Отправка формы
   */
  async submitFeedback(formData: FeedbackFormData): Promise<FeedbackSubmitResult> {
    try {
      if (!formData.name.trim() || !formData.phone.trim()) {
        throw new Error('Пожалуйста, заполните обязательные поля (Имя, Телефон)');
      }
      if (!formData.privacy) {
        throw new Error('Необходимо согласие на обработку персональных данных');
      }

      const response = await firstValueFrom(
        this.http.post<{ success: boolean; message: string }>(
          `${environment.apiUrl}/feedback`,
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || undefined,
            subject: formData.subject,
            message: formData.message || undefined,
          }
        )
      );

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      console.error('[ERROR] Feedback submit failed:', error);
      return {
        success: false,
        message: 'Произошла ошибка при отправке. Попробуйте еще раз.',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      };
    }
  }

  /**
   * Обработчик клавиши ESC
   */
  private handleEscKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

} 