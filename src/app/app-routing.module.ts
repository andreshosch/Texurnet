import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { InvitadoComponent } from './components/invitado/invitado.component';
import { ListarIscComponent } from './components/listar-isc/listar-isc.component';
import { CrearIscComponent } from './components/crear-isc/crear-isc.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'clientes',component:ClienteComponent},
  {path:'crearCliente',component:CrearClienteComponent},
  {path:'verCliente/:id',component:CrearClienteComponent},
  {path:'verIsc/:id',component:CrearIscComponent},
  {path: 'invitado', component: InvitadoComponent},
  {path:'isc',component:ListarIscComponent},
  {path:'crearIsc',component:CrearIscComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
