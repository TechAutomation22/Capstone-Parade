import { Researcher } from './Researcher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResearcherService {
  private apiServerUrl = '';
  constructor(private http: HttpClient) {}
  public getResearchers(): Observable<Researcher[]> {
    return this.http.get<Researcher[]>(`http://localhost:8084/Researcher/all`);
  }
  public getUserProfile(): Observable<Researcher[]> {
    return this.http.get<Researcher[]>(`http://localhost:8084/Researcher/find/{id}`);
  }
}
