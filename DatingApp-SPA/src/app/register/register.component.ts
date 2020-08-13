import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  constructor(private auth : AuthService) { }
  values: any;
  model: any = {};
  
  ngOnInit() { }

  register(){
    this.auth.register(this.model).subscribe(() => {
      console.log("registration success");  
    }, error => {
      console.log(error);
    } );
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel registration');
  }

}
