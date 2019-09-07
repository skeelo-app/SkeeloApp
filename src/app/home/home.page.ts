import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from '../services/skeelo-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private skeeloAPI: SkeeloApiService,
    private storage: Storage,
  ) { }

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

  getID() {
    this.storage.get('id').then((value) => {
      this.getUserInfo(value);
      this.getLastOrder(value);
      this.user.user_id = value;
    });
  }

  getUserInfo(id) {
    this.skeeloAPI.getUserByID(id).subscribe(([result]: any) => {
      this.user = result;
      let name = result.user_name;
      this.user.user_name = name.split(' ')[0];
    })
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
    order_date: '',
    order_items: '',
    order_price: ''
  }

  getLastOrder(value) {
    this.skeeloAPI.getOrdersByUser(value).subscribe((result: any) => {
      this.lastOrder.order_id = result[0].order_id;
      this.lastOrder.order_storeId = result[0].order_store;
      this.lastOrder.order_date = result[0].order_date;
      this.lastOrder.order_items = result[0].order_items;
      this.lastOrder.order_price = result[0].order_price;
      this.getStore(result[0].order_store);
      this.formatCurrency();
      this.formatDates();
      if (result[0].order_id == "") {
        this.showLastOrder = false;
      } else {
        this.showLastOrder = true;
      }
    })
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
    });
  }


  slideOpts = {
    loop: true
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getID();
    if(this.lastOrder.order_id) {
      this.showLastOrder = true;
    }
  }

}
