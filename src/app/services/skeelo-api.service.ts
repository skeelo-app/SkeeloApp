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

  getUserByID(id) {
    return this.http.get(this.apiUrl + 'users/' + id);
  }

  createUser(body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.post(this.apiUrl + 'users/create', body, {headers});
  }

  getUserByEmail(email) {
    return this.http.get(this.apiUrl + 'users/login/' + email);
  }

}
