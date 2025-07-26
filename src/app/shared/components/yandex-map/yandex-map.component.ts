import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YandexMapsService, MapConfig, MapMarker } from '../../../core/services/yandex-maps.service';

/**
 * Компонент для отображения Яндекс.Карты
 * Поддерживает настройку маркеров, центра карты и уровня масштабирования
 */
@Component({
  selector: 'app-yandex-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Input() center: [number, number] = [55.7558, 37.6176]; // Москва по умолчанию
  @Input() zoom: number = 16;
  @Input() markers: MapMarker[] = [];
  @Input() showControls: boolean = true;
  @Input() officeTitle: string = 'НОК Эксперт';
  @Input() officeAddress: string = 'Москва, ул. Примерная, д. 1';

  mapId: string;
  map: any = null;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private yandexMapsService: YandexMapsService) {
    this.mapId = `yandex-map-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnInit(): void {
    // Инициализация выполняется в ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.destroy();
    }
  }

  /**
   * Инициализирует карту
   */
  private async initializeMap(): Promise<void> {
    try {
      this.isLoading = true;
      this.hasError = false;

      const mapConfig: MapConfig = {
        center: this.center,
        zoom: this.zoom,
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
      };

      this.map = await this.yandexMapsService.createMap(this.mapId, mapConfig);

      // Добавляем маркеры
      this.addMarkersToMap();

      // Добавляем маркер офиса по умолчанию
      if (this.markers.length === 0) {
        this.addOfficeMarker();
      }

      this.isLoading = false;
    } catch (error) {
      console.error('Ошибка инициализации карты:', error);
      this.isLoading = false;
      this.hasError = true;
    }
  }

  /**
   * Добавляет маркеры на карту
   */
  private addMarkersToMap(): void {
    this.markers.forEach(marker => {
      this.yandexMapsService.addMarker(this.map, marker);
    });
  }

  /**
   * Добавляет маркер офиса
   */
  private addOfficeMarker(): void {
    const officeMarker: MapMarker = {
      coordinates: this.center,
      title: this.officeTitle,
      description: this.officeAddress,
      icon: 'islands#redIcon'
    };

    this.yandexMapsService.addMarker(this.map, officeMarker);
  }

  /**
   * Увеличивает масштаб карты
   */
  zoomIn(): void {
    if (this.map) {
      const currentZoom = this.map.getZoom();
      this.map.setZoom(currentZoom + 1);
    }
  }

  /**
   * Уменьшает масштаб карты
   */
  zoomOut(): void {
    if (this.map) {
      const currentZoom = this.map.getZoom();
      this.map.setZoom(currentZoom - 1);
    }
  }

  /**
   * Центрирует карту на офисе
   */
  centerOnOffice(): void {
    if (this.map) {
      this.yandexMapsService.setCenter(this.map, this.center, this.zoom);
    }
  }

  /**
   * Открывает маршрут в Яндекс.Картах
   */
  openInYandexMaps(): void {
    this.yandexMapsService.openRoute(this.center, this.officeTitle);
  }

  /**
   * Повторяет попытку загрузки карты
   */
  retryLoadMap(): void {
    this.initializeMap();
  }
} 