import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

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
export class MainLayoutComponent {} 