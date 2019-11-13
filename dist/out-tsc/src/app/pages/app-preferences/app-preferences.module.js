import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppPreferencesPage } from './app-preferences.page';
const routes = [
    {
        path: '',
        component: AppPreferencesPage
    }
];
let AppPreferencesPageModule = class AppPreferencesPageModule {
};
AppPreferencesPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [AppPreferencesPage]
    })
], AppPreferencesPageModule);
export { AppPreferencesPageModule };
//# sourceMappingURL=app-preferences.module.js.map