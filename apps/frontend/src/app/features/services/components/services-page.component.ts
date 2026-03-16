import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { ServicesService } from '../services/services.service';
import { Service, ServiceCategory } from '../models/service.interface';
import { PRICING } from '../../../shared/config/pricing.config';

/**
 * Компонент страницы услуг — premium SaaS дизайн
 * Полностью соответствует стилю главной страницы
 */
@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent, IconModule],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private servicesService = inject(ServicesService);
  private animationService = inject(AnimationService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  readonly pricing = PRICING;

  selectedCategory: string = 'all';

  categories = [
    { key: 'all', name: 'Все услуги', icon: 'layers' },
    { key: ServiceCategory.CONSTRUCTION, name: 'Строительство', icon: 'building-2' },
    { key: ServiceCategory.DESIGN, name: 'Проектирование', icon: 'file-text' },
    { key: ServiceCategory.RESEARCH, name: 'Изыскания', icon: 'search' },
    { key: ServiceCategory.SAFETY, name: 'Пожарная безопасность', icon: 'shield' },
    { key: ServiceCategory.EMERGENCY, name: 'МЧС', icon: 'zap' },
    { key: ServiceCategory.HOUSING, name: 'ЖКХ', icon: 'house' },
    { key: ServiceCategory.CONSULTATION, name: 'Консультации', icon: 'message-circle' }
  ];

  services: Service[] = [];
  filteredServices: Service[] = [];

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  ngOnInit(): void {
    this.seoService.setServicesPageSeo();

    this.servicesService.getAllServices().subscribe((services: Service[]) => {
      this.services = services;
      this.filteredServices = services;
      this.seoService.addServicesPricingStructuredData(services);
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.category === category);
    }
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }

  /** Lucide icon name by service icon key */
  getServiceLucideIcon(icon: string): string {
    const map: Record<string, string> = {
      'construction': 'building-2',
      'design': 'file-text',
      'research': 'search',
      'safety': 'shield',
      'emergency': 'zap',
      'housing': 'house',
      'consultation': 'message-circle',
      'refresher': 'graduation-cap'
    };
    return map[icon] || 'briefcase';
  }

  /** Icon container color by service icon key */
  getIconBgClass(icon: string): string {
    const map: Record<string, string> = {
      'construction': 'bg-blue-500/15 text-blue-400',
      'design': 'bg-cyan-500/15 text-cyan-400',
      'research': 'bg-violet-500/15 text-violet-400',
      'safety': 'bg-orange-500/15 text-orange-400',
      'emergency': 'bg-red-500/15 text-red-400',
      'housing': 'bg-teal-500/15 text-teal-400',
      'consultation': 'bg-slate-500/15 text-slate-400',
      'refresher': 'bg-amber-500/15 text-amber-400'
    };
    return map[icon] || 'bg-blue-500/15 text-blue-400';
  }

  /** Light card icon container */
  getIconBgClassLight(icon: string): string {
    const map: Record<string, string> = {
      'construction': 'bg-blue-50 text-blue-600',
      'design': 'bg-cyan-50 text-cyan-600',
      'research': 'bg-violet-50 text-violet-600',
      'safety': 'bg-orange-50 text-orange-600',
      'emergency': 'bg-red-50 text-red-600',
      'housing': 'bg-teal-50 text-teal-600',
      'consultation': 'bg-slate-100 text-slate-600',
      'refresher': 'bg-amber-50 text-amber-600'
    };
    return map[icon] || 'bg-blue-50 text-blue-600';
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  openServicePopup(service: Service): void {
    this.feedbackService.open({
      title: service.title,
      subtitle: `Получите консультацию по услуге: ${service.title}`
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initScrollAnimations();
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // ===== HERO SECTION =====
    const heroTl = await this.animationService.sectionTimeline('#services-hero', { start: 'top 98%' });
    if (heroTl) {
      heroTl.fromTo('#services-hero .hero-badge',
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 }, 0);
      heroTl.fromTo('#services-hero h1',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' }, 0.15);
      heroTl.fromTo('#services-hero .hero-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.35);
      heroTl.fromTo('#services-hero .hero-stats',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.5);
    }

    // ===== FILTER TABS =====
    const filterTl = await this.animationService.sectionTimeline('#services-filter');
    if (filterTl) {
      filterTl.fromTo('#services-filter .filter-btn',
        { y: 15, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' }, 0);
    }

    // ===== SERVICES GRID =====
    const gridTl = await this.animationService.sectionTimeline('#services-grid');
    if (gridTl) {
      gridTl.fromTo('#services-grid .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      gridTl.fromTo('#services-grid h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      gridTl.fromTo('#services-grid h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      gridTl.fromTo('.service-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // ===== DIRECTIONS SECTION =====
    const dirTl = await this.animationService.sectionTimeline('#directions-section');
    if (dirTl) {
      dirTl.fromTo('#directions-section .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      dirTl.fromTo('#directions-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      dirTl.fromTo('#directions-section h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      dirTl.fromTo('.direction-card',
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 0.35);
    }

    // ===== STATS SECTION =====
    const statsTl = await this.animationService.sectionTimeline('#stats-section');
    if (statsTl) {
      statsTl.fromTo('#stats-section .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      statsTl.fromTo('#stats-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      statsTl.fromTo('#stats-section h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      statsTl.fromTo('.stat-card',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
    }

    // ===== CTA SECTION =====
    const ctaCard = document.querySelector('#services-cta .cta-card');
    if (ctaCard) {
      const ctaSection = ctaCard.closest('section');
      if (ctaSection) {
        gsap.fromTo(ctaCard,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.1)',
            scrollTrigger: { trigger: ctaSection, start: 'top 92%', once: true }
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
