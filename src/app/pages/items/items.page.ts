import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  public items;
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
    await this.getItems();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  doRefresh(event) {
    this.presentLoading().then((value) => {
      setTimeout(() => {
        event.target.complete();
      }, 200);
    })
  }

  ionViewDidEnter() {
    this.presentLoading();
  }

  async getItems() {
    this.skeeloAPI.getAllItems().subscribe((result: any) => {
      this.items = [];
      this.completeList = result;
      let length = result.length;
      for(let i = 0; i < length; i++) {
        let value = parseFloat(result[i].item_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
        this.completeList[i].item_price = formatedPrice;
        this.completeList[i].item_name = result[i].item_name.toLowerCase();
        this.skeeloAPI.getStoreByID(result[i].item_store).subscribe(([value]: any) => {
          this.completeList[i].item_storeDetails = value;
        })
      }
      console.log(this.completeList);
    })
    this.loadingController.dismiss();
  }

  filterList(list, filter) {
    return list.filter(item => {
      this.loadingController.dismiss();
      return item.item_name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    })
  }

  async filter(){
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.items = this.filterList(this.completeList, this.search);
  }


}
