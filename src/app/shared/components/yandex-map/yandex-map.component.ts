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
  template: `
    <div class="relative w-full h-full">
      <!-- Map Container -->
      <div 
        #mapContainer 
        [id]="mapId" 
        class="w-full h-full rounded-3xl overflow-hidden"
        [class.opacity-50]="isLoading">
      </div>

      <!-- Loading Overlay -->
      <div 
        *ngIf="isLoading" 
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-sky/20 via-brand-cream/10 to-brand-navy/15 rounded-3xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-brand-navy/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span class="text-2xl">🗺️</span>
          </div>
          <h3 class="text-xl font-medium text-brand-dark mb-2">Загрузка карты...</h3>
          <p class="text-brand-dark/60">Подключение к Яндекс.Картам</p>
        </div>
      </div>

      <!-- Error State -->
      <div 
        *ngIf="hasError && !isLoading" 
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-3xl">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl text-red-600">⚠️</span>
          </div>
          <h3 class="text-xl font-medium text-red-800 mb-2">Ошибка загрузки карты</h3>
          <p class="text-red-600 text-sm mb-4">Не удалось подключиться к Яндекс.Картам</p>
          <button 
            (click)="retryLoadMap()"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Попробовать снова
          </button>
        </div>
      </div>

      <!-- Map Controls Overlay -->
      <div 
        *ngIf="!isLoading && !hasError && showControls" 
        class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        
        <!-- Info Card -->
        <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
          <h4 class="font-semibold text-brand-dark">{{ officeTitle }}</h4>
          <p class="text-sm text-brand-dark/70">{{ officeAddress }}</p>
          <div class="flex gap-2 mt-3">
            <button 
              (click)="openInYandexMaps()"
              class="text-xs bg-brand-sky/20 text-brand-navy px-3 py-1 rounded-full hover:bg-brand-sky/30 transition-colors font-medium">
              Маршрут
            </button>
            <button 
              (click)="centerOnOffice()"
              class="text-xs bg-brand-coral/20 text-brand-coral px-3 py-1 rounded-full hover:bg-brand-coral/30 transition-colors font-medium">
              Центрировать
            </button>
          </div>
        </div>

        <!-- Zoom Controls -->
        <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <button 
            (click)="zoomIn()"
            class="block w-10 h-10 flex items-center justify-center text-brand-dark hover:bg-brand-sky/10 transition-colors border-b border-gray-200">
            <span class="text-lg font-bold">+</span>
          </button>
          <button 
            (click)="zoomOut()"
            class="block w-10 h-10 flex items-center justify-center text-brand-dark hover:bg-brand-sky/10 transition-colors">
            <span class="text-lg font-bold">−</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
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