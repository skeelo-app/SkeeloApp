import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
const routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
    { path: 'be-partner', loadChildren: './pages/be-partner/be-partner.module#BePartnerPageModule' },
    { path: 'bug-report', loadChildren: './pages/bug-report/bug-report.module#BugReportPageModule' },
    { path: 'order-details/:id', loadChildren: './pages/order-details/order-details.module#OrderDetailsPageModule' },
    { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
    { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
    { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
    { path: 'store/:id', loadChildren: './pages/store/store.module#StorePageModule' },
    { path: 'store-details/:id', loadChildren: './pages/store-details/store-details.module#StoreDetailsPageModule' },
    { path: 'app-settings', loadChildren: './pages/app-settings/app-settings.module#AppSettingsPageModule' },
    { path: 'app-preferences', loadChildren: './pages/app-preferences/app-preferences.module#AppPreferencesPageModule' },
    { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
    { path: 'item-details/:id', loadChildren: './pages/item-details/item-details.module#ItemDetailsPageModule' },
    { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
    { path: 'locations', loadChildren: './pages/locations/locations.module#LocationsPageModule' },
    { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
    { path: 'finish-order', loadChildren: './pages/finish-order/finish-order.module#FinishOrderPageModule' },
    { path: 'change-cpf', loadChildren: './pages/change-cpf/change-cpf.module#ChangeCpfPageModule' },
    { path: 'store-list', loadChildren: './pages/store-list/store-list.module#StoreListPageModule' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map