import { Component, OnInit, Input } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  constructor(
    private skeeloAPI: SkeeloApiService,
    private modalController: ModalController,
    public alertController: AlertController,
    private storageService: StorageService
  ) { }

  private item;
  private cart;

  @Input() id: string;
  @Input() quantity: number;
  @Input() length: number;

  ngOnInit() {
    console.log(this.id, this.quantity, this.length);
    this.skeeloAPI.getItemByID(this.id).subscribe(([value]: any) => {
      this.item = value;
      this.formatCurrency();
      this.setCartPrice();
    });
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

  removeFromCart() {
    let title = 'Deseja realmente remover do carrinho?'
    this.alertConfirm(title).then((value) => {
      if(value.data) {
        let items = this.storageService.getCart();
        let temp = this.storageService.getCart();
        console.log('initial items ', items);
        if (this.length === 0) {
          items.splice(this.length, this.length + 1);
        } else {
          items.splice(this.length, this.length);
        }
        console.log('items after splice ', items);
        let length = items.length;
        console.log('length of items', length);
        this.cart = items;
        for (let i = 0; i < length; i++) {
          console.log('counter ', i);
          this.cart[i] = {
            item_id: items[i].item_id,
            item_quantity: items[i].item_quantity,
            item_store: items[i].item_store,
            item_length: i
          }
          console.log('cart ', this.cart[i]);
        }
        this.storageService.setCart(this.cart);
        this.modalController.dismiss();
      }
    })  
  }

  setCartPrice() {
    let price = parseFloat(this.item.item_price.toString().slice(3).replace(',', '.'));
    let value = price * this.quantity;
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.item.item_cartPrice = formatedPrice;
  }

  formatCurrency() {
    let value = parseFloat(this.item.item_price);
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.item.item_price = formatedPrice;
  }

  minusCart() {
    if (this.quantity > 1 ) {
      this.quantity--;
    }
    let price = parseFloat(this.item.item_price.toString().slice(3).replace(',', '.'));
    let value = price * this.quantity;
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.item.item_cartPrice = formatedPrice;
  }

  plusCart() {
    this.quantity++;
    let price = parseFloat(this.item.item_price.toString().slice(3).replace(',', '.'));
    let value = price * this.quantity;
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.item.item_cartPrice = formatedPrice;
  }

  saveItem() {
    let cartArray = this.storageService.getCart();
    cartArray[this.length] = {
      item_id: this.item.item_id,
      item_quantity: this.quantity,
      item_store: this.item.item_store,
      item_length: this.length
    };
    this.storageService.setCart(cartArray);
    this.modalController.dismiss();
  }

}
