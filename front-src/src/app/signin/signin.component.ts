import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  message = '';
  isError = false;
  loginForm: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService) {
    this.loginForm = fb.group({
      email : [null, [Validators.required, CustomValidators.email]],
      password : [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.auth.logout();
  }
  private submitForm() {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.http
      .post<TokenResponse>('http://localhost:8080/api/users/signin', body)
      .subscribe(
        data => {
          this.auth.storeToken(data.token);
          this.auth.storeUser(data.firstName,data.lastName,data.Email);
          this.router.navigate(['profile'])
           .catch(reason => console.log('Erreur de redirection: ', reason));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
            this.message = err.error.message;
            this.isError = true;
          } else {
            console.log(err.error);
            this.message = err.error;
            this.isError = true;
          }
        }
      );
  }
  private showError(message: string): void {
    this.message = message;
    this.isError = true;
  }
}
interface TokenResponse {
  token: string;
  firstName : string,
  lastName: string,
  Email: string,
}
