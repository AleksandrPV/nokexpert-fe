import { RenderMode, ServerRoute } from '@angular/ssr';
import { ServicesService } from './features/services/services/services.service';
import { FaqService } from './features/faq/services/faq.service';

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
    path: 'contacts',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/nostroy-changes-2024',
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
    path: 'public-offer',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'user-agreement',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'reviews',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sitemap',
    renderMode: RenderMode.Prerender
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
      // Получаем все FAQ вопросы для prerendering
      const faqSlugs = [
        'chto-takoe-nok',
        'federalnyy-zakon-nok',
        'chto-takoe-tsok',
        'zachem-nuzhna-nok',
        'chto-takoe-nrs',
        'kto-reguliruet-nok',
        'kto-dolzhen-prokhodit-nok',
        'kogda-stala-obyazatelnoy-nok',
        'skolko-stoit-nok',
        'skolko-deystvuet-svidetelstvo',
        'kak-podgotovitsya-k-nok',
        'kakie-dokumenty-nuzhny',
        'gde-prokhodit-nok',
        'mozhno-li-proyti-nok-distantsionno',
        'chto-vklyuchaet-ekzamen-nok',
        'kak-prokhodit-ekzamen-nok',
        'skolko-voprosov-v-ekzamene',
        'kak-otsenivaetsya-ekzamen',
        'chto-delat-esli-ne-sdal',
        'mozhno-li-peresdat-nok',
        'kak-podat-apellyatsiyu',
        'kak-proverit-rezultat-nok',
        'kak-poluchit-svidetelstvo',
        'kak-vklyuchitsya-v-nrs',
        'nuzhna-li-propiska-dlya-sdachi-ekzamena-nok'
      ];
      
      return faqSlugs.map(slug => ({ slug }));
    }
  },
  
  // Все остальные маршруты с динамическим рендерингом
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
