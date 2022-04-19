import { ResearcherService } from '../ResearcherService';
import { Component, OnInit } from '@angular/core';
import { Researcher } from '../Researcher';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomePageComponent implements OnInit {
  public researchers: Researcher[] = [];

  static _userId: any;

  // public set id(value: number) {
  //   this._userId = value;
  // }

  // public get id(): number {
  //   return this._userId;
  // }

  constructor(private researcherService: ResearcherService) {}

  active = 1;

  ngOnInit() {
    this.getResearchers();
  }

  activeTab = 'search';

  search(activeTab: string) {
    this.activeTab = activeTab;
  }

  result(activeTab: string) {
    this.activeTab = activeTab;
  }

  getUserId()
  {
    return HomePageComponent._userId;
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

  public getUserProfile(): void {
    this.researcherService.getUserProfile().subscribe(
      (response: Researcher[]) => {
        this.researchers = response;
        console.log(this.researchers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchResearchers(key: string): void {
    console.log(key);
    const results: Researcher[] = [];
    for (const researcher of this.researchers) {
      if (researcher.id != this.getUserId())
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
