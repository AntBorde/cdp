import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

  private loggedIn: boolean;
  private token: string;
  private firstName: string;
  private lastName: string;

  constructor( ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }
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

  destroyToken(){
    this.loggedIn = false;
    this.token = null;
    localStorage.removeItem('cdp-token');
  }

}
