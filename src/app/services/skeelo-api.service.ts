import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkeeloApiService {
  private apiUrl = 'http://localhost:3003/';

  constructor(
    private http: HttpClient
  ) { }

  getUserByID() {
    return this.http.get(this.apiUrl + 'users/10');
  }
}
