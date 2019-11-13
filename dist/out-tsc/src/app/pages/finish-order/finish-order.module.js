import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FinishOrderPage } from './finish-order.page';
const routes = [
    {
        path: '',
        component: FinishOrderPage
    }
];
let FinishOrderPageModule = class FinishOrderPageModule {
};
FinishOrderPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [FinishOrderPage]
    })
], FinishOrderPageModule);
export { FinishOrderPageModule };
//# sourceMappingURL=finish-order.module.js.map