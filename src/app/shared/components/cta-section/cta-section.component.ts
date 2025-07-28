import { Component, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../services/organization.service';

export interface CtaButton {
  text: string;
  icon?: string;
  action: 'consultation' | 'phone' | 'email' | 'scroll' | 'link';
  target?: string; // для scroll или link
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  routerLink?: string;
}

export interface CtaSectionConfig {
  title: string;
  subtitle?: string;
  description?: string;
  buttons: CtaButton[];
  variant?: 'default' | 'gradient' | 'dark' | 'light';
  showPhone?: boolean;
  showEmail?: boolean;
  showConsultationButton?: boolean;
  showAdditionalInfo?: boolean;
  additionalInfo?: string;
  background?: 'white' | 'gradient' | 'dark' | 'brand';
  padding?: 'small' | 'medium' | 'large';
}

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section 
      [class]="getSectionClasses()"
      class="relative overflow-hidden">
      
      <div class="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          
          <!-- Заголовок -->
          <h2 
            [class]="getTitleClasses()"
            class="font-bold mb-4 sm:mb-6">
            {{ config.title }}
          </h2>
          
          <!-- Подзаголовок -->
          <p 
            *ngIf="config.subtitle"
            [class]="getSubtitleClasses()"
            class="mb-4 sm:mb-6">
            {{ config.subtitle }}
          </p>
          
          <!-- Описание -->
          <p 
            *ngIf="config.description"
            [class]="getDescriptionClasses()"
            class="mb-8 sm:mb-12 px-4">
            {{ config.description }}
          </p>
          
          <!-- Кнопки -->
          <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-center items-center">
            
            <!-- Основные кнопки -->
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              
              <!-- Телефон -->
              <a 
                *ngIf="config.showPhone"
                [href]="'tel:' + phoneHref" 
                [class]="getButtonClasses('outline')"
                class="whitespace-nowrap">
                📞 {{ phoneDisplay }}
              </a>
              
              <!-- Email -->
              <a 
                *ngIf="config.showEmail"
                [href]="'mailto:' + email" 
                [class]="getButtonClasses('outline')"
                class="whitespace-nowrap">
                ✉️ {{ email }}
              </a>
              
              <!-- Кастомные кнопки -->
              <ng-container *ngFor="let button of config.buttons">
                
                <!-- Кнопка консультации -->
                <button 
                  *ngIf="button.action === 'consultation'"
                  (click)="openConsultationPopup()"
                  [class]="getButtonClasses(button.variant || 'primary')"
                  class="whitespace-nowrap">
                  {{ button.icon }} {{ button.text }}
                </button>
                
                <!-- Кнопка прокрутки -->
                <button 
                  *ngIf="button.action === 'scroll'"
                  (click)="scrollToSection(button.target || '')"
                  [class]="getButtonClasses(button.variant || 'secondary')"
                  class="whitespace-nowrap">
                  {{ button.icon }} {{ button.text }}
                </button>
                
                <!-- Ссылка -->
                <a 
                  *ngIf="button.action === 'link'"
                  [routerLink]="button.routerLink || button.target || '/'"
                  [class]="getButtonClasses(button.variant || 'secondary')"
                  class="whitespace-nowrap">
                  {{ button.icon }} {{ button.text }}
                </a>
                
                <!-- Телефон -->
                <a 
                  *ngIf="button.action === 'phone'"
                  [href]="'tel:' + phoneHref"
                  [class]="getButtonClasses(button.variant || 'outline')"
                  class="whitespace-nowrap">
                  {{ button.icon }} {{ button.text }}
                </a>
                
                <!-- Email -->
                <a 
                  *ngIf="button.action === 'email'"
                  [href]="'mailto:' + email"
                  [class]="getButtonClasses(button.variant || 'outline')"
                  class="whitespace-nowrap">
                  {{ button.icon }} {{ button.text }}
                </a>
                
              </ng-container>
              
            </div>
            
            <!-- Дополнительная кнопка консультации -->
            <button 
              *ngIf="config.showConsultationButton && !hasConsultationButton()"
              (click)="openConsultationPopup()"
              [class]="getButtonClasses('primary')"
              class="whitespace-nowrap">
              💼 Записаться на консультацию
            </button>
            
          </div>
          
          <!-- Дополнительная информация -->
          <div 
            *ngIf="config.showAdditionalInfo"
            [class]="getAdditionalInfoClasses()"
            class="mt-8 font-medium">
            <p>{{ config.additionalInfo || 'Ответим в течение 15 минут • Консультация бесплатна' }}</p>
          </div>
          
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class CtaSectionComponent implements OnInit {
  @Input() config!: CtaSectionConfig;

  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  // Геттеры для данных организации
  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }
  
  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }
  
  get email(): string {
    return this.organizationService.getEmail();
  }
  
  ngOnInit(): void {
    // Устанавливаем значения по умолчанию
    this.config = {
      title: this.config?.title || '',
      buttons: this.config?.buttons || [],
      variant: this.config?.variant || 'default',
      background: this.config?.background || 'white',
      padding: this.config?.padding || 'medium',
      showPhone: this.config?.showPhone || false,
      showEmail: this.config?.showEmail || false,
      showConsultationButton: this.config?.showConsultationButton || false,
      showAdditionalInfo: this.config?.showAdditionalInfo || false,
      subtitle: this.config?.subtitle,
      description: this.config?.description,
      additionalInfo: this.config?.additionalInfo
    };
  }
  
  /**
   * Открыть popup для консультации
   */
  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }
  
  /**
   * Прокрутить к секции
   */
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser || !sectionId) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  /**
   * Проверить, есть ли кнопка консультации в кастомных кнопках
   */
  hasConsultationButton(): boolean {
    return this.config.buttons.some(button => button.action === 'consultation');
  }
  
  /**
   * Получить классы для секции
   */
  getSectionClasses(): string {
    const baseClasses = 'relative overflow-hidden';
    const paddingClasses = {
      small: 'py-12',
      medium: 'py-16 sm:py-20',
      large: 'py-20 lg:py-24'
    };
    const backgroundClasses = {
      white: 'bg-white',
      gradient: 'bg-gradient-to-br from-brand-sky/5 to-brand-coral/5',
      dark: 'bg-gradient-to-br from-slate-900 via-brand-navy to-black text-white',
      brand: 'bg-gradient-to-r from-brand-navy to-brand-sky text-white'
    };
    
    const background = this.config.background || 'white';
    const padding = this.config.padding || 'medium';
    
    return `${baseClasses} ${paddingClasses[padding]} ${backgroundClasses[background]}`;
  }
  
  /**
   * Получить классы для заголовка
   */
  getTitleClasses(): string {
    const baseClasses = 'font-bold mb-4 sm:mb-6';
    const sizeClasses = 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
    const colorClasses = this.config.background === 'dark' || this.config.background === 'brand' 
      ? 'text-white' 
      : 'text-gradient-primary consulting-accent';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  }
  
  /**
   * Получить классы для подзаголовка
   */
  getSubtitleClasses(): string {
    const baseClasses = 'mb-4 sm:mb-6';
    const sizeClasses = 'text-lg sm:text-xl';
    const colorClasses = this.config.background === 'dark' || this.config.background === 'brand' 
      ? 'text-white/90' 
      : 'text-brand-dark/80';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  }
  
  /**
   * Получить классы для описания
   */
  getDescriptionClasses(): string {
    const baseClasses = 'mb-8 sm:mb-12 px-4';
    const sizeClasses = 'text-lg sm:text-xl';
    const colorClasses = this.config.background === 'dark' || this.config.background === 'brand' 
      ? 'text-white/90' 
      : 'text-brand-dark/80';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  }
  
  /**
   * Получить классы для кнопок
   */
  getButtonClasses(variant: string): string {
    const baseClasses = 'px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-4 whitespace-nowrap';
    
    const isDark = this.config.background === 'dark' || this.config.background === 'brand';
    
    const variantClasses = {
      primary: 'bg-brand-coral hover:bg-orange-600 text-white hover:shadow-2xl hover:-translate-y-1 focus:ring-brand-coral/30',
      secondary: isDark 
        ? 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 focus:ring-white/30' 
        : 'bg-white/80 backdrop-blur-sm text-brand-dark border border-brand-sky/30 hover:bg-white focus:ring-brand-sky/30',
      outline: isDark 
        ? 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 focus:ring-white/30' 
        : 'glass text-brand-dark hover-lift border-brand-sky focus:ring-brand-sky/30',
      glass: 'glass px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full font-semibold text-brand-dark hover-lift border-brand-sky professional-border text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-brand-sky/30 transition-all duration-300'
    };
    
    const adjustedVariant = isDark && variant === 'outline' ? 'secondary' : variant;
    
    return `${baseClasses} ${variantClasses[adjustedVariant as keyof typeof variantClasses] || variantClasses.primary}`;
  }
  
  /**
   * Получить классы для дополнительной информации
   */
  getAdditionalInfoClasses(): string {
    const baseClasses = 'mt-8 font-medium';
    const colorClasses = this.config.background === 'dark' || this.config.background === 'brand' 
      ? 'text-white/70' 
      : 'text-brand-dark/70';
    
    return `${baseClasses} ${colorClasses}`;
  }
} 