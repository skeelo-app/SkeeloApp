import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppSettingsPage = class AppSettingsPage {
    constructor() {
        this.menu = [
            {
                name: 'Pedidos',
                icon: 'utensils-solid',
                routerLink: '/orders'
            },
            {
                name: 'Métodos de Pagamento',
                icon: 'money-check-alt-solid',
                routerLink: '/payment-methods'
            },
            {
                name: 'Preferências do App',
                icon: 'sliders-h-solid',
                routerLink: '/app-preferences'
            },
            {
                name: 'Central de Ajuda',
                icon: 'medkit-solid',
                routerLink: '/help'
            },
            {
                name: 'Seja um Parceiro',
                icon: 'store-solid',
                routerLink: '/be-partner'
            },
            {
                name: 'Reportar Bug',
                icon: 'bug-solid',
                routerLink: '/bug-report'
            }
        ];
    }
    ngOnInit() {
    }
};
AppSettingsPage = tslib_1.__decorate([
    Component({
        selector: 'app-app-settings',
        templateUrl: './app-settings.page.html',
        styleUrls: ['./app-settings.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AppSettingsPage);
export { AppSettingsPage };
//# sourceMappingURL=app-settings.page.js.map