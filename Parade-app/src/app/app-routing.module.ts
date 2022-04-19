import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: '', component: RegistrationComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  exports: [RouterModule],

})
export class AppRoutingModule {}
