import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { MessageService } from "./message.service";

@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: string = '';
  private userId: string = '';
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';

  constructor( private http: HttpClient, private router: Router, private messageService: MessageService ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token != null){
      this.verifyToken();
    }
  }

  verifyToken() {
    this.http
      .get<InfoResponse>('http://localhost:3000/api/users/info',{
        headers: new HttpHeaders().set('Authorization', this.token)})
      .subscribe(
        data => {
          this.storeUser(data.userId, data.firstName, data.lastName, data.email);
          this.loggedIn.next(true);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
            this.logout();
            this.router.navigate(['home'])
              .catch(reason => console.log('Erreur de redirection: ', reason));
            return false;
          } else {
            this.logout();
            this.messageService.setErrorMessage(err.error);
            this.router.navigate(['signin'])
              .catch(reason => console.log('Erreur de redirection: ', reason));
            return false;
          }
        }
      );
  }

  storeUser(UserId:string,firstName: string, lastName: string,Email:string){
    this.userId = UserId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = Email;
  }

  storeToken(token: string){
    localStorage.setItem('cdp-token', token);
    this.token = token;
    this.loggedIn.next(true);
  }

  logout(){
    this.loggedIn.next(false);
    this.token = null;
    localStorage.removeItem('cdp-token');
  }

  getToken(){
    if (this.loggedIn)
      return this.token;
  }

  getLastName()
  {
    if (this.loggedIn)
      return this.lastName;
  }
  getFirstName()
  {
    if (this.loggedIn)
      return this.firstName;
  }
  getEmail()
  {
    if (this.loggedIn)
      return this.email;
  }
  getUserId()
  {
    if (this.loggedIn)
      return this.userId;
  }
}

interface InfoResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
