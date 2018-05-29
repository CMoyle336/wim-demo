import { Component, OnInit, NgZone } from '@angular/core';
import { CartService, Cart, CartItem, Storefront, StorefrontService } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { PSCartService } from '../../services/pscart.service';
import { FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
    cart: Cart;
    itemCount: number;
    couponForm: FormGroup;
    couponCode;
    pageTitle = 'Cart';
    storefront: Storefront;

    constructor(private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private psCartService: PSCartService,
        private storefrontService: StorefrontService
        ) { }

    ngOnInit() {

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));

        this.couponForm = new FormGroup({
            'couponCode': new FormControl(null)
        });

        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
        }));
    }

    removeCartItem(item: CartItem) {
        item['_deleting'] = true;
        this.cartService.removeCartItem(item, true)
        .subscribe(
            () => item['_deleting'] = false,
            () => item['_deleting'] = false
            );
    }

    onSubmit() {
        this.couponCode = this.couponForm.value.couponCode;
                console.log(this.couponCode);
        this.psCartService.applyPromotion(this.couponCode)
            .subscribe(res => this.ngZone.run(() => {
                console.log(res);
        }));
    }
}
