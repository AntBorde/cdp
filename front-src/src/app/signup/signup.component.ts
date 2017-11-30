import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent {

  signupForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private http: HttpClient) {
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
      .post('http://localhost:3000/api/users/singup', body)
      .subscribe(
        data => {
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
            this.signupForm.reset();
          } else {
            console.log(err.error);
            this.signupForm.reset();
          }
        }
      );
  }

}

interface SingupResponse {
  message: string;
}
