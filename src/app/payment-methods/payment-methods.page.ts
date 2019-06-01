import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {

  constructor() { }

  methods = [
    {
      id: '1',
      icon: 'cc-visa-brands',
      name: 'Cartão A',
      last_numbers: '1164'
    },
    {
      id: '2',
      icon: 'cc-mastercard-brands',
      name: 'Cartão B',
      last_numbers: '0114'
    },
    {
      id: '3',
      icon: 'credit-card-solid',
      name: 'Cartão C',
      last_numbers: '0164'
    }
  ]

  ngOnInit() {
  }

}
