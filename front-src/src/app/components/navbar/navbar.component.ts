import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  loggedIn :boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(res=>this.loggedIn=res);
  }
  
}
