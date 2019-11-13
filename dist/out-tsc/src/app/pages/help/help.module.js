import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HelpPage } from './help.page';
const routes = [
    {
        path: '',
        component: HelpPage
    }
];
let HelpPageModule = class HelpPageModule {
};
HelpPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [HelpPage]
    })
], HelpPageModule);
export { HelpPageModule };
//# sourceMappingURL=help.module.js.map