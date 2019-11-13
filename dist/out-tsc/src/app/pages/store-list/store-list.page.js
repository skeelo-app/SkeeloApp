import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
let StoreListPage = class StoreListPage {
    constructor(skeeloAPI) {
        this.skeeloAPI = skeeloAPI;
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.skeeloAPI.getAllStores().subscribe((value) => {
            this.stores = value;
        });
        console.log("TCL: StoreListPage -> ionViewWillEnter -> this.stores", this.stores);
    }
};
StoreListPage = tslib_1.__decorate([
    Component({
        selector: 'app-store-list',
        templateUrl: './store-list.page.html',
        styleUrls: ['./store-list.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService])
], StoreListPage);
export { StoreListPage };
//# sourceMappingURL=store-list.page.js.map