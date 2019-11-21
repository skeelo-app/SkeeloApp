import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.page.html',
  styleUrls: ['./store-list.page.scss'],
})
export class StoreListPage implements OnInit {

  public stores;
  public completeList;
  public search: string = '';

  constructor(
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.skeeloAPI.getAllStores().subscribe((value) => {
      this.stores = value;
      this.completeList = value;
    })
  }

  filterList(list, filter) {
    return list.filter(item => {
      return item.store_displayname.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    })
  }

  filter(){
    this.stores = this.filterList(this.completeList, this.search)
  }

}
