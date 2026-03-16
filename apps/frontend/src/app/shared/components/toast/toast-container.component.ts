import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-xl animate-slide-in-right"
          [class]="typeClasses(toast.type)">
          <div class="w-2 h-2 rounded-full shrink-0" [class]="dotClass(toast.type)"></div>
          <span class="text-sm font-medium flex-1">{{ toast.message }}</span>
          <button (click)="toastService.dismiss(toast.id)"
                  class="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in-right {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out;
    }
  `],
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  typeClasses(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-slate-900/95 border-emerald-500/30 text-emerald-100';
      case 'error':
        return 'bg-slate-900/95 border-red-500/30 text-red-100';
      default:
        return 'bg-slate-900/95 border-blue-500/30 text-blue-100';
    }
  }

  dotClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-emerald-400';
      case 'error':
        return 'bg-red-400';
      default:
        return 'bg-blue-400';
    }
  }
}
