import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChangeCpfPage } from './change-cpf.page';
import { BrMaskerModule } from 'br-mask';
const routes = [
    {
        path: '',
        component: ChangeCpfPage
    }
];
let ChangeCpfPageModule = class ChangeCpfPageModule {
};
ChangeCpfPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule,
            BrMaskerModule
        ],
        declarations: [ChangeCpfPage]
    })
], ChangeCpfPageModule);
export { ChangeCpfPageModule };
//# sourceMappingURL=change-cpf.module.js.map