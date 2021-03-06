import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl + 'users/';
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl);
}
getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + id);
}
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl+id,user);
}

deletePhoto(id: number, userId: number) {
  return this.http.delete(this.baseUrl+userId +'/photos/' + id);

}

}
