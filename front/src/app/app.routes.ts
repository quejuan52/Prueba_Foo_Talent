import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DasboardComponent } from './componentes/dasboard/dasboard.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [
    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"home",component:HomeComponent,pathMatch:"full"},
    {path:"registro",component:RegistroComponent,pathMatch:"full"},
    {path:"login",component:LoginComponent,pathMatch:"full"},
    {path:"dasboard",component:DasboardComponent,pathMatch:"full"},
    {path:"productos",component:ProductosComponent,pathMatch:"full"},
    {path:"usuarios",component:UsuariosComponent,pathMatch:"full"}
];
