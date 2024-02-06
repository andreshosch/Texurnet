import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { LanguajeService } from 'src/app/services/languaje.service';

@Component({
  selector: 'app-languaje-menu',
  templateUrl: './languaje-menu.component.html',
  styleUrls: ['./languaje-menu.component.css']
})
export class LanguajeMenuComponent{

  idioma = "../../../assets/img/Spain.png"
  idiomaSeleccionado: string = 'es';

  constructor(private languageService: LanguajeService) {}

  ngOnInit(){
    let idiomaSel = localStorage.getItem('idioma')
    if(idiomaSel){
      this.languageService.setLanguage(idiomaSel);
      this.cambiarIdiomaSeleccionado(idiomaSel)
    }
  }

  cambiarIdiomaSeleccionado(nuevoIdioma: string) {
    this.idiomaSeleccionado = nuevoIdioma;
    switch (nuevoIdioma){
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

  changeLanguage(event: any): void {
    const selectedLanguage = event.target.value;
    this.languageService.setLanguage(selectedLanguage);
    switch (selectedLanguage){
      case "es":
        this.idioma = "../../../assets/img/Spain.png";
        localStorage.setItem('idioma', "es")
        break;
      case "it":
        this.idioma = "../../../assets/img/Italy.png";
        localStorage.setItem('idioma', "it")
        break;
      case "pt":
        this.idioma = "../../../assets/img/Brazil.png";
        localStorage.setItem('idioma', "pt")
        break;  
    }
  }

}
