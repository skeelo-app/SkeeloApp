import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from '../services/skeelo-api.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

}
