import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './features/main/main-page.component';
import { ServicesPageComponent } from './features/services/components/services-page.component';
import { ServiceDetailPageComponent } from './features/service-detail/components/service-detail-page.component';
import { ContactsPageComponent } from './features/contacts/components/contacts-page.component';
import { BlogPageComponent } from './features/blog/components/blog-page.component';
import { InfoPageComponent } from './features/info/components/info-page.component';
import { FaqPageComponent } from './features/faq/components/faq-page.component';
import { CenterPageComponent } from './features/center/components/center-page.component';
import { QualificationsPageComponent } from './features/qualifications/components/qualifications-page.component';
import { PrivacyPolicyPageComponent } from './features/privacy-policy/components/privacy-policy-page.component';
import { BlogArticlePageComponent } from './features/blog/components/blog-article-page.component';
import { PublicOfferPageComponent } from './features/public-offer/components/public-offer-page.component';
import { UserAgreementPageComponent } from './features/user-agreement/components/user-agreement-page.component';
import { NokNostroyPageComponent } from './features/services/nok-nostroy/nok-nostroy-page.component';
import { NokNoprizPageComponent } from './features/services/nok-nopriz/nok-nopriz-page.component';
import { NokOpbPageComponent } from './features/services/nok-opb/nok-opb-page.component';
import { NokNostroyInfoPageComponent } from './features/info/components/nok-nostroy-info-page.component';
import { QaCentersPageComponent } from './features/qa-centers/components/centers-page.component';
import { WhatIsNokPageComponent } from './features/info/components/what-is-nok-page.component';
import { WhoMustPassNokPageComponent } from './features/info/components/who-must-pass-nok-page.component';
import { NokProcedurePageComponent } from './features/info/components/nok-procedure-page.component';
import { NokOtherIndustriesPageComponent } from './features/info/components/nok-other-industries-page.component';
import { ExamPreparationPageComponent } from './features/info/components/exam-preparation-page.component';
import { NokQaPageComponent } from './features/info/components/nok-qa-page.component';
import { PortfolioGuidePageComponent } from './features/info/components/portfolio-guide-page.component';
import { OnlineTrainerPageComponent } from './features/info/components/online-trainer-page.component';

import { SpecialistsRegistryPageComponent } from './features/info/components/specialists-registry-page.component';
import { NokLegislationPageComponent } from './features/info/components/nok-legislation-page.component';
import { ReviewsPageComponent } from './features/reviews/reviews-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'services/nok-nostroy', component: NokNostroyPageComponent },
      { path: 'services/nok-nopriz', component: NokNoprizPageComponent },
      { path: 'services/nok-opb', component: NokOpbPageComponent },
      { path: 'services/:id', component: ServiceDetailPageComponent },
      { path: 'contacts', component: ContactsPageComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: 'blog/nostroy-changes-2024', component: BlogArticlePageComponent },
      { path: 'info', component: InfoPageComponent },
      { path: 'info/nok-nostroy', component: NokNostroyInfoPageComponent },
                        { path: 'info/what-is-nok', component: WhatIsNokPageComponent },
                  { path: 'info/who-must-pass-nok', component: WhoMustPassNokPageComponent },
                  { path: 'info/nok-procedure', component: NokProcedurePageComponent },
                  { path: 'info/nok-other-industries', component: NokOtherIndustriesPageComponent },
                  { path: 'info/exam-preparation', component: ExamPreparationPageComponent },
                  { path: 'info/nok-qa', component: NokQaPageComponent },
                  { path: 'info/portfolio-guide', component: PortfolioGuidePageComponent },
                  { path: 'info/online-trainer', component: OnlineTrainerPageComponent },
    
                  { path: 'info/specialists-registry', component: SpecialistsRegistryPageComponent },
                  { path: 'info/nok-legislation', component: NokLegislationPageComponent },
      { path: 'qa-centers', component: QaCentersPageComponent },
      { path: 'faq', component: FaqPageComponent },
      { path: 'center', component: CenterPageComponent },
      { path: 'qualifications', component: QualificationsPageComponent },
      { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
      { path: 'public-offer', component: PublicOfferPageComponent },
      { path: 'user-agreement', component: UserAgreementPageComponent },
      { path: 'reviews', component: ReviewsPageComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
