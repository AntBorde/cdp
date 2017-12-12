import { Component, Inject, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private authService: AuthService,
    private messageService: MessageService) {

    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const password2 = new FormControl(null, CustomValidators.equalTo(password));

    this.updateInfoUserForm = fb.group({
      email : [this.authService.getEmail(), [Validators.required, CustomValidators.email]],
      password: password,
      password2: password2,
    });
  }

  ngOnInit() {
  }

  message = '';
  isError = false;
  updateInfoUserForm: FormGroup;

  private submitForm() {
    const body = {
      email: this.updateInfoUserForm.value.email,
      password: this.updateInfoUserForm.value.password,
    };

    this.http
      .put<UserResponse>('http://localhost:3000/api/users/' + this.authService.getUserId(), body, {
        headers: new HttpHeaders().set('Authorization', this.authService.getToken())})
      .subscribe(
        data => {
          this.authService.storeUser(data.userId, this.authService.getFirstName(), this.authService.getLastName(), data.email);
          this.messageService.setSuccessMessage('Vos informations ont été mises à jour.');
          setTimeout(() => this.router.navigate(['/home']), 1000);
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
  userId: string,
  email: string,
}
