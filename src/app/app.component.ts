import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
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
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
  }

  cart = [];
  // userSettings = [];

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#1A87FF');
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleDefault;
      this.statusBar.show();
      this.storageService.setCart(this.cart);
      let settings = this.storageService.getUserSettings();
      if (settings != null) {
        if (settings.showIntro || settings.showIntro == null) {
          this.rootPage = '/intro';
        } else {
          this.rootPage = '/tabs';
        }
      } else {
        this.rootPage = '/tabs';
      }
      this.router.navigateByUrl(this.rootPage);
      this.splashScreen.hide();
    });
  }
}
