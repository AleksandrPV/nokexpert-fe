import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackPopupComponent } from './features/feedback-popup/components/feedback-popup.component';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeedbackPopupComponent],
  template: `
    <router-outlet />
    <app-feedback-popup />
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
