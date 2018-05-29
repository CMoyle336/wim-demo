import { Component, OnInit, NgZone } from '@angular/core';
import { StorefrontService, Storefront, ProductService, Product, CategoryService, PriceListService } from '@apttus/ecommerce';
import { SObjectService } from 'ng-salesforce';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'hero-carousel',
    templateUrl: './hero-carousel.component.html'
})
export class HeroCarouselComponent implements OnInit {

    storefront$: Observable<Storefront>;

    productListA$: Observable<Array<Product>>;
    productListB$: Observable<Array<Product>>;

    private categoryList = ['Refrigeration', 'Water Filters'];

    constructor(private storefrontService: StorefrontService,
        private categoryService: CategoryService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private priceListService: PriceListService,
        private productService: ProductService) { }

    ngOnInit() {
        this.storefront$ = this.storefrontService.getStorefront();
        this.productListA$ = this.productService.queryBuilder(`ID <> NULL`, 3, null, null, null);
    }

}
