import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FechaduraComponent } from '../app/components/fechadura/fechadura.component';
import { UsuarioComponent } from '../app/components/usuario/usuario.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'usuario', component : UsuarioComponent},
  {path: 'fechadura', component : FechaduraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
