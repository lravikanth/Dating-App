import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm',{static:true}) editForm:NgForm;
  @HostListener('window.beforeunload',['$event'])
  onWindowClose($event) {
      if (this.editForm.dirty) {
      $event.preventDefault();
      $event.returnValue = false;
    }
  }

  constructor(private route: ActivatedRoute, private alert:AlertifyService,
    private userService: UserService, private auth: AuthService) {
    console.log("in member edit");
   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.auth.decodedToken.nameid,this.user).subscribe(next => {
      this.alert.success('Profile updated successfully!!');
      this.editForm.reset(this.user);
    }, error => {
      this.alert.error(error);
    });
    
  }

}
