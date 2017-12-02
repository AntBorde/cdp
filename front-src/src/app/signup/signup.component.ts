import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from "../message.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent {

  showErrorMesage : boolean = false;
  errorMessage: string = '';
  signupForm: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router ) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const password2 = new FormControl(null, CustomValidators.equalTo(password));

    this.signupForm = fb.group({
      email : [null, [Validators.required, CustomValidators.email]],
      lastName : [null, Validators.required],
      firstName : [null,  Validators.required],
      password: password,
      password2: password2,
    });
  }

  private submitForm() {
    const body = {
      email: this.signupForm.value.email,
      lastname: this.signupForm.value.lastName,
      firstname: this.signupForm.value.firstName,
      password: this.signupForm.value.password,
    }

    this.http
      .post<SingupResponse>('http://localhost:3000/api/users/singup', body)
      .subscribe(
        data => {
          this.messageService.setSuccessMessage(data.message);
          this.router.navigate(['home'])
            .catch(reason => console.log('Erreur de redirection: ', reason));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
            this.errorMessage = err.error.message;
            this.showErrorMesage = true;
            this.signupForm.reset();
          } else {
            console.log(err.error);
            this.signupForm.reset();
            this.errorMessage = err.error;
            this.showErrorMesage = true;
          }
        }
      );
  }

}

interface SingupResponse {
  message: string;
}
