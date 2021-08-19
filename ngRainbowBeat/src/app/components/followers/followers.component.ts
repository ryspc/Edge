import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  loggedInUser: User | null = null;
  following: User[] = [];

  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getFollowing();
    console.log(this.following);

  }

  getLoggedInUser() {
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      },
      err => {
        console.log('Could not get logged in User');
      }
    );
  }

  getFollowing() {
    this.userService.getUserFollowing(this.decoded.split(':')).subscribe(
      users => {
        this.following = users;
        console.log(users);
      },
      err => {
        console.log("Following List could not be retrieved");
      }
    );
  }

  logoutUser() {
    this.authService.logout();
  }

}
