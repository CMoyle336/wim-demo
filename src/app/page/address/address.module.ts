import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './container/address.component';
import { AddressRoutingModule } from './address-routing.module';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    AddressRoutingModule,
    CommerceModule,
    FormsModule
  ],
  declarations: [AddressComponent]
})
export class AddressModule { }
