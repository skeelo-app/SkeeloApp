import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  notifications = [
    {
      id: 1,
      name: 'Notificações Push',
      value: Boolean
    },
    {
      id: 2,
      name: 'E-mail',
      value: Boolean
    },
    {
      id: 3,
      name: 'WhatsApp',
      value: Boolean
    },
    {
      id: 4,
      name: 'SMS',
      value: Boolean
    }
  ];

  ngOnInit() {
    this.getNotifications();
  }

  toggle(id, value) {
    let userSettings = this.storageService.getUserSettings();
    this.storageService.setUserSettings(userSettings);
    let notifications = userSettings.notifications;
    if (id == 1) {
      notifications.push = value;
      userSettings.notifications = notifications;
      this.storageService.setUserSettings(userSettings);
    } else if (id == 2) {
      notifications.email = value;
      userSettings.notifications = notifications;
      this.storageService.setUserSettings(userSettings);
    } else if (id == 3) {
      notifications.whatsApp = value;
      userSettings.notifications = notifications;
      this.storageService.setUserSettings(userSettings);
    } else if (id == 4) {
      notifications.SMS = value;
      userSettings.notifications = notifications;
      this.storageService.setUserSettings(userSettings);
    }
  }

  getNotifications() {
    let userSettings = this.storageService.getUserSettings();
    let notifications = userSettings.notifications;
    this.notifications[0].value = notifications.push;
    this.notifications[1].value = notifications.email;
    this.notifications[2].value = notifications.whatsApp;
    this.notifications[3].value = notifications.SMS;
  }

}
