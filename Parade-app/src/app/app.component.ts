import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="align-items: right;">
  <app-test></app-test>
  </div>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Parade-app';
}


