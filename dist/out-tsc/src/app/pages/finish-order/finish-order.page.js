import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { ModalController, AlertController } from '@ionic/angular';
import { ChangeCpfPage } from '../change-cpf/change-cpf.page';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/userApi/user-api.service';
let FinishOrderPage = class FinishOrderPage {
    constructor(storage, skeeloAPI, modalController, alertController, router, userAPI) {
        this.storage = storage;
        this.skeeloAPI = skeeloAPI;
        this.modalController = modalController;
        this.alertController = alertController;
        this.router = router;
        this.userAPI = userAPI;
        this.order = {
            totalCart: 0,
            totalCartFormat: '',
            deliveryTax: '',
            totalOrder: ''
        };
        this.data = {
            'order_id': '',
            'order_owner': '',
            'order_store': '',
            'order_date': '',
            'order_price': '',
            'order_items': '',
        };
        this.location = {
            location_address: 'Rua João Batista Raphael',
            location_number: '642'
        };
        this.store = {
            store_name: 'Amigao Supermercado - Marilia'
        };
    }
    presentModal() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: ChangeCpfPage,
                componentProps: {
                    'option': this.option,
                    'cpf': this.cpf,
                },
                showBackdrop: true,
                cssClass: 'modal-cpf'
            });
            yield modal.present();
            yield modal.onDidDismiss().then((data) => {
                this.cpf = data.data.cpf;
                this.option = data.data.option;
            });
        });
    }
    getItemDetails() {
        let length = this.items.length;
        if (length > 5) {
            this.items.length = 5;
            length = 5;
            this.showMore = true;
        }
        for (let i = 0; i < length; i++) {
            this.skeeloAPI.getItemByID(this.items[i].item_id).subscribe(([result]) => {
                this.items[i].item_name = result.item_name;
                this.items[i].item_unityPrice = result.item_price;
                this.items[i].item_store = result.item_store;
                this.items[i].item_totalPrice = parseFloat(result.item_price) * this.items[i].item_quantity;
                let formatedPrice = (this.items[i].item_totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                this.items[i].item_totalPrice = formatedPrice;
            });
        }
        this.setOrderDetails();
    }
    setOrderDetails() {
        this.order.totalCartFormat = (this.order.totalCart).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        console.log(this.order.totalCartFormat);
        console.log(this.order.totalCart);
        this.order.deliveryTax = 'R$ 4,00';
        let total = this.order.totalCart + 4;
        this.order.totalOrder = (total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.option = false;
        this.cpf = null;
        this.storage.get('cart').then((value) => {
            this.items = JSON.parse(value);
            console.log(this.items);
            this.getItemDetails();
        });
        this.storage.get('totalCart').then((value) => {
            this.order.totalCart = value;
            this.setOrderDetails();
        });
        // SET ORDER_ITEMS
        this.storage.get('cart').then((value) => {
            let items = JSON.parse(value);
            let order_items = 0;
            for (let i = 0; i < items.length; i++) {
                order_items += items[i].item_quantity;
            }
            this.data.order_items = order_items.toString();
        });
        this.userAPI.getUserSettings().then((value) => {
            let id = JSON.parse(value).id;
            this.data.order_owner = id;
        });
    }
    alertSuccess() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Seu pedido foi realizado com sucesso!',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.router.navigateByUrl('/tabs');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    alertError() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Houve um problema em realizar seu pedido! Tente novamente.',
                buttons: ['OK']
            });
            yield alert.present();
        });
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
        //SET ORDER_ID
        let dateString = date.toISOString().split('T', 1).toString().replace('-', '').replace('-', '');
        let timeString = date.toTimeString().split(' ', 1).toString().replace(':', '').replace(':', '');
        this.data.order_id = dateString + timeString + this.data.order_owner.toString();
        // CREATE ORDER
        // console.log(this.data);
        this.storage.get('cart').then((value) => {
            let items = JSON.parse(value);
            // console.log(items);
            for (let i = 0; i < items.length; i++) {
                // console.log(items[i]);
                let body = {
                    'orderitems_order': this.data.order_id,
                    'orderitems_item': items[i].item_id,
                    'orderitems_quantity': items[i].item_quantity
                };
                // console.log("TCL: FinishOrderPage -> finish -> body", body)
                this.skeeloAPI.createOrderItem(body).subscribe(result => {
                    // console.log(result);
                });
            }
        });
        this.skeeloAPI.createOrder(this.data).subscribe(result => {
            if (result == 201) {
                let cart = [];
                this.storage.set('cart', JSON.stringify(cart));
                this.alertSuccess();
            }
            else {
                this.alertError();
            }
        });
    }
};
FinishOrderPage = tslib_1.__decorate([
    Component({
        selector: 'app-finish-order',
        templateUrl: './finish-order.page.html',
        styleUrls: ['./finish-order.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Storage,
        SkeeloApiService,
        ModalController,
        AlertController,
        Router,
        UserApiService])
], FinishOrderPage);
export { FinishOrderPage };
//# sourceMappingURL=finish-order.page.js.map