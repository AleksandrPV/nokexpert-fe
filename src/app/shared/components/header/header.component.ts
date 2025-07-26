import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfoService } from '../../../features/info/services/info.service';
import { InfoCategory } from '../../../features/info/models/info-page.interface';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMegaMenu = false;
  mobileMenuOpen = false;
  nokSubmenuOpen = false;
  menuCategories: InfoCategory[] = [];
  megaMenuTimeout: any = null;

  private infoService = inject(InfoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);

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

  constructor() {}

  ngOnInit(): void {
    this.loadMenuCategories();
  }

  ngOnDestroy(): void {
    if (this.megaMenuTimeout) {
      clearTimeout(this.megaMenuTimeout);
    }
  }

  loadMenuCategories(): void {
    this.infoService.getMenuCategories().subscribe(categories => {
      this.menuCategories = categories;
    });
  }

  onMegaMenuEnter(): void {
    this.showMegaMenu = true;
    // Очищаем таймер скрытия, если он есть
    if (this.megaMenuTimeout) {
      clearTimeout(this.megaMenuTimeout);
      this.megaMenuTimeout = null;
    }
  }

  onMegaMenuLeave(): void {
    // Устанавливаем небольшую задержку перед скрытием
    this.megaMenuTimeout = setTimeout(() => {
      this.showMegaMenu = false;
    }, 150);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.nokSubmenuOpen = false; // Закрываем подменю при переключении основного меню
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.nokSubmenuOpen = false;
  }

  toggleNokSubmenu(): void {
    this.nokSubmenuOpen = !this.nokSubmenuOpen;
  }

  /**
   * Открыть popup для консультации
   */
  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }
} 