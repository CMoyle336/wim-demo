import { Component, OnInit, NgZone , AfterViewInit } from '@angular/core';
import { StorefrontService, Storefront, ProductService, Product, CategoryService, PriceListService } from '@apttus/ecommerce';
import { SObjectService } from 'ng-salesforce';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit {
    storefront: Storefront;

    productListA: Array<Product>;
    productListB: Array<Product>;
    topCategoryProducts: string;

    private categoryList = ['Refrigeration', 'Water Filters'];

    constructor(private storefrontService: StorefrontService,
        private categoryService: CategoryService,
        private ngZone: NgZone,
        public sanitizer: DomSanitizer,
        private priceListService: PriceListService,
        private productService: ProductService) { }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.onStorefront(res));
    }

    ngAfterViewInit() {
       this.loadScript();
      }

    onStorefront(storefront) {
        this.ngZone.run(() => this.storefront = storefront);
        this.productService
        .queryBuilder(`ID <> NULL`, 3, null, null, null)
        .subscribe(res => this.ngZone.run(() => this.productListA = res));
    }

    public loadScript() {
        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isFound = true;
            }
        }

        if (!isFound) {
            const dynamicScripts = ['https://swc.cdn.skype.com/sdk/v1/sdk.min.js'];

            for (let i = 0; i < dynamicScripts .length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

        }
    }

}
