import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'landing', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
