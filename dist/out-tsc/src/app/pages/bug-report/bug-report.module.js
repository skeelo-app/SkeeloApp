import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BugReportPage } from './bug-report.page';
const routes = [
    {
        path: '',
        component: BugReportPage
    }
];
let BugReportPageModule = class BugReportPageModule {
};
BugReportPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule
        ],
        declarations: [BugReportPage]
    })
], BugReportPageModule);
export { BugReportPageModule };
//# sourceMappingURL=bug-report.module.js.map