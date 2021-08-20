import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Post[] = [];
  newPost  = new Post();

  currentUser = new User();
  editPost : Post | null = null;
  selected: Post | null = null;

  constructor(private userService: UserService, private postService: PostService, private authService: AuthService) { }

  encoded = this.authService.getCredentials();
  decoded = atob((this.encoded ?? 'null'));

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

  loadPostsByUser(){

    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.currentUser = user;
        console.log(user);
      },
      err => {
        console.log('Could not get logged in User');
      }
    );

    this.postService.showPostByUser(this.currentUser.username).subscribe(
      posts => {
        this.posts = posts;
      },
      noPosts => {
        console.error('PostListComponenet.loadPosts: error retrieving posts list')
      }
    )
  }



getNumberOfPosts(): number{
  let postLength = this.posts.length;
    return postLength;
}

displayPost(p: Post): void {
  this.selected = p;
}

displayTable(): void{
  this.selected = null;
}

setEditPost(): void{
  this.editPost = Object.assign({}, this.selected);
}

  addPost(): void{
    this.postService.create(this.newPost).subscribe(
      data => {
        this.loadPosts();
      },
      err =>{
        console.log("error adding post through service");
      }
    )
    this.newPost = new Post();
  }

  updatePost(p: Post){
    this.postService.update(p).subscribe(
      data => {
        this.loadPosts();
      },
      err =>{
        console.log(err);
        console.log("error updating posts from service");
      }
    )
    this.editPost = null;
    this.selected = null;
    // this.todos = this.todoService.index();
}

destroyPost(id: number){
  this.postService.destroy(id).subscribe(
    data => {
      this.loadPosts();
    },
    err =>{
      console.log(err);
      console.log("error deleting posts from service");
    }
  )
  // this.todos= this.todoService.index();

}

}
