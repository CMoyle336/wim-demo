import { Component, OnInit, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { Account, User, Contact, ContactService, CartService, Cart, Order, UserService, StorefrontService, Storefront } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { PSComunication } from './../../../services/psCommunication.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    cart: Cart;
    itemCount: number;
    user: User;
    order: Order;
    pageTitle = 'Checkout - Shipping';
    storefront: Storefront;
    shippingCharge: number;
    total: number;
    @Input() account: Account;
    shippingChargeValue: number = 0.00;

    courierFlag: boolean = true;
    localFlag: boolean = false;
    flatFlag: boolean = false;
    UPSFlag: boolean = false;
    localPickupFlag: boolean = false;


    constructor( private contactService: ContactService,
        private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private userService: UserService,
        private storefrontService: StorefrontService,
        private psComunication: PSComunication  ) { }

    ngOnInit() {
        this.shippingChargeValue = 0.00;
        this.shippingChargeValue = this.psComunication.getShippingCharges();
        this.shippingCharge = this.shippingChargeValue;
        this.setShippingMethodflag( this.shippingCharge );

        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            this.total = 0;
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
            if (_.get(this.cart, 'Apttus_Config2__SummaryGroups__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.total = this.total +  r.Apttus_Config2__NetPrice__c);
                console.log(this.total);
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }


    onSelectionChange(entry) {
        this.shippingCharge = entry;
        this.psComunication.setShippingCharges(this.shippingCharge);
    }

    resetShipingMethodflag() {
        this.courierFlag = true;
        this.localFlag = false;
        this.flatFlag = false;
        this.UPSFlag = false;
        this.localPickupFlag = false;
    }
    setShippingMethodflag( shippingCharge ) {
        this.resetShipingMethodflag();
        if (shippingCharge === 22.50) {
            this.courierFlag = true;
        } else if (shippingCharge === 10) {
            this.localFlag = true;
        } else if (shippingCharge === 33.85) {
            this.flatFlag = true;
        } else if (shippingCharge === 18) {
            this.UPSFlag = true;
        } else {
            this.localPickupFlag = true;
        }
    }
}
