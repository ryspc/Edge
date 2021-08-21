import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserService } from './services/user.service';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AdminComponent } from './components/admin/admin.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { AudioListComponent } from './audio-list/audio-list.component';
import { SearchBarComponent } from './audioComponents/search-bar/search-bar.component';
import { CardComponent } from './audioComponents/card/card.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SidebarHomeComponent } from './components/sidebar-home/sidebar-home.component';
import { HomeComponent } from './components/home/home.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    SettingsComponent,
    AdminComponent,
    PlaylistComponent,
    FollowersComponent,
    SidebarComponent,
    SidebarHomeComponent,
    AudioListComponent,
    SearchBarComponent,
    CardComponent,
    HomeComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    TabModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule

  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
