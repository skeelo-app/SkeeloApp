import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AboutPage = class AboutPage {
    constructor() {
        this.menu = [
            {
                name: 'Termos de Uso',
                routerLink: '/'
            },
            {
                name: 'Políticas de Privacidade',
                routerLink: '/'
            }
        ];
    }
    ngOnInit() {
    }
};
AboutPage = tslib_1.__decorate([
    Component({
        selector: 'app-about',
        templateUrl: './about.page.html',
        styleUrls: ['./about.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.page.js.map