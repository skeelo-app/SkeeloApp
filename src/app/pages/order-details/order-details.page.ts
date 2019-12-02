import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  private id;
  
  constructor(
    private skeeloAPI: SkeeloApiService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
  ) {
  }

  private order: any = {
    order_id: '',
    order_date: '',
    order_items: '',
    order_owner: '',
    order_price: '',
    order_orderitems: [
      {
        orderitems_item: '',
        orderitems_itemname: '',
        orderitems_quantity: '',
        orderitems_finalprice: ''
      }
    ],
    order_store: {
      store_cnpj: '',
      store_id: '',
      store_location: '',
      store_name: '',
      store_displayname: '',
      store_owner: '',
      store_phone: ''
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.getOrderDetails();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  ngOnInit() {
  }

  formatDates() {
    let data = new Date(this.order.order_date);
    let formatedDate = data.toLocaleDateString();
    this.order.order_date = formatedDate;
  }

  doRefresh(event) {
    this.presentLoading();
    this.getOrderDetails().then((value) => {
      setTimeout(() => {
        event.target.complete();
      }, 200);
    })
  }

  formatCurrency() {
    let value = parseFloat(this.order.order_price);
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.order.order_price = formatedPrice;
  }

  async getItemDetails(): Promise<boolean> {
    try {
      let length = Object.keys(this.order.order_orderitems).length;
      for(let i = 0; i < length; i++) {
        await this.skeeloAPI.getItemByID(this.order.order_orderitems[i].orderitems_item).subscribe(([result]: any) => {
          let unitPrice = parseFloat(result.item_price);
          this.order.order_orderitems[i].orderitems_itemname = result.item_name;
          let finalPrice = parseFloat(this.order.order_orderitems[i].orderitems_quantity) * unitPrice;
          this.order.order_orderitems[i].orderitems_finalprice = (finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
        })
      }
      return true;
    } catch(err) {
      return false;
    }
  }

  async getOrderDetails(): Promise<boolean> {
    try {
      await this.skeeloAPI.getOrdersByID(this.id).subscribe((result: any) => {
        this.order = result;
        this.formatCurrency();
        this.formatDates();
        this.getItemDetails();
      })
      this.dismissLoading();
      return true;
    } catch(err) {
      this.dismissLoading();
      return false
    }
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
