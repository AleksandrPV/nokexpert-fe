import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header />
    <main class="min-h-[70vh] container mx-auto p-4">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: []
})
export class MainLayoutComponent {
  constructor(private router: Router) {
    // Автоматическая прокрутка наверх при переходе между страницами
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
} 