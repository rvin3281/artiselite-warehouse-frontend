import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './shared/home/home-layout/home-layout.component';
import { ViewProductComponent } from './modules/ProductFeature/view-product/view-product.component';
import { AddProductComponent } from './modules/ProductFeature/add-product/add-product.component';
import { ViewInventoryComponent } from './modules/InventoryFeature/view-inventory/view-inventory.component';
import { AddInventoryComponent } from './modules/InventoryFeature/add-inventory/add-inventory.component';
import { AddInboundComponent } from './modules/InboundFeature/add-inbound/add-inbound.component';
import { AddOutboundComponent } from './modules/OutboundFeature/add-outbound/add-outbound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'view-product',
        component: ViewProductComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'view-inventory',
        component: ViewInventoryComponent,
      },
      {
        path: 'add-inventory',
        component: AddInventoryComponent,
      },
      {
        path: 'add-inbound',
        component: AddInboundComponent,
      },
      {
        path: 'add-outbound',
        component: AddOutboundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
