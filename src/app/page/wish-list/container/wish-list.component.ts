import { Component, OnInit, NgZone } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ProductService, UserService, User, Product, CartService, StorefrontService, Storefront, PriceListService, PriceListItem } from '@apttus/ecommerce';
import { SObject, SObjectService } from 'ng-salesforce';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {PSQuoteService} from './../../../services/psquote.service';
import { WishListService } from '../../../services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  pageTitle = 'My Wish List';
  wishlists: any;
  public user: User;
  public storefront: Storefront;
  constructor(
    public psQuoteService: PSQuoteService,
    private cartService: CartService,
    private ngZone: NgZone,
    private storefrontService: StorefrontService,
    private productService: ProductService,
    private router: Router,
    private wishListService: WishListService,
    private userService: UserService ) {

  }

  ngOnInit() {
    this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
      this.storefront = res;
    }));
    this.wishListService.getWishList().subscribe(res => this.ngZone.run(() => {
      this.wishlists = res;
    }));

  }

  addToCart(productId) {
    this.productService.get([productId])
        .map(res => res[0])
        .filter(product => product != null)
        .subscribe(product => this.ngZone.run(() =>
            this.cartService.addProductToCart(product, 1, true, null, true, 60000)
            .take(1)
            .subscribe()

        ));
  }
}
