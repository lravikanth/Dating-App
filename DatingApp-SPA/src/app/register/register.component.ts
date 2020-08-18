import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  constructor(private auth : AuthService, private alertify: AlertifyService
    ,private router: Router, private fb: FormBuilder) { }
  values: any;
  model: any = {};
  user: User;
  registerForm : FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  ngOnInit() { 
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegistrationForm();
    // this.registerForm = new FormGroup(
    //   {
    //     username:  new FormControl('', Validators.required),
    //     password: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    //     confirmPassword: new FormControl('',Validators.required)
    //   }, this.passwordMatchValidator
    // );
    console.log(this.registerForm.value);
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',Validators.required]
    }, {Validator: this.passwordMatchValidator});
  }

passwordMatchValidator(fg: FormGroup)
{
  return fg.get('password').value === fg.get('confirmPassword').value ? null : {'mismatch':true};
}

  register(){
    if (this.registerForm.valid) {
      this.user = Object.assign({},this.registerForm.value);
      this.auth.register(this.user).subscribe(() => {
        this.alertify.success("registration success");  
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.auth.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel registration');
  }

}
