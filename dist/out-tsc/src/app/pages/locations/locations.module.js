import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LocationsPage } from './locations.page';
const routes = [
    {
        path: '',
        component: LocationsPage
    }
];
let LocationsPageModule = class LocationsPageModule {
};
LocationsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [LocationsPage]
    })
], LocationsPageModule);
export { LocationsPageModule };
//# sourceMappingURL=locations.module.js.map