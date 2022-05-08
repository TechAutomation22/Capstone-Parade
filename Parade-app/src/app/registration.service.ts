import { Researcher } from './Researcher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private _http: HttpClient) {}

  public loginUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>('http://localhost:8084/login', user);
  }

  public getUserId(emailId: any): Observable<any> {
    return this._http.get<any>(`http://localhost:8084/user/`+ emailId);
  }

  public getResearcherById(Id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8084/Researcher/find/`+ Id);
  }

  public RegisterUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>('http://localhost:8084/registeruser', user);
  }
  public AddResearcher(researcher: Researcher): Observable<any> {
    return this._http.post<any>(
      'http://localhost:8084/Researcher/add',
      researcher
    );
  }
}
