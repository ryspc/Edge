import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService
    ) { }

    users: User [] = [];
    user: User | null = null;
    editUser: User | null = null;
    public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  posts: Post [] = [];
  comments: Comment[] = [];

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
  this.postService.postsByUsername(username).subscribe(
    posts => {
      this.posts = posts;
      console.log(posts);
    },
    noPosts => {
      console.log('admin.component.displayUserPosts() could not obtain posts');
    }
  );
  }

  displayUserComments(username: string){
    this.commentService.commentsByUsername(username).subscribe(
      comments => {
        this.comments = comments;
        console.log(comments);
      },
      noComments => {
        console.log('admin.component.displayUserPosts() could not obtain posts');
      }
    );
    }

}


