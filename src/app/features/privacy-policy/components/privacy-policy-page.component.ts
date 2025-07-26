import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../shared/services/seo.service';
import { OrganizationService } from '../../../shared/services/organization.service';

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
  private organizationService = inject(OrganizationService);

  // Геттеры для данных организации
  get organizationName(): string {
    return this.organizationService.getName();
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

  get address(): string {
    return this.organizationService.getAddress();
  }

  get websiteDomain(): string {
    return this.organizationService.getWebsiteDomain();
  }

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