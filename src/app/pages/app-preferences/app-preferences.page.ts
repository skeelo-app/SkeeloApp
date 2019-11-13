import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-app-preferences',
  templateUrl: './app-preferences.page.html',
  styleUrls: ['./app-preferences.page.scss'],
})
export class AppPreferencesPage implements OnInit {
  
  constructor(
    private storageService: StorageService,
    private router: Router,
    public alertController: AlertController
    ) { }
    
  public darkMode: boolean;
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
            let userSettings = {
              'showIntro': false,
              'id': null,
              'darkMode': false,
              'notifications': {
                'push': true,
                'email': true,
                'whatsApp': true,
                'SMS': true
              }
            }
            this.storageService.setUserSettings(userSettings);
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

  getDarkMode() {
    let userSettings = this.storageService.getUserSettings();
    this.darkMode = userSettings.darkMode;
  }

  toggle(value) {
    if (value) {
      this.darkMode = true;
      let userSettings = this.storageService.getUserSettings();
      userSettings.darkMode = this.darkMode;
      this.storageService.setUserSettings(userSettings)
      // console.log(userSettings);
    } else {
      this.darkMode = false;
      let userSettings = this.storageService.getUserSettings();
      userSettings.darkMode = this.darkMode;
      this.storageService.setUserSettings(userSettings)
      // console.log(userSettings);
    }
  }

  ngAfterViewInit() {
    this.getDarkMode();
  }

}
