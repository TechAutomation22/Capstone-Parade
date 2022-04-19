import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();
  msg = '';
  id = this.getUserId();

  constructor(
    private _service: RegistrationService,
    private _router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  public getUserId(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8084/user/{emailId}`);
  }

  LoginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data) => {
        console.log('response received'),
          this._router.navigate(['/homepage']);
      },
      (error) => {
        console.log('exception occurred'),
          (this.msg = 'Invalid Credentials; Enter valid Username and Password');
      }
    );
  }
  gotoregistration() {
    this._router.navigate(['/registration']);
  }
}
