import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  constructor(private translate: TranslateService) { }

  setLanguage(language: string): void {
    console.log(`idioma: ${language}`)
    this.translate.use(language);
  }

}
