import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { CompareProductsRoutingModule } from './compare-products-routing.module';
import { CompareProductsComponent } from './container/compare-products.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    ComponentModule,
    CompareProductsRoutingModule
  ],
  declarations: [CompareProductsComponent]
})
export class CompareProductsModule { }
