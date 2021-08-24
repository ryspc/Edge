import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Genre } from 'src/app/models/genre';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Post[] = [];
  newPost  = new Post();
  comments: Comment[] =[];
  newComment = new Comment();

  currentUser = new User();

  editPost : Post | null = null;
  editComment: Comment | null = null;

  selected: Post | null = null;
  selectedComment: Comment | null = null;

  enabledPosts: Post[] = [];
  enabledComments: Comment [] = [];

  closeResult = '';

  constructor(private userService: UserService,
     private postService: PostService,
      private authService: AuthService,
       private commentService: CommentService,
        private songService: SongService,
        private _snackBar: MatSnackBar,
        private modalService: NgbModal,
        ) { }

  encoded = this.authService.getCredentials();
  decoded = atob((this.encoded ?? 'null'));

  genres: Genre [] = [];

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.loadPostsByUser();
    this.loadCommentsByUser();
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
    this.enabledPosts = [];
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.currentUser = user;
        console.log(user);
        this.postService.showPostByUser(user.username).subscribe(
          posts => {
            this.posts = posts;

            this.posts.forEach(post => {
              console.log('Enabled? : ' + post.isEnabled);
              if(post.isEnabled === true){
                this.enabledPosts.push(post);
              }

            });
            console.log(this.enabledPosts);
          },
          noPosts => {
            console.error('PostListComponenet.loadPosts: error retrieving posts list')
          }
        )
      },
      err => {
        console.log('Could not get logged in User');
        let snackbar = this._snackBar.open('You are not logged in.', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });

      }
    );


  }



getNumberOfPosts(): number{
  let postLength = this.enabledPosts.length;
    return postLength;
}

displayPost(p: Post): void {
  this.selected = p;
}

displayTable(): void{
  this.selected = null;
}

// setEditPost(): void{
//   this.editPost = Object.assign({}, this.selected);
// }

  addPost(): void{
    this.postService.create(this.newPost).subscribe(
      data => {
        this.loadPostsByUser();
      },
      err =>{
        console.log("error adding post through service");
      }
    )
    this.newPost = new Post();
  }

  updatePost(p: Post){
    this.songService.update(p.song).subscribe(
      data => {
        p.song = data;
        this.postService.update(p).subscribe(
          data => {
            this.loadPostsByUser();
            this.editPost = null;
            let snackbar = this._snackBar.open('Post updated.', '', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
          },
          err =>{
            console.log(err);
            console.log("error updating posts from service");
          }
        )
      }
    )
    this.selected = null;
    // this.todos = this.todoService.index();
}

destroyPost(id: number){
  this.postService.destroy(id).subscribe(
    data => {
      this.loadPostsByUser();
    },
    err =>{
      console.log(err);
      console.log("error deleting posts from service");
    }
  )
  // this.todos= this.todoService.index();

}

hidePost(id: number){
  for(let i =0; i<this.posts.length; i++){
    if(this.posts[i].id  === id){
      console.log(this.posts[i].isEnabled);
      this.posts[i].isEnabled = false;
      this.updatePost(this.posts[i]);
    }

  }


}

loadCommentsByUser(){
  this.enabledComments = [];
  this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
    user => {
      this.currentUser = user;
      console.log(user);
      this.commentService.commentsByUsername(user.username).subscribe(
        comments => {
          this.comments = comments;

          this.comments.forEach(comment => {
            console.log('Enabled? : ' + comment.isEnabled);
            if(comment.isEnabled === true){
              this.enabledComments.push(comment);
            }

          });
          console.log(this.enabledComments);
        },
        noComments => {
          console.error('PostListComponenet.loadComment: error retrieving comments list')
        }
      )
    },
    err => {
      console.log('Could not get logged in User');
      console.log('Could not get logged in User');
      let snackbar = this._snackBar.open('You are not logged in.', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5 * 1000,
      });
    }
  );


}

displayComment(c: Comment): void {
  this.selectedComment = c;
}


hideComment(id: number){
  for(let i =0; i<this.comments.length; i++){
    if(this.comments[i].id  === id){
      console.log(this.comments[i].isEnabled);
      this.comments[i].isEnabled = false;
      this.updateComment(this.comments[i]);
    }

  }


}

updateComment(c: Comment){
  this.commentService.update(c).subscribe(
    data => {
      this.loadCommentsByUser();
      let snackbar = this._snackBar.open('Comment updated.', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5 * 1000,
      });
    },
    err =>{
      console.log(err);
      console.log("error updating comments from service");
    }
  )
  this.editComment = null;
  this.selectedComment = null;
  // this.todos = this.todoService.index();
}

getNumberOfComments(): number{
  let commentLength = this.enabledComments.length;
    return commentLength;
}

displayCommentTable(): void{
  this.selectedComment = null;
}

// setEditComment(): void{
//   this.editComment = Object.assign({}, this.selectedComment);
// }

getVideoId(song: Song): string{
  const regex = /[^=]*$/g;
  let songString = song.songURL;
  let songId = songString.substr(songString.search(regex));
  console.log(songId);
  return songId;
}

formatPostDateTime(postDateTime: string): string{
  if(postDateTime == null){
    return "None";
  }
  let dateYear = postDateTime.substr(0, 4);
  let dateMonth = postDateTime.substr(5, 2);
  let dateDay = postDateTime.substr(8, 2);
  let dateHour = postDateTime.substr(11, 2);
  let dateHourInt = parseInt(dateHour);
  let pm = false;
  if(dateHourInt > 12){
    dateHourInt -= 12;
    pm = true;
  }
  dateHour = dateHourInt.toString()
  let dateMin = postDateTime.substr(14,2);
  if(pm == false && dateHourInt === 12){
    return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin +"pm"
  }
  else if(pm == true){
    return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin +'pm';
  }
  else{
    return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin+'am';
}
  }

  formatCommentDateTime(comDateTime: Date): string{

    if(comDateTime == null){
      return "None";
    }
    let postDateTime = comDateTime.toString();
    let dateYear = postDateTime.substr(0, 4);
    let dateMonth = postDateTime.substr(5, 2);
    let dateDay = postDateTime.substr(8, 2);
    let dateHour = postDateTime.substr(11, 2);
    let dateHourInt = parseInt(dateHour);
    let pm = false;
    if(dateHourInt > 12){
      dateHourInt -= 12;
      pm = true;
    }
    dateHour = dateHourInt.toString()
    let dateMin = postDateTime.substr(14,2);
    if(pm == false && dateHourInt === 12){
      return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin +"pm"
    }
    else if(pm == true){
      return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin +'pm';
    }
    else{
      return dateMonth + '/' + dateDay + '/' + dateYear +' at '+ dateHour + ':'+ dateMin+'am';
  }
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
    setPost(post: Post) {
      this.newPost = post;
    }

    setEditPost(post: Post) {
      this.editPost = post;
    }

    setComment(comment: Comment) {
      this.newComment = comment;
    }

    setEditComment(comment: Comment) {
      this.editComment = comment;
    }
}
