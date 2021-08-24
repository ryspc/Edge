import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loggedInUser: User | null = null;
  public encoded = this.authService.getCredentials();
  public decoded = atob((this.encoded ?? 'null'));
  public searchInput: string = '';
  allPosts: Post[] = [];
  searchResult: Post[] | null = null;
  // childMessage: Post[] = this.searchResult;
  // childKeyword: string = '';

  constructor(private observer: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    private _snackBar: MatSnackBar
    )
    {}

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
      this.getAllPosts();

  }
  logout() {
    this.authService.logout();
    let snackbar = this._snackBar.open('You have been logged out.', '', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
    snackbar.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
    });
    this.router.navigateByUrl("/landing"); //TODO: Update url navigation
  }

  getLoggedInUser() {
    this.userService.getCurrentUser(this.decoded.split(':')).subscribe(
      user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      },
      err => {
        console.log('Could not get logged in User');
        let snackbar = this._snackBar.open('You are not logged in.','', {
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
  home() {
    this.router.navigateByUrl("/home");
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
  admin() {
    this.router.navigateByUrl("/admin");
  }

  getAllPosts(){
    this.postService.index().subscribe(
      data => {
        this.allPosts = data;
        console.log(this.allPosts);
      },
      err => {
        console.log('Could not retrieve all posts');
        let snackbar = this._snackBar.open('Error retrieving posts, please try again.','', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });

      });
  }

  postsByKeyword(){
    // this.searchResult = [];
    this.postService.postsByKeyword(this.searchInput).subscribe(
      data => {
        this.searchResult = data;
        console.log(this.searchResult);
      },
      err => {
        console.log('Could not retrieve all posts');
        let snackbar = this._snackBar.open('No posts found for "' +this.searchInput+'".', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });

      });
  }

  // fetchPost(event: any){
  //   if (event.target.value === '') {
  //     return this.searchResult = [];
  //   }
  //   this.searchResult = this.allPosts.filter((post) => {
  //     return post.title.toLowerCase().startsWith(event.target.value.toLowerCase());
  //   })
  // }


}
