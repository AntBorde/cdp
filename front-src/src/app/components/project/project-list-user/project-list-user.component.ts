import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-project-list-user',
  templateUrl: './project-list-user.component.html'
})
export class ProjectListUserComponent implements OnInit {
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
      .get<Project[]>('http://localhost:3000/api/projects/user/' + this.authService.getUserId(), {
        headers: new HttpHeaders().set('Authorization', this.authService.getToken())})
      .subscribe(
        data => {
          if (data.length == 0){
            this.showError("Il n'existe aucun projet.");
          }
          else{
            this.projects = data;
            this.projectsExist = true;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.showError(err.error.message);
          } else {
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
  productOwner: User,
  users: User[]
}

interface User {
  firstname: string,
  lastname: string
}
