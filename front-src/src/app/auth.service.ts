import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

  public loggedIn: boolean = false;
  private token: string = null;
  private firstName: string = null;
  private lastName: string = null;

  constructor( ) {
    this.token = localStorage.getItem('cdp-token');
    if (this.token != null){
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

  logout(){
    this.loggedIn = false;
    this.token = null;
    localStorage.removeItem('cdp-token');
  }

}
