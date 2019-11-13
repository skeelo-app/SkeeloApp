import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
let StorePage = class StorePage {
    constructor(route, skeeloAPI) {
        this.route = route;
        this.skeeloAPI = skeeloAPI;
        this.store = {
            store_id: '',
            store_name: '',
            store_displayname: '',
        };
    }
    ngOnInit() {
    }
    getStore() {
        this.skeeloAPI.getStoreByID(this.id).subscribe(([result]) => {
            console.log(result);
            this.store = result;
        });
    }
    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getStore();
    }
};
StorePage = tslib_1.__decorate([
    Component({
        selector: 'app-store',
        templateUrl: './store.page.html',
        styleUrls: ['./store.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        SkeeloApiService])
], StorePage);
export { StorePage };
//# sourceMappingURL=store.page.js.map