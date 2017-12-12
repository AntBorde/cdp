import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import {Project} from '../models/project';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class ProjectService {

  constructor( private http: HttpClient,
    private router: Router ,
    private auth: AuthService) { }
  getProjects(): Observable<Project[]> {
    return this.http
    .get<Project[]>('http://localhost:3000/api/projects/',{
    headers: new HttpHeaders().set('Authorization',this.auth.getToken())});
  }
}