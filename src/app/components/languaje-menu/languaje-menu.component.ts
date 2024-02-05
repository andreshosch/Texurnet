import { Component } from '@angular/core';
import { LanguajeService } from 'src/app/services/languaje.service';

@Component({
  selector: 'app-languaje-menu',
  templateUrl: './languaje-menu.component.html',
  styleUrls: ['./languaje-menu.component.css']
})
export class LanguajeMenuComponent {

  idioma = "../../../assets/img/Spain.png"

  constructor(private languageService: LanguajeService) {}

  changeLanguage(event: any): void {
    const selectedLanguage = event.target.value;
    this.languageService.setLanguage(selectedLanguage);
    switch (selectedLanguage){
      case "es":
        this.idioma = "../../../assets/img/Spain.png";
        break;
      case "it":
        this.idioma = "../../../assets/img/Italy.png";
        break;
      case "pt":
        this.idioma = "../../../assets/img/Brazil.png";
        break;  
    }
  }

}
