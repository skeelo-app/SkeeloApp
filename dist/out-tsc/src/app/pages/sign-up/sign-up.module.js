import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { SignUpPage } from './sign-up.page';
const routes = [
    {
        path: '',
        component: SignUpPage
    }
];
let SignUpPageModule = class SignUpPageModule {
};
SignUpPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule,
            BrMaskerModule
        ],
        declarations: [SignUpPage]
    })
], SignUpPageModule);
export { SignUpPageModule };
//# sourceMappingURL=sign-up.module.js.map