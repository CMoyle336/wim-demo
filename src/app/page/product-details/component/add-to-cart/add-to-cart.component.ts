import { Component, OnChanges, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ProductAttribute, Product, CartService, PriceMatrix, ProductAttributeValue, Storefront, StorefrontService } from '@apttus/ecommerce';
import { PriceForm } from '../../../../models/price-form.interface';

@Component({
    selector: 'pdp-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnChanges, OnDestroy, OnInit {
    @Input() productAttributes: Array<ProductAttribute>;
    @Input() product: Product;
    @Input() priceMatrices: Array<PriceMatrix>;
    loading: boolean = false;
    priceForm: PriceForm;
    frequency: string;
    sub: any;
    storefront: Storefront;

    constructor(private cartService: CartService,
        private cd: ChangeDetectorRef,
        private storefrontService: StorefrontService,
        private ngZone: NgZone) { }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;

        }));

    }

    ngOnChanges() {
        this.priceForm = {
            quantity : 1 ,
            priceMatrices : this.priceMatrices,
            attributeValueList : [new ProductAttributeValue()]
        };
    }

    addToCart() {
        this.loading = true;
        this.sub = this.cartService.addProductToCart(this.product, Number(this.priceForm.quantity), false, this.priceForm.attributeValueList, true, 60000)
        .take(1)
        .subscribe(
            res => {this.loading = false; },
            err => {this.loading = false; }
            );
    }

    formChange() {
        this.priceForm = Object.assign({}, this.priceForm);
    }

    ngOnDestroy() {
        if (this.sub)
            this.sub.unsubscribe();
    }

}
