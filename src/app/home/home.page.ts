import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  user = {
    name: 'Beto'
  };

  promotions = [
    {
      text: 'Promoção A',
      routerLink: '/help'
    },
    {
      text: 'Promoção B',
      routerLink: '/about'
    }
  ];

  lastOrder = {
    id: '1',
    store: 'Mercado A',
    date: 'Dia 1 de janeiro',
    items: '50',
    price: 'R$10,00',
  }

  slideOpts = {
    loop: true
  };

  ngOnInit() {
  }

}
