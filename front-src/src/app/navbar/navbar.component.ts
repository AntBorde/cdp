import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  TestLog :boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.IsLog.subscribe(res=>this.TestLog=res);
    
  }
  
}
