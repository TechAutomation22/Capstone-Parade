import { ResearcherService } from './../ResearcherService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Researcher } from '../Researcher';
import { HttpErrorResponse } from '@angular/common/http';
import { ConnectionService } from '../ConnectionService';
import { Connection } from '../Connection';


//import ActivatedRoute in constructor()

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css'],
})
export class ViewprofileComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private researcherService: ResearcherService,
    private connectionService: ConnectionService,
    private _router: Router
  ) {}
  id;
  sub;
  buttonText;
  public researcher;
  connection = new Connection();
  public connections: Connection[] = [];

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.id = params.get('id');
      this.buttonText = params.get('actionType');
      console.log('Vignesh-> ' + this.id);
      this.getUserProfile();
      this.getConnections();
    });
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

  setSaving(element, text) {
    element.textContent = text;
    element.disabled = true;
    this.connection.receiverId = this.id;
    this.connection.senderId = localStorage.getItem('_id');
    this.connection.status = 'Pending';
    this.connectionService.createUserConnection(this.connection).subscribe(
      (response: Connection) => {
        this.connection.id = response.id;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  setConnectionStatus(element, text) {
    element.textContent = text;
    element.disabled = true;
    for (var val of this.connections) {

      console.log("UserValue" + val.senderId + this.connection.receiverId + val.receiverId + localStorage.getItem('_id'))

     if (val.senderId == this.id && val.receiverId == localStorage.getItem('_id') )
     {
       console.log("Found Match")
      this.connection.id = val.id;
      console.log("Accept--->" + this.connection.id)
      this.connectionService.patchConnectionStatus(this.connection.id,"Disconnect").subscribe(
     (response: Connection[]) => {
       this.connections = response;
       console.log(response);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );

     }
    }

  }

  setDisconnect(element, text) {
    element.textContent = text;
    element.disabled = true;
    for (var val of this.connections) {

      console.log("UserValue" + val.senderId + this.connection.receiverId + val.receiverId + localStorage.getItem('_id'))

     if (val.senderId == this.id && val.receiverId == localStorage.getItem('_id') )
     {
       console.log("Found Match")
      this.connection.id = val.id;
      console.log("Accept--->" + this.connection.id)
      this.connectionService.patchConnectionStatus(this.connection.id,"Deleted").subscribe(
     (response: Connection[]) => {
       this.connections = response;
       console.log(response);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );

     }
    }

  }

  public getUserProfile(): void {
    this.researcherService.getUserProfile(this.id).subscribe(
      (response: Researcher[]) => {
        this.researcher = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
