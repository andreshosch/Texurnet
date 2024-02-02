import { Component } from '@angular/core';
import { LanguajeService } from 'src/app/services/languaje.service';

@Component({
  selector: 'app-languaje-menu',
  template: `
  <select (change)="changeLanguage($event)">
    <option value="es">Español</option>
    <option value="it">Italiano</option>
    <option value="pt">Portugues</option>
  </select>
`
  ,
  
  // './languaje-menu.component.html',
  styleUrls: ['./languaje-menu.component.css']
})
export class LanguajeMenuComponent {

  constructor(private languageService: LanguajeService) {}

  changeLanguage(event: any): void {
    const selectedLanguage = event.target.value;
    this.languageService.setLanguage(selectedLanguage);
  }

}
