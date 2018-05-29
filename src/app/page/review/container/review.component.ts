import { Component, OnInit, NgZone, Input } from '@angular/core';
import { CartService, Order, OrderService, Quote, QuoteService, Contact, ContactService, PriceList, PriceListService, AccountService, StorefrontService, Storefront } from '@apttus/ecommerce';
import { PSOrderService } from '../../../services/psorder.service';
import { PSQuoteService } from '../../../services/psquote.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PSComunication } from './../../../services/psCommunication.service';
import { PSCart } from '../../../models/pscart';
import * as _ from 'lodash';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    cart: PSCart;
    itemCount: number;
    order = new Order();
    orderId: string;
    quote = new Quote();
    contact: Contact;
    priceListId: string;
    storefront: Storefront;
    loading: boolean;
    pageTitle = 'Checkout - Review';
    responseObj: any;
    shippingCharge: number;
    total: number;
    constructor(private router: Router,
        private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private orderService: OrderService,
        private psOrderService: PSOrderService,
        private contactService: ContactService,
        private priceListService: PriceListService,
        private psQuoteService: PSQuoteService,
        private accountService: AccountService,
        private psComunication: PSComunication,
        private storefrontService: StorefrontService ) { }

    ngOnInit() {
        this.cartService.getMyCart().subscribe((cart: PSCart) => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            this.total = 0;
            this.shippingCharge = this.psComunication.getShippingCharges();
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
            if (_.get(this.cart, 'Apttus_Config2__SummaryGroups__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.total = this.total +  r.Apttus_Config2__NetPrice__c);
        }));

        this.contactService.getMyContact().subscribe(res => this.ngZone.run(() => {
            this.contact = res;
        }));

        this.priceListService.getPriceListId().subscribe(res => this.ngZone.run(() => {
            this.priceListId = res;
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

    completeOrder() {
        this.loading = true;

        this.psOrderService.createOrder(this.shippingCharge)
            .subscribe(
                res => this.ngZone.run(() => {
                    this.responseObj = res;
                    this.loading = false;
                    console.log(res);
                    this.orderId = this.responseObj['Name'];
                    this.router.navigate(['/complete', this.orderId ]);
                    }
            ));
    }
}
