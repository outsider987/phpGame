import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './game/register/register.component';
import { MainComponent } from './game/main/main.component';



const routes: Routes = [
  { path: 'registry', component: RegisterComponent },
  { path: '', redirectTo: '/registry', pathMatch: 'full' },
  { path: 'main', component: MainComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
