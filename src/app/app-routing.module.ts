import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './game/main.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/register/register.component';




const routes: Routes = [
  { path: 'registry', component: RegisterComponent },
  { path: '', redirectTo: '/registry', pathMatch: 'full' },
  // { path: 'main', component: MainComponent  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
    useHash: true,
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
