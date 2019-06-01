import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'payment-methods', loadChildren: './payment-methods/payment-methods.module#PaymentMethodsPageModule' },
  { path: 'app-preferences', loadChildren: './app-preferences/app-preferences.module#AppPreferencesPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'order-details/:id', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' },
  { path: 'add-payment-method', loadChildren: './add-payment-method/add-payment-method.module#AddPaymentMethodPageModule' },
  { path: 'edit-payment-method/:id', loadChildren: './edit-payment-method/edit-payment-method.module#EditPaymentMethodPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
