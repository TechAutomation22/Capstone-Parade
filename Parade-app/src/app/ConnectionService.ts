import { Researcher } from './Researcher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Connection } from './Connection';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  private apiServerUrl = '';
  constructor(private http: HttpClient) {}
  public getConnections(): Observable<Connection[]> {
    return this.http.get<Connection[]>(`http://localhost:8084/connect/all`);
  }
  public createUserConnection(connection: Connection): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8084/connect',
      connection
    );
  }
  public patchConnectionStatus(id:any, status:any): Observable<any> {
    return this.http.patch<any>('http://localhost:8084/connect/' + id + '/' + status, '');
  }

  public deleteConnection(id:any): Observable<any> {
    return this.http.delete<any>('http://localhost:8084/connect/delete/' + id );
  }

}
