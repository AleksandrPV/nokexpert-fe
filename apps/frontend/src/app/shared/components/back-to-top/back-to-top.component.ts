import { Component, inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconModule } from '../icon/icon.component';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, IconModule],
  template: `
    <button
      *ngIf="isVisible"
      (click)="scrollToTop()"
      aria-label="Наверх"
      class="fixed bottom-6 left-6 z-50 w-11 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200">
      <lucide-icon name="chevron-up" [size]="20" [strokeWidth]="2.5"></lucide-icon>
    </button>
  `,
})
export class BackToTopComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isVisible = false;

  private scrollHandler = () => {
    this.isVisible = window.scrollY > 400;
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

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
