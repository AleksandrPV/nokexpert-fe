import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YandexMapComponent } from '../../../shared/components/yandex-map/yandex-map.component';
import { MapMarker } from '../../../core/services/yandex-maps.service';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, YandexMapComponent],
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent {
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