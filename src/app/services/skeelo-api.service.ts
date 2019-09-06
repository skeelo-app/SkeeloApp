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

  // USUARIOS

  getUserByID(id) {
    return this.http.get(this.apiUrl + 'users/id/' + id);
  }

  createUser(body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.post(this.apiUrl + 'users/create', body, {headers});
  }

  getUserByEmail(email) {
    return this.http.get(this.apiUrl + 'users/email/' + email);
  }

  getUserByCpf(cpf) {
    return this.http.get(this.apiUrl + 'users/cpf/' + cpf);
  }

  getUserByPhone(phone) {
    return this.http.get(this.apiUrl + 'users/phone/' + phone);
  }

  // PEDIDOS
  getOrdersByUser(owner) {
    return this.http.get(this.apiUrl + 'orders/user/' + owner);
  }

  getOrdersByID(id) {
    return this.http.get(this.apiUrl + 'orders/id/' + id);
  }

  getOrders

  // LOJAS
  getStoreByID(id) {
    return this.http.get(this.apiUrl + 'stores/id/' + id);
  }

  // ITEMS
  getItemByID(id) {
    return this.http.get(this.apiUrl + 'items/id/' + id);
  }

}
