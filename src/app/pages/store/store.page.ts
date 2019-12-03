import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { SearchResultPage } from '../search-result/search-result.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  private id;

  store = {
    store_id: '',
    store_name: '',
    store_displayname: '',
  }

  categories = [
    {
      category_id: '',
      category_name: '',
      category_description: '',
      items: []
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService,
    public alertController: AlertController,
    public modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  async presentModal(store) {
    const modal = await this.modalController.create({
      component: SearchResultPage,
      componentProps: {
        'id': store
      },
      showBackdrop: true,
      cssClass: 'modal-search'
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {

    })
  }

  ngOnInit() {
  }

  search() {
    this.presentModal(this.id);
  }

  async getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.store = result;
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.getCategories();
    this.getStore();
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
  
  async getItems() {
    let length = this.categories.length;
    for(let i = 0; i < length; i++) {
      this.skeeloAPI.getAllItemsByStoreAndCategory(this.id, i).subscribe((result: any) => {
        for (let x = 0; x < 5; x++) {
          // console.log('ID:', i)
          // console.log('PRODUTOS:', result);
          this.categories[i].items = result;
          // console.log('ITEMS:', this.categories[i].items[x]);
          let value = parseFloat(result[x].item_price);
          let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
          this.categories[i].items[x].item_price = formatedPrice;
          this.categories[i].items[x].item_name = result[x].item_name.toLowerCase();
        }
        this.categories[i].items.splice(5);
      })
    }
    this.loadingController.dismiss();
    // this.formatCategories();
  }

  async getCategories() {
    this.skeeloAPI.getAllCategories().subscribe((result: any) => {
      // console.log(result);
      this.categories = result;
      this.getItems();
    })
  }

  async formatCategories() {
    let length = this.categories.length;
    for(let i = 0; i < length; i++) {
      console.log(this.categories[i]);
      if(this.categories[i].items == undefined || this.categories[i].items.length === 0) {
        console.log("CATEGORIA", i);
        if (i == 0) {
          this.categories.splice(0, 1);
        } else {
          this.categories.splice(i, i);
        }
      }
    }
  }

}
