import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

    users: User [] = [];
    user: User | null = null;
    editUser: User | null = null;
    public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllUsers();
  }

  getUserInfo(){
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.user = user;
        console.log(user);
      },
      err => {
        console.log('Could not get logged in User');
      }
    );
  }

  getAllUsers(){
    this.userService.index().subscribe(
      users => {
        this.users = users;
        console.log(users);
      },
      err => {
        console.log('Could not get the user list');
      }
    );
  }

}


