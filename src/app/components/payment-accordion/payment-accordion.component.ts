import { Component, OnInit, NgZone } from '@angular/core';
import { CartService, Cart, Contact, ContactService, StorefrontService, Storefront } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';


@Component({
    selector: 'payment-accordion',
    templateUrl: './payment-accordion.component.html'
})
export class PaymentAccordionComponent implements OnInit {
    cart: Cart;
    itemCount: number;
    pageTitle = 'Checkout - Payment';
    contact: Contact;
    storefront: Storefront;

    constructor(private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private contactService: ContactService,
        private storefrontService: StorefrontService) { }

    ngOnInit() {
        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
        }));

        this.contactService.getMyContact().subscribe(res => this.ngZone.run(() => {
            this.contact = res;
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

}
