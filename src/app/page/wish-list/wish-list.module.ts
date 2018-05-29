import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { WishListRoutingModule } from './wish-list-routing.module';
import {WishListComponent} from './container/wish-list.component';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    ComponentModule,
    WishListRoutingModule
  ],
  declarations: [WishListComponent]
})
export class WishListModule { }
