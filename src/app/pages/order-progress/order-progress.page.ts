import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.page.html',
  styleUrls: ['./order-progress.page.scss'],
})
export class OrderProgressPage implements OnInit {

  private order = {
    "order_id": '',
    "order_owner": '',
    "order_store": '',
    "store_displayname": '',
    "store_location": '',
    "order_date": '',
    "order_price": '',
    "order_items": '',
    "order_progress": '',
    "order_orderitems": [
      {
        "orderitems_item": '',
        "orderitems_quantity": ''
      },
      {
        "orderitems_item": '',
        "orderitems_quantity": ''
      }
    ]
  }
  private progress;
  private progressText;
  private store;

  private store_location = {};

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
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

  ionViewWillEnter() {
    this.presentLoading();
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.order.order_id = id.toString();
    });
  }

  doRefresh(event) {
    this.presentLoading();
    this.getOrderDetails().then((value) => {
      setTimeout(() => {
        event.target.complete();
      }, 200);
    })
  }

  async getOrderDetails(): Promise<boolean> {
    try {
      this.skeeloAPI.getOrdersByID(this.order.order_id).subscribe((result: any) => {
        console.log(result);
        this.order = result;
        this.store = result.order_store;
        this.progress = parseInt(result.order_progress) / 4;
        this.setProgressText();
        this.getLocation();
      })
      return true;
    } catch(err) {
      return false;
    }
  }

  async getStoreDetails(): Promise<boolean> {
    console.log(this.order);
    console.log(this.store);
    try {
      this.skeeloAPI.getStoreByID(this.order.order_store).subscribe((result: any) => {
        console.log(result);
      })
      return true;
    } catch {
      return false;
    }
  }

  setProgressText() {
    if(this.progress == 0.25) {
      this.progressText = 'Seu pedido foi aceito pelo estabelecimento.';
    } else if(this.progress == 0.5) {
      this.progressText = 'Seu pedido está sendo preparado.';
    } else if(this.progress == 0.75) {
      this.progressText = 'Seu pedido está pronto para ser retirado.';
    } else if(this.progress == 1) {
      this.progressText = 'Pedido retirado.';
    }
  }

  async getLocation(): Promise<boolean> {
    try {
      this.skeeloAPI.getLocationByID(this.store.store_location).subscribe(([result]: any) => {
        this.store_location = result;
      })
      this.dismissLoading();
      return true;
    } catch(err) {
      this.dismissLoading();
      console.log(err);
      return false;
    }
  }

}
