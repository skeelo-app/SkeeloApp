import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
const routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/locations/locations.module').then(m => m.LocationsPageModule)
                    }
                ]
            },
            {
                path: 'locations',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/locations/locations.module').then(m => m.LocationsPageModule)
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'cart',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/cart/cart.module').then(m => m.CartPageModule)
                    }
                ]
            },
            {
                path: 'app-settings',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/app-settings/app-settings.module').then(m => m.AppSettingsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TabsPageRoutingModule);
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map