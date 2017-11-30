import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  private token: string;

  constructor( private http: HttpClient, private authHttp: AuthHttp, private jwtHelper: JwtHelper) {
    this.token = localStorage.getItem('cdp-token');
  }

  storeToken(token: string){
    this.token = token;
    localStorage.setItem('cdp-token', token);
  }

  decodeToken(){
    // this.checkTokenValidity();
    // if (this.token != null)
  }
  // this.jwtHelper.decodeToken(token),
  // this.jwtHelper.getTokenExpirationDate(token),
  // this.jwtHelper.isTokenExpired(token)


  checkTokenValidity(){
    if (this.jwtHelper.isTokenExpired(this.token)){
      return false;
    }
    else{

    }
  }

}
