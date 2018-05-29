import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceModule } from '@apttus/ecommerce';
import { LaddaModule } from 'angular2-ladda';
import { CartComponent } from './container/cart.component';
import { ComponentModule } from '../../components/component.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommerceModule,
    LaddaModule,
    ComponentModule,
    CartRoutingModule,
  ],
  exports : [
    LaddaModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
