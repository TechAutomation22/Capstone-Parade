import { ResearcherService } from '../ResearcherService';
import { Component, OnInit } from '@angular/core';
import { Researcher } from '../Researcher';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationComponent } from '../registration/registration.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
  public researchers: Researcher[] = [];

  static _userId: any;

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

    if (index >= 0)
    {

/*the tag of a particular index is removed from the tag list.*/

      this.Tags.splice(index, 1);
    }
  }

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
