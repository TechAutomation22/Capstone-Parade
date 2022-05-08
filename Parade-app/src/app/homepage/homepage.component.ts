import { ResearcherService } from '../ResearcherService';
import {Connection} from '../Connection';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Researcher } from '../Researcher';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LoginComponent } from '../login/login.component';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../ConnectionService';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomePageComponent implements OnInit {

  public researchers: Researcher[] = [];
  public connections: Connection[] = [];

  static _userId = 1;
  static currentUserEmail : string;
  msg = '';
  someSubscription: any;

  static myProfile = true;
  static currentUserName: string;
  static currentUserPhoneNumber: string;
  static currentUserEmailID: any;
  static currentUserExpertise: string;
  static currentUserAboutMe: string;
  static currentUserID: any;
  researcher = new Researcher();
  currentResearcher = new Researcher();
  connection = new Connection();





  HomePageComponent() {}

  constructor(
    private researcherService: ResearcherService,
    private registrationService: RegistrationService,
    private connectionService: ConnectionService,
    private _router: Router
  ) { }

  get currentUserEmail() {
    return HomePageComponent.currentUserEmail;
  }

  set currentUserEmail(email) {
    this.currentUserEmail = email;
  }


  get currentUserID() {
    return HomePageComponent.currentUserID;
  }

  set currentUserID(Id) {
    this.currentUserID = Id;
  }

  get currentUserName() {
    return HomePageComponent.currentUserName;
  }

  set currentUserName(userName) {
    this.currentUserName = userName;
  }

  get currentUserPhoneNumber() {
    return HomePageComponent.currentUserPhoneNumber;
  }

  set currentUserPhoneNumber(phoneNumber) {
    this.currentUserName = phoneNumber;
  }

  get currentUserAboutMe() {
    return HomePageComponent.currentUserAboutMe;
  }

  set currentUserAboutMe(aboutMe) {
    this.currentUserAboutMe = aboutMe;
  }

  get currentUserExpertise() {
    return HomePageComponent.currentUserExpertise;
  }

  set currentUserExpertise(expertise) {
    this.currentUserExpertise = expertise;
  }

  get myProfile() {
    return HomePageComponent.myProfile;
  }

  set myProfile(profileState) {
    this.myProfile = profileState;
  }

  p: number = 1;
  count: number = 5;
  pager: any = {};

  /*Set the values of these properties
    to use them in the HTML view.*/

  visible = true;
  selectable = true;
  removable = true;

  /*set the separator keys.*/

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /*create the tags list.*/

  Tags: string[] = [];

  /*our custom add method which will take
      matChipInputTokenEnd event as input.*/
  add(event: MatChipInputEvent): void {
    /*we will store the input and value in local variables.*/

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      /*the input string will be pushed to the tag list.*/

      this.Tags.push(value);
    }

    if (input) {
      /*after storing the input we will clear the input field.*/

      input.value = '';
    }
  }

  /*custom method to remove a tag.*/

  remove(tag: string): void {
    const index = this.Tags.indexOf(tag);

    if (index >= 0) {
      /*the tag of a particular index is removed from the tag list.*/

      this.Tags.splice(index, 1);
    }
  }

  active = 1;



  ngOnInit() {
    this.getResearchers();
    this.getConnections();
    console.log('Refresh--->' + localStorage.getItem('_userEmail'))
        this.getUserProfile();
        HomePageComponent.currentUserID = localStorage.getItem('_id');
        console.log('CurrentID--->' + HomePageComponent.currentUserID)
    }

  activeTab = 'search';

  search(activeTab: string) {
    this.activeTab = activeTab;
  }

  result(activeTab: string) {
    this.activeTab = activeTab;
  }

  public getResearchers(): void {
    this.researcherService.getResearchers().subscribe(
      (response: Researcher[]) => {
        this.researchers = response;
        console.log(this.researchers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   //userEmail = JSON.parse(localStorage.getItem('_userEmail')!);;

  public getUserProfile(): void {
    this.registrationService.getUserId(localStorage.getItem('_userEmail'))
         .subscribe(
           (data) => {
            this.registrationService.getResearcherById(data).subscribe(
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
  }

  public Edit(): void {
    console.log('inside this function');
    HomePageComponent.myProfile = false;
  }

  public getConnections(): void {
    this.connectionService.getConnections().subscribe(
      (response: Connection[]) => {
        this.connections = response;
        console.log(this.connections);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public Save(): void {
    console.log('inside save');
    console.log(HomePageComponent.currentUserEmail);
    this.registrationService
      .getUserId(HomePageComponent.currentUserEmail)
      .subscribe(
        (data) => {
          this.researcher.id = data;
          this.researcher.email = this.currentUserEmail
          this.researcherService.updateResearcher(this.researcher).subscribe(
            (data) => {
              console.log('response received');
              (this.msg = "Your information has been saved");
              HomePageComponent.myProfile=true;
            },
            (error) => {
              console.log('exception occurred');
              (this.msg = "Invalid Phone number");
            }
          );
          console.log('response received');
        },
        (error) => {
          console.log('exception occurred');
        }
      );



    HomePageComponent.myProfile = false;
  }

  public searchResearchers(key: string): void {
    console.log(key);

    const results: Researcher[] = [];
    for (const researcher of this.researchers) {
      if (
        researcher.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.expertise.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(researcher);
      }
    }
    this.researchers = results;
    if (results.length === 0 || !key) {
      this.getResearchers();
    }
  }

  gotoregistration() {
    this._router.navigate(['/viewprofile']);
  }



  public onOpenModal(reseacher: Researcher, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'Send Request') {
      // this.editEmployee = employee;
      // button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'Ignore') {
      // this.deleteEmployee = employee;
      // button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // container.appendChild(button);
    button.click();
  }
}
function paginate(
  length: number,
  page: number,
  pageSize: number,
  maxPages: number
): any {
  throw new Error('Function not implemented.');
}
