import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ChangeCpfPage } from '../change-cpf/change-cpf.page';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage implements OnInit {

  private items: any;
  private order = {
    totalCart: 0,
    totalCartFormat: '',
    deliveryTax: '',
    totalOrder: '',
    store: ''
  };
  private teste;
  private showMore;
  private option: Boolean;
  private cpf;
  private data = {
    'order_id': '',
    'order_owner': '',
    'order_store': '',
    'order_date': '',
    'order_price': '',
    'order_items': '',
  };
  private store = {
    'store_id': null,
    'store_name': '',
    'store_deliverytax': 0,
    'store_location': '',
    'store_address': '',
    'store_number': '',
    'store_neighbourhood': '',
    'store_city': '',
    'store_province': ''
  }

  constructor(
    private storageService: StorageService,
    private skeeloAPI: SkeeloApiService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
  ) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChangeCpfPage,
      componentProps: {
        'option': this.option,
        'cpf': this.cpf,
      },
      showBackdrop: true,
      cssClass: 'modal-cpf'
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {
      this.cpf = data.data.cpf;
      this.option = data.data.option;
    })
  }

  getItemDetails() {
    let length = this.items.length;
    if (length > 5) {
      this.items.length = 5;
      length = 5;
      this.showMore = true;
    }
    for(let i = 0; i < length; i++) {
      this.skeeloAPI.getItemByID(this.items[i].item_id).subscribe(([result]: any) => {
        this.items[i].item_name = result.item_name;
        this.items[i].item_unityPrice = result.item_price;
        this.items[i].item_store = result.item_store;
        this.items[i].item_totalPrice = parseFloat(result.item_price) * this.items[i].item_quantity;
        let formatedPrice = (this.items[i].item_totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        this.items[i].item_totalPrice = formatedPrice;
      });
    }
  }

  getStoreDetails() {
    console.log(this.store.store_id);
    this.skeeloAPI.getStoreByID(this.store.store_id).subscribe(([result]: any) => {
      // console.log(result);
      this.store.store_name = result.store_displayname;
      this.store.store_deliverytax = parseFloat(result.store_deliverytax);
      this.store.store_location = result.store_location;
      this.setOrderDetails();
      this.getLocation();
    })
  }

  setOrderDetails() {
    this.order.totalCartFormat = (this.order.totalCart).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // console.log(this.order.totalCartFormat);
    // console.log(this.order.totalCart);
    let deliveryTax = this.store.store_deliverytax;
    // console.log(this.store);
    this.order.deliveryTax = (deliveryTax).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let total = this.order.totalCart + deliveryTax;
    this.order.totalOrder = (total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  getLocation() {
    this.skeeloAPI.getLocationByID(this.store.store_location).subscribe(([result]: any) => {
      // console.log(result);
      this.store.store_address = result.location_address;
      this.store.store_number = result.location_number;
      this.store.store_neighbourhood = result.location_neighbourhood;
      this.store.store_city = result.location_city;
      this.store.store_province = result.location_province;
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.option = false;
    this.cpf = null;
    this.items = this.storageService.getCart();
    this.store.store_id = this.items[0].item_store;
    this.getStoreDetails()
    this.getItemDetails();
    this.order.totalCart = this.storageService.getTotalCart();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      message: 'Seu pedido foi realizado com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/order-progress/' + this.data.order_id);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      message: 'Houve um problema em realizar seu pedido! Tente novamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  finish() {
    // SET ORDER_DATE
    let date = new Date();
    this.data.order_date = date.toISOString().split('T', 1).toString().replace(/\//g, '-') + ' ' + date.toLocaleTimeString();

    // SET ORDER_PRICE
    let price = this.order.totalOrder.slice(3).replace(',', '.');
    this.data.order_price = price;

    // SET ORDER_STORE
    this.data.order_store = this.items[0].item_store;

    // SET ORDER_OWNER
    this.data.order_owner = this.storageService.getUserSettings().id;

    // SET ORDER_ITEMS
    let orderitems = this.storageService.getCart();
    let order_items = 0;
    for (let i = 0; i < orderitems.length; i++) {
      order_items += orderitems[i].item_quantity;  
    }
    this.data.order_items = order_items.toString();
    

    //SET ORDER_ID
    let dateString = date.toISOString().split('T', 1).toString().replace('-', '').replace('-', '');
    let timeString = date.toTimeString().split(' ', 1).toString().replace(':', '').replace(':', '');
    this.data.order_id = dateString + timeString + this.data.order_owner.toString();

    // CREATE ORDER
    this.skeeloAPI.createOrder(this.data).subscribe(result => {
      if (result == 201) {
        this.createOrderItems();
        let cart = [];
        this.storageService.setCart(cart);
        this.storageService.setTotalCart(null);
      } else {
        this.alertError();
      }
    })
    
  }

  createOrderItems() {
    let items = this.storageService.getCart();
    for (let i = 0; i < items.length; i++) {
      let body = {
        'orderitems_order': this.data.order_id,
        'orderitems_item': items[i].item_id,
        'orderitems_quantity': items[i].item_quantity
      }
      this.skeeloAPI.createOrderItem(body).subscribe(result => {
        console.log(result);
      });
    }
    this.alertSuccess();
  }

}
