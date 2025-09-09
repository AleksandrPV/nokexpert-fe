import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CtaSectionComponent } from '../../../shared/components/cta-section/cta-section.component';
import { RelatedMaterialsComponent } from '../../../shared/components/related-materials/related-materials.component';

@Component({
  selector: 'app-propiska-nok-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    CtaSectionComponent,
    RelatedMaterialsComponent
  ],
  templateUrl: './propiska-nok-page.component.html',
  styleUrls: ['./propiska-nok-page.component.scss']
})
export class PropiskaNokPageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  breadcrumbs = [
    { label: 'Главная', url: '/', icon: '🏠' },
    { label: 'FAQ', url: '/faq', icon: '❓' },
    { label: 'Нужна ли прописка для сдачи экзамена НОК?', active: true, icon: '🏠' }
  ];

  ngOnInit(): void {
    // SEO мета-теги только в браузере
    if (this.isBrowser) {
      document.title = 'Нужна ли прописка для сдачи экзамена НОК? | НОК Эксперт';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Узнайте, нужна ли прописка для сдачи экзамена НОК. Требования к документам, временная регистрация, обязательные поля в системе НОК.');
      }
    }
  }
} 