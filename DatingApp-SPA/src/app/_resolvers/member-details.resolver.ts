import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Injectable } from "@angular/core";
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
 
    constructor(private service: UserService, private router: Router, private alert: AlertifyService) {
}
resolve(route: ActivatedRouteSnapshot) : Observable<User> {
 return this.service.getUser(route.params['id']).pipe(
    catchError(error => {
        this.alert.error("Problem retrieving User details");
        this.router.navigate(['/members']);
        return of(null);
    })
 );
}

}