import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowersComponent } from './components/followers/followers.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { LandingComponent } from './components/landing/landing.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarHomeComponent } from './components/sidebar-home/sidebar-home.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: 'landing', component: LandingComponent},
  { path: 'audio', component: AudioListComponent},
  {path: '', component: SidebarHomeComponent, children: [
    {path: 'home', component: HomeComponent}
  ]},
  {path: '', component: SidebarComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'playlist', component: PlaylistComponent},
    { path: 'followers', component: FollowersComponent },
    { path: 'admin', component: AdminComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
