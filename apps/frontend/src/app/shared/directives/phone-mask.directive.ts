import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  private el = inject(ElementRef);
  private control = inject(NgControl, { optional: true });

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');

    // Если начинается с 8, заменяем на 7
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }

    // Убираем лидирующую 7 если есть — будем добавлять сами
    if (digits.startsWith('7')) {
      digits = digits.slice(1);
    }

    // Ограничиваем 10 цифрами (без кода страны)
    digits = digits.slice(0, 10);

    let formatted = '+7';
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += ')';
    if (digits.length > 3) formatted += ` ${digits.slice(3, 6)}`;
    if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
    if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;

    input.value = formatted;
    this.control?.control?.setValue(formatted, { emitEvent: false });
  }

  @HostListener('focus')
  onFocus(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    if (!input.value) {
      input.value = '+7';
      this.control?.control?.setValue('+7', { emitEvent: false });
    }
  }
}
