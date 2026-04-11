import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { SecurityService } from '../../../shared/services/security.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PhoneMaskDirective } from '../../../shared/directives/phone-mask.directive';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PhoneMaskDirective, IconModule],
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private organizationService = inject(OrganizationService);
  private securityService = inject(SecurityService);
  private http = inject(HttpClient);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  get organizationName(): string {
    return this.organizationService.getName();
  }

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  get address(): string {
    return this.organizationService.getAddress();
  }

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  };


  ngOnInit(): void {
    this.seoService.setContactsPageSeo();
    this.seoService.addContactStructuredData(this.organizationService.getData());
    this.seoService.addServiceAvailabilityStructuredData();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    // Floating orbs
    gsap.to('.contacts-hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    // Grid lines
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.fromTo('.contacts-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' },
      0
    );
    heroTl.fromTo('.contacts-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' },
      0.3
    );

    // Hero content
    heroTl.fromTo('.contacts-hero-badge',
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 },
      0.3
    );
    heroTl.fromTo('.contacts-hero-title',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' },
      0.5
    );
    heroTl.fromTo('.contacts-hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.8
    );
    heroTl.fromTo('.contacts-hero-stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      1.0
    );
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    // Contact info + form section
    const contactsTl = await this.animationService.sectionTimeline('#contacts-section');
    if (contactsTl) {
      contactsTl.fromTo('#contacts-section .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      contactsTl.fromTo('#contacts-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      contactsTl.fromTo('#contacts-section h2 + p',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.25);
      contactsTl.fromTo('.contact-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.35);
      contactsTl.fromTo('.contact-form-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.1)' }, 0.5);
    }

    // Map section
    const mapTl = await this.animationService.sectionTimeline('#map-section');
    if (mapTl) {
      mapTl.fromTo('#map-section .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      mapTl.fromTo('#map-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      mapTl.fromTo('.map-container',
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
    }

    // Messengers section
    const messengersTl = await this.animationService.sectionTimeline('#messengers-section');
    if (messengersTl) {
      messengersTl.fromTo('#messengers-section .uppercase',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }, 0);
      messengersTl.fromTo('#messengers-section h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.1);
      messengersTl.fromTo('.messenger-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)' }, 0.3);
    }

    // CTA section
    const ctaCard = document.querySelector('#contacts-cta .bg-gradient-to-br');
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

  async onSubmit() {
    this.submitSuccess = false;
    this.submitError = '';

    const sanitizedName = this.securityService.sanitizeName(this.formData.name);
    const sanitizedEmail = this.securityService.sanitizeEmail(this.formData.email);
    const sanitizedPhone = this.securityService.sanitizePhone(this.formData.phone);
    const sanitizedSubject = this.securityService.sanitizeText(this.formData.subject);
    const sanitizedMessage = this.securityService.sanitizeText(this.formData.message);

    if (!this.securityService.isSafeInput(sanitizedName) ||
        !this.securityService.isSafeInput(sanitizedEmail) ||
        !this.securityService.isSafeInput(sanitizedPhone) ||
        !this.securityService.isSafeInput(sanitizedSubject) ||
        !this.securityService.isSafeInput(sanitizedMessage)) {
      this.submitError = 'Обнаружены потенциально опасные данные. Пожалуйста, проверьте введенную информацию.';
      return;
    }

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage || !this.formData.privacy) {
      this.submitError = 'Пожалуйста, заполните все обязательные поля.';
      return;
    }

    const safeFormData = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    };

    this.isSubmitting = true;

    try {
      await firstValueFrom(
        this.http.post<{ success: boolean; message: string }>(
          `${environment.apiUrl}/feedback`,
          {
            name: safeFormData.name,
            phone: safeFormData.phone,
            email: safeFormData.email || undefined,
            subject: safeFormData.subject,
            message: safeFormData.message || undefined,
          }
        )
      );
      this.submitSuccess = true;
      this.resetForm();
    } catch {
      this.submitError = 'Произошла ошибка при отправке. Попробуйте ещё раз или свяжитесь с нами по телефону.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    };
  }
}
