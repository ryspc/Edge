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
  allUsers: User[] = [];
  loggedInUser: User | null = null;
  followers: User[] = [];

  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.index();
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

  index() {
    this.userService.index().subscribe(
      users => {
        this.allUsers = users;
      },
      err => {
        console.log("No Followers could be retrieved");
      }
    );
  }

  // getFollowers() {
  //   if(this.loggedInUser) {
  //     for(let i = 0; i < this.allUsers.length; i++) {
  //       if (this.allUsers[i].following.includes(this.loggedInUser)){
  //         this.followers.push(this.allUsers[i])
  //       }
  //     }
  //   }
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
