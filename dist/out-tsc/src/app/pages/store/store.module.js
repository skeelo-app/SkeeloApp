import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorePage } from './store.page';
const routes = [
    {
        path: '',
        component: StorePage
    }
];
let StorePageModule = class StorePageModule {
};
StorePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [StorePage]
    })
], StorePageModule);
export { StorePageModule };
//# sourceMappingURL=store.module.js.map