import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private auth: AuthService,) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const password2 = new FormControl(null, CustomValidators.equalTo(password));

    this.UpdateInfoUserForm = fb.group({
      email : [null, [Validators.required, CustomValidators.email]],
      password: password,
      password2: password2,
    });
  }

  ngOnInit() {

  }
  message = '';
  isError = false;
  UpdateInfoUserForm: FormGroup;
  
  private submitForm() {
    const body = {
      email: this.UpdateInfoUserForm.value.email,
      password: this.UpdateInfoUserForm.value.password,
    }
    this.http
      .put<UserResponse>('http://localhost:3000/api/users/'+this.auth.getUserId(),body)
      .subscribe(
        data => {
        this.auth.storeUser(data.UserId,this.auth.getFirstName(),this.auth.getLastName(),data.Email);
        this.showSuccess(data.message);
        setTimeout(() => this.router.navigate(['/profile']), 1000);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showError(err.error.message);
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


interface UserResponse {
  UserId:string,
  Email: string,
  message:string;
}

