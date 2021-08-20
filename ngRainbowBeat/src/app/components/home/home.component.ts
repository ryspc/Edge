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
  currentUser = new User();
  editPost : Post | null = null;
  created: string | null = null;

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
sinceWhen(created: string) {
let then = this.created;
console.log(then);
console.log(Date.now().toString);

 return "5 Mins ago";

 }
}

