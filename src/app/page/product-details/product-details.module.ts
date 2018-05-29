import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../components/component.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './container/product-details.component';
import { ProductImagesComponent } from './component/product-images.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { CommerceModule } from '@apttus/ecommerce';
import { SalesforceModule } from 'ng-salesforce';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from './component/breadcrumb.component';
import { TabFeaturesComponent } from './component/tab-features.component';
import { AddToCartComponent } from './component/add-to-cart/add-to-cart.component';
import { ProductReviewService } from '../../models/product-rating.model';
import { TabReviewsComponent } from './component/tab-reviews.component';
import { FormsModule } from '@angular/forms';
import { RulesComponent } from './component/rules/rules.component';
import { AttributeGroupsComponent } from './component/attribute-groups/attrubute-groups.component';

import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    NgxGalleryModule,
    ComponentModule,
    CommerceModule,
    LazyLoadImageModule,
    NgbModule,
    FormsModule,
    SalesforceModule,
    StarRatingModule
  ],
  providers : [
    ProductReviewService
  ],
  declarations: [
    ProductDetailsComponent,
    ProductImagesComponent,
    BreadcrumbComponent,
    TabFeaturesComponent,
    AddToCartComponent,
    TabReviewsComponent,
    RulesComponent,
    AttributeGroupsComponent
  ]
})
export class ProductDetailsModule { }
