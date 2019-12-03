import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { EditItemPage } from '../edit-item/edit-item.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private items;
  private emptyCart = true;
  private confirm;

  constructor(
    private storageService: StorageService,
    private skeeloAPI: SkeeloApiService,
    public alertController: AlertController,
    public modalController: ModalController,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
    });
    await loading.present();
    this.showCart();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  async getItemDetails(): Promise<boolean> {
    try {
      let length = this.items.length;
      if (length > 0) {
        this.emptyCart = false;
      } else {
        this.emptyCart = true;
      }
      this.items.totalCart = 0;
      for(let i = 0; i < length; i++) {
        await this.skeeloAPI.getItemByID(this.items[i].item_id).subscribe(([result]: any) => {
          this.items[i].item_name = result.item_name;
          this.items[i].item_unityPrice = result.item_price;
          this.items[i].item_totalPrice = parseFloat(result.item_price) * this.items[i].item_quantity;
          this.items.totalCart += this.items[i].item_totalPrice;
          let formatedPrice = (this.items[i].item_totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          this.items[i].item_totalPrice = formatedPrice;
          let total = (this.items.totalCart).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          this.items.totalCartFormat = total;
        });
      }
      return true
    } catch (err) {
      return false;
    }
  }

  async presentModal(id, quantity, length) {
    const modal = await this.modalController.create({
      component: EditItemPage,
      componentProps: {
        'id': id,
        'quantity': quantity,
        'length': length
      },
      showBackdrop: true,
      cssClass: 'modal-cart'
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {
      this.showCart();
    })
  }

  async alertConfirm(title) {
    let choice;
    const alert = await this.alertController.create({
      message: title,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            alert.dismiss(false)
            return false;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data
        // console.log(data);
    })
    return choice
  }

  clearCart() {
    let title = 'Deseja realmente limpar seu carrinho?';
    this.alertConfirm(title).then((value) => {
      if (value.data) {
        this.items = [];
        let cart = [];
        this.storageService.setCart(cart);
        this.getItemDetails();
        this.router.navigateByUrl('/tabs/home');
      }
    })
  }

  finish() {
    // console.log(this.items);
    this.storageService.setTotalCart(this.items.totalCart);
    this.router.navigateByUrl('/finish-order');
  }

  showCart() {
    this.items = this.storageService.getCart();
    this.items.totalCart = 0;
    this.getItemDetails().then((value) => {
      this.loadingController.dismiss()
      if (value == true) {
        
      } else {

      }
    })
    console.log(this.items);
  }

  doRefresh(event) {
    this.presentLoading().then((value) => {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 200);
    })
  }

  ionViewWillEnter() {
    this.presentLoading();
  }

}
