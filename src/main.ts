import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from './app/core/i18n/language.service';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return {
        getTranslation: (lang: string) => http.get(`/i18n/${lang}.json`)
    } as TranslateLoader;
}

bootstrapApplication(App, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(
            TranslateModule.forRoot({

                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
        LanguageService,
    ],
}).catch(err => console.error(err));
