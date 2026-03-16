import { Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  template: `
    @if (password()) {
      <div class="mt-2 space-y-1.5">
        <div class="flex gap-1 h-1">
          @for (i of [0,1,2,3]; track i) {
            <div class="flex-1 rounded-full transition-colors duration-300"
                 [class]="i < level() ? barColor() : 'bg-slate-700'"></div>
          }
        </div>
        <p class="text-xs font-medium" [class]="textColor()">{{ label() }}</p>
      </div>
    }
  `,
})
export class PasswordStrengthComponent {
  password = signal('');

  @Input() set value(v: string) {
    this.password.set(v || '');
  }

  level = computed(() => {
    const p = this.password();
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-ZА-ЯЁ]/.test(p) && /[a-zа-яё]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^a-zA-Zа-яА-ЯёЁ0-9]/.test(p)) score++;
    return Math.min(4, score);
  });

  label = computed(() => {
    const labels = ['', 'Слабый', 'Средний', 'Хороший', 'Надёжный'];
    return labels[this.level()] || '';
  });

  barColor = computed(() => {
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
    return colors[this.level()] || '';
  });

  textColor = computed(() => {
    const colors = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-emerald-400'];
    return colors[this.level()] || '';
  });
}
