import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path:'accueil', component:AccueilComponent},
  { path:'probleme', component:ProblemeComponent},    
  { path:'', redirectTo:'accueil', pathMatch:'full'},
  { path:'**', redirectTo:'accueil', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
