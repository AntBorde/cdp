import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private message: string = '';

  constructor( private messageService: MessageService) { }

  ngOnInit() {
    if (this.messageService.successMessage){
      this.message = this.messageService.consumeMessage();
    }
  }

}
