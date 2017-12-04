import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  private token: string = null;
  private firstName: string = null;
  private lastName: string = null;
  private Email: string = null;

  constructor( ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token != null){
      this.loggedIn.next(true);
    }
  }

  storeUser(firstName: string, lastName: string,Email:string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.Email = Email;
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
    return this.Email;
  }
}
