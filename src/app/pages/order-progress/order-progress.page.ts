import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.page.html',
  styleUrls: ['./order-progress.page.scss'],
})
export class OrderProgressPage implements OnInit {

  private order = {
    'order_id': '',
    'order_owner': '',
    'order_store': {
      'store_location': {
        'location_cnpj': '',
      }
    },
  };
  private progress;
  private progressText;

  private store_location = {};

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.order.order_id = id.toString();
      this.getOrderDetails();
    });
  }

  getOrderDetails() {
    this.skeeloAPI.getOrdersByID(this.order.order_id).subscribe((result: any) => {
      console.log(result);
      this.order.order_owner = result.order_owner;
      this.order.order_store = result.order_store;
      this.progress = parseInt(result.order_progress) / 4;
      this.setProgressText();
      this.getLocation(result.order_store.store_location);
    })
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

  getLocation(id) {
    this.skeeloAPI.getLocationByID(id).subscribe(([result]: any) => {
      this.store_location = result;
    })
  }

}
