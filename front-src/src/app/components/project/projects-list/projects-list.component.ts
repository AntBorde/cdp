import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { MessageService } from "../../../services/message.service";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
  projects: Project[];
  message: string = '';
  isError: boolean = false;
  projectsExist: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.message = '';
    this.projectsExist = false;

    this.http
      .get<Project[]>('http://localhost:3000/api/projects/', {
        headers: new HttpHeaders().set('Authorization', this.authService.getToken())})
      .subscribe(
        data => {
          if (data.length == 0){
            this.showError("Aucun projet n'est disponible.")
          }
          else{
            this.projects = data;
            this.projectsExist = true;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showError(err.error.message);
          }
          else {
            if (err.status === 401){
              this.messageService.setErrorMessage(err.error);
              this.authService.logout();
              this.router.navigate(['/signin'])
                .catch(reason => console.log('Erreur de redirection: ', reason));
            }
            else{
              this.showError( err.error);
            }
          }
        }
      );
  }

  contributeTo(projectID)
  {
    const body = {
      projectId: projectID,
      userId: this.authService.getUserId()
    };

    this.http
      .post<ProjectResponse>('http://localhost:3000/api/projects/contribute/', body, {
        headers: new HttpHeaders().set('Authorization', this.authService.getToken())})
      .subscribe(
        data => {
          this.messageService.setSuccessMessage(data.message);
          this.router.navigate(['myprojects'])
            .catch(reason => console.log('Erreur de redirection: ', reason));;
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

interface Project {
  project_id: number;
  name: string;
  description: string,
  git : string,
  productOwner: ProductOwner
}

interface ProductOwner {
  firstname: string,
  lastname: string
}

interface ProjectResponse {
  message: string
}
