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
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  UpdateTaskForm: FormGroup;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  sprintId=this.activatedRoute.snapshot.paramMap.get('idSprint');
  ProjectTeam:any=[];
  Tasks:Task[]=null
  description:string;
  cost:number;
  dev:number;
  stateOption;
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
      this.UpdateTaskForm = fb.group({
        task_id : [,[]],
        description : [null, [Validators.required,Validators.minLength(10)]],
        cost:[,[Validators.required]],
        dev: [,[Validators.required]],
        state:[,[]],
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
     this. http.get<Task[]>('http://localhost:3000/api/projects/'+this.projectId+'/sprints/'+this.sprintId)
     .subscribe( data => { this.Tasks=data;});
  }
  onChange($event) {
    this.Tasks.forEach(task => {
    if(task.task_id==this.UpdateTaskForm.value.task_id)
    {
      this.description=task.description;
      this.cost=task.cost;
      this.dev=task.userUserId;
      this.stateOption=task.state;
    }});
}
  UpdateTaskFrom()
  {
    console.log(this.UpdateTaskForm.value);
    this.http
    .put<UpdateTaskResponse>('http://localhost:3000/api/projects/'+this.projectId+'/sprints/'+this.sprintId+'/'+this.UpdateTaskForm.value.task_id,this.UpdateTaskForm.value,{
    headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
    .subscribe(
      data => {
      this.showSuccess(data.message);
       setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog/Sprint/'+this.sprintId+'/Tasks']), 1000);
      this.UpdateTaskForm.reset();
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
interface UpdateTaskResponse
{
  message:string;
}
interface ProjectMembersResponse
{
   project_id:number,
   productOwner:object, 
   contributor:any 
}