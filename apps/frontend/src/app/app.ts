import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackPopupComponent } from './features/feedback-popup/components/feedback-popup.component';
import { FloatingContactsComponent } from './shared/components/floating-contacts/floating-contacts.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeedbackPopupComponent, FloatingContactsComponent, BackToTopComponent],
  template: `
    <router-outlet />
    <app-feedback-popup />
    <app-floating-contacts />
    <app-back-to-top />
  `,
  styles: []
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // SEO сервис автоматически инициализируется в конструкторе
    // Здесь можно добавить дополнительную логику при необходимости
  }
}
