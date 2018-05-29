import { Component, OnInit, NgZone } from '@angular/core';
import { CartService, Cart, CartItem, PriceListService } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';

@Component({
  selector: 'nav-cart',
  templateUrl: './nav-cart.component.html',
  styleUrls: ['./nav-cart.component.scss']
})
export class NavCartComponent implements OnInit {

  cart: Cart;
  itemCount: number;
  constructor(private cartService: CartService, private ngZone: NgZone,
              private sanitizer: DomSanitizer, private priceListService: PriceListService) { }

  ngOnInit() {
    this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
      this.cart = cart;
      this.itemCount = 0;
      if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
        this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += Number(r.Apttus_Config2__Quantity__c));
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

}
