import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/playlist';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user: User = new User();
  favoriteSongs: Playlist = new Playlist;

  constructor(private currentRouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private playlistService: PlaylistService
    ) { }

    closeResult = '';
    panelOpenState = false;

  ngOnInit(): void {
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

  login(user: User) {
    this.auth.login(user.username, user.password).subscribe(
      loggedIn => {
        let snackbar = this._snackBar.open('Welcome back, ' + user.username +'.', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
        this.router.navigateByUrl("/home")
      },
      fail => {
        console.log("Login Failed"); 
          let snackbar = this._snackBar.open('Credentials do not match any active accounts.', '', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 5 * 1000,
          });
          snackbar.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
          });
        console.log(fail);
        
      }
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/landing");
  }

  register(form: NgForm) {
    let newUser = form.value;
    this.auth.register(newUser).subscribe(
      user => {
        this.auth.login(newUser.username, newUser.password).subscribe(
          loggedIn => {
            let snackbar = this._snackBar.open('Welcome to Edge, ' + newUser.username+'.', '', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            snackbar.onAction().subscribe(() => {
              console.log('The snack-bar action was triggered!');
            });
            this.playlistService.create().subscribe(
              playlist => {
                this.favoriteSongs = playlist;
              },
              err =>{
                console.error(err)
                console.log('error creating favorites playlist');
              }
            );
            this.router.navigateByUrl("/home");
            console.log("User is logged in");


          },
          failed => {
            let snackbar = this._snackBar.open('Registration failed, please try again', '', {
              horizontalPosition: 'start',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            snackbar.onAction().subscribe(() => {
              console.log('The snack-bar action was triggered!');
            });
            this.router.navigateByUrl("/landing");
          }
        );
      },
      fail => {
        console.log(fail);
        let snackbar = this._snackBar.open('Registration failed, please try again', '', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
        snackbar.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
        this.router.navigateByUrl("/landing");
      }
    );

  }

}
