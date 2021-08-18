import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landing'},  //FIXIT
  {path: 'landing', component: LandingComponent}
  // Add Not found component routing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
