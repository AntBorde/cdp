import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import {Issue} from '../../../models/issue';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})

export class CreateIssueComponent implements OnInit {
  AddIssueForm: FormGroup;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
      this.AddIssueForm = fb.group({
        story : [null, [Validators.required,Validators.minLength(10)]],
        priority:[,[Validators.required]],
        difficulty:[,[Validators.required]],
      });
    }
    ngOnInit(){
    }
    private submitForm() {
      const body = {
        story: this.AddIssueForm.value.story,
        priority: this.AddIssueForm.value.priority,
        difficulty: this.AddIssueForm.value.difficulty,
        state:'TODO',
        projectProjectId:this.projectId
      };
      this.http
      .post<CreateIssueResponse>('http://localhost:3000/api/projects/'+this.projectId+'/issues',body,{
      headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
      .subscribe(
        data => {
          this.showSuccess(data.message);
          setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog']), 1000);
         this.AddIssueForm.reset();
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
interface CreateIssueResponse
{
  message:string;
}
