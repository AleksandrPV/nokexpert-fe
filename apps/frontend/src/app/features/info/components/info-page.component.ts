import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfoSection, InfoPage } from '../models/info-page.interface';
import { InfoService } from '../services/info.service';
import { SeoService } from '../../../shared/services/seo.service';
import { FeedbackPopupService } from '../../feedback-popup/services/feedback-popup.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { AnimationService } from '../../../shared/services/animation.service';
import { IconModule } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconModule],
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private feedbackService = inject(FeedbackPopupService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  infoSections: InfoSection[] = [];
  featuredPages: InfoPage[] = [];
  searchQuery = '';
  searchResults: InfoPage[] = [];

  private searchTimeout: any;

  /** Popular articles — manually curated slugs for section 3 */
  readonly popularSlugs = ['what-is-nok', 'who-must-pass-nok', 'nok-procedure', 'exam-preparation'];
  popularPages: InfoPage[] = [];

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.seoService.setInfoPageSeo();
    this.loadInfoSections();
    this.loadFeaturedPages();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }

  loadInfoSections(): void {
    this.infoService.getInfoSections().subscribe(sections => {
      this.infoSections = sections;
    });
  }

  loadFeaturedPages(): void {
    this.infoService.getAllPages().subscribe(pages => {
      this.popularPages = this.popularSlugs
        .map(slug => pages.find(p => p.slug === slug))
        .filter((p): p is InfoPage => !!p);
    });
  }

  onSearchChange(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        this.infoService.searchPages(this.searchQuery).subscribe(results => {
          this.searchResults = results;
        });
      } else {
        this.searchResults = [];
      }
    }, 300);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }

  openConsultationPopup(): void {
    this.feedbackService.openForConsultation();
  }

  private async initHeroAnimations(): Promise<void> {
    await this.animationService.heroEntrance({
      badge: '.info-hero-badge',
      title: '.info-hero-title',
      subtitle: '.info-hero-subtitle',
      cta: '.info-hero-search'
    });
  }

  private async initScrollAnimations(): Promise<void> {
    // Categories section
    const catTl = await this.animationService.sectionTimeline('#info-categories');
    if (catTl) {
      catTl.fromTo('#info-categories .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      catTl.fromTo('#info-categories h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      catTl.fromTo('#info-categories h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      catTl.fromTo('.category-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.35);
    }

    // Popular articles section
    const popTl = await this.animationService.sectionTimeline('#info-popular');
    if (popTl) {
      popTl.fromTo('#info-popular .section-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      popTl.fromTo('#info-popular h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      popTl.fromTo('#info-popular h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      popTl.fromTo('.popular-card',
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)' }, 0.35);
    }

    // CTA section
    const ctaCard = document.querySelector('.info-cta-card');
    if (ctaCard) {
      const lib = await this.animationService.init();
      if (lib) {
        lib.gsap.fromTo(ctaCard,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.1)',
            scrollTrigger: { trigger: ctaCard.closest('section'), start: 'top 92%', once: true }
          }
        );
      }
    }
  }
}
