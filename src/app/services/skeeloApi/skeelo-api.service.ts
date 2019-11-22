import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkeeloApiService {
  private apiUrl = 'http://bicudo.sytes.net:3003/';
  // private apiUrl = 'localhost:3003/';

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

  editUser(id, body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.put(this.apiUrl + 'users/update/' + id, body, {headers});
  }

  // PEDIDOS
  getOrdersByUser(owner) {
    return this.http.get(this.apiUrl + 'orders/user/' + owner);
  }

  getOrdersByID(id) {
    return this.http.get(this.apiUrl + 'orders/id/' + id);
  }

  createOrder(body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.post(this.apiUrl + 'orders/create', body, {headers});
  }

  updateOrder(id, body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.put(this.apiUrl + 'orders/update/' + id, body, {headers});
  }

  // LOJAS
  getStoreByID(id) {
    return this.http.get(this.apiUrl + 'stores/id/' + id);
  }

  getAllStores() {
    return this.http.get(this.apiUrl + 'stores').pipe((value) => {
      return value;
    })
  }

  // ITEMS
  getItemByID(id) {
    return this.http.get(this.apiUrl + 'items/id/' + id);
  }

  // LOCALIZAÇÃO
  getLocationByID(id) {
    return this.http.get(this.apiUrl + 'locations/id/' + id);
  }

  // ORDER ITEMS
  createOrderItem(body) {
    let headers: {
      'Content-Type': 'application/json'
    };
    return this.http.post(this.apiUrl + 'orderitems/create', body, {headers});
  }

}
