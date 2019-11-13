import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
let NotificationsPage = class NotificationsPage {
    constructor(storage) {
        this.storage = storage;
        this.notifications = [
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
    }
    ngOnInit() {
        this.getNotifications();
    }
    toggle(id, value) {
        this.storage.get('userSettings').then((settings) => {
            let userSettings = JSON.parse(settings);
            let notifications = userSettings.notifications;
            if (id == 1) {
                notifications.push = value;
                userSettings.notifications = notifications;
                this.storage.set('userSettings', JSON.stringify(userSettings));
            }
            else if (id == 2) {
                notifications.email = value;
                userSettings.notifications = notifications;
                this.storage.set('userSettings', JSON.stringify(userSettings));
            }
            else if (id == 3) {
                notifications.whatsApp = value;
                userSettings.notifications = notifications;
                this.storage.set('userSettings', JSON.stringify(userSettings));
            }
            else if (id == 4) {
                notifications.SMS = value;
                userSettings.notifications = notifications;
                this.storage.set('userSettings', JSON.stringify(userSettings));
            }
        });
    }
    getNotifications() {
        this.storage.get('userSettings').then((value) => {
            let notifications = JSON.parse(value).notifications;
            this.notifications[0].value = notifications.push;
            this.notifications[1].value = notifications.email;
            this.notifications[2].value = notifications.whatsApp;
            this.notifications[3].value = notifications.SMS;
        });
    }
};
NotificationsPage = tslib_1.__decorate([
    Component({
        selector: 'app-notifications',
        templateUrl: './notifications.page.html',
        styleUrls: ['./notifications.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Storage])
], NotificationsPage);
export { NotificationsPage };
//# sourceMappingURL=notifications.page.js.map