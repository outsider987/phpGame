import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './auth/main/main.component';




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
