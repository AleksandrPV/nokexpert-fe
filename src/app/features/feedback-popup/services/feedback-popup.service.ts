import { Injectable, signal } from '@angular/core';
import { 
  FeedbackFormData, 
  FeedbackSubject, 
  FeedbackSubjectOption, 
  PopupConfig,
  FeedbackSubmitResult 
} from '../models/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackPopupService {
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
    {
      value: FeedbackSubject.NOK_NOSTROY,
      label: 'НОК НОСТРОЙ',
      icon: '🏗️'
    },
    {
      value: FeedbackSubject.NOK_NOPRIZ,
      label: 'НОК НОПРИЗ',
      icon: '📐'
    },
    {
      value: FeedbackSubject.CONSULTATION,
      label: 'Консультация',
      icon: '💬'
    },
    {
      value: FeedbackSubject.DOCUMENTS,
      label: 'Подготовка документов',
      icon: '📄'
    },
    {
      value: FeedbackSubject.PRICING,
      label: 'Стоимость услуг',
      icon: '💰'
    },
    {
      value: FeedbackSubject.OTHER,
      label: 'Другое',
      icon: '❓'
    }
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
    document.body.style.overflow = 'hidden';

    // Обработчик ESC
    if (this._config().closeOnEsc) {
      document.addEventListener('keydown', this.handleEscKey);
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
    document.body.style.overflow = '';

    // Убираем обработчик ESC
    document.removeEventListener('keydown', this.handleEscKey);
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

  openForConsultation(): void {
    this.open({
      title: 'Бесплатная консультация',
      subtitle: 'Узнайте больше о наших услугах и получите персональные рекомендации'
    });
  }

  /**
   * Отправка формы
   */
  async submitFeedback(formData: FeedbackFormData): Promise<FeedbackSubmitResult> {
    try {
      // Имитация отправки данных
      await this.delay(1500);

      // Валидация
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
      }

      if (!formData.privacy) {
        throw new Error('Необходимо согласие на обработку персональных данных');
      }

      // Здесь будет реальная отправка на сервер
      console.log('Отправка формы:', formData);

      return {
        success: true,
        message: 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Произошла ошибка при отправке',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
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

  /**
   * Вспомогательный метод для имитации задержки
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 