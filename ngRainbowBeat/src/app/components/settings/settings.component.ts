import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loggedInUser: User | null = null;
  editUser: User | null = null;

  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.loggedInUser = user;
        console.log(user);
      },
      err => {
        console.log('Could not get logged in User');
      }
    );
  }

  setEditUser() {
    this.editUser = Object.assign({}, this.loggedInUser);
  }

  updateUserDetails(user: User) {
    this.userService.update(user).subscribe(
      update => {
        this.router.navigateByUrl('/home')
      },
      err => {
        console.log('Error updating user settings');
      }
    );
  }

}
