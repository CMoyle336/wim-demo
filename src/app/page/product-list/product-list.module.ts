import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentModule } from '../../components/component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './container/product-list.component';
import { SubcategoryComponent } from './component/subcategory.component';
import { BreadcrumbComponent } from './component/breadcrumb.component';
import { PriceTierComponent } from './component/price-tier.component';
import { ProductAvailabilityFilterComponent } from './component/availability.component';
import {CommerceModule} from '@apttus/ecommerce';
import { RelatedCategoryComponent } from './component/related-category.component';
import { FieldFilterComponent } from './component/field-filter.component';
import { ResultsComponent } from './component/results.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule,
    NgbModule,
    CommerceModule,
    Ng2PageScrollModule
  ],
  declarations: [ProductListComponent, SubcategoryComponent, BreadcrumbComponent, PriceTierComponent,
                ProductAvailabilityFilterComponent, RelatedCategoryComponent, FieldFilterComponent, ResultsComponent]
})
export class ProductListModule { }
