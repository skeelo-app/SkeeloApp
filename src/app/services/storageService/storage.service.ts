import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserSettings(userSettings) {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }

  getUserSettings() {
    return JSON.parse(localStorage.getItem('userSettings'));
  }

  setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  setTotalCart(totalCart) {
    localStorage.setItem('totalCart', totalCart);
  }

  getTotalCart() {
    return JSON.parse(localStorage.getItem('totalCart'));
  }
}
