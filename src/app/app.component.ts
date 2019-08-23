import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any = 'intro';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.set('showIntro', true);
      this.storage.get('showIntro').then((value) => {
        if (value) {
          this.rootPage = '/intro';
          // console.log(this.rootPage);
          this.router.navigateByUrl(this.rootPage);
        } else {
          this.rootPage = '/tabs';
          // console.log(this.rootPage);
          this.router.navigateByUrl(this.rootPage);
        }
      });
    });
  }
}
