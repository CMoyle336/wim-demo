import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { Account, AccountService, CategoryService, Category, StorefrontService, Storefront,
            PriceListService, CartService, Cart, CartItem, User, UserService } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Subject} from 'rxjs/Subject';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'header-toolbar',
    templateUrl: './header-toolbar.compoonent.html'
})
export class HeaderToolbarComponent implements OnInit {

    categoryTree: Array<Category>;
    storefront: Storefront;
    searchQuery: string;
    postalCode: number;
    cart: Cart;
    itemCount: number;
    user: User;
    regUser: User;
    loading: boolean = false;
    username: string;
    password: string;
    account: Account;
    showSignUp: boolean;
    signUpMsg: any;

    @ViewChild('instance') instance: NgbTypeahead;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(
        private userService: UserService,
        private categoryService: CategoryService,
        private storefrontService: StorefrontService,
        private sanitizer: DomSanitizer,
        private priceListService: PriceListService,
        private ngZone: NgZone,
        private router: Router,
        private cartService: CartService,
        private accountService: AccountService ) {

        this.showSignUp = true;
        this.signUpMsg = 'Thank you. registration successful. Please check your email for sign up link.';
    }

    ngOnInit() {
        this.showSignUp = true;
        this.categoryService.getCategoryTree()
        .subscribe(res => this.ngZone.run(() => this.categoryTree = res));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));

        this.accountService.getCurrentAccount().subscribe(res => this.ngZone.run(() => {
            this.account = res;
        }));

        this.cartService.getMyCart().subscribe(cart => this.ngZone.run(() => {
            this.cart = cart;
            this.itemCount = 0;
            if (_.get(this.cart, 'Apttus_Config2__LineItems__r.records'))
                this.cart.Apttus_Config2__LineItems__r.records.forEach(r => this.itemCount += r.Apttus_Config2__Quantity__c);
        }));

        this.userService.me().subscribe(res => this.ngZone.run(() => {
            this.user = res;
            this.regUser = Object.assign({}, this.user);
        }));
    }

    onSubmit() {
        document.getElementById('search-toggle').click();
        this.router.navigate(['/search', this.searchQuery]);
    }

    removeCartItem(item: CartItem) {
        item['_deleting'] = true;
        this.cartService.removeCartItem(item, true)
        .subscribe(
            () => item['_deleting'] = false,
            );
    }

    closeMenu() {
        document.getElementById('mobile-menu-toggle').click();
    }

    login() {
        this.loading = true;
        this.userService.login(this.username, this.password).subscribe(res => {
            this.loading = false;
            document.getElementById('user-toggle').click();
            this.router.navigate(['/']);
        }, err => {
            this.loading = false;
            console.error(err);
        });
    }

    logout() {
        this.userService.logout().subscribe(() => this.router.navigate(['/']));
    }

    onRegister() {
        this.loading = true;
        // this.regUser.Username = this.regUser.Email;
        this.userService.register(this.regUser).subscribe(res => {
            this.loading = false;
            this.showSignUp = false;
        },
        err => {
            console.log(err);
            this.loading = false;
        });
    }
    back() {
        if (this.showSignUp)
            this.showSignUp = false;
        else
            this.showSignUp = true;
    }

    goToAddress() {
        this.ngZone.run(() => this.router.navigate(['/address']));
    }

}
