import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { MessageService } from "../../../services/message.service";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ProjectCreateComponent implements OnInit {
  createProjectForm: FormGroup;
  message = '';
  isError = false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private authService: AuthService,
    private messageService: MessageService) {
    this.createProjectForm = fb.group({
      name : [null, [Validators.required, Validators.maxLength(50)]],
      description : [null, Validators.required],
      git : [null,  [Validators.required, CustomValidators.url, Validators.maxLength(250)]],
    });

  }
  ngOnInit() {
    this.message = '';
  }

  private submitForm() {
    const body = {
      name: this.createProjectForm.value.name,
      description: this.createProjectForm.value.description,
      git: this.createProjectForm.value.git
    };

    this.http
      .post<CreateProjectResponse>('http://localhost:3000/api/projects/', body, {
        headers: new HttpHeaders().set('Authorization', this.authService.getToken())})
      .subscribe(
        data => {
          this.showSuccess(data.message);
          this.router.navigate(['/projects'])
            .catch(reason => console.log('Erreur de redirection: ', reason));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showError(err.error.message);
            this.createProjectForm.reset();
          } else {
            if (err.status === 401){
              this.messageService.setErrorMessage(err.error);
              this.authService.logout();
              this.router.navigate(['/signin'])
                .catch(reason => console.log('Erreur de redirection: ', reason));
            }
            else{
              this.showError( err.error);
              this.createProjectForm.reset();
            }
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

interface CreateProjectResponse {
  message: string
}
