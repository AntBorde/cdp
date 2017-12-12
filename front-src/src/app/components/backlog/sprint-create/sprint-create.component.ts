import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import {Sprint} from '../../../models/sprint';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-sprint-create',
  templateUrl: './sprint-create.component.html',
  styleUrls: ['./sprint-create.component.css']
})
export class SprintCreateComponent implements OnInit {
  AddSprintForm: FormGroup;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
 
      this.AddSprintForm = fb.group({
        description : [, [Validators.required,Validators.minLength(10)]],
        dateBegin:[,[Validators.required]],
        dateEnd:[,[Validators.required]],
      });
    }
    ngOnInit(){
    }
    private submitForm() {
      const body = {
        description: this.AddSprintForm.value.description,
        dateBegin: this.AddSprintForm.value.dateBegin,
        dateEnd: this.AddSprintForm.value.dateEnd,
        projectProjectId:this.projectId
      };
      this.http
      .post<CreateSprintResponse>('http://localhost:3000/api/projects/'+this.projectId+'/sprints',body,{
      headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
      .subscribe(
        data => {
          this.showSuccess(data.message);
           setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog/SprintList']), 1000);
         this.AddSprintForm.reset();
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
interface CreateSprintResponse
{
  message:string;
}
