import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  breadcrumbs = [
    { label: 'Главная', url: '/' },
    { label: 'FAQ', url: '/faq' },
    { label: 'Нужна ли прописка для сдачи экзамена НОК?', url: '/faq/propiska-nok' }
  ];

  ngOnInit(): void {
    // SEO мета-теги
    document.title = 'Нужна ли прописка для сдачи экзамена НОК? | НОК Эксперт';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Узнайте, нужна ли прописка для сдачи экзамена НОК. Требования к документам, временная регистрация, обязательные поля в системе НОК.');
    }
  }
} 