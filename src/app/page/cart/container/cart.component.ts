import { Component, OnInit, NgZone } from '@angular/core';
import { CartService, Cart, CartItem } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart;
  itemCount: number;
  constructor(private cartService: CartService, private ngZone: NgZone, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
}
