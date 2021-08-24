import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { PostComment } from 'src/app/models/post-comment';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Song } from 'src/app/models/song';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  closeResult = '';
  @Input() childMessage: Post[] = [];
  @Input() searchKeyword: string = '';

  @Input() searchResult: Post[] | null | undefined;
  // @Input() searchKeyword: string = '';
  // @Output() displaySearchResults = new EventEmitter<boolean>();
  // @Output() clearSearchResults = new EventEmitter<boolean>();

  // exitSearchView(){
  //   this.clearSearchResults.emit(true);
  // }
  // showSearchedPosts(){
  //   this.displaySearchResults.emit(true);
  // }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
    // private sidebarComponent: SidebarComponent
    ) {
      console.log(this.searchResult);
    }

    ngOnChanges(){
      console.log(this.searchResult);

    }

    users: User [] = [];
    user: User | null = null;
    editUser: User | null = null;
    public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  posts: Post [] = [];
  comments: PostComment[] = [];
  enabledComments: PostComment[] = [];
  enabledPosts: Post[]=[];
  allUsersSelected: boolean = false;
  post: Post = new Post();






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

  displayUserPosts(username: string){
    this.enabledPosts = [];
    this.enabledComments = [];
  this.postService.postsByUsername(username).subscribe(
    data => {
      this.posts = data;
      console.log(this.posts);

      this.posts.forEach(post => {
        console.log(post.isEnabled)
        if(post.isEnabled == true){
          console.log(post);

          this.enabledPosts.push(post);
        }
      });


    },
    noPosts => {
      console.log('admin.component.displayUserPosts() could not obtain posts');
    }
  );
  }

  displayUserComments(username: string){
    this.enabledComments = [];
    this.enabledPosts = [];
    this.commentService.commentsByUsername(username).subscribe(
      data => {
        this.comments = data;
        console.log(this.comments);

        this.comments.forEach(comment => {
          console.log(comment.isEnabled)
          if(comment.isEnabled == true){
            console.log(comment);

            this.enabledComments.push(comment);
          }

        });
        console.log(this.enabledComments);
      },
      noComments => {
        console.log('admin.component.displayUserPosts() could not obtain posts');
      }
    );
    }

    enableUser(user: User){
      user.isEnabled = true;
      this.userService.update(user).subscribe(
        user => {
          this.user =user;
          console.log(user);
          this.getUserInfo();
          this.getAllUsers();
          let snackbar = this._snackBar.open('User enabled.', 'UNDO',{
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            this.disableUser(user);
          });
        },
        noUser => {
          console.log('user enabled not updated')
        }
      );
    }

    disableUser(user: User){
      user.isEnabled = false;
      this.userService.update(user).subscribe(
        user => {
          this.user =user;
          console.log(user);
          console.log(this.childMessage);
          this.getUserInfo();
          this.getAllUsers();
          let snackbar = this._snackBar.open('User disabled.', 'UNDO',{
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
           this.enableUser(user);
          });

        },
        noUser => {
          console.log('user enabled not updated')
          let snackbar = this._snackBar.open('Could not disable user.', '',{
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
          });
        }
      );
    }

    deleteComment(comment: PostComment, username: string){
     comment.isEnabled = false;
     this.commentService.update(comment).subscribe(
       data => {
         comment = data;
         this.displayUserComments(username);
         let snackbar = this._snackBar.open('Comment deleted.', '',{
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
       },
       noData => {
         console.log('comment was not disabled');
         this.displayUserComments(username);
         let snackbar = this._snackBar.open('Could not delete comment.', '',{
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
         console.log(noData);
       }
     );
    }

    deletePost(post: Post, username: string){
      post.isEnabled = false;
      console.log(post.isEnabled)
      this.postService.disablePost(post).subscribe(
        data => {
          post = data;
          this.displayUserPosts(username);
          let snackbar = this._snackBar.open('Post deleted.', '',{
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
          });
        },
        noData => {
          console.log('comment was not disabled');
          let snackbar = this._snackBar.open('Could not delete post.', '',{
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
          });
          console.log(noData);
        }
      );
     }

     setPost(post: Post) {
      this.post = post;
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
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    getVideoId(song: Song): string{
      const regex = /[^=]*$/g;
      let songString = song.songURL;
      let songId = songString.substr(songString.search(regex));
      console.log(songId);
      return songId;
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
      this.getAllComments();
      this.enabledComments = [];
      for(let i = 0; i < this.comments.length; i++) {
        if(this.comments[i].post.id === post.id && this.comments[i].isEnabled === true){
          this.enabledComments.push(this.comments[i]);
        }
      }
      console.log(this.enabledComments);
    }

}


