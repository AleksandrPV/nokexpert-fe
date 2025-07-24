import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './features/main/components/main-page.component';
import { ServicesPageComponent } from './features/services/components/services-page.component';
import { ServiceDetailPageComponent } from './features/service-detail/components/service-detail-page.component';
import { ContactsPageComponent } from './features/contacts/components/contacts-page.component';
import { BlogPageComponent } from './features/blog/components/blog-page.component';
import { InfoPageComponent } from './features/info/components/info-page.component';
import { FaqPageComponent } from './features/faq/components/faq-page.component';
import { CenterPageComponent } from './features/center/components/center-page.component';
import { QualificationsPageComponent } from './features/qualifications/components/qualifications-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'services/:id', component: ServiceDetailPageComponent },
      { path: 'contacts', component: ContactsPageComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: 'info', component: InfoPageComponent },
      { path: 'faq', component: FaqPageComponent },
      { path: 'center', component: CenterPageComponent },
      { path: 'qualifications', component: QualificationsPageComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
