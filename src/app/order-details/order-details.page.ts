import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor() { }

  order = {
    id: '0001',
    store: 'Mercado A',
    items_amount: '50',
    value: 'R$10,00',
    date: '01/01/2019'
  }
  
  items = [
    {
      name: 'Item 01',
      amount: '1',
      price: 'R$0,20'
    },
    {
      name: 'Item 02',
      amount: '1',
      price: 'R$0,20'
    },
    {
      name: 'Item 03',
      amount: '1',
      price: 'R$0,20'
    },
    {
      name: 'Item 04',
      amount: '1',
      price: 'R$0,20'
    },
    {
      name: 'Item 05',
      amount: '1',
      price: 'R$0,20'
    },
  ]

  ngOnInit() {
  }

}
