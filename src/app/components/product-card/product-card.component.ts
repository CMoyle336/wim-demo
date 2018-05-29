import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, NgZone, ChangeDetectorRef, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Product, Storefront, PriceListItem, CartService, StorefrontService, PriceListService, AccountService } from '@apttus/ecommerce';
import { ForceService } from 'ng-salesforce';
import { Observable } from 'rxjs/Observable';
import { PSQuoteService } from '../../services/psquote.service';
import { WishList } from './../../models/wish-list.model';
import { Router } from '@angular/router';
import { PSPLIService, PLIService } from '../../services/PSPLIService.service';
import { WishListService } from '../../services/wish-list.service';
import { PSProduct } from '../../models/product.model';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnChanges, OnDestroy, OnInit {
    @Input() product: PSProduct;
    @Input() thumbnail: boolean = true;
    @Input() type: 'card' | 'media' = 'card';

    storefront: Storefront;
    loading: boolean;
    sub: any;
    quantity: any;
    contractPrice: PriceListItem;
    isloggedin: boolean;
    pSQuoteService: PSQuoteService;
    contractPriceListId: string;
    wishList: WishList =  new WishList();

    @Input() accountName: string;
    @Output() emitCompareProductCountEvent = new EventEmitter<any>();

    constructor(private cartService: CartService,
        private cd: ChangeDetectorRef,
        private storefrontService: StorefrontService,
        private priceListService: PriceListService,
        private forceService: ForceService,
        private accountService: AccountService,
        public psPLIService: PSPLIService,
        private pliService: PLIService,
        private ngZone: NgZone,
        private wishListService: WishListService,
        private router: Router) {}

    ngOnChanges() {
        this.getContractPrice(this.accountName);
    }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
            this.isloggedin = this.forceService.isLoggedIn();
            this.quantity = 1;
            this.getContractPrice(undefined);
        }));
    }

    getContractPrice(accountName: string) {
        this.psPLIService.getContractPriceListId(accountName).subscribe(res => this.ngZone.run(() => {
            this.contractPriceListId = res;

            if (accountName === 'DF Clothing') {
                this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
            } else if (accountName === 'Anderson Clothing') {
                this.contractPriceListId = 'a1f6A000000OXNC';
            } else if (accountName === 'Cunningham Clothing') {
                this.contractPriceListId = 'a1f6A000000OXd8';
            } else if (accountName === 'Baker Clothing') {
                this.contractPriceListId = 'a1f6A000000OXOj';
            } else if (this.contractPriceListId === 'None') {
                this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
            } else {
                this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
            }

            this.pliService.getContractPriceListItemByCode(this.product.Id, this.contractPriceListId)
                .subscribe(contractPrice => this.ngZone.run(() => this.contractPrice = contractPrice));

        }));
    }
    /*getAccountName(accounrName : string){
        console.log(accounrName);
    }*/
    ngOnDestroy() {
        if (this.sub)
            this.sub.unsubscribe();
    }

    addToCart(): void {
        this.loading = true;
        this.sub = this.cartService.addProductToCart(this.product, this.quantity, true, null, true, 60000)
        .take(1)
        .subscribe(
            res => {this.loading = false; this.cd.markForCheck(); },
            err => {this.loading = false; console.log(err); this.cd.markForCheck(); }
            );
    }

    addToWishList = function(productId: String) {
        this.wishList.Product__c = productId;
        this.wishListService.create([this.wishList]).subscribe(() => this.router.navigate(['/wish-list']));
    };

    addToCompare(event , prodId) {
        if (event.target.checked) {
            this.emitCompareProductCountEvent.emit([1, prodId]);

        } else {
            this.emitCompareProductCountEvent.emit([0, prodId]);

        }
    }

    navigateToProductCard(productId) {
        this.router.navigate(['/product', productId]);
    }
}
