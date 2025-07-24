import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Компонент страницы политики конфиденциальности
 * Содержит информацию об обработке персональных данных в соответствии с ФЗ-152
 */
@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent {
  /** Текущая дата для отображения в политике */
  currentDate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 