import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();
  msg=''

  constructor(private _service: RegistrationService, private _router: Router) {}

  ngOnInit(): void {}

  LoginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data) => {console.log('response received'),
      this._router.navigate(['/loginsuccess'])},
      (error) =>{ console.log('exception occurred'),
      this.msg = "Invalid Credentials; Enter valid Username and Password";
    }
    );
  }
  gotoregistration(){
    this._router.navigate(['/registration'])
  }
}
