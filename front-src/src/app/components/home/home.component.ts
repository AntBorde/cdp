import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from "../../services/message.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  message: string = '';
  isError: boolean = false;
  loggedIn: boolean = false;

  constructor( private messageService: MessageService, private authService: AuthService ) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(value => this.loggedIn = value);

    if (this.messageService.successMessage){
      this.message = this.messageService.consumeMessage();
      this.isError = false;
    }

    else if (this.messageService.errorMesage){
      this.message = this.messageService.consumeMessage();
      this.isError = true;
    }

    else {
      this. message = '';
    }
  }
}
