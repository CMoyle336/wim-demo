import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { BulkOrderRoutingModule } from './bulk-order-routing.module';
import {BulkOrderComponent} from './container/bulk-order.component';
import { FileDropModule} from 'ngx-file-drop';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    ComponentModule,
    BulkOrderRoutingModule,
    FileDropModule
  ],
  declarations: [BulkOrderComponent]
})
export class BulkOrderModule { }
