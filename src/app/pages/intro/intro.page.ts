import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public skeeloAPI: SkeeloApiService,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#1A87FF');
  }

  ngOnInit() {
  }

}
