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
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { PostComment } from 'src/app/models/post-comment';

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
  post: Post | null = null;
  comments: Comment[] = [];
  postComments: Comment[] = [];
  newComment: Comment = new Comment();
  commentVisibility: boolean = false;
  playlists: Playlist[] = [];


  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private modalService: NgbModal,
    private playlistService: PlaylistService,
    private router: Router,
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.getLoggedInUser();
    this.index();
    this.getUserPlaylist();
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
      this.postComments = [];
      this.commentVisibility = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.followedPosts = [];
      this.postComments = [];
      this.commentVisibility = false;
      return 'by clicking on a backdrop';
    } else {
      this.followedPosts = [];
      this.postComments = [];
      this.commentVisibility = false;
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

  setPost(post: Post) {
    this.post = post;
  }

  getAllComments() {
    this.commentService.allComments().subscribe(
      data => {
        this.comments = data;
        console.log(this.comments);

      },
      err => {
        console.log("Error in commentService with getting all comments");
      }
    );
  }

  getCommentsForPost(post: Post) {
    this.postComments = [];
    this.getAllComments();
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].post.id === post.id && this.comments[i].isEnabled === true) {
        this.postComments.push(this.comments[i]);
      }
    }
    this.viewComments();
    console.log(this.postComments);
  }

  addComment(comment: Comment) {
    console.log(comment);
    if(this.loggedInUser){
      comment.user = this.loggedInUser;
    }
    if (this.post) {
      comment.post = this.post;
    }

    this.commentService.create(comment).subscribe(
      data => {
        console.log("Comment creation successful");
        if (this.post) {
          this.getCommentsForPost(this.post);
          console.log("test");
        }
        this.postComments.push(data);
      },
      err => {
        console.log("Error creating new Comment");
        let snackbar = this._snackBar.open('Could not comment, please try again.', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      }
    );
    this.postComments = [];
    this.newComment = new Comment();
  }

  viewComments() {
    this.commentVisibility = true;
  }

  getUserPlaylist() {
    this.playlistService.index().subscribe(
      data => {
        this.playlists = data;
      },
      err => {
        console.log("Error getting playlists");
      }
    );
  }

  addSong(song: Song) {
    this.playlists[0].songs.push(song);
    this.playlistService.update(this.playlists[0]).subscribe(
      data => {
        this.playlists[0] = data;
        console.log("Playlist updated");
        let snackbar = this._snackBar.open('Song added the favorites.', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
      },
      err => {
        console.log("error updating playlist");
        let snackbar = this._snackBar.open('Could not add song to favorites.', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      }
    );
  }

  get sortedComments(): PostComment[] {
    return this.postComments.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

}
