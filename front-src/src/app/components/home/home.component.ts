import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  message: string = '';
  showSuccessMessage: boolean = false;

  constructor( private messageService: MessageService) { }

  ngOnInit() {
    if (this.messageService.successMessage){
      this.message = this.messageService.consumeMessage();
      this.showSuccessMessage = true;
    }
  }

}
