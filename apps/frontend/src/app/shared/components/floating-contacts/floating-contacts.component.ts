import { Component, inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ORGANIZATION_CONFIG } from '../../../../environments/organization.config';
import { IconModule } from '../icon/icon.component';

@Component({
  selector: 'app-floating-contacts',
  standalone: true,
  imports: [CommonModule, IconModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-200"
      [class.opacity-0]="!isVisible"
      [class.translate-y-4]="!isVisible">

      <!-- WhatsApp -->
      <a
        [href]="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        class="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-white">
        <lucide-icon name="message-circle" [size]="24"></lucide-icon>
      </a>

      <!-- Telegram -->
      <a
        [href]="telegramUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        class="w-12 h-12 bg-[#0088cc] rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-white">
        <lucide-icon name="send" [size]="24"></lucide-icon>
      </a>
    </div>
  `,
})
export class FloatingContactsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isVisible = false;

  whatsappUrl = `https://wa.me/${ORGANIZATION_CONFIG.social?.whatsapp}`;
  telegramUrl = `https://t.me/${ORGANIZATION_CONFIG.social?.telegram}`;

  private scrollHandler = () => {
    this.isVisible = window.scrollY > 300;
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
