import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YandexMapComponent } from '../../../shared/components/yandex-map/yandex-map.component';
import { MapMarker } from '../../../core/services/yandex-maps.service';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { OrganizationService } from '../../../shared/services/organization.service';

/**
 * Компонент страницы контактов
 * Содержит контактную информацию, форму обратной связи и карту
 */
@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, YandexMapComponent, BreadcrumbsComponent],
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
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

  ngOnInit(): void {
    // Устанавливаем SEO данные для страницы контактов
    this.seoService.setContactsPageSeo();
  }

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  };

  // Координаты офиса теперь из OrganizationService
  get officeCoordinates(): [number, number] {
    const lat = this.organizationService.getLatitude();
    const lng = this.organizationService.getLongitude();
    return lat !== undefined && lng !== undefined ? [lat, lng] : [59.9851, 30.3075];
  }
  
  // Маркеры для карты теперь используют координаты из OrganizationService
  get mapMarkers(): MapMarker[] {
    const lat = this.organizationService.getLatitude();
    const lng = this.organizationService.getLongitude();
    return [
      {
        coordinates: lat !== undefined && lng !== undefined ? [lat, lng] : [59.9851, 30.3075],
        title: this.organizationName,
        description: `${this.address}<br>Профессиональная подготовка к НОК`,
        icon: 'islands#redIcon'
      }
    ];
  }

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message && this.formData.privacy) {
      console.log('Form submitted:', this.formData);
      // Здесь будет логика отправки формы
      alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
      this.resetForm();
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    };
  }
} 