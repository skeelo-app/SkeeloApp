import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService,
    private loadingController: LoadingController
  ) { }

  private id;
  private store;
  items = [
    {
      item_amount: '',
      item_barcode: '',
      item_category: '',
      item_description: '',
      item_discount: '',
      item_discountminus: '',
      item_discountpercent: '',
      item_discounttype: '',
      item_id: '',
      item_imageurl: '',
      item_name: '',
      item_price: '',
      item_store: ''
    }
  ];
  category = {
    category_name: '',
    category_description: ''
  };

  storeInfo = {
    store_imageurl: ''
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.getItems();
    this.getCategoryDetails();
    this.getStoreDetails();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  doRefresh(event) {
    this.presentLoading().then((value) => {
      setTimeout(() => {
        event.target.complete();
      }, 200);
    });
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.store = +params['store'];
    });
    this.presentLoading();
  }

  async getItems() {
    this.skeeloAPI.getAllItemsByStoreAndCategory(this.store, this.id).subscribe((result: any) => {
      this.items = result;
      let length = result.length;
      for(let i = 0; i < length; i++) {
        let value = parseFloat(result[i].item_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
        this.items[i].item_price = formatedPrice;
        this.items[i].item_name = result[i].item_name.toLowerCase();
      }
    })
    this.dismissLoading();
  }

  async getCategoryDetails() {
    this.skeeloAPI.getCategoryByID(this.id).subscribe(([result]: any) => {
      this.category = result;
    })
  }

  async getStoreDetails() {
    this.skeeloAPI.getStoreByID(this.store).subscribe(([result]: any) => {
      this.storeInfo = result;
    })
  }

}