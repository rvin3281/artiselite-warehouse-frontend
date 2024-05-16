import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './modules/ProductFeature/view-product/view-product.component';
import { SidebarLayoutComponent } from './shared/sidebar/sidebar-layout/sidebar-layout.component';
import { NavbarLayoutComponent } from './shared/navbar/navbar-layout/navbar-layout.component';
import { SidebarlinkLayoutComponent } from './shared/sidebar/sidebarlink-layout/sidebarlink-layout.component';
import { MainLayoutComponent } from './shared/main/main-layout/main-layout.component';
import { HomeLayoutComponent } from './shared/home/home-layout/home-layout.component';
import { FooterLayoutComponent } from './shared/footer/footer-layout/footer-layout.component';
import { MainDashboardLayoutComponent } from './shared/dashboard/main-dashboard-layout/main-dashboard-layout.component';
import { AddProductComponent } from './modules/ProductFeature/add-product/add-product.component';
import { ViewInventoryComponent } from './modules/InventoryFeature/view-inventory/view-inventory.component';
import { AddInventoryComponent } from './modules/InventoryFeature/add-inventory/add-inventory.component';
import { AddOutboundComponent } from './modules/OutboundFeature/add-outbound/add-outbound.component';
import { AddInboundComponent } from './modules/InboundFeature/add-inbound/add-inbound.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    SidebarLayoutComponent,
    NavbarLayoutComponent,
    SidebarlinkLayoutComponent,
    MainLayoutComponent,
    HomeLayoutComponent,
    FooterLayoutComponent,
    MainDashboardLayoutComponent,
    AddProductComponent,
    ViewInventoryComponent,
    AddInventoryComponent,
    AddOutboundComponent,
    AddInboundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
