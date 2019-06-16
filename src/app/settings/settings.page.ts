import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  menu = [
    {
      name: 'Pedidos',
      icon: 'utensils-solid',
      routerLink: '/orders'
    },
    {
      name: 'Métodos de Pagamento',
      icon: 'money-check-alt-solid',
      routerLink: '/payment-methods'
    },
    {
      name: 'Preferências do App',
      icon: 'cog-solid',
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
