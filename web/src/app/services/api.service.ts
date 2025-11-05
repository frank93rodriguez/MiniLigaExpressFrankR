import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/teams`);
  }

  createTeam(payload: { name: string }): Observable<any> {
    return this.http.post(`${this.base}/api/teams`, payload);
  }

  getStandings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/standings`);
  }
}
