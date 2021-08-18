import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { expandRightOnEnterAnimation } from 'angular-animations';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user: User = new User();

  constructor(private currentRouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toaster: Toaster,
    private userService: UserService,
    private auth: AuthService
    ) { }

    closeResult = '';
    panelOpenState = false;

  ngOnInit(): void {
  }
  // MODAL STUFF //
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
  // END MODAL STUFF //

  login(user: User) {
    this.auth.login(user.username, user.password).subscribe(
      loggedIn => {
        this.router.navigateByUrl("/landing") //TODO: Update url navigation
      },
      fail => {
        console.log("Login Failed");
        console.log(fail);
      }
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/landing"); //TODO: Update url navigation
  }

  register(form: NgForm) {
    let newUser = form.value;
    this.auth.register(newUser).subscribe(
      user => {
        this.auth.login(newUser.username, newUser.password).subscribe(
          loggedIn => {
            this.router.navigateByUrl("/landing"); //TODO: Update url navigation
            console.log("User is logged in");
          },
          failed => {
            this.router.navigateByUrl("/landing");
          }
        );
      },
      fail => {
        console.log(fail);
        this.router.navigateByUrl("/landing");
      }
    );
  }

}
