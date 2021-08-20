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
    // this.getFollowing();
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

  // getFollowing() {
  //   this.userService.getUserFollowing(this.decoded.split(':')).subscribe(
  //     users => {
  //       this.following = users;
  //       console.log(users);
  //     },
  //     err => {
  //       console.log("Following List could not be retrieved");
  //     }
  //   );
  // }

  getFollowingCount(): number {
    let count = 0;
    if(this.loggedInUser) {
      for(let i = 0; i < this.loggedInUser.following.length; i++) {
        count++;
      }
    }
    return count;
  }

  unfollow(user: User) {
    if(this.loggedInUser){
      for(let i = 0; i < this.loggedInUser.following.length; i++) {
        if(this.loggedInUser.following[i].username === user.username){
          this.loggedInUser.following.splice(i, 1);
        }
      }
      this.userService.update(this.loggedInUser).subscribe(
        update => {
          this.getLoggedInUser();
          console.log('unfollow successful')
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
