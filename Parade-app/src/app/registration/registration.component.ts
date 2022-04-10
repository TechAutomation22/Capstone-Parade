import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  user = new User();
  msg = '';

  constructor(private _service: RegistrationService, private _router: Router) {}

  ngOnInit(): void {}

  RegisterUser() {
    this._service.RegisterUserFromRemote(this.user).subscribe(
      (data) => {
        console.log('response received'),
          this._router.navigate(['']);
      },
      (error) => {
        console.log('exception occurred'), (this.msg = error.error);
      }
    );
  }

  gotoLogin() {
    this._router.navigate(['']);
  }
}
