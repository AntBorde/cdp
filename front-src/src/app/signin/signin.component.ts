import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  messageErreur = '';

  loginForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private httpClient: HttpClient) {
    this.loginForm = fb.group({
      email : [null, [Validators.required, CustomValidators.email]],
      password : [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this
      .httpClient
      .post<Response>('/auth', {})
      .toPromise()
      .then(res => {
      })
      .catch(err => this.messageErreur = 'ERROR');
  }

}

interface Response {
  message: string;
}
