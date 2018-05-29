import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './container/order-details.component';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    CommerceModule,
    ComponentModule
  ],
  declarations: [ OrderDetailsComponent ]
})
export class OrderDetailsModule { }
