import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TestTimerService {
  private readonly platformId = inject(PLATFORM_ID);
  private intervalId: any = null;

  readonly remaining = signal<number>(0);
  readonly isRunning = signal<boolean>(false);

  readonly timeDisplay = computed(() => {
    const total = this.remaining();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  readonly isExpired = computed(() => this.isRunning() && this.remaining() <= 0);

  start(seconds: number): void {
    this.stop();
    this.remaining.set(seconds);
    this.isRunning.set(true);

    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        const current = this.remaining();
        if (current <= 0) {
          this.stop();
          return;
        }
        this.remaining.set(current - 1);
      }, 1000);
    }
  }

  stop(): void {
    this.isRunning.set(false);
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.stop();
    this.remaining.set(0);
  }
}
