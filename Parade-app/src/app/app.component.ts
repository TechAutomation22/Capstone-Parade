import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

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


export class AppComponent implements OnInit  {
  subscription: Subscription;
  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = false;
      }
    });
  }
  name = 'Angular';
  title = 'Parade-app';
  
  ngOnInit(){
    window.addEventListener("beforeunload", function (e) {
            // Gecko, WebKit, Chrome <34
            window.location.reload();
});
}

}


