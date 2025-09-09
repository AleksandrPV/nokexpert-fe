import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// YandexMapComponent не используется после удаления блока с картой
// import { YandexMapComponent } from '../../../shared/components/yandex-map/yandex-map.component';
// import { MapMarker } from '../../../core/services/yandex-maps.service';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { OrganizationService } from '../../../shared/services/organization.service';
import { SecurityService } from '../../../shared/services/security.service';

/**
 * Компонент страницы контактов
 * Содержит контактную информацию, форму обратной связи и информацию об офисе
 */
@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private organizationService = inject(OrganizationService);
  private securityService = inject(SecurityService);

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

    // Добавляем расширенную structured data для контактов и организации
    this.seoService.addContactStructuredData(this.organizationService.getData());

    // Добавляем structured data для доступности услуг
    this.seoService.addServiceAvailabilityStructuredData();
  }

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  };

  // Геттеры для карты удалены после удаления блока "Как добраться до нас"

  onSubmit() {
    // Валидация и санитизация данных формы
    const sanitizedName = this.securityService.sanitizeName(this.formData.name);
    const sanitizedEmail = this.securityService.sanitizeEmail(this.formData.email);
    const sanitizedPhone = this.securityService.sanitizePhone(this.formData.phone);
    const sanitizedSubject = this.securityService.sanitizeText(this.formData.subject);
    const sanitizedMessage = this.securityService.sanitizeText(this.formData.message);

    // Проверки безопасности
    if (!this.securityService.isSafeInput(sanitizedName) ||
        !this.securityService.isSafeInput(sanitizedEmail) ||
        !this.securityService.isSafeInput(sanitizedPhone) ||
        !this.securityService.isSafeInput(sanitizedSubject) ||
        !this.securityService.isSafeInput(sanitizedMessage)) {
      alert('Обнаружены потенциально опасные данные. Пожалуйста, проверьте введенную информацию.');
      return;
    }

    // Проверка обязательных полей
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage || !this.formData.privacy) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    // Проверка email формата
    if (!sanitizedEmail) {
      alert('Пожалуйста, введите корректный email адрес.');
      return;
    }

    // Подготовка безопасных данных для отправки
    const safeFormData = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    console.log('Safe form submitted:', safeFormData);
    // Здесь будет логика отправки формы на сервер
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    this.resetForm();
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