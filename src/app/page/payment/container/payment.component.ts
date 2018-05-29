import { Component, OnInit, NgZone } from '@angular/core';
import { CartService, Cart, Contact, ContactService, StorefrontService, Storefront } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { PSComunication } from './../../../services/psCommunication.service';
import * as _ from 'lodash';


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    cart: Cart;
    itemCount: number;
    pageTitle = 'Checkout - Payment';
    contact: Contact;
    storefront: Storefront;
    shippingCharge: number;
    total: number;
    constructor(private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private contactService: ContactService,
        private psComunication: PSComunication,
        private storefrontService: StorefrontService) { }

    ngOnInit() {
        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            this.total = 0;
            this.shippingCharge = this.psComunication.getShippingCharges();
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
                if (_.get(this.cart, 'Apttus_Config2__SummaryGroups__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.total = this.total +  r.Apttus_Config2__NetPrice__c);
                console.log(this.total);
        }));

        this.contactService.getMyContact().subscribe(res => this.ngZone.run(() => {
            this.contact = res;
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

}
