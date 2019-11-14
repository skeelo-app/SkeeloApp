import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from './services/storageService/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  rootPage: any = 'intro';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  cart = [];
  // userSettings = [];

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.storageService.setCart(this.cart);
      let settings = this.storageService.getUserSettings();
      if (settings != null) {
        if (settings.showIntro || settings.showIntro == null) {
          this.rootPage = '/intro';
          this.router.navigateByUrl(this.rootPage);
        } else {
          // this.rootPage = '/tabs';
          // this.router.navigateByUrl(this.rootPage);
        }
      } else {
        // this.rootPage = '/tabs';
        // this.router.navigateByUrl(this.rootPage);
      }
    });
  }
}
