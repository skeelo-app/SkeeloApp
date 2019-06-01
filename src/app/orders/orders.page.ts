import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor() { }

  orders = [
    {
      id: '2',
      store: 'Mercado A',
      items: '5',
      price: 'R$5,00',
      date: '01/01',
    },
    {
      id: '1',
      store: 'Mercado A',
      items: '50',
      price: 'R$10,00',
      date: '01/01',
    }
  ]

  ngOnInit() {
  }

}
