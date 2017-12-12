import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from "../../services/message.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent implements OnInit {

  message: string = '';
  isError: boolean = false;
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

  ngOnInit() {
      this.message = '';
  }

  private submitForm() {
    const body = {
      email: this.signupForm.value.email,
      lastname: this.signupForm.value.lastName,
      firstname: this.signupForm.value.firstName,
      password: this.signupForm.value.password,
    };

    this.http
      .post<SignupResponse>('http://localhost:3000/api/users/signup', body)
      .subscribe(
        data => {
          this.messageService.setSuccessMessage(data.message);
          setTimeout(() => this.router.navigate(['/home']));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showError(err.error.message);
            this.signupForm.reset();
          } else {
            this.showError(err.error);
          }
        }
      );
  }

  private showError(message: string): void {
    this.message = message;
    this.isError = true;
  }

  private showSuccess(message: string): void {
    this.message = message;
    this.isError = false;
  }
}


interface SignupResponse {
  message: string;
}
