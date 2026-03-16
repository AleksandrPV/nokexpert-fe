import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { IconModule } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IconModule],
  template: `
    <section class="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <!-- Background -->
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

        <!-- Card -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 class="text-2xl font-bold text-white mb-2">Вход в аккаунт</h1>
          <p class="text-slate-400 mb-8">Войдите, чтобы сохранять результаты тестов</p>

          <!-- Error -->
          <div *ngIf="errorMessage()" class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p class="text-sm text-red-400">{{ errorMessage() }}</p>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <!-- Email -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" formControlName="email"
                     class="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                     placeholder="your@email.com">
              <p *ngIf="form.get('email')?.touched && form.get('email')?.invalid"
                 class="mt-1.5 text-xs text-red-400">Введите корректный email</p>
            </div>

            <!-- Password -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">Пароль</label>
              <input type="password" formControlName="password"
                     class="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                     placeholder="Введите пароль">
              <p *ngIf="form.get('password')?.touched && form.get('password')?.invalid"
                 class="mt-1.5 text-xs text-red-400">Пароль обязателен</p>
            </div>

            <!-- Submit -->
            <button type="submit"
                    [disabled]="isLoading()"
                    class="w-full py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="!isLoading()">Войти</span>
              <span *ngIf="isLoading()" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                Вход...
              </span>
            </button>
          </form>

          <!-- Register link -->
          <p class="mt-6 text-center text-sm text-slate-400">
            Нет аккаунта?
            <a routerLink="/register" class="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Зарегистрироваться
            </a>
          </p>
        </div>

        <!-- Back link -->
        <div class="text-center mt-6">
          <a routerLink="/" class="text-sm text-slate-500 hover:text-slate-400 transition-colors">
            Вернуться на главную
          </a>
        </div>
      </div>
    </section>
  `,
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastService.success('Вход выполнен');
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/trainer';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Неверный email или пароль',
        );
      },
    });
  }
}
