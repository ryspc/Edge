import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
  followedUser : User | null = null;
  likedPost: Post | null = null;
  loggedInUser = new User;
  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));

  constructor(private userService: UserService, private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPosts();
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

  follow(followedUser: User) {
    this.getLoggedInUser();
    console.log("follow method");
    
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
}

