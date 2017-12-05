import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }
  loggedIn :boolean;
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  this.authService.loggedIn.subscribe(res=>this.loggedIn=res);
  if (!this.loggedIn){
     this.router.navigate(['/home']);
      return false;
    }
    return true;

  }
}