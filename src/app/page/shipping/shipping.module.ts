import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './container/shipping.component';
import { ComponentModule } from '../../components/component.module';
import { ShippingRoutingModule } from './shipping-routing.module';
import { CommerceModule } from '@apttus/ecommerce';

@NgModule({
  imports: [
    CommonModule,
    ShippingRoutingModule,
    CommerceModule,
    ComponentModule
  ],
  declarations: [ShippingComponent]
})
export class ShippingModule { }
