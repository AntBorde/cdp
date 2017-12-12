import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgSelectOption } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import {Sprint} from '../../../models/sprint';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sprint-update',
  templateUrl: './sprint-update.component.html',
  styleUrls: ['./sprint-update.component.css']
})
export class SprintUpdateComponent implements OnInit {
  Sprints:Sprint[]=null;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  description:string;
  dateBegin:string;
  dateEnd:string;
  UpdateSprintForm: FormGroup;
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
 
      this.UpdateSprintForm = fb.group({
        sprint_id : [,[]],
        description : [, [Validators.required,Validators.minLength(10)]],
        dateBegin:[,[Validators.required]],
        dateEnd:[,[Validators.required]],
      });
    }

  ngOnInit() {
    this.
    http.
    get<Sprint[]>('http://localhost:3000/api/projects/'+this.projectId+'/sprints')
    .subscribe( data => { 
      if(data.length==0)
      this.Sprints=null;
      else
      this.Sprints=data;
     });
  }
  onChange($event) {
    this.Sprints.forEach(sprint => {
    if(sprint.sprint_id==this.UpdateSprintForm.value.sprint_id)
    {
       this.description=sprint.description;
      this.dateBegin=sprint.dateBegin.toString().substring(0,10);
      this.dateEnd=sprint.dateEnd.toString().substring(0,10);
    }});
}
UpdateSprint()
{
  this.http
  .put<UpdateSprintResponse>('http://localhost:3000/api/projects/'+this.projectId+'/sprints/'+this.UpdateSprintForm.value.sprint_id,this.UpdateSprintForm.value,{
  headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
  .subscribe(
    data => {
      this.showSuccess(data.message);
       setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog/SprintList']), 1000);
     this.UpdateSprintForm.reset();
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
  interface UpdateSprintResponse
  {
  message:string;
  }