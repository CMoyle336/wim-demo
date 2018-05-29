import { Component, OnInit, NgZone, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Account, User, Contact, ContactService, CartService, Cart, Order, 
        UserService, AccountService, AccountLocation, StorefrontService, Storefront} from '@apttus/ecommerce';
import { SObjectService } from 'ng-salesforce';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import * as _ from 'lodash';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html'
})
export class AddressFormComponent implements OnInit {
    cart: Cart;
    itemCount: number;
    user: User;
    order: Order;
    contact: Contact; 
    storefront: Storefront; 
    account: Account; 
    accountLocations: any[];
    addressForm: FormGroup; 

    constructor( private contactService: ContactService, 
        private cartService: CartService, 
        private ngZone: NgZone, 
        private sanitizer: DomSanitizer, 
        private userService: UserService, 
        private accountService: AccountService, 
        private sObjectService: SObjectService, 
        private storefrontService: StorefrontService ) { }

    ngOnInit() {
        this.addressForm = new FormGroup({
            'billingAddress': new FormControl(null), 
            'sameAddress': new FormControl(true)
        });

        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart
            this.itemCount = 0;
            if(_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
        }));

        this.contactService.getMyContact().subscribe(res => this.ngZone.run(() => {
            this.contact = res; 
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res; 
        }));

        this.accountService.getCurrentAccount().subscribe(res => this.ngZone.run(() => {
            this.account = res; 
            console.log(res);

            this.accountLocations = this.account.Apttus_Config2__AccountLocations__r.records; 
            console.log(this.accountLocations); 
        }));  
    }

    onSubmit() {
    }

}
