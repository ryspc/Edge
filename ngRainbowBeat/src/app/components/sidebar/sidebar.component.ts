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
import { SettingsComponent } from '../settings/settings.component';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  template: `
    <app-admin [searchKeyword]="searchInput"></app-admin>
  `,
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
  searchResult: Post[] = [];
  childMessage: Post[] = this.searchResult;
  childKeyword: string = '';

  constructor(private observer: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
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

  getAllPosts(){
    this.postService.index().subscribe(
      data => {
        this.allPosts = data;
        console.log(this.allPosts);
      },
      err => {
        console.log('Could not retrieve all posts');

      });
  }

  postsByKeyword(){
    this.searchResult = [];
    this.postService.postsByKeyword(this.searchInput).subscribe(
      data => {
        this.searchResult = data;
        console.log(this.searchResult);
      },
      err => {
        console.log('Could not retrieve all posts');

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
