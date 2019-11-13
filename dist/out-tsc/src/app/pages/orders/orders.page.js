import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
let OrdersPage = class OrdersPage {
    constructor(skeeloAPI, storage) {
        this.skeeloAPI = skeeloAPI;
        this.storage = storage;
        this.orders = [
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
        ];
        this.showOrders = false;
    }
    ngOnInit() {
    }
    getStores() {
        let length = Object.keys(this.orders).length;
        for (let i = 0; i < length; i++) {
            this.skeeloAPI.getStoreByID(this.orders[i].order_store).subscribe(([result]) => {
                this.orders[i].store_name = result.store_displayname;
            });
        }
    }
    formatDates() {
        let length = Object.keys(this.orders).length;
        for (let i = 0; i < length; i++) {
            let data = new Date(this.orders[i].order_date);
            let formatedDate = data.toLocaleDateString();
            this.orders[i].order_date = formatedDate;
        }
    }
    formatCurrency() {
        let length = Object.keys(this.orders).length;
        for (let i = 0; i < length; i++) {
            let value = parseFloat(this.orders[i].order_price);
            let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            this.orders[i].order_price = formatedPrice;
        }
    }
    getID() {
        this.storage.get('userSettings').then((value) => {
            let id = JSON.parse(value).id;
            this.getOrders(id);
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
            }
            else {
                this.showOrders = true;
            }
        });
    }
    ngAfterViewInit() {
        this.getID();
    }
};
OrdersPage = tslib_1.__decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.page.html',
        styleUrls: ['./orders.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService,
        Storage])
], OrdersPage);
export { OrdersPage };
//# sourceMappingURL=orders.page.js.map