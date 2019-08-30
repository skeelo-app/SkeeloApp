import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-app-preferences',
  templateUrl: './app-preferences.page.html',
  styleUrls: ['./app-preferences.page.scss'],
})
export class AppPreferencesPage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
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

  async confirmLogout() {
    const alert = await this.alertController.create({
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.storage.set('showIntro', true).then((value) => {
              console.log(value);
            });
            this.router.navigateByUrl('/intro');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

  logout() {
    this.confirmLogout();
  }

}
