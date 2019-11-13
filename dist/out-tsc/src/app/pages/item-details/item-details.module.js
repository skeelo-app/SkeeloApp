import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemDetailsPage } from './item-details.page';
const routes = [
    {
        path: '',
        component: ItemDetailsPage
    }
];
let ItemDetailsPageModule = class ItemDetailsPageModule {
};
ItemDetailsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ItemDetailsPage]
    })
], ItemDetailsPageModule);
export { ItemDetailsPageModule };
//# sourceMappingURL=item-details.module.js.map