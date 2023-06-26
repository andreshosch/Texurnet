import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'clientes',component:ClienteComponent},
  {path:'crearCliente',component:CrearClienteComponent},
  {path:'verCliente/:id',component:CrearClienteComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
