import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Project} from '../../../models/project';
import { AuthService } from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";

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
  private http: HttpClient,private auth: AuthService,
  private ProjectService: ProjectService,
  private router: Router) { 
    this.ParticipateForm = fb.group({
    projet: [,[Validators.required]],
    });
  }
  ngOnInit() {
    this
    .ProjectService
    .getProjects()
    .subscribe(projects => this.projects = projects);
  }

  private submitForm()
  {
   const body = {
        project_id: this.ParticipateForm.value.projet,
        user_id:this.auth.getUserId()
      };
      this.http
      .post<ParticipateResponse>('http://localhost:3000/api/projects/'+body.project_id+'/users',body,{
        headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
      .subscribe(
        data => {
        this.showSuccess(data.message);
        this.ParticipateForm.reset();
        setTimeout(() => this.router.navigate(['/projects']), 1000);
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
interface ParticipateResponse
{
message:string;
}