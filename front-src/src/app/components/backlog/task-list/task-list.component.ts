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
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  projectName:string;
  ProductOwner: string;
  Tasks:Task[]=null
  
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
   projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
   sprintId=this.activatedRoute.snapshot.paramMap.get('idSprint');
  ngOnInit() {
    this.http
    .get<ProductOwnerResponse>('http://localhost:3000/api/projects/'+this.projectId+'/productOwner')
    .subscribe(
      data => {
      this.projectName=data.projectName;
      this.ProductOwner=data.productOwner;
      }
    );
    this.
    http.
    get<Task[]>('http://localhost:3000/api/projects/'+this.projectId+'/sprints/'+this.sprintId)
    .subscribe( data => { this.Tasks=data;});
  }
  NavigateAddTask(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/Sprint/'+this.sprintId+'/CreateTask']);
  }
  NavigateUpdateTask(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/Sprint/'+this.sprintId+'/UpdateTask']);
  }
  
}

interface ProductOwnerResponse
{
projectName:string;
productOwner:string;
}
