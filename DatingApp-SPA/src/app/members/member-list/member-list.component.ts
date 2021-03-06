import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
  constructor(private userService: UserService, private alert: AlertifyService,private route: ActivatedRoute  ) { }

  ngOnInit() {
    console.log("in member list");
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
      //this.loadUser();
  }

  loadUser() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.users = user;
    }, error => {
      this.alert.error(error);
    });
  }

}
