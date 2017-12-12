import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  CreateProjectForm: FormGroup;
  message = '';
  isError = false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private auth: AuthService,) {
      this.CreateProjectForm = fb.group({
        name : [null, [Validators.required]],
        description : [null, Validators.required],
        git : [null,  Validators.required,CustomValidators.templateUrl],
      });

   }
   ngOnInit() {
  }
   private submitForm() {
    const body = {
      name: this.CreateProjectForm.value.name,
      description: this.CreateProjectForm.value.description,
      git: this.CreateProjectForm.value.git,
      productOwnerName:this.auth.getLastName()+' '+this.auth.getFirstName(),
      user_id:this.auth.getUserId()
    }
    this.http
    .post<CreateProjectResponse>('http://localhost:3000/api/projects/',body,{
    headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
    .subscribe(
      data => {
        this.showSuccess(data.message);
        setTimeout(() => this.router.navigate(['/projects']), 1000);
       this.CreateProjectForm.reset();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showError(err.error.message);
        } else {
          this.showError( err.error);
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
interface CreateProjectResponse
{
  message:string;
}
