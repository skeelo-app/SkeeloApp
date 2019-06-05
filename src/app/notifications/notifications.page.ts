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
      name: 'Notificações Push',
      value: true
    },
    {
      id: 2,
      name: 'E-mail',
      value: true
    },
    {
      id: 3,
      name: 'WhatsApp',
      value: true
    },
    {
      id: 4,
      name: 'SMS',
      value: true
    }
  ];

  ngOnInit() {
  }

  toggle(id, value) {
    console.log(id + " mudou para " + value);
  }

}
