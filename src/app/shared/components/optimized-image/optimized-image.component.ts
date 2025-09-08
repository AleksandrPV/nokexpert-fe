import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Blur placeholder для плавной загрузки -->
    <div
      *ngIf="!loaded && !error"
      class="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
      [style.width.px]="width || 300"
      [style.height.px]="height || 200">
    </div>

    <!-- Lazy-loaded изображение -->
    <img
      #imageElement
      [src]="currentSrc"
      [alt]="alt"
      [width]="width"
      [height]="height"
      [class]="cssClass"
      [attr.loading]="priority ? 'eager' : 'lazy'"
      decoding="async"
      [attr.sizes]="sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'"
      [attr.srcset]="responsiveSrcset"
      [attr.fetchpriority]="priority ? 'high' : null"
      (load)="onImageLoad()"
      (error)="onImageError()"
      [class.opacity-0]="!loaded"
      [class.opacity-100]="loaded"
      class="transition-opacity duration-300 ease-in-out"
      [attr.aria-label]="ariaLabel"
      [attr.role]="ariaLabel ? 'img' : null">
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class OptimizedImageComponent implements OnInit {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() cssClass: string = '';
  @Input() sizes?: string;
  @Input() srcset?: string;
  @Input() ariaLabel?: string;
  @Input() placeholder: string = '/assets/images/placeholder.jpg';
  @Input() priority: boolean = false; // Для above-the-fold изображений

  // Новые свойства для responsive изображений
  @Input() responsiveImages?: {
    small?: string;   // 640px и меньше
    medium?: string;  // 768px
    large?: string;   // 1024px
    xlarge?: string;  // 1280px и больше
  };

  @Input() webpImages?: {
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
  };

  @Input() blurPlaceholder?: string; // Blur-up изображение

  loaded = false;
  error = false;
  supportsWebP = false;

  ngOnInit(): void {
    // Если изображение не загружено, показываем placeholder
    if (!this.src) {
      this.src = this.placeholder;
    }

    // Проверяем поддержку WebP
    this.checkWebPSupport();

    // Генерируем responsive srcset если не указан вручную
    if (!this.srcset && this.responsiveImages) {
      this.srcset = this.generateResponsiveSrcset();
    }
  }

  /**
   * Проверка поддержки WebP браузером
   */
  private checkWebPSupport(): void {
    // Проверяем поддержку WebP через canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    try {
      canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      this.supportsWebP = true;
    } catch {
      this.supportsWebP = false;
    }
  }

  /**
   * Генерация responsive srcset
   */
  private generateResponsiveSrcset(): string {
    if (!this.responsiveImages) return '';

    const sources: string[] = [];

    if (this.responsiveImages.small) {
      sources.push(`${this.responsiveImages.small} 640w`);
    }
    if (this.responsiveImages.medium) {
      sources.push(`${this.responsiveImages.medium} 768w`);
    }
    if (this.responsiveImages.large) {
      sources.push(`${this.responsiveImages.large} 1024w`);
    }
    if (this.responsiveImages.xlarge) {
      sources.push(`${this.responsiveImages.xlarge} 1280w`);
    }

    return sources.join(', ');
  }

  /**
   * Получение текущего src с учетом WebP поддержки
   */
  get currentSrc(): string {
    if (this.supportsWebP && this.webpImages) {
      // Используем WebP версию если поддерживается
      return this.webpImages.small || this.webpImages.medium || this.webpImages.large || this.webpImages.xlarge || this.src;
    }
    return this.src;
  }

  /**
   * Получение responsive srcset с учетом WebP
   */
  get responsiveSrcset(): string {
    if (this.srcset) return this.srcset;

    if (this.supportsWebP && this.webpImages) {
      return this.generateResponsiveSrcset();
    }

    if (this.responsiveImages) {
      return this.generateResponsiveSrcset();
    }

    return '';
  }

  onImageLoad(): void {
    this.loaded = true;
    this.error = false;
  }

  onImageError(): void {
    this.error = true;
    this.src = this.placeholder;
    this.loaded = true;
  }
} 