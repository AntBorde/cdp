import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
projects:any =null;
message = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
    .get<ProjectResponse[]>('http://localhost:3000/api/projects/')
    .subscribe(
      data => {
        console.log(data);
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

}
interface ProjectResponse {
  name: string;
  description:string,
  git : string,
}