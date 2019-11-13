import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreDetailsPage } from './store-details.page';
const routes = [
    {
        path: '',
        component: StoreDetailsPage
    }
];
let StoreDetailsPageModule = class StoreDetailsPageModule {
};
StoreDetailsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [StoreDetailsPage]
    })
], StoreDetailsPageModule);
export { StoreDetailsPageModule };
//# sourceMappingURL=store-details.module.js.map