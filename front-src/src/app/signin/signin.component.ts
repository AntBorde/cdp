import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  providers: [ AuthService ],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private http: HttpClient, private auth: AuthService, private router: Router) {
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
    }

    this.http
      .post<TokenResponse>('http://localhost:3000/api/users/signin', body)
      .subscribe(
        data => {
          console.log(data);
          this.auth.storeToken(data.token);
          this.auth.storeUser(data.firstname, data.lastname);
          this.router.navigate(['projects'])
            .catch(reason => console.log('Erreur de redirection: ', reason));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
            this.loginForm.reset();
          } else {
            console.log(err.error);
            this.loginForm.reset();
          }
        }
      );
  }
}

interface TokenResponse {
  token: string;
  firstname : string,
  lastname: string
}
