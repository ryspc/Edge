import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/services/song.service';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/models/genre';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-home',
  templateUrl: './sidebar-home.component.html',
  styleUrls: ['./sidebar-home.component.css']
})
export class SidebarHomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loggedInUser: User | null = null;
  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));
  closeResult = '';
  panelOpenState = false;
  newPost: Post = new Post();
  newSong: Song = new Song();
  genreName: string = '';
  newSongGenre: Genre = new Genre();
  genres: Genre [] = [];
  searchResult: Post[] | null = null;
  public searchInput: string = '';

  constructor(private observer: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private songService: SongService,
    private genreService: GenreService,
    private router: Router,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
    ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
      this.getLoggedInUser();
      this.getGenres();
  }

  ngOnInit() {
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/landing");
  }

  getLoggedInUser() {
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      },
      err => {
        console.log('Could not get logged in User');
        let snackbar = this._snackBar.open('You are not logged in.', '', {
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

  getGenres(){
    this.genreService.allGenres().subscribe(
      data => {
        this.genres = data;
        console.log(this.genres);
      },
      err => {
        console.log('Could not get all genres');
      }
    );
  }

  profile() {
    this.router.navigateByUrl("/profile");
  }
  followers() {
    this.router.navigateByUrl("/followers");
  }
  playlist() {
    this.router.navigateByUrl("/playlist");
  }
  settings() {
    this.router.navigateByUrl("/settings");
  }

  addPost() {
    this.songService.create(this.newSong).subscribe(
      data => {
        this.newSong = data
      },
      err => {
        console.log('error creating new Song');
      }
    );
    this.newPost.song = this.newSong;
    this.postService.create(this.newPost).subscribe(
      data => {
        this.newPost = data;
      },
      err => {
        console.log("Error creating new Post");
      }
    );
  }

  createPost(genreName: string, song: Song, post: Post){
    if(this.loggedInUser !== null){
    song.user = this.loggedInUser;
    post.user = this.loggedInUser;
    }
    this.genreService.genreById(genreName).subscribe(
      data => {
        this.newSongGenre = data;
        song.genres.push(this.newSongGenre);

        this.songService.create(song).subscribe(
          data => {
            this.newSong = data;
            post.song = this.newSong;

            this.postService.create(post).subscribe(
              data => {
                this.newPost = data;
                let snackbar = this._snackBar.open('Post created.', '', {
                  horizontalPosition: 'start',
                  verticalPosition: 'top',
                  duration: 5 * 1000,
                });
                snackbar.onAction().subscribe(() => {
                  console.log('The snack-bar action was triggered!');
                });
              },
              err => {
                let snackbar = this._snackBar.open('Could not create post.', '', {
                  horizontalPosition: 'start',
                  verticalPosition: 'top',
                  duration: 5 * 1000,
                });
                console.log("error creating post");
              } );
          },
          err => {
            console.log("error creating song");
            let snackbar = this._snackBar.open('Could not create post.', '', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
          });
    },
    err => {
      console.log("error getting genre object");
      let snackbar = this._snackBar.open('Could not create post.', '', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5 * 1000,
      });
  });
}

postsByKeyword(keyword:string){
  this.postService.postsByKeyword(keyword).subscribe(
    data => {
      this.searchResult = data;
      console.log(this.searchResult);
    },
    err => {
      console.log('Could not retrieve all posts');

    });
}
postsByGenre(genre: string){
  this.postService.postsByGenre(genre).subscribe(
    data => {
      this.searchResult = data;
      console.log(this.searchResult);
    },
    err => {
      console.log('Could not retrieve all posts');

    });
}

}
