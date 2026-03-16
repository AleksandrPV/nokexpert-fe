import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IconModule],
  template: `
    <section class="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
        <div class="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>

      <div class="relative z-10 w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <a routerLink="/" class="inline-flex items-center gap-3 group">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <lucide-icon name="building-2" [size]="24" [strokeWidth]="2"></lucide-icon>
            </div>
            <span class="text-2xl font-bold text-white">НОК Эксперт</span>
          </a>
        </div>

        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          @if (!submitted()) {
            <h1 class="text-2xl font-bold text-white mb-2">Восстановление пароля</h1>
            <p class="text-slate-400 mb-8">Введите email, указанный при регистрации</p>

            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" formControlName="email"
                       class="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       placeholder="your@email.com">
                <p *ngIf="form.get('email')?.touched && form.get('email')?.invalid"
                   class="mt-1.5 text-xs text-red-400">Введите корректный email</p>
              </div>

              <button type="submit"
                      [disabled]="isLoading()"
                      class="w-full py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isLoading() ? 'Отправка...' : 'Восстановить пароль' }}
              </button>
            </form>
          } @else {
            <div class="text-center py-4">
              <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <lucide-icon name="mail-check" [size]="32" class="text-emerald-400"></lucide-icon>
              </div>
              <h2 class="text-xl font-bold text-white mb-2">Проверьте email</h2>
              <p class="text-slate-400 text-sm">
                Если аккаунт с таким email существует, мы отправили инструкции по восстановлению пароля.
              </p>
            </div>
          }

          <p class="mt-6 text-center text-sm text-slate-400">
            <a routerLink="/login" class="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Вернуться к входу
            </a>
          </p>
        </div>
      </div>
    </section>
  `,
})
export class ForgotPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading = signal(false);
  submitted = signal(false);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.http.post(`${environment.apiUrl}/users/forgot-password`, this.form.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.submitted.set(true);
        },
        error: () => {
          // Always show success for security reasons
          this.isLoading.set(false);
          this.submitted.set(true);
        },
      });
  }
}
