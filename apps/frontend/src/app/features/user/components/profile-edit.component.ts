import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IconModule, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>

    <!-- Hero -->
    <section class="bg-slate-950 py-12 lg:py-16 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
      </div>
      <div class="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center gap-4">
            <a routerLink="/dashboard"
               class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <lucide-icon name="arrow-left" [size]="18"></lucide-icon>
            </a>
            <div>
              <h1 class="text-2xl font-bold text-white">Редактирование профиля</h1>
              <p class="text-slate-400 text-sm mt-1">Обновите личные данные или смените пароль</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="bg-slate-50 py-12 lg:py-16">
      <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="max-w-3xl mx-auto space-y-8">

          <!-- Personal Data -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <lucide-icon name="user" [size]="20" class="text-blue-600"></lucide-icon>
              Личные данные
            </h2>

            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1.5">Имя</label>
                  <input type="text" formControlName="firstName"
                         class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1.5">Фамилия</label>
                  <input type="text" formControlName="lastName"
                         class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Телефон</label>
                <input type="tel" formControlName="phone"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       placeholder="+7 (999) 123-45-67">
              </div>
              <button type="submit"
                      [disabled]="savingProfile()"
                      class="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {{ savingProfile() ? 'Сохранение...' : 'Сохранить' }}
              </button>
            </form>
          </div>

          <!-- Change Password -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <lucide-icon name="lock" [size]="20" class="text-blue-600"></lucide-icon>
              Смена пароля
            </h2>

            <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Текущий пароль</label>
                <input type="password" formControlName="currentPassword"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Новый пароль</label>
                <input type="password" formControlName="newPassword"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       placeholder="Минимум 6 символов">
                <p *ngIf="passwordForm.get('newPassword')?.touched && passwordForm.get('newPassword')?.invalid"
                   class="mt-1 text-xs text-red-500">Минимум 6 символов</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Подтверждение пароля</label>
                <input type="password" formControlName="confirmPassword"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                       placeholder="Повторите новый пароль">
              </div>
              <button type="submit"
                      [disabled]="savingPassword()"
                      class="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {{ savingPassword() ? 'Сохранение...' : 'Сменить пароль' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProfileEditComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);

  savingProfile = signal(false);
  savingPassword = signal(false);

  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'Личный кабинет', url: '/dashboard' },
    { label: 'Профиль', active: true },
  ];

  profileForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
  });

  passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.savingProfile.set(true);

    const user = this.authService.currentUser();
    if (!user) return;

    this.http.patch(`${environment.apiUrl}/users/${user.id}`, this.profileForm.getRawValue())
      .subscribe({
        next: () => {
          this.savingProfile.set(false);
          this.toast.success('Профиль обновлён');
          // Update local user data
          const data = this.profileForm.getRawValue();
          this.authService.currentUser.set({
            ...user,
            firstName: data.firstName,
            lastName: data.lastName,
          });
        },
        error: (err) => {
          this.savingProfile.set(false);
          this.toast.error(err.error?.message || 'Ошибка сохранения');
        },
      });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.getRawValue();
    if (newPassword !== confirmPassword) {
      this.toast.error('Пароли не совпадают');
      return;
    }

    this.savingPassword.set(true);
    this.http.patch(`${environment.apiUrl}/users/change-password`, { currentPassword, newPassword })
      .subscribe({
        next: () => {
          this.savingPassword.set(false);
          this.passwordForm.reset();
          this.toast.success('Пароль изменён');
        },
        error: (err) => {
          this.savingPassword.set(false);
          this.toast.error(err.error?.message || 'Ошибка смены пароля');
        },
      });
  }
}
