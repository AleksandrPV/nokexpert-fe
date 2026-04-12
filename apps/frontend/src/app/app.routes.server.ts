import { RenderMode, ServerRoute } from '@angular/ssr';
import { ServicesService } from './features/services/services/services.service';

export const serverRoutes: ServerRoute[] = [
  // Статические маршруты с prerendering
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/nok-nostroy',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/nok-nopriz',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/nok-opb',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/nok-housing',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/trainer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'consultation',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contacts',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/nok-nostroy',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/what-is-nok',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/who-must-pass-nok',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/nok-procedure',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/nok-other-industries',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/exam-preparation',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/nok-qa',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/portfolio-guide',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/online-trainer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/specialists-registry',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'info/nok-legislation',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'qa-centers',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'faq',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'faq/propiska-nok',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'center',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'qualifications',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'user-agreement',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sitemap',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'reviews',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'success',
    renderMode: RenderMode.Client
  },
  
  // Динамические маршруты с getPrerenderParams
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Получаем все услуги для prerendering
      const services = [
        'nok-construction',
        'nok-design', 
        'nok-research',
        'nok-safety',
        'consultation',
        'nok-refresher'
      ];
      
      return services.map(id => ({ id }));
    }
  },
  {
    path: 'faq/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Динамически загружаем все FAQ вопросы для prerendering
      const { FAQ_QUESTIONS } = await import('./features/faq/data/faq-questions');
      return FAQ_QUESTIONS.map(q => ({ slug: q.slug }));
    }
  },
  
  // Auth & Dashboard
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'registration-success',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'forgot-password',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Client
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client
  },

  // Тренажёр НОК
  {
    path: 'trainer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'trainer/start',
    renderMode: RenderMode.Client
  },
  {
    path: 'trainer/test/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'trainer/test/:id/results',
    renderMode: RenderMode.Client
  },

  // Все остальные маршруты с динамическим рендерингом
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
