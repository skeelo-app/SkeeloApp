import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ActivatedRoute } from '@angular/router';
let OrderDetailsPage = class OrderDetailsPage {
    constructor(skeeloAPI, route) {
        this.skeeloAPI = skeeloAPI;
        this.route = route;
        this.order = {
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
        };
    }
    ngOnInit() {
    }
    formatDates() {
        let data = new Date(this.order.order_date);
        let formatedDate = data.toLocaleDateString();
        this.order.order_date = formatedDate;
    }
    formatCurrency() {
        let value = parseFloat(this.order.order_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
        this.order.order_price = formatedPrice;
    }
    getItemDetails() {
        let length = Object.keys(this.order.order_orderitems).length;
        for (let i = 0; i < length; i++) {
            this.skeeloAPI.getItemByID(this.order.order_orderitems[i].orderitems_item).subscribe(([result]) => {
                let unitPrice = parseFloat(result.item_price);
                this.order.order_orderitems[i].orderitems_itemname = result.item_name;
                let finalPrice = parseFloat(this.order.order_orderitems[i].orderitems_quantity) * unitPrice;
                this.order.order_orderitems[i].orderitems_finalprice = (finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
            });
        }
    }
    getOrderDetails() {
        this.skeeloAPI.getOrdersByID(this.id).subscribe((result) => {
            this.order = result;
            this.formatCurrency();
            this.formatDates();
            this.getItemDetails();
        });
    }
    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getOrderDetails();
    }
};
OrderDetailsPage = tslib_1.__decorate([
    Component({
        selector: 'app-order-details',
        templateUrl: './order-details.page.html',
        styleUrls: ['./order-details.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService,
        ActivatedRoute])
], OrderDetailsPage);
export { OrderDetailsPage };
//# sourceMappingURL=order-details.page.js.map