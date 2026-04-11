import { Component, Input, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { FeedbackSubject } from '../../../features/feedback-popup/models/feedback.interface';
import { IconModule } from '../icon/icon.component';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';

@Component({
  selector: 'app-inline-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconModule, PhoneMaskDirective],
  template: `
<section class="py-16 sm:py-20 bg-slate-50" id="contact-form-section">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid lg:grid-cols-2 gap-12 items-center">

      <!-- Left: text -->
      <div>
        <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6 border border-blue-100">
          <lucide-icon name="message-circle" [size]="13" [strokeWidth]="2.5"></lucide-icon>
          Бесплатная консультация
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {{ title }}
        </h2>
        <p class="text-lg text-slate-600 leading-relaxed mb-8">
          {{ subtitle }}
        </p>
        <ul class="space-y-3">
          <li *ngFor="let point of points" class="flex items-start gap-3">
            <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <lucide-icon name="check" [size]="12" [strokeWidth]="3" class="text-blue-600"></lucide-icon>
            </div>
            <span class="text-slate-700 text-sm leading-relaxed">{{ point }}</span>
          </li>
        </ul>
      </div>

      <!-- Right: form -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">

        <!-- Success state -->
        <div *ngIf="isSuccess()" class="text-center py-6">
          <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="check-circle" [size]="32" [strokeWidth]="1.5" class="text-emerald-600"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
          <p class="text-slate-600 text-sm">Свяжемся с вами в течение 15 минут.</p>
        </div>

        <!-- Form -->
        <form *ngIf="!isSuccess()" (ngSubmit)="onSubmit()" #f="ngForm" novalidate>
          <h3 class="text-xl font-bold text-slate-900 mb-6">Оставить заявку</h3>

          <div class="space-y-4 mb-6">
            <!-- Name -->
            <div>
              <label for="inline-name" class="block text-sm font-medium text-slate-700 mb-1.5">
                Ваше имя <span class="text-red-500">*</span>
              </label>
              <input
                id="inline-name"
                type="text"
                name="name"
                [(ngModel)]="formData.name"
                (blur)="touchedName.set(true)"
                required
                placeholder="Иван Иванов"
                autocomplete="name"
                [class]="'w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ' + (touchedName() && !formData.name.trim() ? 'border-red-400 focus:ring-red-400 bg-red-50' : 'border-slate-200 focus:ring-blue-500')">
              <p *ngIf="touchedName() && !formData.name.trim()" class="text-xs text-red-500 mt-1">Укажите ваше имя</p>
            </div>

            <!-- Phone -->
            <div>
              <label for="inline-phone" class="block text-sm font-medium text-slate-700 mb-1.5">
                Телефон <span class="text-red-500">*</span>
              </label>
              <input
                id="inline-phone"
                type="tel"
                name="phone"
                [(ngModel)]="formData.phone"
                appPhoneMask
                (blur)="touchedPhone.set(true)"
                required
                placeholder="+7 (999) 000-00-00"
                autocomplete="tel"
                [class]="'w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ' + (touchedPhone() && formData.phone.length < 10 ? 'border-red-400 focus:ring-red-400 bg-red-50' : 'border-slate-200 focus:ring-blue-500')">
              <p *ngIf="touchedPhone() && formData.phone.length < 10" class="text-xs text-red-500 mt-1">Введите корректный номер телефона</p>
            </div>
          </div>

          <!-- Privacy -->
          <div class="flex items-start gap-3 mb-6">
            <input
              id="inline-privacy"
              type="checkbox"
              name="privacy"
              [(ngModel)]="formData.privacy"
              required
              class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0">
            <label for="inline-privacy" class="text-xs text-slate-500 leading-relaxed">
              Я согласен с
              <a routerLink="/privacy-policy" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
              и даю согласие на обработку персональных данных
            </label>
          </div>

          <!-- Error -->
          <p *ngIf="errorMessage()" class="text-sm text-red-600 mb-4 bg-red-50 rounded-lg px-4 py-2.5">
            {{ errorMessage() }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="isSubmitting()"
            class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
            <lucide-icon *ngIf="isSubmitting()" name="loader-circle" [size]="18" class="animate-spin"></lucide-icon>
            <lucide-icon *ngIf="!isSubmitting()" name="send" [size]="18"></lucide-icon>
            {{ isSubmitting() ? 'Отправляем...' : 'Получить консультацию' }}
          </button>

          <p class="text-center text-xs text-slate-400 mt-3">
            Ответим в течение 15 минут в рабочее время
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class InlineContactFormComponent {
  @Input() title = 'Получите бесплатную консультацию';
  @Input() subtitle = 'Оставьте заявку и мы свяжемся с вами в течение 15 минут. Проверим документы и составим план подготовки.';
  @Input() subject: FeedbackSubject = FeedbackSubject.CONSULTATION;
  @Input() points: string[] = [
    'Бесплатная проверка документов',
    'Персональный план подготовки',
    'Запись в удобный ЦОК',
    'Гарантия результата'
  ];

  private feedbackService = inject(FeedbackPopupService);
  private router = inject(Router);

  isSubmitting = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');
  touchedName = signal(false);
  touchedPhone = signal(false);

  formData = {
    name: '',
    phone: '',
    privacy: false
  };

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');
    this.touchedName.set(true);
    this.touchedPhone.set(true);

    if (!this.formData.name.trim() || !this.formData.phone.trim()) {
      this.errorMessage.set('Пожалуйста, заполните имя и телефон.');
      return;
    }
    if (!this.formData.privacy) {
      this.errorMessage.set('Необходимо согласие на обработку персональных данных.');
      return;
    }

    this.isSubmitting.set(true);
    try {
      const result = await this.feedbackService.submitFeedback({
        name: this.formData.name,
        phone: this.formData.phone,
        email: '',
        subject: this.subject,
        message: '',
        privacy: true
      });

      if (result.success) {
        this.isSuccess.set(true);
        setTimeout(() => this.router.navigate(['/success']), 1500);
      } else {
        this.errorMessage.set(result.message || 'Ошибка при отправке. Попробуйте ещё раз.');
      }
    } catch {
      this.errorMessage.set('Ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
