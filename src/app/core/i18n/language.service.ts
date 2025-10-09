import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'fs_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    current = signal<'en' | 'es'>('en');

    constructor(private t: TranslateService) {
        // idiomas
        this.t.addLangs(['en', 'es']);
        //
        this.t.setDefaultLang('en');

        const saved = (localStorage.getItem(STORAGE_KEY) as 'en'|'es') || 'en';
        this.use(saved);
    }

    use(lang: 'en'|'es') {
        this.current.set(lang);
        this.t.use(lang);
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
    }

    toggle() { this.use(this.current() === 'en' ? 'es' : 'en'); }
}
