import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/matches`);
  }

  updateMatchResult(id: number, home_score: number, away_score: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/matches/${id}/result`, {
      home_score,
      away_score,
    });
  }

  getStandings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/standings`);
  }
}
