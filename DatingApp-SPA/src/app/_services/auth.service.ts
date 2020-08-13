import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHealper = new JwtHelperService();
baseUrl = 'http://localhost:5000/api/auth/';
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

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

}
