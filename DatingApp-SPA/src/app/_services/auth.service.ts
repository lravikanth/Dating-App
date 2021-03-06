import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHealper = new JwtHelperService();
baseUrl =  environment.apiUrl + 'auth/';
decodedToken: any;

constructor(private http: HttpClient) {

 }

 login(model: any) {
   return this.http.post(this.baseUrl + 'login', model)
   .pipe (
     map((response: any) => {
       const user = response;
       if (user) {
         localStorage.setItem('token', user.token);
         this.decodedToken = this.jwtHealper.decodeToken(user.token);
         console.log(this.decodedToken);
        }
      } )
   )
   ;
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHealper.isTokenExpired(token);
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

}
