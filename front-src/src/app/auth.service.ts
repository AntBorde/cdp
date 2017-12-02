import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private loggedIn: boolean = false;
  private token: string = null;
  private firstName: string = null;
  private lastName: string = null;

  constructor( ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token != null){
      this.loggedIn = true;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  storeUser(firstName: string, lastName: string){
    this.firstName = firstName;
    this.lastName = lastName;
  }

  storeToken(token: string){
    this.loggedIn = true;
    this.token = token;
    localStorage.setItem('cdp-token', token);
  }

  logout(){
    this.loggedIn = false;
    this.token = null;
    localStorage.removeItem('cdp-token');
  }

}
