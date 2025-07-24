import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YandexMapComponent } from '../../../shared/components/yandex-map/yandex-map.component';
import { MapMarker } from '../../../core/services/yandex-maps.service';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

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

  // Координаты офиса в Москве (центр города)
  officeCoordinates: [number, number] = [55.7558, 37.6176];
  
  // Маркеры для карты
  mapMarkers: MapMarker[] = [
    {
      coordinates: [55.7558, 37.6176],
      title: 'НОК Эксперт',
      description: 'Москва, ул. Примерная, д. 1<br>Профессиональная подготовка к НОК',
      icon: 'islands#redIcon'
    }
  ];

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