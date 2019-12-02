import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController, ModalController } from '@ionic/angular';
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
    public modalController: ModalController
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
      console.log(result);
      this.store = result;
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getCategories();
    this.getStore();
  }
  
  async getItems() {
    let length = this.categories.length;
    for(let i = 0; i < length; i++) {
      this.skeeloAPI.getAllItemsByStoreAndCategory(this.id, i).subscribe((result: any) => {
        console.log('ID:', i)
        console.log('PRODUTOS:', result);
        this.categories[i].items = result;
        for (let x = 0; x < result.length; x++) {
          let value = parseFloat(result[x].item_price);
          let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
          this.categories[i].items[x].item_price = formatedPrice;
          this.categories[i].items[x].item_name = result[x].item_name.toLowerCase();
        }
      })
    }
  }

  async getCategories() {
    this.skeeloAPI.getAllCategories().subscribe((result: any) => {
      console.log(result);
      this.categories = result;
      this.getItems();
    })
  }

}
