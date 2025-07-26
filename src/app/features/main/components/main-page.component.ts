import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { SeoService } from '../../../shared/services/seo.service';
import { OrganizationService } from '../../../shared/services/organization.service';

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
  private organizationService = inject(OrganizationService);

  // Геттеры для данных организации
  get organizationName(): string {
    return this.organizationService.getName();
  }

  get licenseDescription(): string {
    return this.organizationService.getLicenseDescription();
  }

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  get hasLicense(): boolean {
    return this.organizationService.hasLicense();
  }

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