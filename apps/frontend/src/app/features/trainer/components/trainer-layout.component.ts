import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { ToastContainerComponent } from '../../../shared/components/toast/toast-container.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-trainer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, IconModule, ToastContainerComponent],
  template: `
    <!-- Trainer Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/60">
      <nav class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div class="flex items-center justify-between h-[64px]">

          <!-- Logo -->
          <a routerLink="/trainer" class="flex items-center gap-3 group">
            <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <lucide-icon name="dumbbell" [size]="18" [strokeWidth]="2"></lucide-icon>
            </div>
            <div>
              <div class="text-base font-bold text-white tracking-tight">Тренажёр НОК</div>
              <p class="text-[10px] font-medium text-slate-500 uppercase tracking-wider">НОК Эксперт</p>
            </div>
          </a>

          <!-- Nav links -->
          <div class="hidden sm:flex items-center gap-1">
            <a routerLink="/trainer"
               class="px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
              Тренажёр
            </a>
            <a routerLink="/dashboard"
               class="px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
              Статистика
            </a>
          </div>

          <!-- Right side -->
          <div class="flex items-center gap-4">
            <a routerLink="/"
               class="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors hidden sm:block">
              На сайт
            </a>

            <ng-container *ngIf="authService.isAuthenticated(); else loginLink">
              <div class="relative">
                <button (click)="showMenu = !showMenu"
                        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 transition-all duration-200">
                  <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {{ authService.currentUser()?.firstName?.charAt(0) }}{{ authService.currentUser()?.lastName?.charAt(0) }}
                  </div>
                  <span class="hidden sm:inline">{{ authService.currentUser()?.firstName }}</span>
                  <lucide-icon name="chevron-down" [size]="14" class="text-slate-500"></lucide-icon>
                </button>

                <div *ngIf="showMenu"
                     class="absolute top-full right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-20">
                  <a routerLink="/dashboard" (click)="showMenu = false"
                     class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5 transition-colors">
                    <lucide-icon name="layout-dashboard" [size]="15" class="text-slate-500"></lucide-icon>
                    Статистика
                  </a>
                  <a routerLink="/" (click)="showMenu = false"
                     class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5 transition-colors sm:hidden">
                    <lucide-icon name="arrow-left" [size]="15" class="text-slate-500"></lucide-icon>
                    На сайт
                  </a>
                  <div class="my-1 border-t border-slate-800"></div>
                  <button (click)="logout()"
                          class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                    <lucide-icon name="log-out" [size]="15"></lucide-icon>
                    Выйти
                  </button>
                </div>
              </div>
            </ng-container>

            <ng-template #loginLink>
              <a routerLink="/login"
                 class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                <lucide-icon name="log-in" [size]="15"></lucide-icon>
                Войти
              </a>
            </ng-template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Content with top padding for fixed header -->
    <main class="pt-[64px] min-h-screen">
      <router-outlet />
    </main>
    <app-toast-container />
  `,
})
export class TrainerLayoutComponent {
  authService = inject(AuthService);
  private toastService = inject(ToastService);
  showMenu = false;

  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo(0, 0);
          this.showMenu = false;
        });
    }
  }

  logout(): void {
    this.showMenu = false;
    this.authService.logout();
    this.toastService.info('Вы вышли из аккаунта');
  }
}
