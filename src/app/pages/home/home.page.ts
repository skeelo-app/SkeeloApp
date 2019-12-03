import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private skeeloAPI: SkeeloApiService,
    private storageService: StorageService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  public teste;

  public user = {
    user_id: '',
    user_name: '',
		user_email: '',
		user_password: '',
		user_birthdate: '',
		user_country: '',
		user_phone: '',
		user_cpf: '',
		user_zip: ''
  }

  public showLastOrder = false;
  public lastOrderText;

  getID() {
    let id = this.storageService.getUserSettings().id;
    this.user.user_id = id;
    if (id == null) {
      this.router.navigateByUrl('/intro');  
    }
    console.log(id);
  }

  getUserInfo(id) {
    this.skeeloAPI.getUserByID(id).subscribe(([result]: any) => {
      this.user = result;
      let name = result.user_name;
      this.user.user_name = name.split(' ')[0];
    })
    this.loadingController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    console.log('SET SETTINGS');
    this.setSettings();
  }
  
  async setSettings() {
    let settings = this.storageService.getUserSettings();
    console.log(settings);
    if (settings != null) {
      this.getID();
      this.getUserInfo(this.user.user_id);
      this.getLastOrder(this.user.user_id);
    } else {
      this.router.navigateByUrl('/intro');
      this.loadingController.dismiss();
    }
    if(this.lastOrder == undefined) {
      this.showLastOrder = true;
    } else if (this.lastOrder.order_id) {
      this.showLastOrder = true;
    }
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

  promotions = [
    {
      text: 'Promoção A',
      routerLink: '/help'
    },
    {
      text: 'Promoção B',
      routerLink: '/about'
    }
  ];

  public lastOrder = {
    order_id: '',
    order_storeId: '',
    order_storeName: '',
    order_storeImage: '',
    order_date: '',
    order_items: '',
    order_price: '',
    order_progress: ''
  }

  getLastOrder(value) {
    this.skeeloAPI.getOrdersByUser(value).subscribe((result: any) => {
      if(result.length != 0) {
        this.lastOrder.order_id = result[0].order_id;
        this.lastOrder.order_storeId = result[0].order_store;
        this.lastOrder.order_date = result[0].order_date;
        this.lastOrder.order_items = result[0].order_items;
        this.lastOrder.order_price = result[0].order_price;
        this.lastOrder.order_progress = result[0].order_progress;
        this.getStore(result[0].order_store);
        this.formatCurrency();
        this.formatDates();
        this.showLastOrder = true;
        if (result[0].order_progress != 4) {
          this.lastOrderText = "Seu pedido está em andamento";
        } else {
          this.lastOrderText = "Seu último pedido";
        }
      } else {
        this.showLastOrder = false;
      }
    })
    console.log(this.showLastOrder);
  }

  formatDates() {
    let data = new Date(this.lastOrder.order_date);
    let formatedDate = data.toLocaleDateString();
    this.lastOrder.order_date = formatedDate;
  }

  formatCurrency() {
    let value = parseFloat(this.lastOrder.order_price);
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    this.lastOrder.order_price = formatedPrice;
  }

  getStore(id) {
    this.skeeloAPI.getStoreByID(id).subscribe(([result]: any) => {
      this.lastOrder.order_storeName = result.store_displayname;
      this.lastOrder.order_storeImage = result.store_imageurl;
    });
  }

  slideOpts = {
    loop: true
  };

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.presentLoading();
  }

}
