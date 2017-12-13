import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import {Task} from '../../../models/task';
import {ProjectService} from "../../../services/project.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  AddTaskForm: FormGroup;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  sprintId=this.activatedRoute.snapshot.paramMap.get('idSprint');
  ProjectTeam:any=[];
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
      this.AddTaskForm = fb.group({
        description : [null, [Validators.required,Validators.minLength(10)]],
        cost:[,[Validators.required]],
        dev: [,[Validators.required]],
      });
    }
  ngOnInit() {
    this.http.get<ProjectMembersResponse>('http://localhost:3000/api/projects/'+this.projectId+'/team')
    .subscribe( data => { 
     this.ProjectTeam.push(data[0].productOwner);
     data[0].contributor.forEach(contributor => {
      this.ProjectTeam.push(contributor);
     });
     });
     
  }
  AddTaskFrom()
  {
  const body = {
    description: this.AddTaskForm.value.description,
    cost: this.AddTaskForm.value.cost,
    userUserId: this.AddTaskForm.value.dev,
  };
  this.http
  .post<CreateTaskResponse>('http://localhost:3000/api/projects/'+this.projectId+'/sprints/'+this.sprintId,body,{
  headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
  .subscribe(
    data => {
      this.showSuccess(data.message);
      setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog/Sprint/'+this.sprintId+'/Tasks']), 1000);
      this.AddTaskForm.reset();
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
interface CreateTaskResponse
{
  message:string;
}
interface ProjectMembersResponse
{
   project_id:number,
   productOwner:object, 
   contributor:any 
}

