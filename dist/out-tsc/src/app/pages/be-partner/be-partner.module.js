import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BePartnerPage } from './be-partner.page';
const routes = [
    {
        path: '',
        component: BePartnerPage
    }
];
let BePartnerPageModule = class BePartnerPageModule {
};
BePartnerPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [BePartnerPage]
    })
], BePartnerPageModule);
export { BePartnerPageModule };
//# sourceMappingURL=be-partner.module.js.map