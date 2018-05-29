import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './container/order-list.component';
import { OrderListRoutingModule } from './order-list-routing.module';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    OrderListRoutingModule,
    CommerceModule,
    ComponentModule,
    NgbModule
  ],
  declarations: [ OrderListComponent ]
})
export class OrderListModule { }
