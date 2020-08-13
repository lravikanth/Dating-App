import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alert: AlertifyService) {}
  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.alert.error('Invalid navigation');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
