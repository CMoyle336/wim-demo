import { Component, OnInit, NgZone, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Account, User, Contact, ContactService, CartService, Cart, Order, UserService, AccountService, AccountLocation, StorefrontService, Storefront} from '@apttus/ecommerce';
import { SObjectService } from 'ng-salesforce';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    @ViewChild('f') addressForm: NgForm;
    cart: Cart;
    itemCount: number;
    pageTitle = 'Address';
    contact: Contact;
    storefront: Storefront;

    constructor( private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private storefrontService: StorefrontService ) { }

    ngOnInit() {
        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

    onSubmit() {
    }

}
