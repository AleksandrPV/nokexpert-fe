import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../shared/services/seo.service';

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
export class PrivacyPolicyPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // Устанавливаем SEO данные для страницы политики конфиденциальности
    this.seoService.setPrivacyPageSeo();
  }

  /** Текущая дата для отображения в политике */
  currentDate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 