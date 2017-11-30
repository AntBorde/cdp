import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavbarUserComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home'])
      .catch(reason => console.log('Erreur de redirection: ', reason));
  }

}
