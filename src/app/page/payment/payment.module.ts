import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { ComponentModule } from '../../components/component.module';
import { PaymentComponent } from './container/payment.component';
import { CommerceModule } from '@apttus/ecommerce';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommerceModule,
    ComponentModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
