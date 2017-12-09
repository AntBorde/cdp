import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Project} from '../../../models/project';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
projects:Project[]=null;
message = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
    .get<ProjectResponse[]>('http://localhost:3000/api/projects/')
    .subscribe(
      data => {
        if(data.length!=0)
       this.projects=data;
       console.log(data);
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
  
}
interface ProjectResponse {
  project_id:number;
  name: string;
  description:string,
  git : string,
  productOwner:String;
}