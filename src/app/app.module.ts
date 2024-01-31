import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClienteComponent } from './components/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
 import { AngularFireAuthModule } from '@angular/fire/compat/auth';
 import { environment } from '../environments/environment';
 import { AngularFireModule } from '@angular/fire/compat';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import localeArEG from '@angular/common/locales/ar-EG';
import { registerLocaleData } from '@angular/common';
import { InvitadoComponent } from './components/invitado/invitado.component';
import { ListarIscComponent } from './components/listar-isc/listar-isc.component';
import { CrearIscComponent } from './components/crear-isc/crear-isc.component';


registerLocaleData(localeArEG);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ClienteComponent,
    CrearClienteComponent,
    HomeComponent,
    FooterComponent,
    InvitadoComponent,
    ListarIscComponent,
    CrearIscComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule
   
  ],
  exports: [
     SharedModule,   
     AngularFireModule,
     AngularFireAuthModule,
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'es-ES' },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }