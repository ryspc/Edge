import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  allUsers: User[] = [];
  loggedInUser: User | null = null;
  followers: User[] = [];
  followedPosts: Post[] = [];
  closeResult = '';
  panelOpenState = false;
  friend: User | null = null;


  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private modalService: NgbModal,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
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
      let userNoMore = user.username;
      for(let i = 0; i < this.loggedInUser.following.length; i++) {
        if(this.loggedInUser.following[i].username === user.username){
          this.loggedInUser.following.splice(i, 1);
        }
      }
      this.userService.update(this.loggedInUser).subscribe(
        update => {
          this.getLoggedInUser();
          console.log('unfollow successful')
          let snackbar = this._snackBar.open('You unfollowed ' + userNoMore, '', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  viewFollowingPosts(user: User){
    this.followedPosts = [];
    this.postService.showPostByUser(user.username).subscribe(
      data => {
        this.followedPosts = data;
        console.log(this.followedPosts);
      },
      err => {
        console.log("Error getting Following Posts");
      }
    );
  }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.followedPosts = [];
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.followedPosts = [];
      return 'by clicking on a backdrop';
    } else {
      this.followedPosts = [];
      return `with: ${reason}`;
    }
  }

  setFriend(user: User) {
    this.friend = user;
  }

  getVideoId(song: Song): string{
    const regex = /[^=]*$/g;
    let songString = song.songURL;
    let songId = songString.substr(songString.search(regex));
    console.log(songId);
    return songId;
  }

  get sortedArray(): Post[] {
    return this.followedPosts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

}
