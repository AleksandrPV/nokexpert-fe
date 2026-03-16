import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfoService } from '../../../features/info/services/info.service';
import { InfoCategory } from '../../../features/info/models/info-page.interface';
import { FeedbackPopupService } from '../../../features/feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../services/organization.service';
import { ServicesService, HeaderService } from '../../../features/services/services/services.service';
import { IconModule } from '../icon/icon.component';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMegaMenu = false;
  showServicesSubmenu = false;
  mobileMenuOpen = false;
  nokSubmenuOpen = false;
  servicesSubmenuOpen = false;
  isScrolled = false;
  menuCategories: InfoCategory[] = [];
  headerServices: HeaderService[] = [];
  megaMenuTimeout: any = null;
  servicesSubmenuTimeout: any = null;

  private infoService = inject(InfoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private servicesService = inject(ServicesService);
  private platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);
  private toastService = inject(ToastService);
  showUserMenu = false;

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

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
    this.loadHeaderServices();
  }

  ngOnDestroy(): void {
    if (this.megaMenuTimeout) {
      clearTimeout(this.megaMenuTimeout);
    }
    if (this.servicesSubmenuTimeout) {
      clearTimeout(this.servicesSubmenuTimeout);
    }
  }

  loadMenuCategories(): void {
    this.infoService.getMenuCategories().subscribe(categories => {
      this.menuCategories = categories.filter(c => c.pages.length > 0);
    });
  }

  loadHeaderServices(): void {
    this.servicesService.getHeaderServices().subscribe(services => {
      this.headerServices = services;
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

  onServicesSubmenuEnter(): void {
    this.showServicesSubmenu = true;
    // Очищаем таймер скрытия, если он есть
    if (this.servicesSubmenuTimeout) {
      clearTimeout(this.servicesSubmenuTimeout);
      this.servicesSubmenuTimeout = null;
    }
  }

  onServicesSubmenuLeave(): void {
    // Устанавливаем небольшую задержку перед скрытием
    this.servicesSubmenuTimeout = setTimeout(() => {
      this.showServicesSubmenu = false;
    }, 150);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.nokSubmenuOpen = false; // Закрываем подменю при переключении основного меню
    this.servicesSubmenuOpen = false;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.nokSubmenuOpen = false;
    this.servicesSubmenuOpen = false;
  }

  toggleNokSubmenu(): void {
    this.nokSubmenuOpen = !this.nokSubmenuOpen;
  }

  toggleServicesSubmenu(): void {
    this.servicesSubmenuOpen = !this.servicesSubmenuOpen;
  }

  /**
   * Закрыть мега-меню НОК при клике на ссылку
   */
  closeMegaMenu(): void {
    this.showMegaMenu = false;
  }

  /**
   * Закрыть подменю услуг при клике на ссылку
   */
  closeServicesSubmenu(): void {
    this.showServicesSubmenu = false;
  }

  /**
   * Открыть popup для консультации
   */
  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  logout(): void {
    this.showUserMenu = false;
    this.authService.logout();
    this.toastService.info('Вы вышли из аккаунта');
  }
} 