import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
let AppComponent = class AppComponent {
    constructor(platform, splashScreen, statusBar, storage, router) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.storage = storage;
        this.router = router;
        this.rootPage = 'intro';
        this.cart = [];
        this.initializeApp();
    }
    // userSettings = [];
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.storage.set('cart', JSON.stringify(this.cart));
            this.storage.get('userSettings').then((value) => {
                let settings = JSON.parse(value);
                if (settings != null) {
                    if (settings.showIntro || settings.showIntro == null) {
                        this.rootPage = '/intro';
                        this.router.navigateByUrl(this.rootPage);
                    }
                    else {
                        this.rootPage = '/tabs';
                        this.router.navigateByUrl(this.rootPage);
                    }
                }
                else {
                    this.rootPage = '/tabs';
                    this.router.navigateByUrl(this.rootPage);
                }
            });
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Platform,
        SplashScreen,
        StatusBar,
        Storage,
        Router])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map