import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private httpClient = HttpClient) {
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

  ngOnInit() {
  }

  submitForm() {
    const body = {
      email: this.signupForm.value.email,
      lastname: this.signupForm.value.lastName,
      firstname: this.signupForm.value.firstName,
      password: this.signupForm.value.password,
    }
    console.log(body);
    HttpClient
      .post<ItemsResponse>('/api/items')
      .subscribe(
        data => {...},
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      );
    //this.signupForm.reset();
  }

}
