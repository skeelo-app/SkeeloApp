import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreListPage } from './store-list.page';
const routes = [
    {
        path: '',
        component: StoreListPage
    }
];
let StoreListPageModule = class StoreListPageModule {
};
StoreListPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [StoreListPage]
    })
], StoreListPageModule);
export { StoreListPageModule };
//# sourceMappingURL=store-list.module.js.map