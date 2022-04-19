import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { Researcher } from '../Researcher';
import { HomePageComponent } from '../homepage/homepage.component';
import { ResearcherService } from '../ResearcherService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  user = new User();
  researcher = new Researcher();
  msg = '';

  constructor(private _service: RegistrationService, private _router: Router) {}

  ngOnInit(): void {}

  RegisterUser() {
    let registerResponse = null;

    this._service.RegisterUserFromRemote(this.user).subscribe(
      (data) => {
        this.researcher.email = data.emailId;
        this.researcher.id = data.id;
        HomePageComponent._userId= data.id;
        this._service.AddResearcher(this.researcher).subscribe(
          (data) => {
            console.log('response received'), this._router.navigate(['']);
          },
          (error) => {
            console.log('exception occurred'), (this.msg = error.error);
          }
        );
      },
      (error) => {
        console.log('exception occurred'), (this.msg = error.error);
      }
    );
  }

  // AddResearcher(){
  //   var modal = <Researcher>{};
  //   modal.id = data.id;
  //   modal.email = data.emailId;
  //   this._http.post<any>('http://localhost:8084/Researcher/add', modal);
  // }

  // GetResearcher(){
  //   this._http.get<any>('http://localhost:8084/Researcher/find/{id}', modal);
  // }

  // GetConnections(){
  //   this._http.get<any>('http://localhost:8084/connect/{id}', modal);
  // }

  gotoLogin() {
    this._router.navigate(['']);
  }
}
