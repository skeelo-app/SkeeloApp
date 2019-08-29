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
    let id = 10;
    console.log(this.skeeloAPI.getUserByID(id)
      .subscribe(
        ([result]: any) => {
          console.log(result.user_email);
        } 
      )
    );
  }

}
