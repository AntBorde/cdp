import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  private token: string = null;
  private firstName: string = null;
  private lastName: string = null;

  constructor( ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token != null){
      this.loggedIn.next(true);
    }
  }

  storeUser(firstName: string, lastName: string){
    this.firstName = firstName;
    this.lastName = lastName;
  }

  storeToken(token: string){
    this.loggedIn.next(true);
    this.token = token;
    localStorage.setItem('cdp-token', token);
  }

  logout(){
    this.loggedIn.next(false);
    this.token = null;
    localStorage.removeItem('cdp-token');
  }
  getFirstName()
  {
    if (this.loggedIn)
    return this.firstName;
  }
}
