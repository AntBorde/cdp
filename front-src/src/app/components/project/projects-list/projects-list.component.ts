import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {Project} from '../../../models/project';
import { AuthService } from "../../../services/auth.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
projects:Project[]=null;
message = '';
isError = false;
  constructor(private router: Router,private http: HttpClient,private auth: AuthService,private ProjectService: ProjectService) { }

  ngOnInit() {
    this
    .ProjectService
    .getProjects()
    .subscribe(projects => this.projects = projects);
  }
  getAccess(projectID)
  {
 
  
    this.http
    .get<AccesResponse>('http://localhost:3000/api/projects/'+projectID+'/users/'+this.auth.getUserId(),{
    headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
    .subscribe(
      data => {
        this.router.navigate(['project/'+projectID+'/Backlog']);
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
}
interface ProjectResponse {
  project_id:number;
  name: string;
  description:string,
  git : string,
  productOwner:String;
}
interface AccesResponse {
    message: string;
}
