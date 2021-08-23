import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  ratings: Rating[] = [];
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
  ratingTotal: number = 0;
  ratingPositive: number = 0;
  rating: Rating = new Rating();
  newComment: Comment = new Comment();



  constructor(private userService: UserService,
   private postService: PostService,
   private authService: AuthService,
   private modalService: NgbModal,
   private commentService: CommentService,
   private ratingService: RatingService
   ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.loadPosts();
    this.getAllComments();
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
        for(let i = 0; i < posts.length; i++) {
          if(!posts[i].isEnabled){
            posts.splice(i, 1);
          }
        }
        this.posts = posts;
        this.posts.forEach(post => {
          this.ratingService.ratingByPostId(post.id).subscribe(
            data => {
              this.ratings = data;
              this.ratingTotal = this.ratings.length;
              console.log('rating updated');
              this.ratings.forEach(rating => {
                if (rating.rating === true) {
                this.ratingPositive++; }
                post.rating = this.ratingPositive/this.ratingTotal;
                console.log(post.rating);
                console.log(this.ratingTotal);
                console.log(this.ratingPositive);
              });
            },
            err => {
              console.log(err);
            }
          );
        });
      },
      noPosts => {
        console.error('PostListComponenet.loadPosts: error retrieving posts list')
      }
    )
  }

  like(post: Post) {
    if(this.loggedInUser && this.rating){
      this.rating.rating = true;
      this.rating.user = this.loggedInUser;
      this.rating.post = post;
      console.log(this.rating.rating);
      console.log(this.rating.user);
      console.log(this.rating.post);

      this.ratingService.create(this.rating).subscribe(
        update => {
          console.log('rating created')
          this.loadPosts();
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  // getRating(post: Post) {
  //   if(this.loggedInUser && this.ratings){
  //     this.ratingService.ratingByPostId(post.id).subscribe(
  //       data => {
  //         this.ratings = data;
  //         console.log('rating updated');
  //         this.ratings.forEach(rating => {
  //           if (rating.rating === true) {
  //           this.ratingPositive++; }
  //         });
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }



  setPost(post: Post) {
    this.post = post;
  }

  follow(followedUser: User) {
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.loggedInUser = user;
        this.loggedInUser.following.push(followedUser);
        this.userService.update(this.loggedInUser).subscribe(
          update => {
            console.log('Follow successful');
            this.getLoggedInUser();
          },
          err => {
            console.log('Error following user');
          }
        );
      },
      err => {
        console.log('Could not get logged in User');
      }
    );
  }

  following(user: User) {
    if(this.loggedInUser){
      for(let i = 0; i < this.loggedInUser.following.length; i++) {
        if(this.loggedInUser.following[i].username === user.username){
          return true;
        }
      }
    } return false;
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
    // this.loadPosts();
    this.getAllComments();
    for(let i = 0; i < this.comments.length; i++) {
      if(this.comments[i].post.id === post.id){
        this.postComments.push(this.comments[i]);
      }
    }
    console.log(this.postComments);
  }

  addComment(comment: Comment) {
    console.log(comment);
    comment.user = this.loggedInUser;
    if(this.post) {
      comment.post = this.post;
    }

    this.commentService.create(comment).subscribe(
      data => {
        console.log("Comment creation successful");
        if(this.post){
          this.getCommentsForPost(this.post);
          console.log("test");
        }
        this.postComments.push(data);
      },
      err => {
        console.log("Error creating new Comment");
      }
    );
    // this.post = null;
    this.postComments = [];
    this.newComment = new Comment();
  }

}

