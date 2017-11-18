import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  messageErreur: string = '';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  onSubmit(email: string, password: string): void {
    this
      .httpClient
      .post<Response>('/auth', {email: email, password: password})
      .toPromise()
      .then(res => {
      })
      .catch(err => this.messageErreur = 'ERROR');
  }

}

interface Response {
  message: string;
}
