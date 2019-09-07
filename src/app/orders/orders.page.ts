import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from '../services/skeelo-api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(
    private skeeloAPI: SkeeloApiService,
    private storage: Storage,
  ) { }

  orders: any = [
    {
      order_id: '',
      order_owner: '',
      order_store: '',
      store_name: '',
      order_date: '',
      order_orderitems: '',
      order_price: '',
      order_items: ''
    }
  ]

  public showOrders = false;

  ngOnInit() {
  }

  getStores() {
    let length = Object.keys(this.orders).length;
    for(let i = 0; i < length; i++) {
      this.skeeloAPI.getStoreByID(this.orders[i].order_store).subscribe(([result]: any) => {
        this.orders[i].store_name = result.store_displayname;
      });
    }
  }

  formatDates() {
    let length = Object.keys(this.orders).length;
    for(let i = 0; i < length; i++) {
      let data = new Date(this.orders[i].order_date);
      let formatedDate = data.toLocaleDateString();
      this.orders[i].order_date = formatedDate;
    }
  }

  formatCurrency() {
    let length = Object.keys(this.orders).length;
    for(let i = 0; i < length; i++) {
      let value = parseFloat(this.orders[i].order_price);
      let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      this.orders[i].order_price = formatedPrice;
    }
  }

  getID() {
    this.storage.get('id').then((value) => {
      this.getOrders(value);
    });
  }

  getOrders(id) {
    this.skeeloAPI.getOrdersByUser(id)
      .subscribe(result => {
        this.orders = result;
        this.getStores();
        this.formatDates();
        this.formatCurrency();
        if (result[0].order_id == "") {
          this.showOrders = false;
        } else {
          this.showOrders = true;
        }
      });
  }

  ngAfterViewInit() {
    this.getID();
  }

}
