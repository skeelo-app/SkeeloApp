import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor() { }

  notifications = [
    {
      id: 1,
      name: 'Todas as Notificações',
      desc: 'Habilitar todas as notificações',
      value: true
    },
    {
      id: 2,
      name: 'Notificações Promocionais',
      desc: 'Habilitar somente as notificações de promoções',
      value: true
    }
  ];

  ngOnInit() {
  }

  toggle(id, value) {
    console.log(id + " mudou para " + value);
  }

}
