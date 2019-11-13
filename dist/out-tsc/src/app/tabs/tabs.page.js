import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
let TabsPage = class TabsPage {
    constructor(storage) {
        this.storage = storage;
    }
    ionViewWillEnter() {
        this.storage.get('cart').then((value) => {
            this.cartBadge = JSON.parse(value).length;
        });
    }
};
TabsPage = tslib_1.__decorate([
    Component({
        selector: 'app-tabs',
        templateUrl: 'tabs.page.html',
        styleUrls: ['tabs.page.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Storage])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map