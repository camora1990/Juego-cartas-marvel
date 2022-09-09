import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private BASE_URL: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createGame(body: any): Observable<object> {
    return this.http.post(`${this.BASE_URL}/juego/crear/`, { ...body });
  }
}
