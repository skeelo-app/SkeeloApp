import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-preferences',
  templateUrl: './app-preferences.page.html',
  styleUrls: ['./app-preferences.page.scss'],
})
export class AppPreferencesPage implements OnInit {

  constructor() { }

  menu = [
    {
      name: 'Notificações',
      icon: 'bell-solid',
      routerLink: '/notifications'
    },
    {
      name: 'Sobre',
      icon: 'question-circle-solid',
      routerLink: '/about'
    }
  ];

  ngOnInit() {
  }

}
