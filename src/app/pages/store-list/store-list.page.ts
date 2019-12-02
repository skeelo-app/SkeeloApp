import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { LoadingController } from '@ionic/angular';

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
    private skeeloAPI: SkeeloApiService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.getStores();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  doRefresh(event) {
    this.presentLoading();
    this.getStores().then((value) => {
      setTimeout(() => {
        event.target.complete();
      }, 200);
    })
  }

  ionViewDidEnter() {
    this.presentLoading();
  }

  async getStores() {
    this.skeeloAPI.getAllStores().subscribe((value) => {
      this.stores = value;
      this.completeList = value;
    })
    this.loadingController.dismiss();
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
