import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './features/main/main-page.component';

// Preload strategy for critical routes
const preloadCritical = () => import('./features/services/components/services-page.component').then(m => m.ServicesPageComponent);
const preloadPopular = () => import('./features/contacts/components/contacts-page.component').then(m => m.ContactsPageComponent);

import { SpecialistsRegistryPageComponent } from './features/info/components/specialists-registry-page.component';
import { NokLegislationPageComponent } from './features/info/components/nok-legislation-page.component';
import { ReviewsPageComponent } from './features/reviews/reviews-page.component';
import { SitemapPageComponent } from './features/sitemap/sitemap-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      {
        path: 'services',
        loadComponent: () => import('./features/services/components/services-page.component').then(m => m.ServicesPageComponent),
        data: { preload: true, priority: 'high' }
      },
      {
        path: 'consultation',
        loadComponent: () => import('./features/consultation/components/consultation-page.component').then(m => m.ConsultationPageComponent)
      },
      {
        path: 'services/nok-nostroy',
        loadComponent: () => import('./features/services/nok-nostroy/nok-nostroy-page.component').then(m => m.NokNostroyPageComponent),
        data: { preload: true, priority: 'high' }
      },
      {
        path: 'services/nok-nopriz',
        loadComponent: () => import('./features/services/nok-nopriz/nok-nopriz-page.component').then(m => m.NokNoprizPageComponent),
        data: { preload: true, priority: 'high' }
      },
      {
        path: 'services/nok-opb',
        loadComponent: () => import('./features/services/nok-opb/nok-opb-page.component').then(m => m.NokOpbPageComponent),
        data: { preload: true, priority: 'high' }
      },
      {
        path: 'services/:id',
        loadComponent: () => import('./features/service-detail/components/service-detail-page.component').then(m => m.ServiceDetailPageComponent)
      },
      {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/components/contacts-page.component').then(m => m.ContactsPageComponent),
        data: { preload: true, priority: 'medium' }
      },
      {
        path: 'info',
        loadComponent: () => import('./features/info/components/info-page.component').then(m => m.InfoPageComponent)
      },
      {
        path: 'info/nok-nostroy',
        loadComponent: () => import('./features/info/components/nok-nostroy-info-page.component').then(m => m.NokNostroyInfoPageComponent)
      },
      {
        path: 'info/what-is-nok',
        loadComponent: () => import('./features/info/components/what-is-nok-page.component').then(m => m.WhatIsNokPageComponent)
      },
      {
        path: 'info/who-must-pass-nok',
        loadComponent: () => import('./features/info/components/who-must-pass-nok-page.component').then(m => m.WhoMustPassNokPageComponent)
      },
      {
        path: 'info/nok-procedure',
        loadComponent: () => import('./features/info/components/nok-procedure-page.component').then(m => m.NokProcedurePageComponent)
      },
      {
        path: 'info/nok-other-industries',
        loadComponent: () => import('./features/info/components/nok-other-industries-page.component').then(m => m.NokOtherIndustriesPageComponent)
      },
      {
        path: 'info/exam-preparation',
        loadComponent: () => import('./features/info/components/exam-preparation-page.component').then(m => m.ExamPreparationPageComponent)
      },
      {
        path: 'info/nok-qa',
        loadComponent: () => import('./features/info/components/nok-qa-page.component').then(m => m.NokQaPageComponent)
      },
      {
        path: 'info/portfolio-guide',
        loadComponent: () => import('./features/info/components/portfolio-guide-page.component').then(m => m.PortfolioGuidePageComponent)
      },
      {
        path: 'info/online-trainer',
        loadComponent: () => import('./features/info/components/online-trainer-page.component').then(m => m.OnlineTrainerPageComponent)
      },
      {
        path: 'info/specialists-registry',
        loadComponent: () => import('./features/info/components/specialists-registry-page.component').then(m => m.SpecialistsRegistryPageComponent)
      },
      {
        path: 'info/nok-legislation',
        loadComponent: () => import('./features/info/components/nok-legislation-page.component').then(m => m.NokLegislationPageComponent)
      },
      {
        path: 'qa-centers',
        loadComponent: () => import('./features/qa-centers/components/centers-page.component').then(m => m.QaCentersPageComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/faq/components/faq-page.component').then(m => m.FaqPageComponent)
      },
      {
        path: 'faq/propiska-nok',
        loadComponent: () => import('./features/faq/components/propiska-nok-page.component').then(m => m.PropiskaNokPageComponent)
      },
      {
        path: 'faq/:slug',
        loadComponent: () => import('./features/faq/components/faq-detail-page.component').then(m => m.FaqDetailPageComponent)
      },
      {
        path: 'center',
        loadComponent: () => import('./features/center/components/center-page.component').then(m => m.CenterPageComponent)
      },
      {
        path: 'qualifications',
        loadComponent: () => import('./features/qualifications/components/qualifications-page.component').then(m => m.QualificationsPageComponent)
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./features/privacy-policy/components/privacy-policy-page.component').then(m => m.PrivacyPolicyPageComponent)
      },
      {
        path: 'user-agreement',
        loadComponent: () => import('./features/user-agreement/components/user-agreement-page.component').then(m => m.UserAgreementPageComponent)
      },
      {
        path: 'reviews',
        loadComponent: () => import('./features/reviews/reviews-page.component').then(m => m.ReviewsPageComponent)
      },
      {
        path: 'sitemap',
        loadComponent: () => import('./features/sitemap/sitemap-page.component').then(m => m.SitemapPageComponent)
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
  { path: '**', redirectTo: '/404' }
];
