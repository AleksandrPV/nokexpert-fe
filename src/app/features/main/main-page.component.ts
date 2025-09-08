import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../feedback-popup/services/feedback-popup.service';
import { SeoService } from '../../shared/services/seo.service';
import { OrganizationService } from '../../shared/services/organization.service';
import { RelatedMaterialsComponent } from '../../shared/components/related-materials/related-materials.component';
import { NavigationLinksComponent } from '../../shared/components/navigation-links/navigation-links.component';
import { CustomerReviewsComponent } from '../../shared/components/customer-reviews/customer-reviews.component';
import { CtaSectionComponent, CtaSectionConfig } from '../../shared/components/cta-section/cta-section.component';

/**
 * Компонент главной страницы
 * Содержит hero секцию, информацию о преимуществах, услугах и призывы к действию
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RelatedMaterialsComponent, NavigationLinksComponent, CustomerReviewsComponent, CtaSectionComponent],
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

  // Конфигурация для главного CTA
  mainCtaConfig: CtaSectionConfig = {
    title: 'Готовы к успешной аттестации?',
    description: 'Получите профессиональную консультацию и выберите оптимальную программу подготовки',
    background: 'white',
    padding: 'large',
    showPhone: true,
    showEmail: true,
    buttons: [
      {
        text: 'Записаться на консультацию',
        icon: '💼',
        action: 'consultation',
        variant: 'primary'
      }
    ]
  };

  ngOnInit(): void {
    // Устанавливаем SEO данные для главной страницы
    this.seoService.setHomePageSeo();

    // Добавляем дополнительные structured data для главной страницы
    this.seoService.addCustomerReviewsStructuredData();
    this.seoService.addLocalBusinessStructuredData();
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

  /**
   * Открыть popup для НОК НОПРИЗ
   */
  openNokNoprizPopup(): void {
    this.feedbackService.openForNokNopriz();
  }

  /**
   * Открыть popup для премиум пакета
   */
  openPremiumPopup(): void {
    this.feedbackService.openForPremium();
  }
} 