import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../../shared/components/icon/icon.component';
import { AnimationService } from '../../../shared/services/animation.service';
import { SeoService } from '../../../shared/services/seo.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IconModule],
  template: `
<main>

<!-- ============================================ -->
<!-- HERO — Dark, compact ~40vh                   -->
<!-- ============================================ -->
<section class="relative min-h-[40vh] flex items-center overflow-hidden bg-slate-950" id="hero-section">
  <!-- Floating orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-orb absolute w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px] -top-32 -right-32"></div>
    <div class="hero-orb absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[80px] bottom-20 -left-20"></div>
  </div>

  <!-- Grid lines -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="hero-grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"></div>
    <div class="hero-grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"></div>
    <div class="hero-grid-line-h absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
  </div>

  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
    <div class="max-w-4xl">
      <!-- Breadcrumb nav -->
      <nav class="hero-breadcrumb flex items-center gap-2 text-sm text-slate-500 mb-10">
        <a routerLink="/" class="hover:text-slate-300 transition-colors">Главная</a>
        <lucide-icon name="chevron-right" [size]="14" [strokeWidth]="2" class="text-slate-600"></lucide-icon>
        <span class="text-blue-400">Политика конфиденциальности</span>
      </nav>

      <!-- H1 -->
      <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        <span class="hero-word inline-block">Политика</span>
        <span class="hero-word inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">конфиденциальности</span>
      </h1>

      <!-- Subtitle -->
      <div class="hero-subtitle max-w-2xl">
        <p class="text-lg sm:text-xl text-slate-400 leading-relaxed">
          Порядок обработки персональных данных в соответствии с Федеральным законом
          <strong class="text-white font-semibold">152-ФЗ</strong>
        </p>
        <p class="text-sm text-slate-500 mt-4">Последнее обновление: {{ currentDate }}</p>
        <div class="hero-underline h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-6 rounded-full" style="width: 0"></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================ -->
<!-- CONTENT                                      -->
<!-- ============================================ -->
<section class="bg-white py-16 lg:py-24" id="content">
  <div class="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
    <div class="max-w-4xl">

      <!-- Section 0: General -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="info" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">Общие положения</h2>
        </div>
        <div class="text-slate-600 leading-relaxed space-y-4 pl-[52px]">
          <p>
            Настоящая Политика конфиденциальности (далее -- Политика) действует в отношении всей информации, которую {{ organizationName }} (далее -- Компания) может получить о пользователе во время использования им сайта {{ websiteDomain }} (далее -- Сайт).
          </p>
          <p>
            Использование Сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.
          </p>
        </div>
      </div>

      <!-- Section 1: Terms -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="book-open" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">1. Основные понятия</h2>
        </div>
        <div class="space-y-4 pl-[52px]">
          <div class="border-l-2 border-blue-500 pl-5 py-2">
            <h3 class="text-lg font-semibold text-slate-900 mb-1">Персональные данные</h3>
            <p class="text-slate-600">Любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</p>
          </div>
          <div class="border-l-2 border-cyan-500 pl-5 py-2">
            <h3 class="text-lg font-semibold text-slate-900 mb-1">Обработка персональных данных</h3>
            <p class="text-slate-600">Любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.</p>
          </div>
          <div class="border-l-2 border-slate-400 pl-5 py-2">
            <h3 class="text-lg font-semibold text-slate-900 mb-1">Конфиденциальность персональных данных</h3>
            <p class="text-slate-600">Обязательное для соблюдения оператором или иным получившим доступ к персональным данным лицом требование не допускать их распространения без согласия субъекта персональных данных.</p>
          </div>
        </div>
      </div>

      <!-- Section 2: Personal info -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="user" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">2. Персональная информация пользователей</h2>
        </div>
        <div class="pl-[52px]">
          <p class="text-slate-600 mb-6">Компания собирает следующие персональные данные:</p>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="rounded-xl border border-slate-200 p-6">
              <h3 class="font-semibold text-slate-900 mb-4">Обязательная информация</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  Фамилия, имя, отчество
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  Номер телефона
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  Адрес электронной почты
                </li>
              </ul>
            </div>
            <div class="rounded-xl border border-slate-200 p-6">
              <h3 class="font-semibold text-slate-900 mb-4">Дополнительная информация</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  Информация о квалификации
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  Опыт работы
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  Данные о документах
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Purposes -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="target" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">3. Цели обработки персональных данных</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 pl-[52px]">
          <div class="rounded-xl bg-slate-50 p-6">
            <h3 class="font-semibold text-slate-900 mb-4">Основные цели</h3>
            <ul class="space-y-3 text-slate-600">
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                Предоставление услуг по подготовке к НОК
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                Консультирование по вопросам НОК
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                Обратная связь с пользователями
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                Информирование о новых услугах
              </li>
            </ul>
          </div>
          <div class="rounded-xl bg-slate-50 p-6">
            <h3 class="font-semibold text-slate-900 mb-4">Дополнительные цели</h3>
            <ul class="space-y-3 text-slate-600">
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                Статистический анализ
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                Улучшение качества услуг
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                Техническая поддержка
              </li>
              <li class="flex items-start gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                Исполнение договорных обязательств
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Section 4: Legal basis -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="scale" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">4. Правовые основания обработки</h2>
        </div>
        <div class="space-y-4 pl-[52px]">
          <div class="rounded-xl border border-slate-200 p-6">
            <h3 class="font-semibold text-slate-900 mb-2">Согласие субъекта персональных данных</h3>
            <p class="text-slate-600">Обработка персональных данных осуществляется на основании добровольного согласия субъекта персональных данных на обработку его персональных данных в соответствии с Федеральным законом 152-ФЗ "О персональных данных".</p>
          </div>
          <div class="rounded-xl border border-slate-200 p-6">
            <h3 class="font-semibold text-slate-900 mb-2">Исполнение договора</h3>
            <p class="text-slate-600">Обработка необходима для исполнения договора, стороной которого является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных.</p>
          </div>
        </div>
      </div>

      <!-- Section 5: Data protection -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="shield-check" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">5. Защита персональных данных</h2>
        </div>
        <div class="rounded-xl bg-slate-50 p-6 lg:p-8 pl-[52px]">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-semibold text-slate-900 mb-4">Технические меры</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  SSL-шифрование данных
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Защищенные серверы
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Регулярные обновления безопасности
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Контроль доступа к данным
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 mb-4">Организационные меры</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Ограниченный доступ сотрудников
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Обучение персонала
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Внутренние политики безопасности
                </li>
                <li class="flex items-center gap-3">
                  <lucide-icon name="check" [size]="16" [strokeWidth]="2" class="text-blue-500 shrink-0"></lucide-icon>
                  Регулярный аудит безопасности
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 6: Rights -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="users" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">6. Права субъекта персональных данных</h2>
        </div>
        <div class="space-y-3 pl-[52px]">
          <div class="flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <lucide-icon name="file-text" [size]="18" [strokeWidth]="1.8" class="text-blue-600"></lucide-icon>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 mb-1">Право на получение информации</h3>
              <p class="text-slate-600 text-sm">О целях, способах и сроках обработки персональных данных</p>
            </div>
          </div>
          <div class="flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
              <lucide-icon name="pencil" [size]="18" [strokeWidth]="1.8" class="text-cyan-600"></lucide-icon>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 mb-1">Право на внесение изменений</h3>
              <p class="text-slate-600 text-sm">Уточнение, блокирование или уничтожение неточных данных</p>
            </div>
          </div>
          <div class="flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <lucide-icon name="circle-x" [size]="18" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 mb-1">Право на отзыв согласия</h3>
              <p class="text-slate-600 text-sm">Отзыв согласия на обработку персональных данных в любое время</p>
            </div>
          </div>
          <div class="flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
              <lucide-icon name="shield" [size]="18" [strokeWidth]="1.8" class="text-violet-600"></lucide-icon>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 mb-1">Право на обращение в контролирующие органы</h3>
              <p class="text-slate-600 text-sm">Обращение в Роскомнадзор или суд при нарушении прав</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 7: Storage -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="clock" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">7. Сроки обработки и хранения</h2>
        </div>
        <div class="pl-[52px]">
          <p class="text-slate-600 mb-6">Персональные данные обрабатываются и хранятся:</p>
          <div class="space-y-4 mb-6">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">1</div>
              <p class="text-slate-600 pt-1">В течение срока действия согласия субъекта на обработку</p>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">2</div>
              <p class="text-slate-600 pt-1">В течение срока оказания услуг и исполнения договорных обязательств</p>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">3</div>
              <p class="text-slate-600 pt-1">В течение срока, установленного действующим законодательством РФ</p>
            </div>
          </div>
          <div class="rounded-xl bg-amber-50 border border-amber-200 p-5">
            <p class="text-slate-700 text-sm">
              <strong>Важно:</strong> После истечения указанных сроков персональные данные подлежат уничтожению, если иное не предусмотрено действующим законодательством РФ.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 8: Contacts -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="mail" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">8. Контактная информация</h2>
        </div>
        <div class="pl-[52px]">
          <div class="rounded-xl border border-slate-200 p-6 lg:p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-semibold text-slate-900 mb-4">Для вопросов по обработке данных</h3>
                <div class="space-y-3">
                  <a href="mailto:privacy&#64;nok-expert.ru" class="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                    <lucide-icon name="mail" [size]="16" [strokeWidth]="1.8" class="shrink-0"></lucide-icon>
                    privacy&#64;nok-expert.ru
                  </a>
                  <a [href]="'tel:' + phoneHref" class="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                    <lucide-icon name="phone" [size]="16" [strokeWidth]="1.8" class="shrink-0"></lucide-icon>
                    {{ phoneDisplay }}
                  </a>
                  <div class="flex items-start gap-3 text-slate-600">
                    <lucide-icon name="map-pin" [size]="16" [strokeWidth]="1.8" class="shrink-0 mt-0.5"></lucide-icon>
                    {{ address }}
                  </div>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 mb-4">Время работы</h3>
                <div class="space-y-2 text-slate-600 text-sm">
                  <p>Понедельник - Пятница: 9:00 - 18:00</p>
                  <p>Суббота: 10:00 - 16:00</p>
                  <p>Воскресенье: выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 9: Changes -->
      <div class="content-block mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <lucide-icon name="refresh-cw" [size]="20" [strokeWidth]="1.8" class="text-slate-600"></lucide-icon>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">9. Изменения в политике конфиденциальности</h2>
        </div>
        <div class="pl-[52px] text-slate-600 space-y-4">
          <p>Компания оставляет за собой право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений в актуальной редакции указывается дата последнего обновления.</p>
          <p>Новая редакция Политики вступает в силу с момента ее размещения на Сайте, если иное не предусмотрено новой редакцией Политики.</p>
        </div>
      </div>

    </div>
  </div>
</section>

</main>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class PrivacyPolicyPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private organizationService = inject(OrganizationService);
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  get organizationName(): string {
    return this.organizationService.getName();
  }

  get phoneDisplay(): string {
    return this.organizationService.getPhoneDisplay();
  }

  get phoneHref(): string {
    return this.organizationService.getPhoneHref();
  }

  get email(): string {
    return this.organizationService.getEmail();
  }

  get address(): string {
    return this.organizationService.getAddress();
  }

  get websiteDomain(): string {
    return this.organizationService.getWebsiteDomain();
  }

  currentDate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  ngOnInit(): void {
    this.seoService.setPrivacyPageSeo();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initHeroAnimations();
    this.initScrollAnimations();
  }

  private async initHeroAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.gsap || gsapModule.default;

    const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.to('.hero-orb', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'random' }
    });

    masterTl.fromTo('.hero-grid-line',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top' }, 0);
    masterTl.fromTo('.hero-grid-line-h',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut', transformOrigin: 'left' }, 0.3);

    masterTl.fromTo('.hero-breadcrumb',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }, 0.3);

    masterTl.fromTo('.hero-word',
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }, 0.5);

    masterTl.fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }, 1.1);

    masterTl.to('.hero-underline',
      { width: '100%', duration: 0.8, ease: 'power2.out' }, 1.4);
  }

  private async initScrollAnimations(): Promise<void> {
    const lib = await this.animationService.init();
    if (!lib) return;
    const { gsap } = lib;

    const blocks = document.querySelectorAll('.content-block');
    blocks.forEach((block) => {
      gsap.fromTo(block,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 90%', once: true }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.animationService.cleanup();
  }
}
