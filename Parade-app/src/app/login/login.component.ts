import { HomePageComponent } from './../homepage/homepage.component';
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

  constructor(
    private _service: RegistrationService,
    private _router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  public getUserId(emailId: String): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8084/user/{emailId}`);
  }

  LoginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data) => {
         HomePageComponent.currentUserEmail = this.user.emailId;
         console.log("UserEmail: " + this.user.emailId)
         this._service.getUserId(this.user.emailId)
         .subscribe(
           (data) => {
          this._service.getResearcherById(data).subscribe(
            (data) => {
              console.log("Vignesh Chandranbalan");
              HomePageComponent.currentUserEmail = data.email;
              HomePageComponent.currentUserAboutMe = data.about;
              HomePageComponent.currentUserExpertise = data.expertise;
              HomePageComponent.currentUserPhoneNumber = data.phone;
              HomePageComponent.currentUserName = data.name;
              HomePageComponent.currentUserEmail = data.email;
            },
            (error) => {
              console.log('exception occurred');
            }
          );
          console.log('response received');
        },
        (error) => {
          console.log('exception occurred');
        });

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
