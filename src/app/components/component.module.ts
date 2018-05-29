import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';
import { CommerceModule } from '@apttus/ecommerce';
import { SalesforceModule } from 'ng-salesforce';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { NavCartComponent } from './nav-cart/nav-cart.component';
import { LaddaModule } from 'angular2-ladda';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavProfileComponent } from './nav-profile/nav-profile.component';
import { NavAccountComponent } from './nav-account/nav-account.component';
import { PriceComponent } from './price/price.component';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaymentAccordionComponent } from './payment-accordion/payment-accordion.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { PapaParseModule } from 'ngx-papaparse';
import { FileDropModule} from 'ngx-file-drop';

import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    LazyLoadImageModule,
    TranslateModule.forChild(),
    LaddaModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    OwlModule,
    ReactiveFormsModule,
    PapaParseModule,
    FileDropModule,
    SalesforceModule,
    StarRatingModule.forChild()
  ],
  exports : [
    HeaderComponent,
    ProductCarouselComponent,
    ProductCardComponent,
    InputFieldComponent,
    PriceComponent,
    TranslateModule,
    NavCartComponent,
    LazyLoadImageModule,
    LaddaModule,
    HeroCarouselComponent,
    ShoppingCartComponent,
    HeaderToolbarComponent,
    BreadcrumbsComponent,
    PaymentAccordionComponent,
    AddressFormComponent,
    SalesforceModule
  ],
  declarations: [
    HeaderComponent,
    ProductCarouselComponent,
    ProductCardComponent,
    NavCartComponent,
    InputFieldComponent,
    NavProfileComponent,
    NavAccountComponent,
    PriceComponent,
    HeroCarouselComponent,
    ShoppingCartComponent,
    HeaderToolbarComponent,
    BreadcrumbsComponent,
    PaymentAccordionComponent,
    AddressFormComponent
  ]
})
export class ComponentModule { }
