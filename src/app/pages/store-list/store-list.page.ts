import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.page.html',
  styleUrls: ['./store-list.page.scss'],
})
export class StoreListPage implements OnInit {

  public stores;

  constructor(
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.skeeloAPI.getAllStores().subscribe((value) => {
      this.stores = value;
    })
    // console.log("TCL: StoreListPage -> ionViewWillEnter -> this.stores", this.stores)
  }

}
