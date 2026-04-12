import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-registration-success-page',
  standalone: true,
  imports: [RouterLink, IconModule],
  template: `
    <section class="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-600/5 blur-3xl"></div>
        <div class="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl"></div>
      </div>

      <div class="relative z-10 w-full max-w-lg text-center">
        <div class="mb-8">
          <a routerLink="/" class="inline-flex items-center gap-3 group">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <lucide-icon name="building-2" [size]="24" [strokeWidth]="2"></lucide-icon>
            </div>
            <span class="text-2xl font-bold text-white">НОК Эксперт</span>
          </a>
        </div>

        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-10 shadow-2xl">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <lucide-icon name="circle-check" [size]="40" [strokeWidth]="1.5" class="text-emerald-400"></lucide-icon>
          </div>

          <h1 class="text-3xl font-bold text-white mb-4">Заявка принята!</h1>

          <p class="text-lg text-slate-300 leading-relaxed mb-6">
            Спасибо за регистрацию. Ожидайте звонка менеджера для активации аккаунта.
          </p>

          <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 mb-8">
            <div class="flex items-start gap-3 text-left">
              <lucide-icon name="phone" [size]="20" [strokeWidth]="2" class="text-blue-400 flex-shrink-0 mt-0.5"></lucide-icon>
              <div>
                <p class="text-sm font-medium text-slate-300">Что дальше?</p>
                <p class="text-sm text-slate-400 mt-1">
                  Наш менеджер свяжется с вами в ближайшее время. После активации вы сможете войти и начать подготовку к экзамену НОК.
                </p>
              </div>
            </div>
          </div>

          <a routerLink="/"
             class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200">
            <lucide-icon name="arrow-left" [size]="18" [strokeWidth]="2"></lucide-icon>
            Вернуться на главную
          </a>
        </div>
      </div>
    </section>
  `,
})
export class RegistrationSuccessPageComponent {}
