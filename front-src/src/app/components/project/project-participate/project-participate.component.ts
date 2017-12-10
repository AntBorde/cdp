import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-project-participate',
  templateUrl: './project-participate.component.html',
  styleUrls: ['./project-participate.component.css']
})
export class ProjectParticipateComponent implements OnInit {
  projects:any =null;
  ParticipateForm: FormGroup;
  message = '';
  isError = false;

  constructor( @Inject(FormBuilder) fb: FormBuilder,
  private http: HttpClient,private auth: AuthService) { 
    this.ParticipateForm = fb.group({
      projet: [,[Validators.required]],
    });
  }
  ngOnInit() {
    this.http
    .get<ProjectResponse[]>('http://localhost:3000/api/projects/')
    .subscribe(
      data => {
        if(data.length!=0)
       this.projects=data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
         this.message= err.error.message;
        } else {
          this.message=err.error;
        }
      }
    );
  }

  private submitForm()
  {
   const body = {
        project_id: this.ParticipateForm.value.projet,
        user_id:this.auth.getUserId()
      };
      this.http
      .post<ParticipateResponse>('http://localhost:3000/api/projects/'+body.project_id+'/users',body)
      .subscribe(
        data => {
        this.showSuccess(data.message);
        this.ParticipateForm.reset();
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
interface ProjectResponse {
  project_id:number;
  name: string;
  description:string,
  git : string,
}
interface ParticipateResponse
{
message:string;
}