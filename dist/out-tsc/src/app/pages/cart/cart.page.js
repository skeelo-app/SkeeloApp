import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
let CartPage = class CartPage {
    constructor(storage, skeeloAPI, alertController, router) {
        this.storage = storage;
        this.skeeloAPI = skeeloAPI;
        this.alertController = alertController;
        this.router = router;
        this.emptyCart = true;
    }
    ngOnInit() {
    }
    getItemDetails() {
        let length = this.items.length;
        if (length > 0) {
            this.emptyCart = false;
        }
        else {
            this.emptyCart = true;
        }
        for (let i = 0; i < length; i++) {
            this.skeeloAPI.getItemByID(this.items[i].item_id).subscribe(([result]) => {
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
    }
    alertConfirm(title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let choice;
            const alert = yield this.alertController.create({
                message: title,
                buttons: [
                    {
                        text: 'Não',
                        handler: () => {
                            alert.dismiss(false);
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
            yield alert.present();
            yield alert.onDidDismiss().then((data) => {
                choice = data;
                // console.log(data);
            });
            return choice;
        });
    }
    removeFromCart(id, price, quantity) {
        let title = 'Deseja realmente remover do carrinho?';
        this.alertConfirm(title).then((value) => {
            if (value.data) {
                let length = this.items.length;
                for (let i = 0; i < length; i++) {
                    if (this.items[i].item_id == id) {
                        let newPrice = parseFloat(price) * quantity;
                        this.items.totalCart -= newPrice;
                        let total = (this.items.totalCart).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        this.items.totalCartFormat = total;
                        this.items.splice(i, 1);
                        i--;
                        this.storage.set('cart', JSON.stringify(this.items));
                        this.items.totalCart = 0;
                        this.getItemDetails();
                    }
                }
            }
        });
    }
    clearCart() {
        let title = 'Deseja realmente limpar seu carrinho?';
        this.alertConfirm(title).then((value) => {
            if (value.data) {
                this.items = [];
                let cart = [];
                this.storage.set('cart', JSON.stringify(cart));
                this.getItemDetails();
                this.router.navigateByUrl('/tabs/home');
            }
        });
    }
    finish() {
        console.log(this.items);
        this.storage.set('totalCart', this.items.totalCart);
        this.router.navigateByUrl('/finish-order');
    }
    ionViewWillEnter() {
        this.storage.get('cart').then((value) => {
            this.items = JSON.parse(value);
            this.items.totalCart = 0;
            this.getItemDetails();
            // console.log(this.items);
        });
    }
};
CartPage = tslib_1.__decorate([
    Component({
        selector: 'app-cart',
        templateUrl: './cart.page.html',
        styleUrls: ['./cart.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Storage,
        SkeeloApiService,
        AlertController,
        Router])
], CartPage);
export { CartPage };
//# sourceMappingURL=cart.page.js.map