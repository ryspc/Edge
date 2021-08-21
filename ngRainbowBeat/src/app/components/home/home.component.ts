import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  newPost  = new Post();
  post: Post | null = null;
  followedUser : User | null = null;
  likedPost: Post | null = null;
  loggedInUser = new User;
  comments: Comment[] = [];
  postComments: Comment[] = [];
  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));
  closeResult = '';
  panelOpenState = false;


  constructor(private userService: UserService,
   private postService: PostService,
   private authService: AuthService,
   private modalService: NgbModal,
   private commentService: CommentService
   ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.getAllComments();
  }

  // MODAL STUFF //
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

  loadPosts(){
    this.postService.index().subscribe(
      posts => {
        this.posts = posts;
      },
      noPosts => {
        console.error('PostListComponenet.loadPosts: error retrieving posts list')
      }
    )
  }

  like(post: Post) {

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

  setPost(post: Post) {
    this.post = post;
  }

  follow(followedUser: User) {
    this.getLoggedInUser();
    this.loggedInUser.following.push(followedUser)
    this.userService.update(this.loggedInUser).subscribe(
      update => {
        console.log('Follow successful');
      },
      err => {
        console.log('Error following user');
      }
    );
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
    for(let i = 0; i < this.comments.length; i++) {
      if(this.comments[i].post.id === post.id){
        this.postComments.push(this.comments[i]);
      }
    }
    console.log(this.postComments);
  }

}

