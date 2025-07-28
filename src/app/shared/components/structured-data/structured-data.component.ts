import { Component, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

@Component({
  selector: 'app-structured-data',
  standalone: true,
  template: '', // Компонент не рендерит ничего в DOM
  styles: []
})
export class StructuredDataComponent implements OnInit {
  @Input() data!: StructuredData;
  @Input() type: 'application/ld+json' | 'application/json' = 'application/ld+json';
  
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    if (this.isBrowser && this.data) {
      this.addStructuredData();
    }
  }

  private addStructuredData(): void {
    // Удаляем существующие структурированные данные
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Создаем новый script элемент
    const script = document.createElement('script');
    script.type = this.type;
    script.textContent = JSON.stringify(this.data, null, 2);
    
    // Добавляем в head
    document.head.appendChild(script);
  }
} 