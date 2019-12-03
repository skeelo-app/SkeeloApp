import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setUserSettings(userSettings): Promise<boolean> {
    try {
      localStorage.setItem('userSettings', JSON.stringify(userSettings));
      return true;
    } catch(err) {
      return false;
    }
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
