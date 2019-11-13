import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrdersPage } from './orders.page';
const routes = [
    {
        path: '',
        component: OrdersPage
    }
];
let OrdersPageModule = class OrdersPageModule {
};
OrdersPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [OrdersPage]
    })
], OrdersPageModule);
export { OrdersPageModule };
//# sourceMappingURL=orders.module.js.map