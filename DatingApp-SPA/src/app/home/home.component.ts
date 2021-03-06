import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 registerMode = false;
 constructor(private client: HttpClient) { }
  ngOnInit() { }

  registerToggle() {
    this.registerMode = true;
  }
  cancelRegisterMode(mode: boolean) {
    this.registerMode = mode;
  }

}
