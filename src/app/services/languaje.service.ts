import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  private defaultLanguage = 'es';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage);
   }

  setLanguage(language: string): void {
    console.log(`idioma: ${language}`)
    this.translate.use(language);
  }

}
