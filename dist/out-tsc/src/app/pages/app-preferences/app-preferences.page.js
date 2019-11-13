import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
let AppPreferencesPage = class AppPreferencesPage {
    constructor(storage, router, alertController) {
        this.storage = storage;
        this.router = router;
        this.alertController = alertController;
        this.menu = [
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
    }
    confirmLogout() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Deseja realmente sair?',
                buttons: [
                    {
                        text: 'Não'
                    },
                    {
                        text: 'Sim',
                        handler: () => {
                            let userSettings = {
                                'showIntro': true,
                                'id': null,
                                'darkMode': false,
                                'notifications': {
                                    'push': true,
                                    'email': true,
                                    'whatsApp': true,
                                    'SMS': true
                                }
                            };
                            this.storage.set('userSettings', JSON.stringify(userSettings));
                            this.router.navigateByUrl('/intro');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    ngOnInit() {
    }
    logout() {
        this.confirmLogout();
    }
    getDarkMode() {
        this.storage.get('userSettings').then((value) => {
            let userSettings = JSON.parse(value);
            this.darkMode = userSettings.darkMode;
        });
    }
    toggle(value) {
        if (value) {
            this.darkMode = true;
            this.storage.get('userSettings').then((value) => {
                let userSettings = JSON.parse(value);
                userSettings.darkMode = this.darkMode;
                this.storage.set('userSettings', JSON.stringify(userSettings));
                console.log(userSettings);
            });
        }
        else {
            this.darkMode = false;
            this.storage.get('userSettings').then((value) => {
                let userSettings = JSON.parse(value);
                userSettings.darkMode = this.darkMode;
                this.storage.set('userSettings', JSON.stringify(userSettings));
                console.log(userSettings);
            });
        }
    }
    ngAfterViewInit() {
        this.getDarkMode();
    }
};
AppPreferencesPage = tslib_1.__decorate([
    Component({
        selector: 'app-app-preferences',
        templateUrl: './app-preferences.page.html',
        styleUrls: ['./app-preferences.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Storage,
        Router,
        AlertController])
], AppPreferencesPage);
export { AppPreferencesPage };
//# sourceMappingURL=app-preferences.page.js.map