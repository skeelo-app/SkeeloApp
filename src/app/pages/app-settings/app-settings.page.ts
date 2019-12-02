import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {

  constructor() {}

  menu = [
    {
      name: 'Pedidos',
      icon: 'utensils-solid',
      routerLink: '/orders'
    },
    // {
    //   name: 'Métodos de Pagamento',
    //   icon: 'money-check-alt-solid',
    //   routerLink: '/payment-methods'
    // },
    {
      name: 'Preferências do App',
      icon: 'sliders-h-solid',
      routerLink: '/app-preferences'
    },
    {
      name: 'Central de Ajuda',
      icon: 'medkit-solid',
      routerLink: '/help'
    },
    {
      name: 'Seja um Parceiro',
      icon: 'store-solid',
      routerLink: '/be-partner'
    },
    {
      name: 'Reportar Bug',
      icon: 'bug-solid',
      routerLink: '/bug-report'
    }
  ];

  ngOnInit() {
  }

}
