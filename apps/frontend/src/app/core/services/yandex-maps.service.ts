import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

/**
 * Интерфейс для конфигурации карты
 */
export interface MapConfig {
  center: [number, number]; // [широта, долгота]
  zoom: number;
  controls: string[];
}

/**
 * Интерфейс для маркера на карте
 */
export interface MapMarker {
  coordinates: [number, number];
  title: string;
  description?: string;
  icon?: string;
}

/**
 * Сервис для работы с Яндекс.Картами
 * Обеспечивает загрузку API, создание карт и управление маркерами
 */
@Injectable({
  providedIn: 'root'
})
export class YandexMapsService {
  private apiLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly apiKey = ''; // Здесь будет API ключ из environment
  private ymaps: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Observable для отслеживания состояния загрузки API
   */
  get isApiLoaded$(): Observable<boolean> {
    return this.apiLoaded$.asObservable();
  }

  /**
   * Получить состояние загрузки API
   */
  get isApiLoaded(): boolean {
    return this.apiLoaded$.value;
  }

  /**
   * Загружает API Яндекс.Карт
   */
  async loadApi(): Promise<void> {
    if (!this.isBrowser) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Проверяем, загружен ли уже API
      if (window.ymaps) {
        this.ymaps = window.ymaps;
        this.apiLoaded$.next(true);
        resolve();
        return;
      }

      // Создаем script для загрузки API
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&lang=ru_RU`;
      script.async = true;

      script.onload = () => {
        window.ymaps.ready(() => {
          this.ymaps = window.ymaps;
          this.apiLoaded$.next(true);
          resolve();
        });
      };

      script.onerror = () => {
        console.error('Ошибка загрузки Яндекс.Карт API');
        reject(new Error('Не удалось загрузить Яндекс.Карты'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Создает карту в указанном контейнере
   * @param containerId ID контейнера для карты
   * @param config Конфигурация карты
   * @returns Promise с экземпляром карты
   */
  async createMap(containerId: string, config: MapConfig): Promise<any> {
    if (!this.isBrowser) {
      return Promise.resolve(null);
    }

    if (!this.isApiLoaded) {
      await this.loadApi();
    }

    const map = new this.ymaps.Map(containerId, {
      center: config.center,
      zoom: config.zoom,
      controls: config.controls
    });

    return map;
  }

  /**
   * Добавляет маркер на карту
   * @param map Экземпляр карты
   * @param marker Данные маркера
   * @returns Экземпляр созданного маркера
   */
  addMarker(map: any, marker: MapMarker): any {
    if (!this.isBrowser || !map) {
      return null;
    }

    const placemark = new this.ymaps.Placemark(
      marker.coordinates,
      {
        balloonContent: `
          <div class="yandex-balloon">
            <h3 class="font-semibold text-brand-dark">${marker.title}</h3>
            ${marker.description ? `<p class="text-sm text-brand-dark/70">${marker.description}</p>` : ''}
          </div>
        `,
        hintContent: marker.title
      },
      {
        preset: marker.icon || 'islands#redIcon',
        iconColor: '#ff5f24' // brand-coral цвет
      }
    );

    map.geoObjects.add(placemark);
    return placemark;
  }

  /**
   * Устанавливает центр карты
   * @param map Экземпляр карты
   * @param coordinates Координаты центра
   * @param zoom Уровень масштабирования
   */
  setCenter(map: any, coordinates: [number, number], zoom?: number): void {
    if (!this.isBrowser || !map) {
      return;
    }
    map.setCenter(coordinates, zoom);
  }

  /**
   * Открывает маршрут в Яндекс.Картах
   * @param coordinates Координаты пункта назначения
   * @param title Название места
   */
  openRoute(coordinates: [number, number], title: string): void {
    if (!this.isBrowser) {
      return;
    }
    const url = `https://yandex.ru/maps/?text=${coordinates[0]},${coordinates[1]}&z=16&l=map`;
    window.open(url, '_blank');
  }

  /**
   * Получает адрес по координатам (геокодирование)
   * @param coordinates Координаты
   * @returns Promise с адресом
   */
  async getAddressByCoordinates(coordinates: [number, number]): Promise<string> {
    if (!this.isBrowser) {
      return Promise.reject(new Error('Геокодирование недоступно на сервере'));
    }

    if (!this.isApiLoaded) {
      await this.loadApi();
    }

    return new Promise((resolve, reject) => {
      this.ymaps.geocode(coordinates).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          resolve(firstGeoObject.getAddressLine());
        } else {
          reject(new Error('Адрес не найден'));
        }
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}

/**
 * Расширение глобального объекта Window для ymaps
 */
declare global {
  interface Window {
    ymaps: any;
  }
} 