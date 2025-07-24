import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { SeoService } from '../../../shared/services/seo.service';

/**
 * Компонент главной страницы
 * Содержит hero секцию, информацию о преимуществах, услугах и призывы к действию
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private feedbackService = inject(FeedbackPopupService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // Устанавливаем SEO данные для главной страницы
    this.seoService.setHomePageSeo();
  }

  /**
   * Открыть popup для консультации
   */
  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  /**
   * Открыть popup для НОК НОСТРОЙ
   */
  openNokNostroyPopup(): void {
    this.feedbackService.openForNokNostroy();
  }
} 