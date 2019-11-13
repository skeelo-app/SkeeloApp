import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppSettingsPage } from './app-settings.page';
const routes = [
    {
        path: '',
        component: AppSettingsPage
    }
];
let AppSettingsPageModule = class AppSettingsPageModule {
};
AppSettingsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [AppSettingsPage]
    })
], AppSettingsPageModule);
export { AppSettingsPageModule };
//# sourceMappingURL=app-settings.module.js.map