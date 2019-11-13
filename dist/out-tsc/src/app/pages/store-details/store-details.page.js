import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
let StoreDetailsPage = class StoreDetailsPage {
    constructor(route, skeeloAPI) {
        this.route = route;
        this.skeeloAPI = skeeloAPI;
        this.store = {
            store_id: '',
            store_name: '',
            store_displayname: '',
            store_cnpj: '',
            store_phone: '',
            store_owner: '',
            store_location: '',
            store_rate: '',
            store_numrates: '',
            store_locationInfo: {}
        };
    }
    ngOnInit() {
    }
    getStore() {
        this.skeeloAPI.getStoreByID(this.id).subscribe(([result]) => {
            console.log(result);
            this.store = result;
            let phone = result.store_phone;
            let phoneMask = '(' + phone.slice(0, 2) + ') ' + phone.slice(2, 6) + '-' + phone.slice(6, 10);
            this.store.store_phone = phoneMask;
            this.store.store_rate = '4.2';
            this.store.store_numrates = '10';
            this.skeeloAPI.getLocationByID(this.store.store_location).subscribe(([locResult]) => {
                this.store.store_locationInfo = locResult;
            });
        });
    }
    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getStore();
    }
};
StoreDetailsPage = tslib_1.__decorate([
    Component({
        selector: 'app-store-details',
        templateUrl: './store-details.page.html',
        styleUrls: ['./store-details.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        SkeeloApiService])
], StoreDetailsPage);
export { StoreDetailsPage };
//# sourceMappingURL=store-details.page.js.map