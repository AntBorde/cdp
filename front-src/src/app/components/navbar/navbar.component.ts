import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None
})

export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(value => this.loggedIn = value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home'])
      .catch(reason => console.log('Erreur de redirection: ', reason));
  }

}
