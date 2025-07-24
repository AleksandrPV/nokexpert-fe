import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private feedbackService: FeedbackPopupService) {}

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