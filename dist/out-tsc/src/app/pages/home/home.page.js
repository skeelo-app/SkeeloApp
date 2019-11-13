import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { UserApiService } from 'src/app/services/userApi/user-api.service';
let HomePage = class HomePage {
    constructor(skeeloAPI, storage, userAPI) {
        this.skeeloAPI = skeeloAPI;
        this.storage = storage;
        this.userAPI = userAPI;
        this.user = {
            user_id: '',
            user_name: '',
            user_email: '',
            user_password: '',
            user_birthdate: '',
            user_country: '',
            user_phone: '',
            user_cpf: '',
            user_zip: ''
        };
        this.showLastOrder = false;
        this.promotions = [
            {
                text: 'Promoção A',
                routerLink: '/help'
            },
            {
                text: 'Promoção B',
                routerLink: '/about'
            }
        ];
        this.lastOrder = {
            order_id: '',
            order_storeId: '',
            order_storeName: '',
            order_date: '',
            order_items: '',
            order_price: ''
        };
        this.slideOpts = {
            loop: true
        };
    }
    getID() {
        this.storage.get('userSettings').then((value) => {
            let id = JSON.parse(value).id;
            this.getUserInfo(id);
            this.getLastOrder(id);
            this.user.user_id = id;
        });
    }
    getUserInfo(id) {
        this.skeeloAPI.getUserByID(id).subscribe(([result]) => {
            this.user = result;
            let name = result.user_name;
            this.user.user_name = name.split(' ')[0];
        });
    }
    getLastOrder(value) {
        this.skeeloAPI.getOrdersByUser(value).subscribe((result) => {
            this.lastOrder.order_id = result[0].order_id;
            this.lastOrder.order_storeId = result[0].order_store;
            this.lastOrder.order_date = result[0].order_date;
            this.lastOrder.order_items = result[0].order_items;
            this.lastOrder.order_price = result[0].order_price;
            this.getStore(result[0].order_store);
            this.formatCurrency();
            this.formatDates();
            if (result[0].order_id == "") {
                this.showLastOrder = false;
            }
            else {
                this.showLastOrder = true;
            }
        });
    }
    formatDates() {
        let data = new Date(this.lastOrder.order_date);
        let formatedDate = data.toLocaleDateString();
        this.lastOrder.order_date = formatedDate;
    }
    formatCurrency() {
        let value = parseFloat(this.lastOrder.order_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        this.lastOrder.order_price = formatedPrice;
    }
    getStore(id) {
        this.skeeloAPI.getStoreByID(id).subscribe(([result]) => {
            this.lastOrder.order_storeName = result.store_displayname;
        });
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.getID();
        if (this.lastOrder.order_id || this.lastOrder == undefined) {
            this.showLastOrder = true;
        }
        this.userAPI.getUserSettings().then((value) => {
            console.log(JSON.parse(value));
        });
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.page.html',
        styleUrls: ['./home.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService,
        Storage,
        UserApiService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map