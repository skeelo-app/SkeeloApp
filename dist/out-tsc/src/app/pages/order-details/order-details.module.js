import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrderDetailsPage } from './order-details.page';
const routes = [
    {
        path: '',
        component: OrderDetailsPage
    }
];
let OrderDetailsPageModule = class OrderDetailsPageModule {
};
OrderDetailsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [OrderDetailsPage]
    })
], OrderDetailsPageModule);
export { OrderDetailsPageModule };
//# sourceMappingURL=order-details.module.js.map