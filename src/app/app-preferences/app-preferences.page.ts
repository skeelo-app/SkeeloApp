import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-preferences',
  templateUrl: './app-preferences.page.html',
  styleUrls: ['./app-preferences.page.scss'],
})
export class AppPreferencesPage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

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

  logout() {
    this.storage.set('showIntro', true).then((value) => {
      console.log(value);
    });
    this.router.navigateByUrl('/intro');
  }

}
