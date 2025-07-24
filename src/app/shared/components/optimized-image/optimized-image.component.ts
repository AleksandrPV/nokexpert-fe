import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img 
      [src]="src" 
      [alt]="alt"
      [width]="width"
      [height]="height"
      [class]="cssClass"
      loading="lazy"
      decoding="async"
      [attr.sizes]="sizes"
      [attr.srcset]="srcset"
      (load)="onImageLoad()"
      (error)="onImageError()"
      [class.opacity-0]="!loaded"
      [class.opacity-100]="loaded"
      class="transition-opacity duration-300"
      [attr.aria-label]="ariaLabel">
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
  
  loaded = false;
  error = false;

  ngOnInit(): void {
    // Если изображение не загружено, показываем placeholder
    if (!this.src) {
      this.src = this.placeholder;
    }
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