import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pages/locations/locations.module').then(m => m.LocationsPageModule)
          }
        ]
      },
      {
        path: 'locations',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pages/locations/locations.module').then(m => m.LocationsPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pages/cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'app-settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/app-settings/app-settings.module').then(m => m.AppSettingsPageModule)
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
